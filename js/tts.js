window.EPSTTS=(()=>{
  let voices=[];
  function refreshVoices(){if(!('speechSynthesis'in window))return[];voices=window.speechSynthesis.getVoices().filter(v=>String(v.lang||'').toLowerCase().startsWith('ko'));return voices}
  function getVoice(speaker,index=0){if(!voices.length)refreshVoices();if(!voices.length)return null;if(speaker==='male')return voices[1]||voices[0];if(speaker==='female')return voices[0];return voices[index%voices.length]}
  function utter(text,{rate=.88,speaker=null,index=0}={}){const u=new SpeechSynthesisUtterance(text);u.lang='ko-KR';u.rate=rate;u.pitch=1;u.volume=1;const v=getVoice(speaker,index);if(v)u.voice=v;else if(speaker==='male')u.pitch=.94;else if(speaker==='female')u.pitch=1.04;return u}
  function cancel(){if('speechSynthesis'in window)window.speechSynthesis.cancel()}
  function sequence(items,{rate=.88,pauseMs=360,onEnd,onError}={}){if(!('speechSynthesis'in window)){onError?.();return}cancel();let i=0;const next=()=>{if(i>=items.length){onEnd?.();return}const item=items[i];const u=utter(item.text,{rate:item.rate??rate,speaker:item.speaker??null,index:i});u.onerror=()=>onError?.();u.onend=()=>{i++;if(i<items.length)setTimeout(next,item.pauseMs??pauseMs);else onEnd?.()};window.speechSynthesis.speak(u)};next()}
  function speak(audio,callbacks={}){if(!audio)return;const opts={rate:audio.rate??.88,pauseMs:audio.pauseMs??360,...callbacks};if(audio.mode==='segments')return sequence(audio.segments||[],opts);if(audio.mode==='dialogue')return sequence(audio.dialogue||[],opts);return sequence([{text:audio.text||''}],opts)}
  if('speechSynthesis'in window){refreshVoices();window.speechSynthesis.onvoiceschanged=refreshVoices;setTimeout(refreshVoices,250)}
  return{refreshVoices,speak,cancel}
})();
