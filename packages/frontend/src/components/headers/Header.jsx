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

  // TODO: Reemplazar con el ID real del usuario cuando se implemente sesiones
  const userId = "68fff891aa45f11100c074e1"; // Placeholder
  const nombreUsuario = "Usuario"; // Placeholder - reemplazar con nombre real

  useEffect(() => {
    const tituloParam = searchParams.get("titulo");
    if (tituloParam) {
      setSearchValue(tituloParam);
    } else {
      setSearchValue("");
    }
  }, [searchParams]);

  const irACheckout = () => {
    navigate("/checkout");
  };

  const irAMisPedidos = () => {
    navigate("/users/" + userId); // Temporal, más adelante vendrá de contexto o backend :id
    // if (isLoggedIn) {
    //   navigate("/users/" + userId); // Temporal, más adelante vendrá de contexto o backend :id
    // } else {
    //   navigate("/login");
    // }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?titulo=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/search");
    }
  };

  const toggleNotificaciones = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
  };

  const cerrarNotificaciones = () => {
    setMostrarNotificaciones(false);
  };

  const cerrarSesion = () => {
    // TODO: Implementar lógica de cerrar sesión
    navigate("/login");
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
      <div className="navbar-content-wrapper">
        <div className="nav-left-section">
          <TiendaSolLogoLink />
          <div className="navigation-menu flex-row-center">
            <Link to={"/search"} className="nav-item flex-row-center">
              Productos
            </Link>
            <Link to={"/categorias"} className="nav-item flex-row-center">
              Categorías
            </Link>
            <Link to={"/ventas"} className="nav-item flex-row-center">
              Vender
            </Link>
            <Link to={"/contacto"} className="nav-item flex-row-center">
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
              className="bell-button"
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

          <div className="user-menu-wrapper">
            <button className="user-menu-button" aria-label="Menú de usuario">
              <User className="user-icon-header" />
              <span className="user-name">{nombreUsuario}</span>
              <ChevronDown className="chevron-icon" />
            </button>
            <div className="user-dropdown-menu">
              <button className="dropdown-menu-item" onClick={irAMisPedidos}>
                Mis pedidos
              </button>
              <button className="dropdown-menu-item" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </div>
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
