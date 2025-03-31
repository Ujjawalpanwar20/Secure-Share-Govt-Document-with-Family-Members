import { useState } from "react";
import { storage, db } from "../firebase"; 
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import "./UploadDocument.css"; // Import the new CSS file

const UploadDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDocuments = async () => {
    setLoading(true);
    setError("");
    setDocuments([]);

    try {
      const docsCollection = collection(db, "documents"); 
      const querySnapshot = await getDocs(docsCollection);
      
      if (querySnapshot.empty) {
        setError("No documents found.");
        setLoading(false);
        return;
      }

      const docsList = [];
      for (const doc of querySnapshot.docs) {
        const docData = doc.data();
        if (!docData.storagePath) {
          console.error("Missing storagePath for document:", doc.id);
          continue;
        }

        const fileRef = ref(storage, docData.storagePath);
        const fileUrl = await getDownloadURL(fileRef);
        docsList.push({ name: docData.name, url: fileUrl });
      }

      setDocuments(docsList);
    } catch (err) {
      console.error("Error loading documents:", err);
      setError("Failed to load documents. Please check Firebase setup.");
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>📂 My Documents</h2>
        {error && <p className="error-text">{error}</p>}

        <button className="load-btn" onClick={loadDocuments} disabled={loading}>
          {loading ? "Loading..." : "📥 Load My Documents"}
        </button>

        <ul className="document-list">
          {documents.map((doc, index) => (
            <li key={index} className="document-item">
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                📄 {doc.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadDocument;
