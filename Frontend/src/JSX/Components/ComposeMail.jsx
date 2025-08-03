import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ComposeEmail() {
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    alert(`Email sent to ${to}!\nSubject: ${subject}\nBody: ${body}`);
    navigate("/app/email/sent");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Compose Email</h2>
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Message"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="block w-full mb-2 p-2 border rounded h-40"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}

