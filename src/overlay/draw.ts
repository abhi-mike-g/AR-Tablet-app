import { Predictions } from './types';

export function drawOverlay(canvas: HTMLCanvasElement, preds: Predictions): void {
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;

  preds.boxes?.forEach(b => ctx.strokeRect(b.x, b.y, b.width, b.height));

  preds.masks?.forEach(m => {
    ctx.beginPath();
    m.polygon.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();
    ctx.stroke();
  });
}
