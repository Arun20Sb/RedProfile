import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from persona_generator import generate_persona

app = FastAPI()

# Enable CORS so that React app can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True,
)


@app.get("/generate")
def generate(profile_url: str):
    try:
        username = profile_url.rstrip("/").split("/")[-1]
        result = generate_persona(username)
        return {"persona": result}
    except Exception as e:
        return {"error": str(e)}


# List all personas
@app.get("/list-personas")
def list_personas():
    output_dir = "output"
    if not os.path.exists(output_dir):
        return {"personas": []}

    files = os.listdir(output_dir)
    personas = [f.replace("_persona.txt", "") for f in files if f.endswith(".txt")]
    return {"personas": personas}


# List specific persona content
@app.get("/persona-file")
def get_persona(username: str):
    filepath = f"output/{username}_persona.txt"
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return {"text": f.read()}
    return JSONResponse(content={"error": "Persona not found"}, status_code=404)
