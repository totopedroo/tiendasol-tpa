import React from "react";
import { useNavigate } from "react-router-dom";
import "../../components/authModal/AuthForms.css";
import { ArrowLeft } from "../../components/icons/ArrowLeft.jsx";
import { Button } from "../../components/button/Button.jsx";
import { LoginForm } from "../../components/authModal/LoginForm.jsx";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container flex justify-center items-center">
      {/* Botón de volver atrás */}
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

      <LoginForm
        onClose={() => {}} 
        onSwitchToRegister={() => navigate("/register")}
        onSwitchToReset={() => navigate("/reset-password")}
      />
    </div>
  );
};
