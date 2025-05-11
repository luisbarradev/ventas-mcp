# MCP para PCFactory

Este proyecto es una implementación de un **MCP (Model Context Protocol)** para interactuar con **PCFactory**, una tienda de productos electrónicos. El objetivo es proporcionar a los usuarios la posibilidad de:

- Buscar productos
- Crear un carrito de compras
- Generar un enlace de pago (solo para pruebas, no oficial)


## Tecnologías utilizadas

- **MCP (Model Context Protocol)**: Protocolo para gestionar interacciones y estado entre el cliente y el servidor de forma organizada.
- **PCFactory API**: Para obtener información de productos, detalles, etc.
- **Flow.cl Sandbox**: Para generar enlaces de pago de prueba.
- **Node.js**: Entorno de ejecución de JavaScript.
- **Axios**: Cliente HTTP para realizar solicitudes a la API de PCFactory.
- **Zod**: Para validación de datos y esquemas en las herramientas.

## Herramientas Implementadas

### 1. **Generador de ID de sesión**
   - Esta herramienta genera un **ID de sesión único** al inicio del proceso. Este ID es esencial para rastrear y mantener el estado del carrito durante la sesión del usuario.  
   - **Responsabilidad**: Garantizar que todas las demás herramientas trabajen con un ID de sesión consistente.

### 2. **Buscar productos**
   - Permite a los usuarios buscar productos en **PCFactory** por nombre, categoría, descripción, etc., con la posibilidad de aplicar filtros de precio y paginación.
   - **Responsabilidad**: Realizar búsquedas en la base de datos de productos de PCFactory.

### 3. **Agregar productos al carrito**
   - Los usuarios pueden agregar productos a su carrito utilizando el **ID de sesión único** generado por la herramienta inicial.
   - **Responsabilidad**: Asegurar que el carrito esté correctamente actualizado con los productos seleccionados.

### 4. **Generar enlace de pago**
   - Genera un enlace de pago utilizando el **Sandbox de Flow.cl**. Esta funcionalidad es solo para fines educativos y no debe usarse en producción.
   - **Responsabilidad**: Crear un enlace de pago para que los usuarios puedan simular una transacción.

## Variables de entorno
```
FLOW_API_KEY=tu-api-key
FLOW_SECRET_KEY=tu-secret-key
FLOW_API_URL=https://api.flow.cl
```
