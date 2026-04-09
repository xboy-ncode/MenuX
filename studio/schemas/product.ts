// schemas/product.ts

export default {
  name: 'product',
  type: 'document',
  title: 'Productos',
  fields: [
    { 
      name: 'sku', 
      type: 'string', 
      title: 'Código Corto (SKU)', 
      description: 'Código para el inventario en Google Sheets. Ej: HAM-01, PER-02' 
    },
    { name: 'name', type: 'string', title: 'Nombre del Producto' },
    { name: 'price', type: 'number', title: 'Precio' },
    { name: 'image', type: 'image', title: 'Imagen', options: { hotspot: true } },
    { name: 'description', type: 'text', title: 'Ingredientes/Descripción (lo que sale en el desplegable)' },
    { 
      name: 'category', 
      type: 'string', 
      title: 'Categoría', 
      options: { list: ['Hamburguesas', 'Perros', 'Enrollados', 'Ofertas' , 'Bebidas'] } 
    }
  ]
}