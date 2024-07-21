import React from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

function Modal({ children, onClose }) {
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <HiXMark />
        </button>

        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
