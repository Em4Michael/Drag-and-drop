import React, { useState, useEffect } from 'react';
import './ImageCard.css'; // CSS for the gallery
import ImageCollection from '../../Features/ImageCollection';

function ImageCard() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Load images from local storage on component mount
  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    setImages(savedImages);
  }, []);

  const saveImagesToLocalStorage = (updatedImages) => {
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  };

  const handleImageUpload = (imageUrl, nameTag) => {
    // Check if the nameTag already exists in the images array
    const nameTagExists = images.some((image) => image.nameTag === nameTag);
  
    if (!nameTagExists) {
      const updatedImages = [...images, { imageUrl, nameTag }];
      setImages(updatedImages);
      saveImagesToLocalStorage(updatedImages);
    } else {
      // Handle the case where the nameTag already exists (e.g., show an error message)
      console.error(`Image with name "${nameTag}" already exists.`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.nameTag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
    setDraggingIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('index'));

    if (dragIndex !== index) {
      const updatedImages = [...images];
      const [draggedImage] = updatedImages.splice(dragIndex, 1);
      updatedImages.splice(index, 0, draggedImage);
      setImages(updatedImages);
      saveImagesToLocalStorage(updatedImages);
    }
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    saveImagesToLocalStorage(updatedImages);
  };

  return (
    <div className="image-gallery">
      <ImageCollection onImageUpload={handleImageUpload} />
      <input
        type="text"
        placeholder="Search by name/tag"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredImages.map((image, index) => (
        <div
          key={index}
          className="image-gallery-item"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            opacity: draggingIndex === index ? 0.7 : 1,
            border: draggingIndex === index ? '2px dashed gray' : 'none',
          }}
        >
          <img src={image.imageUrl} alt={`Image ${index}`} />
          <div className="name-tag">{image.nameTag}</div>
          <button onClick={() => handleDeleteImage(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ImageCard;
