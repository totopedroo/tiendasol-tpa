/// <reference types="cypress" />

describe("Flujo de visualización y búsqueda de productos", () => {
  const API = "http://localhost:8000/productos";

  beforeEach(() => {
    cy.visit("http://localhost:3000/search");
  });

  // 1. CARGA INICIAL
  it("Carga inicial de productos (sin filtros)", () => {
    cy.intercept("GET", `${API}*`).as("getProductos");

    cy.wait("@getProductos")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);

    cy.get(".resultados .item").should("exist");
  });

  // 2. BUSCADOR
  it("Realiza una búsqueda desde el buscador", () => {
    cy.intercept("GET", `${API}*titulo=teclado*`).as("buscarTeclado");

    cy.get(".search-results-container input.input-search")
      .first()
      .clear()
      .type("teclado{enter}");

    cy.wait("@buscarTeclado")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);

    cy.get(".resultados .item").should("exist");
    cy.contains(/teclado/i).should("exist");
  });

  // 3. FILTRO POR CATEGORÍA
  it("Filtros: cambia categoría", () => {
    cy.intercept("GET", `${API}*categoria=*`).as("filtrarCategoria");

    cy.get("select[name='categoria']").select(1);

    cy.contains("Aplicar filtros").click();

    cy.wait("@filtrarCategoria")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);

    cy.get(".resultados .item").should("exist");
  });

  // 4. FILTRO POR PRECIO
  it("Filtros: precio mínimo y máximo", () => {
    cy.intercept("GET", `${API}*precioMin=*precioMax=*`).as("filtrarPrecio");

    cy.get("input[name='precioMin']").clear().type("1000");
    cy.get("input[name='precioMax']").clear().type("5000");

    cy.contains("Aplicar filtros").click();

    cy.wait("@filtrarPrecio")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);

    cy.get(".resultados .item").should("exist");
  });

  // 5. SIN RESULTADOS (usamos comportamiento real, sin intercept)
  it("Muestra mensaje de no resultados", () => {
    cy.get(".search-results-container input.input-search")
      .first()
      .clear()
      .type("xxxyyyzzz{enter}");

    // Cypress va reintentando hasta que aparezca el mensaje
    cy.contains("No se encontraron productos").should("exist");
  });

  // 6. PAGINACIÓN
  it("Página siguiente en paginación", () => {
    cy.intercept("GET", `${API}*page=1*`).as("page1");
    cy.intercept("GET", `${API}*page=2*`).as("page2");

    cy.wait("@page1");

    cy.get(".paginacion .arrow").last().click();

    cy.wait("@page2")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);

    cy.get(".resultados .item").should("exist");
  });

  // 7. NAVEGACIÓN DESDE HOME
  it("Navega desde el Home a Productos", () => {
    cy.visit("http://localhost:3000");

    cy.get("input.input-search")
      .first()
      .type("mouse{enter}");

    cy.url().should("include", "/search");
    cy.get(".resultados .item").should("exist");
  });

  // 8. NAVEGA APRETANDO UNA CATEGORÍA
  it("Navega desde el Home seleccionando una categoría", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-testid='category-card']", { timeout: 8000 })
      .first()
      .click();

    cy.url().should("include", "/search?categoria=");
    cy.get(".resultados .item", { timeout: 8000 }).should("exist");
  });

  // 9. VER DETALLE DE PRODUCTO
  it("Al hacer clic en un producto se abre la vista de detalle", () => {
    cy.intercept("GET", `${API}*`).as("listado");
    cy.wait("@listado");

    cy.get(".resultados .item").first().click();

    cy.url().should("include", "/products/");
    cy.get(".item-detail", { timeout: 8000 }).should("exist");
  });

  // 10. BOTÓN AGREGAR AL CARRITO EXISTE
it("El botón 'Agregar al carrito' está disponible", () => {
  cy.intercept("GET", `${API}*`).as("listado");
  cy.wait("@listado");

  // intercept del detalle
  cy.intercept("GET", `${API}/*`).as("detalle");

  // Abrir producto
  cy.get(".resultados .item").first().click({ force: true });

  // Esperar detalle
  cy.wait("@detalle");

  // Estamos en detalle
  cy.url().should("include", "/products/");
  cy.get(".item-detail", { timeout: 8000 }).should("exist");

  // Validar que el botón existe
  cy.contains("Agregar al carrito").should("exist");
});
});