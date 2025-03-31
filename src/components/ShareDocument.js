import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./ShareDocument.css"; // Import CSS file for styling

const ShareDocument = () => {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDocuments = async () => {
    setLoading(true);
    setMessage("");
    try {
      const snapshot = await getDocs(collection(db, "documents"));
      if (snapshot.empty) {
        setMessage("No documents found.");
      } else {
        setDocs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    } catch (error) {
      setMessage("Error fetching documents. Please check Firebase.");
    }
    setLoading(false);
  };

  const shareDoc = async (docId) => {
    if (!recipient) {
      setMessage("Please enter an email to share.");
      return;
    }
    try {
      const docRef = doc(db, "documents", docId);
      await updateDoc(docRef, { sharedWith: recipient });
      setMessage("✅ Document shared successfully!");
    } catch (error) {
      setMessage("❌ Error sharing document.");
    }
  };

  return (
    <div className="share-container">
      <div className="share-box">
        <h2>🔗 Share Documents</h2>
        {message && <p className="message">{message}</p>}

        <input
          type="email"
          className="email-input"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="📩 Enter recipient email"
          required
        />

        <button className="load-btn" onClick={fetchDocuments} disabled={loading}>
          {loading ? "Loading..." : "📄 Load My Documents"}
        </button>

        <div className="doc-list">
          {docs.map((doc) => (
            <div key={doc.id} className="doc-item">
              <p>📜 {doc.name}</p>
              <button className="share-btn" onClick={() => shareDoc(doc.id)}>
                🚀 Share
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareDocument;

