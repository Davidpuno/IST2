import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileAlt, faFileCsv } from "@fortawesome/free-solid-svg-icons";

const DownloadModal = ({ setShowModal }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Download Report</h3>
      <p>Choose format for your income projection report:</p>
      <div className="modal-buttons">
        <button className="modal-btn pdf" onClick={() => alert('PDF download started')}>
          <FontAwesomeIcon icon={faFilePdf} /> PDF
        </button>
        <button className="modal-btn text" onClick={() => alert('Text file download started')}>
          <FontAwesomeIcon icon={faFileAlt} /> Text
        </button>
        <button className="modal-btn csv" onClick={() => alert('CSV download started')}>
          <FontAwesomeIcon icon={faFileCsv} /> CSV
        </button>
      </div>
      <button className="modal-close" onClick={() => setShowModal(false)}>
        Cancel
      </button>
    </div>
  </div>
);

export default DownloadModal;