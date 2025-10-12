import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiHelpSupp } from "../Url-Link/ApiHelpSupp";

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({}); // store input per ticket

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${ApiHelpSupp}/all`);
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      alert("❌ Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const respondTicket = async (ticketId) => {
    const response = responses[ticketId];
    if (!response || !response.trim()) return;

    try {
      await axios.put(`${ApiHelpSupp}/respond/${ticketId}`, { response });
      alert("✅ Response submitted and ticket marked as Solved");
      setResponses(prev => ({ ...prev, [ticketId]: "" })); // clear input
      fetchTickets(); // refresh tickets
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit response");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin – Support Tickets</h2>

      {loading && <p className="text-gray-500">Loading tickets...</p>}
      {!loading && tickets.length === 0 && <p className="text-gray-500">No tickets available</p>}

      {tickets.map((ticket) => (
        <div key={ticket.ticketId} className="border rounded p-4 mb-4 bg-white shadow-sm">
          <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
          <p><strong>Subject:</strong> {ticket.subject}</p>
          <p><strong>User:</strong> {ticket.userAccountId}</p>
          <p><strong>Message:</strong> {ticket.description}</p>
          <p><strong>Status:</strong> {ticket.status}</p>

          {ticket.adminResponse ? (
            <p className="text-green-700"><strong>Admin:</strong> {ticket.adminResponse}</p>
          ) : (
            <div className="mt-2 flex space-x-2">
              <input
                type="text"
                placeholder="Admin response..."
                value={responses[ticket.ticketId] || ""}
                onChange={(e) =>
                  setResponses(prev => ({ ...prev, [ticket.ticketId]: e.target.value }))
                }
                className="flex-1 border p-2 rounded focus:outline-green-500"
              />
              <button
                onClick={() => respondTicket(ticket.ticketId)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminSupport;
