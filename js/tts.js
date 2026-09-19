window.EPSTTS = (() => {
  let voices = [];
  let generation = 0;
  let pauseTimer = null;

  function refreshVoices() {
    voices = 'speechSynthesis' in window
      ? window.speechSynthesis.getVoices().filter(v => String(v.lang || '').toLowerCase().startsWith('ko'))
      : [];
    return voices;
  }

  function namedVoice(speaker) {
    // Whole-word gender labels avoid matching "male" inside "female".
    const pattern = speaker === 'male'
      ? /in\s?joon|인준|\bmale\b/i
      : /sun\s?hi|선히|heami|\bfemale\b/i;
    return voices.find(v => pattern.test(v.name || ''));
  }

  function getVoice(speaker) {
    if (!voices.length) refreshVoices();
    if (!speaker) return voices[0];
    return namedVoice(speaker) || voices.find(v => v !== namedVoice(speaker === 'male' ? 'female' : 'male')) || voices[0];
  }

  function utter(text, { rate = 0.86, speaker = null } = {}) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.volume = 1;
    u.pitch = speaker === 'female' ? 1.08 : speaker === 'male' ? 0.92 : 1;
    const voice = getVoice(speaker);
    if (voice) u.voice = voice;
    return u;
  }

  function cancel() {
    generation++;
    clearTimeout(pauseTimer);
    pauseTimer = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function sequence(items, { rate = 0.86, pauseMs = 400, onEnd, onError } = {}) {
    cancel();
    if (!('speechSynthesis' in window)) { onError?.(); return; }
    const active = generation;
    let index = 0;
    let finished = false;
    function next() {
      if (active !== generation || finished) return;
      if (index >= items.length) { finished = true; onEnd?.(); return; }
      const item = items[index];
      const u = utter(item.text, { rate: item.rate ?? rate, speaker: item.speaker ?? null });
      u.onerror = () => {
        if (active !== generation || finished) return;
        finished = true;
        onError?.();
      };
      u.onend = () => {
        if (active !== generation || finished) return;
        index++;
        if (index < items.length) pauseTimer = setTimeout(next, item.pauseMs ?? pauseMs);
        else { finished = true; onEnd?.(); }
      };
      window.speechSynthesis.speak(u);
    }
    next();
  }

  function speak(audio, callbacks = {}) {
    if (!audio) return;
    const opts = { rate: audio.rate ?? 0.86, pauseMs: audio.pauseMs ?? 400, ...callbacks };
    if (audio.mode === 'dialogue') return sequence(audio.dialogue || [], opts);
    if (audio.mode === 'segments') return sequence(audio.segments || [], opts);
    // Includes question_and_options: the main button reads only the question.
    return sequence([{ text: audio.text || '' }], opts);
  }

  function speakOption(text, { rate = 0.86, onEnd, onError } = {}) {
    if (text) sequence([{ text }], { rate, pauseMs: 0, onEnd, onError });
  }

  if ('speechSynthesis' in window) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;
    setTimeout(refreshVoices, 250);
  }
  return { refreshVoices, speak, speakOption, cancel };
})();
