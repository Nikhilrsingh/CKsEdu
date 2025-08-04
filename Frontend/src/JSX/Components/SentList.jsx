
import { sentEmails } from "./dummyEmails";

export default function SentList({ onSelect, selectedEmail }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sent</h2>
      {sentEmails.map((email) => (
        <div
          key={email.id}
          onClick={() => onSelect(email)}
          className={`p-4 mb-3 rounded-lg border border-gray-200 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-gray-50 ${
            selectedEmail?.id === email.id
              ? "bg-blue-50 border-blue-400 shadow-md"
              : "bg-white"
          }`}
        >
          <h3 className="font-semibold text-gray-800">{email.subject}</h3>
          <p className="text-sm text-gray-500">To: {email.receiver}</p>
          <p className="text-sm text-gray-600 mt-1 truncate">
            {email.body.slice(0, 90)}...
          </p>
        </div>
      ))}
    </div>
  );
}
