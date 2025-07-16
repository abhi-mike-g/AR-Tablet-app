export function drawOverlay(cv: HTMLCanvasElement, preds: any) {
  const ctx = cv.getContext('2d')!;
  ctx.font = "24px sans-serif";
  ctx.fillStyle = "red";
  ctx.fillText(`Diagnosis: ${preds.label}`, 10, 30);
}
