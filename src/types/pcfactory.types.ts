export interface PCFactoryProduct {
  content: Content;
}

export interface Content {
  items: Item[];
  pageable: Pageable;
}

export interface Item {
  id: number;
  nombre: string;
  marca: string;
  categoria: Categoria;
  stock: string;
  thumbnail: string;
  precio: Precio;
  slug: string;
  digital: boolean;
  outlet: boolean;
}

export interface Categoria {
  id: number;
  nombre: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: any;
}

export interface Precio {
  efectivo: number;
  normal: number;
  referencia: number;
  bancoEstado: number;
  promocion: boolean;
}

export interface Pageable {
  totalElements: number;
  totalPages: number;
  pageElements: number;
  pageNumber: number;
  pageSize: number;
}

export interface Root {
  id: number;
  nombre: string;
  codigo: string;
  partNumber: string;
  slug: string;
  digital: boolean;
  marca: Marca;
  categoria: Categoria;
  descripcion: string;
  stock: Stock;
  especificaciones: Especificacione[];
  banners: any[];
  despacho: boolean;
  retiro: boolean;
  garantia: Garantia;
  meta: Meta;
  ocular: boolean;
}

export interface Marca {
  id: number;
  nombre: string;
}

export interface Stock {
  aproximado: string;
}

export interface Especificacione {
  id: number;
  grupo: string;
  detalle: Detalle[];
}

export interface Detalle {
  id: number;
  nombre: string;
  valor: string;
}

export interface Garantia {
  id: number;
  acuerdo: string;
  mesesDuracion: number;
  marcaProveedor: string;
  plazo: Plazo;
}

export interface Plazo {
  id: number;
  descripcion: string;
  texto: string;
  condiciones: string;
}

export interface Meta {
  title: string;
  description: string;
}
