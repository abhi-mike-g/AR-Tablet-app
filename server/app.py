from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from InferenceFastAI import load_learner  # adjust import path

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # tighten this in prod
    allow_methods=["POST"],
    allow_headers=["*"],
)

learner = load_learner("path/to/exported_model.pkl")  # see InferenceFastAI.py :contentReference[oaicite:1]{index=1}

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    # save bytes to temp file or use PIL frombytes
    from PIL import Image
    import io
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    pred_class, pred_idx, outputs = learner.predict(img)
    # build a JSON response—if you really need boxes,
    # you’d have to stitch on a detection model;
    # for now we’ll return just the classification:
    return JSONResponse({
        "label": str(pred_class),
        "scores": outputs.tolist()
    })
