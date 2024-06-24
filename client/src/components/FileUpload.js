import React, { useState } from 'react';
import axios from 'axios';
import { CloudUploadIcon, ClipboardCopyIcon } from '@heroicons/react/outline';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleUpload(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    handleUpload(droppedFile);
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true);
      setMessage('');

      const res = await axios.post('https://publiclinkserver.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileUrl(res.data.url);
      setMessage('File uploaded successfully.');
    } catch (err) {
      console.error('Upload Error:', err);
      setMessage('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(fileUrl).then(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    }).catch(err => {
      console.error('Failed to copy:', err);
      setMessage('Failed to copy link.');
    });
  };

  return (
    <div className="relative h-screen flex justify-center items-center">
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          className="w-11/12 max-w-lg p-10 border-4 border-dashed border-blue-500 rounded-xl shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            background: 'rgba(255, 255, 255, 0.3)', // Adjusted to 30% transparent background
            backdropFilter: 'blur(10px)', // Optional: blur effect for better visibility
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CloudUploadIcon className="h-20 w-20 text-blue-500 mb-4 animate-bounce" />
          <h1 className="text-2xl font-semibold mb-4">Upload a File</h1>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            {uploading ? 'Uploading...' : 'Click or Drag a file to upload'}
          </label>
          {fileUrl && (
            <div className="mt-4 w-full break-words">
              <h2 className="text-xl font-medium">Uploaded File</h2>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline break-all hover:text-blue-600 transition-all duration-300 ease-in-out"
              >
                {fileUrl}
                
              </a>
              <ClipboardCopyIcon 
                className="h-6 w-6 text-gray-500 cursor-pointer mt-2 hover:text-gray-700 transition-all duration-300 ease-in-out"
                onClick={handleCopyToClipboard}
              />
            </div>
          )}
        </div>
        {showPopup && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 p-2 bg-green-500 text-white rounded-lg shadow-lg">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

