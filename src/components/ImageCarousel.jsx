import { useState } from 'react'
import { IconChevronLeftOutline24, IconChevronRightOutline24 } from 'nucleo-core-outline-24'

export default function ImageCarousel({ images, articleId }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (!images || images.length === 0) return null

  return (
    <div className="image-carousel">
      <div className="image-carousel-container">
        <img 
          src={`/news-images/${articleId}/${images[currentIndex].src}`}
          alt={images[currentIndex].alt || ''}
          className="image-carousel-image"
        />
        
        {images.length > 1 && (
          <>
            <button 
              className="image-carousel-btn image-carousel-btn--prev"
              onClick={goToPrevious}
              aria-label="上一张"
            >
              <IconChevronLeftOutline24 size={14} />
            </button>
            <button 
              className="image-carousel-btn image-carousel-btn--next"
              onClick={goToNext}
              aria-label="下一张"
            >
              <IconChevronRightOutline24 size={14} />
            </button>
            
            <div className="image-carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`image-carousel-indicator${index === currentIndex ? ' active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`第 ${index + 1} 张`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {images[currentIndex].caption && (
        <p className="image-carousel-caption">{images[currentIndex].caption}</p>
      )}
    </div>
  )
}
