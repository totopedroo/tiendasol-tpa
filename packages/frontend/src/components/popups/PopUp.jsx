import React from "react";
import "./PopUp.css";

const Popup = ({ title, mensaje, onClose, isOpen }) => {
    if (!isOpen) return null; // si no esta, no renderizamos

    return (
    <div className="popup-overlay">
      <div className="popup-contenido">
        <title>{title}</title>
        <p>{mensaje}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
    );
};

export default Popup;