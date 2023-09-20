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
      { id: 1, src: '/img19.png', tag: 'White' },
      { id: 2, src: '/img18.png', tag: 'Green' },
      { id: 3, src: '/img21.png', tag: 'Red' },
      { id: 14, src: '/img9.png', tag: 'G' },
      { id: 5, src: '/img10.png', tag: 'Orange' },
      { id: 6, src: '/img11.png', tag: 'Yellow' },
      { id: 7, src: '/img1.png', tag: 'Ballon' },
      { id: 8, src: '/img14.png', tag: 'Cream' },
      { id: 9, src: '/img19.png', tag: 'Beauty' },
      { id: 10, src: '/img17.png', tag: 'Prety' },
      { id: 11, src: '/img16.png', tag: 'Ren' },
      { id: 12, src: '/img13.png', tag: 'Fabby' },
      { id: 13, src: '/img8.png', tag: 'Staninless' },
      
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
      )}
    </div>
  );
};

const Apps = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ImageGallery />
    </DndProvider>
  );
};

export default Apps;
