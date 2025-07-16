export function resize(src: HTMLCanvasElement, maxSide = 1024): HTMLCanvasElement {
  const { width, height } = src;
  const scale = maxSide / Math.max(width, height);
  if (scale >= 1) return src; // already small

  const canvas = document.createElement('canvas');
  canvas.width  = Math.round(width  * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext('2d')!.drawImage(src, 0, 0, canvas.width, canvas.height);
  return canvas;
}
