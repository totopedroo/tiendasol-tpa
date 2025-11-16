import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Header.css";
import { User } from "../icons/User";
import { Bell } from "../icons/Bell";
import { ChevronDown } from "../icons/ChevronDown";
import TiendaSolLogoLink from "../tiendaSolLogo/TiendaSolLogoLink";
import { useCarrito } from "../../context/CarritoContext";
import { Notificaciones } from "../notificaciones/Notificaciones";
import { CarritoNotificacion } from "../carritoNotificacion/CarritoNotificacion";
import SearchBar from "../searchBar/SearchBar";
import { useAuth } from "../../context/AuthContexto.jsx";
import { Button } from "../button/Button";

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    obtenerTotalItems,
    ultimoProductoAgregado,
    setUltimoProductoAgregado,
  } = useCarrito();
  const isLoggedIn = false; // Temporal, más adelante vendrá de contexto o backend
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const notifPanelRef = useRef(null);

  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const userId = user?.id; // o user.id dependiendo del backend
  const nombreUsuario = user?.nombre; // o user.username, user.firstName, etc.

  useEffect(() => {
    const tituloParam = searchParams.get("titulo");
    if (tituloParam) {
      setSearchValue(tituloParam);
    } else {
      setSearchValue("");
    }
  }, [searchParams]);

  const irACheckout = () => {
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }
    navigate("/checkout");
  };

  const irAMisPedidos = () => {
    navigate("/orders");
  };

  const irAMisProductos = () => {
    navigate("/search?vendedor=" + userId);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?titulo=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/search");
    }
  };

  const toggleNotificaciones = () => {
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }
    setMostrarNotificaciones(!mostrarNotificaciones);
  };

  const cerrarNotificaciones = () => {
    setMostrarNotificaciones(false);
  };

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  const cerrarNotifCarrito = () => {
    setUltimoProductoAgregado(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifPanelRef.current &&
        !notifPanelRef.current.contains(event.target)
      ) {
        setMostrarNotificaciones(false);
      }
    };

    if (mostrarNotificaciones) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarNotificaciones]);

  return (
    <div className="header">
      <div className="navbar-content-wrapper flex items-center gap-6">
        <div className="nav-left-section flex items-center gap-4">
          <TiendaSolLogoLink />
          <div className="navigation-menu flex items-center gap-16">
            <Link to={"/search"} className="nav-item">
              Productos
            </Link>
            <Link to={"/categorias"} className="nav-item">
              Categorías
            </Link>
            <Link to={"/ventas"} className="nav-item">
              Vender
            </Link>
            <Link to={"/contacto"} className="nav-item">
              Contacto
            </Link>
          </div>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder="Buscar productos..."
          variant="inline"
          value={searchValue}
          onChange={setSearchValue}
        />

        <div className="buttons flex items-center">
          <div className="notificaciones-wrapper" ref={notifPanelRef}>
            <button
              className="bell-button flex items-center justify-center"
              onClick={toggleNotificaciones}
              aria-label="Notificaciones"
            >
              <Bell />
            </button>
            {mostrarNotificaciones && (
              <Notificaciones userId={userId} onClose={cerrarNotificaciones} />
            )}
          </div>

          <div
            className="primary-button flex items-center"
            onClick={irACheckout}
          >
            <ShoppingCart />
            <div className="contador-de-items flex items-center">
              {obtenerTotalItems()}
            </div>
          </div>

          {isAuthenticated ? (
            <div className="user-menu-wrapper">
              <button
                className="user-menu-button flex items-center gap-2"
                aria-label="Menú de usuario"
              >
                <User className="user-icon-header" />
                <div className="user-info flex flex-col items-start gap-1">
                  <span className="user-name">{nombreUsuario}</span>
                  <span className="user-type">{user?.tipo || "Usuario"}</span>
                </div>
                <ChevronDown className="chevron-icon" />
              </button>
              <div className="user-dropdown-menu">
                <button className="dropdown-menu-item" onClick={irAMisPedidos}>
                  Mis pedidos
                </button>
                <button
                  className="dropdown-menu-item"
                  onClick={irAMisProductos}
                >
                  Mis productos
                </button>
                <button className="dropdown-menu-item" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="medium"
              onClick={() => openAuthModal("login")}
              className="header-login-button"
            >
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>

      {ultimoProductoAgregado && (
        <CarritoNotificacion
          producto={ultimoProductoAgregado}
          onClose={cerrarNotifCarrito}
        />
      )}
    </div>
  );
};
