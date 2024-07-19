import React from 'react';

type ModalProps = {
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="modal2">
      <div className="modal2-content">
        {children}
      </div>
      <style jsx>{`
        .modal2 {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
        }
        .modal2-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Modal;
