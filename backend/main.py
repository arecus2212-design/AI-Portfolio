from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

from database import SessionLocal, ChatLog

# Load environment variables
load_dotenv()

app = FastAPI()

# -----------------------
# CORS (Frontend Access)
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# -----------------------
# Request Model
# -----------------------
class ChatRequest(BaseModel):
    message: str


# -----------------------
# Load Resume Context
# -----------------------
def load_resume():
    with open("resume.txt", "r", encoding="utf-8") as f:
        return f.read()


# -----------------------
# Root Endpoint
# -----------------------
@app.get("/")
def home():
    return {"status": "AI Portfolio Backend Running 🚀"}


# -----------------------
# Chat Endpoint
# -----------------------
@app.post("/chat")
def chat(req: ChatRequest):

    if not OPENROUTER_API_KEY:
        return {"error": "OpenRouter API key not configured."}

    resume_context = load_resume()

    prompt = f"""
You are an AI assistant representing Yash Kaushal in a professional portfolio.

STRICT RULES:
1. Only use information from the resume below.
2. Do NOT add external knowledge.
3. Structure responses clearly.
4. Use headings and bullet points.
5. Be concise but impactful.
6. If unknown, say: "That information is not available in Yash's resume."

Resume:
{resume_context}

Question:
{req.message}

Provide a professional structured response.
"""

    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "meta-llama/llama-3-8b-instruct",
                "messages": [
                    {"role": "system", "content": "You are a professional AI portfolio assistant."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.3
            }
        )

        # Check HTTP error
        if response.status_code != 200:
            return {
                "openrouter_http_error": response.text
            }

        result = response.json()
        print("FULL RESPONSE:", result)

        # Check model response
        if "choices" not in result:
            return {
                "openrouter_error": result
            }

        answer = result["choices"][0]["message"]["content"]

        # -----------------------
        # Save to Database
        # -----------------------
        db = SessionLocal()
        chat_entry = ChatLog(
            question=req.message,
            answer=answer
        )
        db.add(chat_entry)
        db.commit()
        db.close()

        return {
            "reply": answer
        }

    except Exception as e:
        return {
            "server_error": str(e)
        }