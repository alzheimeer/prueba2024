export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
  }
  
  export interface Inventario {
    id: string;
    nombre_de_usuario: string;
    producto: string;
    nombre_producto: string;
    numero_serie: string;
    fecha_ingreso: string;
    entregado: boolean;
  }