import React from 'react';
import { useParams } from 'react-router-dom';

function ImageDisplay() {
  // Use useParams to get the image ID from the URL
  const { imageId } = useParams();

  // Fetch the image details based on the ID or use your own logic
  // You can use the `imageId` to fetch the specific image details from your data
  const image = {
    id: imageId,
    imageUrl: 'image-url-here',
    nameTag: 'Image Name',
    // other image details
  };

  return (
    <div className="image-page">
      <h2>Image Details</h2>
      <img src={image.imageUrl} alt={`Image ${image.id}`} />
      <div className="name-tag">{image.nameTag}</div>
      {/* Add other image details here */}
    </div>
  );
}

export default ImageDisplay;
