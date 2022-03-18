export let context, analyzer, src;
export const audio = document.querySelector("audio"),
  inputFile = document.querySelector(".file");

inputFile.addEventListener('change', e => {
  audio.src = URL.createObjectURL(e.target.files[0]);
});

export function create() {
  context = new window.AudioContext();
  analyzer = context.createAnalyser();
  src = context.createMediaElementSource(audio);
  src.connect(analyzer);
  analyzer.connect(context.destination);
}