import { Producto } from "../../models/entities/producto.js";
import { MONEDA } from "../../models/entities/moneda.js";
import { TIPO_USUARIO } from "../../models/entities/tipoUsuario.js";
import { Usuario } from "../../models/entities/usuario.js";
import { NegativeValueError } from "../../error/appError.js"; 

const usuario = new Usuario("1","Juan","juani@gmail.com","+54 9 13 6587-9124",TIPO_USUARIO.VENDEDOR,"2025-09-10");

  test("No se deben poder instanciar productos con precio negativo", () => {
    expect(() => new Producto(usuario,"Shampoo","Anticaida y previene caspa",-1,MONEDA.PESO_ARG,true)).toThrow(NegativeValueError);
  });

  test("No se puede pedir una cantidad mayor del stock provisto del producto", () => {
    const prod = new Producto(usuario,"Shampoo","Anticaida y previene caspa",100,MONEDA.PESO_ARG,true)
    prod.aumentarStock(5)
    expect(prod.estaDisponible(6)).toBeFalsy()
  })
