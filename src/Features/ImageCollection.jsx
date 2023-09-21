import React, { useState } from 'react';
import './ImageCollection.css'; // Create this CSS file for styling

function ImageCollection({ onImageUpload }) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [nameTag, setNameTag] = useState(''); // Add state for the name tag

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleNameTagChange = (e) => {
    setNameTag(e.target.value); // Update the name tag state
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage, nameTag); // Pass the name tag to onImageUpload
      setSelectedImage(null);
      setNameTag(''); // Clear the name tag input field
    }
  };


  const isUploadDisabled = !nameTag || !selectedImage; // Disable upload if nameTag or selectedImage is empty

  return (
    <div className="image-collection">
      <input type="file" accept="image/*" onChange={handleImageChange} disabled={!nameTag} />
      <input
        type="text"
        placeholder="Enter image name first to upload"
        value={nameTag}
        onChange={handleNameTagChange}
      />
      {selectedImage && (
        <div>
          <img className="image-for-upload" src={selectedImage} alt="Selected" />
          <button onClick={handleUpload} disabled={isUploadDisabled}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default ImageCollection;
