const EPS_SPEECH_RATE = 0.72;
const DIALOGUE_TRIM_MS = {
  male: {
    start: 330,
    end: 1250
  },
  female: {
    start: 200,
    end: 1020
  },
  default: {
    start: 200,
    end: 1020
  }
};

window.EPSTTS = (() => {
  let voices = [];
  let activeAudio = null;
  let playbackSession = 0;

  function refreshVoices() {
    if (!('speechSynthesis' in window)) {
      return [];
    }

    voices = window.speechSynthesis
      .getVoices()
      .filter(voice =>
        String(voice.lang || '')
          .toLowerCase()
          .startsWith('ko')
      );

    return voices;
  }

  function getVoice(speaker) {
    refreshVoices();

    if (!voices.length) {
      return null;
    }

    const femaleNames = [
      'sunhi',
      'sun hi',
      '선히',
      'heami',
      'female',
      'woman'
    ];

    const maleNames = [
      'injoon',
      'in joon',
      '인준',
      'male',
      'man'
    ];

    const findByNames = names =>
      voices.find(voice => {
        const name =
          String(voice.name || '').toLowerCase();

        return names.some(item =>
          name.includes(item.toLowerCase())
        );
      });

    const femaleVoice =
      findByNames(femaleNames) ||
      voices[0] ||
      null;

    let maleVoice =
      findByNames(maleNames) ||
      null;

    // If no named male voice exists, prefer a different Korean voice.
    if (!maleVoice && femaleVoice) {
      maleVoice =
        voices.find(voice =>
          voice.voiceURI !== femaleVoice.voiceURI &&
          voice.name !== femaleVoice.name
        ) ||
        null;
    }

    if (speaker === 'female') {
      return femaleVoice;
    }

    if (speaker === 'male') {
      return maleVoice || femaleVoice;
    }

    return femaleVoice;
  }

  function utter(
    text,
    {
      speaker = null
    } = {}
  ) {
    const u =
      new SpeechSynthesisUtterance(text);

    u.lang = 'ko-KR';
    u.volume = 1;

    const voice = getVoice(speaker);

    if (voice) {
      u.voice = voice;
    }

    // Keep the two speakers distinguishable even when the device exposes
    // only one Korean voice. JSON rates remain backwards-compatible but
    // cannot override the global practice-test speed.
    if (speaker === 'female') {
      u.rate = EPS_SPEECH_RATE;
      u.pitch = 1.15;
    } else if (speaker === 'male') {
      u.rate = Math.max(0.6, EPS_SPEECH_RATE - 0.03);
      u.pitch = 0.78;
    } else {
      u.rate = EPS_SPEECH_RATE;
      u.pitch = 1;
    }

    return u;
  }

  function cancel() {
    playbackSession++;

    if (activeAudio) {
      activeAudio.pause();

      try {
        activeAudio.currentTime = 0;
      } catch {
        // Ignore seek error.
      }

      activeAudio = null;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function playAudioFile(
    src,
    {
      rate = 0.80,
      preparedAudio = null,
      startTrimMs = 0,
      endTrimMs = 0,
      onEnd,
      onError
    } = {}
  ) {
    const audio = preparedAudio || new Audio(src);
    let settled = false;
    let trimFrame = null;

    function applyStartTrim() {
      if (!startTrimMs) {
        return;
      }

      try {
        audio.currentTime = startTrimMs / 1000;
      } catch {
        // Retry when metadata makes the preloaded file seekable.
      }
    }

    function finish() {
      if (settled) return;
      settled = true;

      if (trimFrame !== null) {
        cancelAnimationFrame(trimFrame);
      }

      if (activeAudio === audio) {
        activeAudio = null;
      }

      onEnd?.();
    }

    function watchForSilentTail() {
      if (settled || activeAudio !== audio) {
        return;
      }

      const remainingMs =
        (audio.duration - audio.currentTime) * 1000;

      if (
        endTrimMs > 0 &&
        Number.isFinite(remainingMs) &&
        remainingMs <= endTrimMs
      ) {
        audio.pause();
        finish();
        return;
      }

      trimFrame = requestAnimationFrame(
        watchForSilentTail
      );
    }

    audio.playbackRate = rate;
    audio.preservesPitch = true;

    activeAudio = audio;

    audio.onloadedmetadata = applyStartTrim;
    audio.onended = finish;

    const fail = () => {
      if (settled) return;
      settled = true;

      if (trimFrame !== null) {
        cancelAnimationFrame(trimFrame);
      }

      if (activeAudio === audio) {
        activeAudio = null;
      }

      onError?.();
    };

    audio.onerror = fail;
    applyStartTrim();
    audio.play()
      .then(watchForSilentTail)
      .catch(fail);
  }

  function logVoices() {
    refreshVoices();

    console.table(
      voices.map((voice, index) => ({
        index,
        name: voice.name,
        lang: voice.lang,
        voiceURI: voice.voiceURI,
        localService: voice.localService
      }))
    );
  }

  function sequence(
    items,
    {
      rate = 0.86,
      pauseMs = 10,
      startTrimMs = 0,
      endTrimMs = 0,
      onEnd,
      onError
    } = {}
  ) {
    cancel();

    const session = playbackSession;
    const preparedAudio = items.map(item => {
      if (!item.src) {
        return null;
      }

      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = item.src;
      audio.load();

      return audio;
    });

    let index = 0;

    function next() {
      if (session !== playbackSession) {
        return;
      }

      if (index >= items.length) {
        onEnd?.();
        return;
      }

      const item = items[index];

      function finishItem() {
        if (session !== playbackSession) {
          return;
        }

        index++;

        if (index < items.length) {
          setTimeout(
            next,
            item.pauseMs ?? pauseMs
          );
        } else {
          onEnd?.();
        }
      }

      function browserFallback() {
        if (session !== playbackSession) {
          return;
        }

        if (!('speechSynthesis' in window)) {
          onError?.();
          return;
        }

        const u = utter(
          item.text,
          {
            rate: item.rate ?? rate,
            speaker: item.speaker ?? null
          }
        );

        u.onend = finishItem;

        u.onerror = () => {
          onError?.();
        };

        window.speechSynthesis.speak(u);
      }

      if (item.src) {
        playAudioFile(
          item.src,
          {
            rate: item.rate ?? rate,
            preparedAudio: preparedAudio[index],
            startTrimMs:
              item.startTrimMs ?? startTrimMs,
            endTrimMs:
              item.endTrimMs ?? endTrimMs,
            onEnd: finishItem,
            onError: browserFallback
          }
        );

        return;
      }

      browserFallback();
    }

    next();
  }

  function speak(audio, callbacks = {}) {
    if (!audio) return;

    const opts = {
      rate: audio.rate ?? 0.86,
      pauseMs: audio.pauseMs ?? 10,
      ...callbacks
    };

    // Q33 / Q38 / Q39 / Q40
    if (audio.mode === 'dialogue') {
      const dialogue = (
        audio.dialogue || []
      ).map(item => {
        const trim =
          DIALOGUE_TRIM_MS[item.speaker] ||
          DIALOGUE_TRIM_MS.default;

        return {
          ...item,
          startTrimMs:
            item.startTrimMs ??
            audio.startTrimMs ??
            trim.start,
          endTrimMs:
            item.endTrimMs ??
            audio.endTrimMs ??
            trim.end
        };
      });

      return sequence(
        dialogue,
        {
          ...opts,
          pauseMs: audio.pauseMs ?? 0
        }
      );
    }

    // Other segmented audio
    if (audio.mode === 'segments') {
      return sequence(
        audio.segments || [],
        opts
      );
    }

    // Q28-Q32:
    // Main Play button speaks ONLY question.
    if (audio.mode === 'question_and_options') {
      return sequence(
        [{
          text: audio.text || ''
        }],
        opts
      );
    }

    return sequence(
      [{
        text: audio.text || ''
      }],
      opts
    );
  }

  // Q28-Q32 option audio
  function speakOption(
    text,
    {
      rate = 0.86,
      onEnd,
      onError
    } = {}
  ) {
    if (!text) return;

    sequence(
      [{
        text
      }],
      {
        rate,
        pauseMs: 0,
        onEnd,
        onError
      }
    );
  }

  if ('speechSynthesis' in window) {
    refreshVoices();

    window.speechSynthesis.onvoiceschanged =
      refreshVoices;

    setTimeout(refreshVoices, 250);
  }

  return {
    refreshVoices,
    logVoices,
    speak,
    speakOption,
    cancel
  };
})();
