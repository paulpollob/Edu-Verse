import React, { useState } from 'react';

function Temp() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append("name", "radhe")
    formData.append("name2", "radhe")

    try {
      const response = await fetch('http://localhost:5000/storeFile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("HK: ", data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Temp;
