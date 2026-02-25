# 🚀 AI-Powered Portfolio 

An interactive full-stack AI portfolio that allows users to chat with my resume in real-time.

This project integrates:

- React + TypeScript frontend
- FastAPI backend
- OpenRouter LLM
- SQLite database
- Deployed on Netlify + Render

🌍 Live Demo

### 🔗 Frontend: https://lambent-faun-a98f83.netlify.app/

🔗 Backend: https://ai-portfolio-ftto.onrender.com/docs

🧠 Features

💬 AI chat interface powered by LLM

📄 Resume-aware responses (context injection)

🛑 Hallucination prevention (strict prompt rules)

🗄 Chat history logging using SQLite

🌐 Fully deployed full-stack architecture

📱 Responsive mobile-compatible UI

⚡ Production-ready CORS handling

🔐 Environment variable security for API keys

🏗 Architecture
Netlify (React Frontend)
        ↓
Render (FastAPI Backend)
        ↓
OpenRouter LLM API
        ↓
Resume Context (resume.txt)
        ↓
SQLite Chat Logs
🛠 Tech Stack
Frontend

React

TypeScript

Axios

React-Markdown

Backend

FastAPI

Uvicorn

SQLAlchemy

SQLite

Python-Dotenv

AI Integration

OpenRouter API

Meta Llama / Mistral model

Structured prompt engineering

Temperature control for deterministic responses

📂 Project Structure

```bash
ai-portfolio/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── resume.txt
│   ├── requirements.txt
│   └── .env (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── components/Chat.tsx
│   │   ├── api.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│
└── README.md
``````````

⚙️ Local Setup
1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/ai-portfolio.git
cd ai-portfolio
```
2️⃣ Backend Setup
```
cd backend
```
```
python -m venv venv
```
```
venv\Scripts\activate  # Windows
```
```
pip install -r requirements.txt
```
Create .env file inside backend/:
```
OPENROUTER_API_KEY=your_api_key_here
```
Run backend:
```
python -m uvicorn main:app --reload
```
Visit:

http://127.0.0.1:8000/docs
3️⃣ Frontend Setup
```
cd frontend
```
```
npm install
```
```
npm start
```
Visit:

http://localhost:3000
🚀 Deployment
Backend → Render

Root directory: backend

Build command:
```
pip install -r requirements.txt
```
Start command:
```
python -m uvicorn main:app --host 0.0.0.0 --port 10000
```
Add environment variable:

OPENROUTER_API_KEY
Frontend → Netlify

Base directory: frontend

Build command:

npm run build

Publish directory:

build
🧩 Key Implementation Details
🔹 Resume Context Injection

The LLM only answers using content from resume.txt, preventing hallucination.

🔹 Structured Prompt Engineering

Strict rules enforce:

- Resume-only answers
- Bullet-point formatting
- Professional tone
- Deterministic output (temperature = 0.3)

🔹 Error Handling

- HTTP status validation
- Safe "choices" extraction
- CORS preflight handling
- API key validation

🔹 Database Logging

All chat interactions are stored in SQLite using SQLAlchemy ORM.

📊 Example Query

User:

What skills does Yash have?

AI:

### Technical Skills

**Programming**
- Python
- Java
- SQL
...
💡 Future Improvements

- Streaming responses
- Vector-based RAG
- User analytics dashboard
- Rate limiting
- Authentication
- Resume download button
- Docker containerization
- Custom domain
