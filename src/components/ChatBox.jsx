const ChatBox = () => {
  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold md-2">Chat GPT</h2>
      <input
        type="text"
        placeholder="Ask a question"
        className="w-full border rounded p-2 mb-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Send
      </button>
    </div>
  );
};

export default ChatBox;
