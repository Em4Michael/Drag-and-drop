import React, { useState, useEffect } from 'react';
import './ImageCard.css'; // CSS for the gallery
import ImageCollection from '../../Features/ImageCollection';
import { useAuth } from '../../lib/AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ImagesApi from '../../services/ImagesApi';

function ImageCard() {
  const { isLoggedIn, logout } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define a static array of images and name tags
  const staticImages = [
    { imageUrl: '/images/johnWick.jfif', nameTag: 'John Wick' },
    { imageUrl: '/images/f119c0eaa735883feb5f8d46dffbb431.jfif', nameTag: 'Bat Man' },
    { imageUrl: '/images/55bc9e1a21c68b2b31a33af82b284df6.jfif', nameTag: 'Stranger Things' },
    { imageUrl: '/images/Group 56.png', nameTag: 'Top Gun' },
    // Add more images and name tags as needed
  ]; 

  useEffect(() => {
    try {
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || staticImages; // Use staticImages if local storage is empty
      setImages(savedImages);
    } catch (err) {
      setError('Error loading images.');
    }
  }, []);

/*   useEffect(() => {
    try {
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
      setImages(savedImages);
    } catch (err) {
      setError('Error loading images.');
    }
  }, []); */

  const saveImagesToLocalStorage = (updatedImages) => {
    try {
      localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    } catch (err) {
      setError('Error saving images.');
    }
  };

  const handleImageUpload = (imageUrl, nameTag) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        const nameTagExists = images.some((image) => image.nameTag === nameTag);

        if (!nameTagExists) {
          const updatedImages = [...images, { imageUrl, nameTag }];
          setImages(updatedImages);
          saveImagesToLocalStorage(updatedImages);
        } else {
          setError(`Image with name "${nameTag}" already exists.`);
        }
      } catch (err) {
        setError('Error uploading image.');
      } finally {
        setLoading(false);
      }
    }, 500);
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
  const { data, loadingImage, errorImage, movies, top10, all, genres } = ImagesApi();

  if (loadingImage) {
    return <div className="loader-container">
    <div className="circular-loader"></div>
  </div>
  }

  if (errorImage) {
    return<div className="error-container">
    <p>Error: {errorImage.message}</p>
</div>;
  }

  if (!data) {
    return <p>No data available.</p>;
  }


  return (
    <div className="image-gallery-view">
      <div className="image-gallery">
        <ImageCollection onImageUpload={handleImageUpload} />
      </div>
      {loading && (
        <div className="loader-container">
          <div className="circular-loader"></div>
        </div>
      )}
      {error && (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      )}
       
      {isLoggedIn ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="image-gallery">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="full-view-container"
              >
                {images.map((image, index) => (
                  <Draggable key={index} draggableId={`image-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`image-gallery-item ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                         <img src={image.imageUrl} alt={`Image ${index}`} />
                        {/*  <img src={`${process.env.PUBLIC_URL}${image.imageUrl}`} alt={`Image ${index}`} /> 
 */}
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
        <div className="full-view-container">
        <p>Please you have to be logged in to use the Drag and Drop feature and to delete images</p>
        <div className="full-view-container">
          
           {images.map((image, index) => (
            <div
              className="image-gallery-item"
              key={index}
            >
              <img src={image.imageUrl} alt={`Image ${index}`} />
              <div className="name-tag">{image.nameTag}</div>
            </div>
          ))}
          {images.map((image, index) => (
            <div
              className="image-gallery-item"
            >
              <img src={image.imageUrl} alt={`Image ${index}`} />
              <div className="name-tag">{image.nameTag}</div>
            </div>
          ))}
         
        </div>
        </div>
      )}
    </div>
  );
}

export default ImageCard;
