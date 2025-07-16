export function normalise(cv: HTMLCanvasElement): Float32Array {
  const { data } = cv.getContext('2d')!.getImageData(0, 0, cv.width, cv.height);
  const out = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = data[i] / 255;
  }
  return out;
}
