/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  // Inicializar desde localStorage si existe
  const [carritoItems, setCarritoItems] = useState(() => {
    const savedCarrito = localStorage.getItem("carrito");
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });

  // Estado para mostrar notificación de producto agregado
  const [ultimoProductoAgregado, setUltimoProductoAgregado] = useState(null);

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carritoItems));
  }, [carritoItems]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarritoItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === producto._id);

      if (existingItem) {
        // Si ya existe, incrementar cantidad
        return prevItems.map((item) =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevItems, { ...producto, cantidad: 1 }];
      }
    });

    // Mostrar notificación
    setUltimoProductoAgregado(producto);
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarritoItems((prevItems) =>
      prevItems.filter((item) => item._id !== productoId)
    );
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }

    setCarritoItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productoId ? { ...item, cantidad } : item
      )
    );
  };

  // Limpiar todo el carrito
  const vaciarCarrito = () => {
    setCarritoItems([]);
  };

  // Calcular cantidad total de items
  const obtenerTotalItems = () => {
    return carritoItems.reduce((total, item) => total + item.cantidad, 0);
  };

  // Calcular precio total
  const obtenerPrecioTotal = () => {
    return carritoItems.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };

  // Verificar si un producto está en el carrito
  const estaEnCarrito = (productoId) => {
    return carritoItems.some((item) => item._id === productoId);
  };

  // Obtener cantidad de un producto específico
  const obtenerCantidadItem = (productoId) => {
    const item = carritoItems.find((item) => item._id === productoId);
    return item ? item.cantidad : 0;
  };

  const value = {
    carritoItems,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    obtenerTotalItems,
    obtenerPrecioTotal,
    estaEnCarrito,
    obtenerCantidadItem,
    ultimoProductoAgregado,
    setUltimoProductoAgregado,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};
