import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(input);
      const botMessage: Message = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatContainer}>
        <h2 style={styles.title}>Yash Kaushal AI Portfolio</h2>

        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={
                msg.role === "user"
                  ? styles.userMessage
                  : styles.botMessage
              }
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div style={styles.botMessage}>
              Typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about Yash..."
          />
          <button style={styles.button} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: any = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chatContainer: {
    width: "95%",
    maxWidth: "700px",
    height: "85vh",
    backgroundColor: "#0f172a",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
    color: "white",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "15px",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "90%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1e293b",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "90%",
  },
  inputContainer: {
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    marginRight: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};

export default Chat;