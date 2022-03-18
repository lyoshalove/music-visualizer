import { audio } from './audio.js';

export const buttons = {
  play: document.querySelector('.play'),
  pause: document.querySelector('.pause'),
};

export const trackControl = document.querySelector('.duration');

trackControl.addEventListener('change', (e) => {
  audio.currentTime = e.target.value / 100 * audio.duration;
});

buttons.play.addEventListener('click', () => {
  audio.play();
});

buttons.pause.addEventListener("click", () => {
  audio.pause();
});