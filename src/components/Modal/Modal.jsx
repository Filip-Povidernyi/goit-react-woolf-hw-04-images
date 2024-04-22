import modalStyles from './style.module.css';
import { useEffect } from 'react';

export const Modal = ({ isOpen, imageUrl, closeModal }) => {

  useEffect(() => {
    
    const handleKeyUp = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    document.body.style.overflow = 'hidden';
    
    return (() => {
      
      window.removeEventListener('keyup', handleKeyUp);
      document.body.style.overflow = '';

    })

  }, [closeModal])

  const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };
  
    return (
      <div
            className={isOpen ? modalStyles.overlay : modalStyles.hidden}
        onClick={handleOverlayClick}
      >
        <div className={modalStyles.modal}>
          <img src={imageUrl} alt="Large" />
        </div>
      </div>
    );
  }
