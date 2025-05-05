// Sound effect URLs
export const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  hover: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
  navigate: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'
};

// Preload sounds for better performance
const audioPool = {};

Object.entries(SOUNDS).forEach(([key, url]) => {
  audioPool[key] = new Audio(url);
  audioPool[key].load();
});

export const playSound = (soundType) => {
  const audio = audioPool[soundType];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(err => console.log('Audio playback prevented:', err));
  }
};