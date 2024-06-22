import React, { useState } from 'react';
import axios from 'axios';
import { CloudUploadIcon } from '@heroicons/react/outline';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');

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

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-white">
      <div
        className="flex flex-col justify-center items-center w-11/12 max-w-lg p-10 border-4 border-dashed border-blue-500 rounded-xl bg-white shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
        {message && <p className="mt-4 text-red-500">{message}</p>}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
