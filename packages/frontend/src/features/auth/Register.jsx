import React from "react";
import { useNavigate } from "react-router-dom";
import "../../components/authModal/AuthForms.css";
import { RegisterForm } from "../../components/authModal/RegisterForm.jsx";
import { Button } from "../../components/button/Button.jsx";
import { ArrowLeft } from "../../components/icons/ArrowLeft.jsx";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container flex justify-center items-center">
      <Button
        variant="clear"
        size="small"
        icon={<ArrowLeft />}
        iconPosition="left"
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Volver
      </Button>
      <RegisterForm
        onClose={() => {}} // No hace nada en la versión de página
        onSwitchToLogin={() => navigate("/login")}
      />
    </div>
  );
};
