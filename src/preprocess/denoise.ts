// super-light 3×3 median filter, runs on main thread for brevity
export function denoise(cv: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = cv.getContext('2d')!;
  const img = ctx.getImageData(0, 0, cv.width, cv.height);
  const out = new Uint8ClampedArray(img.data);

  const idx = (x: number, y: number, c: number) => ((y * cv.width + x) * 4) + c;

  for (let y = 1; y < cv.height - 1; y++) {
    for (let x = 1; x < cv.width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        const neighborhood = [];
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            neighborhood.push(img.data[idx(x + dx, y + dy, c)]);
          }
        }
        neighborhood.sort((a, b) => a - b);
        out[idx(x, y, c)] = neighborhood[4];      // median
      }
    }
  }
  ctx.putImageData(new ImageData(out, cv.width, cv.height), 0, 0);
  return cv;
}
