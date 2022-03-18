export const canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}