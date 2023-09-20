import React, { useState, useEffect, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableImage = ({ image, index, onDragStart, onDrop }) => {
  const [, ref] = useDrag({
    type: 'IMAGE',
    item: { image, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onDrop(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        ref(node);
        drop(node);
      }}
      onDragStart={() => onDragStart(image)}
      draggable
      className="image-card"
      data-id={image.id}
    >
      <img src={image.src} alt={image.tag} />
      <span className="tag">{image.tag}</span>
    </div>
  );
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDragStart = (image) => {
    console.log('Drag start:', image);
  };

  const handleDrop = (dragIndex, dropIndex) => {
    const updatedImages = [...images];
    const draggedImage = updatedImages[dragIndex];

    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(dropIndex, 0, draggedImage);

    setImages(updatedImages);
  };

  useEffect(() => {
    const dummyImages = [
      { id: 1, src: '/logo192.png', tag: 'Nature' },
      { id: 2, src: 'https://via.placeholder.com/150', tag: 'City' },
      // Add more images as needed
    ];

    setTimeout(() => {
      setImages(dummyImages);
      setLoading(false);
    }, 2000); // Simulating 2 seconds delay
  }, []);

  const filteredImages = useMemo(
    () =>
      images.filter((image) =>
        image.tag.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [images, searchTerm]
  );

  return (
    <div className='images'>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="image-grid">
            {filteredImages.map((image, index) => (
              <DraggableImage
                key={image.id}
                image={image}
                index={index}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </DndProvider>
      )}
    </div>
  );
};

export default ImageGallery;
