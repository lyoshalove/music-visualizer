import { ctx, render } from './render.js';
import { buttons, trackControl } from './controllers.js';
import { create, analyzer, audio } from "./audio.js";

let played = false,
    controlPressed = false,
    radius = 80,
    track = null;

loop();

buttons.play.addEventListener("click", () => {
  if (!played) {
    create();
    played = true;
  }
});
trackControl.onpointerdown = () => (controlPressed = true);
trackControl.onpointerip = () => (controlPressed = false);

function loop() {
  requestAnimationFrame(loop);
  render();

  if(played) {
    track = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(track);
  }

  let impulse = Math.min(track ? track[2] : 0, track ? track[4] : 0);

  ctx.shadowBlur = 0;
  ctx.fillStyle = `hsl(${180 - (impulse / 255) * 180}, 50%, 50%)`;

  radius = 80 + impulse / 10;

  for(let i = 0; i < 160; i++) {
    ctx.save();
    ctx.translate(
      window.innerWidth / 2 + Math.sin(i * (Math.PI / 80)) * radius,
      window.innerHeight / 2 + Math.cos(i * (Math.PI / 80)) * radius
    );
    ctx.rotate((-i * Math.PI) / 80);
    ctx.fillRect(0, 0, 1, 2 + (track ? track[i] : 0) * 0.5);
    ctx.restore();
  }

  ctx.shadowColor = `hsl(${180 - (impulse / 255) * 180}, 50%, 50%)`;
  ctx.shadowBlur = 100;
  ctx.fillStyle = "#111";
  ctx.arc(
    window.innerWidth / 2,
    window.innerHeight / 2,
    radius,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.beginPath();

  if (!controlPressed) {
    trackControl.value = (audio.currentTime / audio.duration) * 100;
  }
}