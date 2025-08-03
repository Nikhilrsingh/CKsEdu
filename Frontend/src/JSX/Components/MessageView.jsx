
export default function MessageView({ email }) {
  if (!email) return null;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg max-w-3xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{email.subject}</h2>
        <p className="text-sm text-gray-500 mt-1">From: {email.sender}</p>
        {email.receiver && (
          <p className="text-sm text-gray-500">To: {email.receiver}</p>
        )}
      </div>
      <hr className="mb-4" />
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {email.body}
      </div>
    </div>
  );
}
