/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import "./AuthModal.css";

export const AuthModal = ({ isOpen, onClose, initialView = "login" }) => {
  const [currentView, setCurrentView] = useState(initialView);

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentView(initialView); // Resetea a la vista inicial cuando se abre el modal
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal-overlay flex items-center justify-center" onClick={handleBackdropClick}>
      <div className="auth-modal-content">
        {currentView === "login" && (
          <LoginForm
            onClose={onClose}
            onSwitchToRegister={() => setCurrentView("register")}
            onSwitchToReset={() => setCurrentView("reset")}
          />
        )}
        {currentView === "register" && (
          <RegisterForm
            onClose={onClose}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        )}
        {currentView === "reset" && (
          <ResetPasswordForm
            onClose={onClose}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        )}
      </div>
    </div>
  );
};
