import React from "react";
import "./PopUpOpciones.css";

const PopUpOpciones = ({
    title,
    mensaje,
    isOpen,
    onClose,
    onConfirm,
    confirmText = "Confirmar",
    cancelText = "Volver",
}) => {
    if (!isOpen) return null; // si no está, no renderizamos

    return (
        <div className="popup-overlay">
            <div className="popup-contenido">
                <h2>{title}</h2>
                <p>{mensaje}</p>

                <div className="popup-buttons" style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                    <button className="btn-cancel" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUpOpciones;