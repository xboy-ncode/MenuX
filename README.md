# 🔥 MenuX - Perros y Hamburguesas Premium

Sistema de menú digital interactivo construido con **Astro**, **React** y **Sanity CMS**. Diseñado para ser rápido, visualmente impactante y fácil de gestionar.

## 🚀 Tecnologías

- **Frontend:** Astro 5, React 19, Tailwind CSS 4.
- **CMS:** Sanity.io (para gestión de productos, precios e imágenes).
- **Estado:** Nanostores (carrito de compras ligero).
- **Integración:** Webhook para procesamiento de pedidos (Make.com).

## 🛠️ Configuración Local

1.  **Clonar el repo:**
    ```bash
    git clone https://github.com/tu-usuario/menux.git
    cd menux
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    cd studio && npm install
    ```

3.  **Variables de Entorno:**
    Crea un archivo `.env` en la raíz basado en `.env.example` y rellena los valores de Sanity y tu Webhook.

4.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

## 📦 Despliegue en Vercel

1.  Conecta tu repositorio de GitHub a Vercel.
2.  Configura las **Environment Variables** en el panel de Vercel (copia los valores de tu `.env`).
3.  Vercel detectará Astro automáticamente. ¡Y listo!

## 📄 Licencia

Este proyecto es de uso privado para **Perros y Hamburguesas Premium**.
