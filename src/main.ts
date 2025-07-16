import './style.css';
import { openCamera, captureStill } from './camera/capture';
import { resize }   from './preprocess/resize';
import { denoise }  from './preprocess/denoise';
import { normalise } from './preprocess/normalise';
import { drawOverlay } from './overlay/draw';
import { saveCapture } from './storage';

const imgCanvas  = document.getElementById('img')      as HTMLCanvasElement;
const ovlCanvas  = document.getElementById('overlay')  as HTMLCanvasElement;
const btnCap     = document.getElementById('btn-capture')     as HTMLButtonElement;
const btnPrep    = document.getElementById('btn-preprocess')  as HTMLButtonElement;
const btnOvl     = document.getElementById('btn-overlay')     as HTMLButtonElement;

const video = document.createElement('video');
video.style.display = 'none';
document.body.appendChild(video);

await openCamera(video);                      // start camera on load

let lastCanvas: HTMLCanvasElement | null = null;
let lastPred   = null as any;

btnCap.onclick = () => {
  lastCanvas = captureStill(video);
  // reflect to main canvas
  imgCanvas.width  = lastCanvas.width;
  imgCanvas.height = lastCanvas.height;
  ovlCanvas.width  = lastCanvas.width;
  ovlCanvas.height = lastCanvas.height;
  imgCanvas.getContext('2d')!.drawImage(lastCanvas, 0,0);
};

btnPrep.onclick = async () => {
  if (!lastCanvas) return alert('Capture first');
  const r = resize(lastCanvas);
  const d = denoise(r);
  const n = normalise(d);

  await saveCapture({
    imgBlob: await new Promise(res=>d.toBlob(b=>res(b!), 'image/jpeg')),
    prep: n,
    created: Date.now()
  });

  // mock result
  lastPred = await fetch('/mock_results/sample.json').then(r=>r.json());
  alert('Pre-processing complete; ready for overlay.');
};

btnOvl.onclick = () => {
  if (!lastPred) return alert('Run preprocessing first');
  drawOverlay(ovlCanvas, lastPred);
};
