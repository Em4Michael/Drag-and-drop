import React, { useState, useEffect } from 'react';
import './ImageCard.css'; // CSS for the gallery
import ImageCollection from '../../Features/ImageCollection';
import { useAuth } from '../../lib/AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ImageCard() {
  const { isLoggedIn, logout } = useAuth();
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Load images from local storage on component mount
  useEffect(() => {
    try {
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
      setImages(savedImages);
    } catch (err) {
      setError('Error loading images.'); // Handle errors during loading
    }
  }, []);

  const saveImagesToLocalStorage = (updatedImages) => {
    try {
      localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    } catch (err) {
      setError('Error saving images.'); // Handle errors during saving
    }
  };

  const handleImageUpload = (imageUrl, nameTag) => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous error

    // Simulate an API call or perform image upload here
    // For the sake of example, we'll simulate a delay
    setTimeout(() => {
      try {
        // Check if the nameTag already exists in the images array
        const nameTagExists = images.some((image) => image.nameTag === nameTag);

        if (!nameTagExists) {
          const updatedImages = [...images, { imageUrl, nameTag }];
          setImages(updatedImages);
          saveImagesToLocalStorage(updatedImages);
        } else {
          setError(`Image with name "${nameTag}" already exists.`);
        }
      } catch (err) {
        setError('Error uploading image.'); // Handle errors during upload
      } finally {
        setLoading(false); // Set loading state to false after upload
      }
    }, 500); // Simulated 2 seconds delay, replace with actual upload logic
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    saveImagesToLocalStorage(updatedImages);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);
    setImages(updatedImages);
    saveImagesToLocalStorage(updatedImages);
  };

  const filteredImages = images.filter((image) =>
    image.nameTag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="image-gallery">
        <ImageCollection onImageUpload={handleImageUpload} />
        <input
          type="text"
          placeholder="Search by name/tag"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading && (
        <div className="loader-container">
          <div className="circular-loader"></div>
        </div>
      )}
      {error && (
        <div className="error-container">
          <p>Error: {error.message}</p>
        </div>
      )}
      {isLoggedIn ? ( // Render drag-and-drop components if user is logged in
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="image-gallery">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="image-container"
              >
                {filteredImages.map((image, index) => (
                  <Draggable
                    key={index}
                    draggableId={`image-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`image-gallery-item ${snapshot.isDragging ? 'dragging' : ''
                          }`}
                      >
                        <img src={image.imageUrl} alt={`Image ${index}`} />
                        <div className="name-tag">{image.nameTag}</div>
                        <button
                          className="delete-button"
                          onClick={() => deleteImage(index)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (

        <div className="image-container">
          {filteredImages.map((image, index) => (
            <div
              className="image-gallery-item"
            >
              <img src={image.imageUrl} alt={`Image ${index}`} />
              <div className="name-tag">{image.nameTag}</div>

            </div>

          ))}
          <p>Please login to use Drag and Drop function and to delete images</p>
        </div>
      )}
    </>
  );
}

export default ImageCard;
