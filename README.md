# Artesanías Únicas - E-commerce

Un e-commerce completo desarrollado con HTML, CSS y JavaScript para la venta de productos artesanales únicos.

## 🎯 Características Principales

- **Diseño Minimalista**: Colores grises y diseño limpio
- **Carrito de Compras Funcional**: Agregar, eliminar y modificar cantidades
- **Catálogo de Productos**: Sistema completo con filtros y búsqueda
- **Responsive Design**: Compatible con móviles y tablets
- **Contador de Visitas**: Funcionalidad para trackear visitas
- **Formulario de Contacto**: Sistema de contacto funcional
- **LocalStorage**: Persistencia de datos del carrito

## 📁 Estructura del Proyecto

```
ultimoentregable/
├── css/
│   └── styles.css          # Estilos CSS principales
├── js/
│   ├── products.js         # Gestión de productos
│   ├── cart.js            # Funcionalidad del carrito
│   └── main.js            # Funciones principales
├── pages/
│   ├── productos.html      # Catálogo de productos
│   ├── carrito.html       # Carrito de compras
│   ├── acerca.html        # Información de la empresa
│   └── contacto.html      # Página de contacto
├── images/                 # Imágenes de productos
│   ├── bolso1.jpg
│   ├── mochila1.jpg
│   ├── sombrero1.jpg
│   └── ...
├── index.html             # Página principal
└── README.md             # Este archivo
```

## 🛍️ Productos Disponibles

### Categorías:
- **Bolsos Artesanales**: 3 modelos únicos
- **Mochilas Tradicionales**: 3 diseños diferentes  
- **Sombreros Únicos**: 4 estilos diversos

### Características de Productos:
- Precios en pesos colombianos (COP)
- Imágenes de alta calidad
- Descripciones detalladas
- Sistema de filtrado por categoría

## 🛒 Funcionalidades del Carrito

- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Cálculo automático de subtotal
- Envío gratis para compras > $100,000
- Persistencia con LocalStorage
- Proceso de checkout simulado

## 🎨 Diseño y Estilo

- **Colores Principales**: Escala de grises minimalista
- **Tipografía**: Arial para máxima legibilidad
- **Framework**: Bootstrap 5.3.0 para responsividad
- **Efectos**: Transiciones suaves y hover effects
- **Componentes**: Cards, modales y navegación sticky

## 📱 Responsividad

El sitio es completamente responsive y se adapta a:
- Escritorio (1200px+)
- Tablets (768px - 1199px)
- Móviles (< 768px)

## 🚀 Instalación y Uso

1. **Clonar o descargar** el proyecto
2. **Ubicar** los archivos en tu servidor web (ej: XAMPP)
3. **Acceder** a `http://localhost/ultimoentregable/`
4. **Navegar** por las diferentes secciones

### Requisitos:
- Servidor web local (XAMPP, WAMP, LAMP)
- Navegador web moderno
- JavaScript habilitado

## 📊 Funcionalidades Avanzadas

### Contadores:
- **Contador de Visitas**: Incrementa automáticamente
- **Contador de Productos**: Muestra total de productos disponibles
- **Contador del Carrito**: Items en el carrito en tiempo real

### Búsqueda y Filtros:
- Búsqueda por nombre y descripción
- Filtros por categoría
- Visualización dinámica de resultados

### Almacenamiento:
- **LocalStorage** para el carrito de compras
- **LocalStorage** para contador de visitas
- Persistencia entre sesiones

## 🎯 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos y animaciones
- **JavaScript ES6+**: Funcionalidad interactiva
- **Bootstrap 5**: Framework CSS
- **LocalStorage API**: Persistencia de datos

## 📧 Páginas Incluidas

1. **Inicio** (`index.html`): Landing page con productos destacados
2. **Productos** (`productos.html`): Catálogo completo con filtros
3. **Carrito** (`carrito.html`): Gestión de compras
4. **Acerca de** (`acerca.html`): Información de la empresa
5. **Contacto** (`contacto.html`): Formulario y datos de contacto

## 🔧 Personalización

Para personalizar el sitio:

1. **Productos**: Editar array en `js/products.js`
2. **Estilos**: Modificar variables CSS en `css/styles.css`
3. **Colores**: Cambiar las variables `--primary-color`, `--secondary-color`, etc.
4. **Imágenes**: Reemplazar archivos en carpeta `images/`

## 📈 Próximas Mejoras

- [ ] Sistema de usuarios y login
- [ ] Integración con pasarelas de pago
- [ ] Sistema de reviews y calificaciones
- [ ] Panel de administración
- [ ] Base de datos backend
- [ ] API REST para productos

## 📞 Soporte

Para soporte técnico o consultas:
- Email: info@artesaniasunicas.com
- Teléfono: +57 (1) 234-5678
- WhatsApp: +57 300 123 4567

---

**Artesanías Únicas** - Conectando artesanos con el mundo 🌎
