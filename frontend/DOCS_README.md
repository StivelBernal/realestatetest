# 📚 Documentación TSDoc - Real Estate Frontend

Este proyecto incluye documentación automática generada a partir de comentarios TSDoc en el código fuente.

## 🚀 Comandos Disponibles

### Generar Documentación
```bash
npm run docs:build
```
Genera la documentación estática en la carpeta `docs/`.

### Servir Documentación
```bash
npm run docs:serve
```
Genera la documentación y la sirve en http://localhost:3002. Se abre automáticamente en el navegador.

### Modo Watch
```bash
npm run docs:watch
```
Regenera la documentación automáticamente cuando se detectan cambios en los archivos.

### Limpiar Documentación
```bash
npm run docs:clean
```
Elimina la carpeta `docs/` generada.

## 📖 Estructura de la Documentación

La documentación está organizada por categorías:

### 🧩 Componentes UI
- **Button**: Botón reutilizable con variantes y estados
- **Input**: Campo de entrada con validación
- **Textarea**: Área de texto multilínea
- **FileInput**: Subida de archivos con drag & drop
- **ViewToggle**: Alternador de vista grilla/mapa
- **LoadingSpinner**: Indicador de carga
- **EmptyState**: Estado vacío con acciones

### 🏗️ Componentes Principales
- **Header**: Navegación principal
- **PropertyCard**: Tarjeta de propiedad
- **FilterForm**: Formulario de filtros

### 📄 Páginas
- **HomePage**: Página principal
- **PropertiesPage**: Listado de propiedades
- **PropertyDetailPage**: Detalle de propiedad
- **CreatePropertyPage**: Formulario de creación

### 🔧 Servicios
- **propertyService**: CRUD de propiedades

### 🛠️ Utilidades
- **formatCurrency**: Formateo de moneda

### 📝 Tipos
- **Property**: Interface de propiedad
- **PropertyFilters**: Filtros de búsqueda
- **CreatePropertyFormData**: Datos de formulario

## 🎯 Características de la Documentación

### Comentarios TSDoc Completos
Cada componente incluye:
- **Descripción detallada** de funcionalidad
- **Parámetros tipados** con explicaciones
- **Ejemplos de uso** prácticos
- **Valores por defecto** documentados
- **Grupos y categorías** para organización

### Ejemplos de Código
```tsx
// Ejemplo de uso del Button
<Button variant="primary" size="lg" isLoading={submitting}>
  Guardar Cambios
</Button>

// Ejemplo de uso del Input con React Hook Form
<Input 
  label="Email" 
  registration={register('email')}
  error={errors.email?.message}
/>
```

### Navegación Inteligente
- **Búsqueda**: Buscar componentes y funciones
- **Categorías**: Navegación por tipo de elemento
- **Enlaces cruzados**: Referencias entre elementos
- **Índice alfabético**: Acceso rápido

## 🔧 Configuración

### TypeDoc (typedoc.json)
```json
{
  "entryPoints": ["src/components", "src/services", "src/utils"],
  "out": "docs",
  "name": "Real Estate Frontend - Documentación",
  "theme": "default",
  "categorizeByGroup": true
}
```

### Estilos Personalizados (docs-styles.css)
- Colores del tema de la aplicación
- Mejoras de legibilidad
- Responsive design
- Highlighting de código

## 📚 Estándares TSDoc

### Tags Principales
- `@param` - Descripción de parámetros
- `@returns` - Descripción del valor de retorno
- `@example` - Ejemplos de uso
- `@group` - Categorización
- `@component` - Marca como componente
- `@page` - Marca como página
- `@service` - Marca como servicio
- `@util` - Marca como utilidad

### Ejemplo de Documentación Completa
```typescript
/**
 * Componente Button reutilizable con múltiples variantes.
 * 
 * @component
 * @group Componentes UI
 * @param props - Props del componente Button
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 * 
 * @returns Elemento JSX del botón
 */
export function Button(props: ButtonProps) {
  // ...
}
```

## 🌐 Acceso a la Documentación

### Desarrollo Local
1. Ejecuta `npm run docs:serve`
2. Abre http://localhost:3002
3. Navega por las categorías y componentes

### Integración Continua
La documentación puede integrarse con:
- **GitHub Pages**: Para hosting público
- **Netlify/Vercel**: Para deploys automáticos
- **Docs Sites**: Como Gitiles o GitBook

## 📈 Beneficios

### Para Desarrolladores
- **Autocompletado inteligente** en IDEs
- **Validación de tipos** en tiempo real
- **Ejemplos integrados** en el código
- **Documentación siempre actualizada**

### Para el Equipo
- **Onboarding rápido** de nuevos miembros
- **Estándares consistentes** de documentación
- **Referencia centralizada** de componentes
- **Mantenimiento simplificado**

### Para el Proyecto
- **Código autodocumentado**
- **Arquitectura transparente**
- **APIs bien definidas**
- **Calidad de código mejorada**

---

💡 **Tip**: La documentación se regenera automáticamente al hacer cambios en los comentarios TSDoc del código fuente.