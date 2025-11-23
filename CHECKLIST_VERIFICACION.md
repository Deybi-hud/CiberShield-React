# ✅ Checklist de Verificación - CiberShield Frontend

## Antes de Iniciar

### Configuración Inicial
- [ ] Clonar el repositorio
- [ ] Crear archivo `.env.local` con `VITE_API_URL`
- [ ] Ejecutar `npm install`
- [ ] Backend está corriendo en la URL especificada
- [ ] Los usuarios de prueba existen en el backend

### Instalación
```bash
# Verificar que Node.js esté instalado
node --version

# Instalar dependencias
npm install

# Ejecutar desarrollo
npm run dev
```

---

## Configuración del Proyecto

### Variables de Entorno
- [ ] `.env.local` existe en la raíz
- [ ] `VITE_API_URL` está configurada correctamente
- [ ] El archivo está en `.gitignore` (para no commitear datos sensibles)

### Dependencias
- [ ] `npm install` fue ejecutado exitosamente
- [ ] `node_modules/` existe
- [ ] No hay errores en la instalación

### Build
- [ ] `npm run build` compila sin errores
- [ ] `dist/` se crea correctamente
- [ ] `npm run preview` funciona

---

## Autenticación

### Login
- [ ] Página de login carga (`/login`)
- [ ] Formulario tiene campos email y password
- [ ] Botón "Ingresar" funciona
- [ ] Valida email formato
- [ ] Valida password mínimo 4 caracteres
- [ ] Mensajes de error aparecen en caso de error
- [ ] Login exitoso redirige a `/`
- [ ] Token se guarda en localStorage
- [ ] Usuario puede hacer logout

### Registro
- [ ] Página de registro carga (`/registro`)
- [ ] Formulario tiene todos los campos necesarios
- [ ] Validaciones funcionan correctamente
- [ ] Registro exitoso redirige a `/` o `/login`

### Protección de Rutas
- [ ] Usuario no autenticado no puede acceder a `/cliente/*`
- [ ] Usuario no autenticado no puede acceder a `/admin/*`
- [ ] Admin no autenticado es redirigido a `/login`
- [ ] Usuario con rol "cliente" no puede acceder a `/admin/*`
- [ ] Usuario con rol "admin" puede acceder a `/admin/*`

---

## Vistas Cliente

### Perfil (`/cliente/perfil`)
- [ ] Página carga con los datos del usuario
- [ ] Los campos se pueden editar
- [ ] Botón "Editar Perfil" funciona
- [ ] Botón "Guardar Cambios" funciona
- [ ] Cambios se guardan en el backend
- [ ] Mensaje de éxito aparece
- [ ] Botón "Cancelar" descarta cambios
- [ ] Logout funciona desde esta página
- [ ] Redirección al hacer logout es correcta

### Pedidos (`/cliente/pedidos`)
- [ ] Página carga con lista de pedidos
- [ ] Cada pedido muestra: ID, fecha, total, estado
- [ ] Estado tiene el color/badge correcto
- [ ] Botón "Ver Detalle" funciona
- [ ] Botón "Cancelar" aparece solo en pedidos activos
- [ ] Cancelar pedido requiere confirmación
- [ ] Cancelación exitosa actualiza la lista
- [ ] Página vacía muestra mensaje apropiado
- [ ] Sidebar de navegación funciona

---

## Vistas Admin

### Dashboard (`/admin/dashboard`)
- [ ] Página carga correctamente
- [ ] Muestra tarjetas con estadísticas:
  - [ ] Total de usuarios
  - [ ] Total de productos
  - [ ] Total de pedidos
  - [ ] Ventas totales
  - [ ] Pedidos pendientes
  - [ ] Ventas de hoy
  - [ ] Productos sin stock
  - [ ] Ticket promedio
- [ ] Los números son correctos

### Productos (`/admin/productos`)
- [ ] Página carga con tabla de productos
- [ ] Búsqueda funciona por nombre/descripción
- [ ] Botón "Nuevo Producto" abre modal
- [ ] Modal tiene todos los campos:
  - [ ] Nombre
  - [ ] Descripción
  - [ ] Precio
  - [ ] Stock
  - [ ] Categoría
  - [ ] URL de imagen
- [ ] Crear producto funciona
- [ ] Editar producto funciona
- [ ] Eliminar producto funciona
- [ ] Confirmación antes de eliminar
- [ ] Stock muestra badge con color apropiado
- [ ] Errores se muestran correctamente

### Usuarios (`/admin/usuarios`)
- [ ] Página carga con tabla de usuarios
- [ ] Búsqueda funciona por nombre/email
- [ ] Botón "Nuevo Usuario" abre modal
- [ ] Modal tiene campos correctos
- [ ] Crear usuario funciona
- [ ] Editar usuario funciona
- [ ] Eliminar usuario funciona
- [ ] Rol se muestra con badge de color
- [ ] Fecha de registro se formatea correctamente
- [ ] Confirmación antes de eliminar

### Pedidos (`/admin/pedidos`)
- [ ] Página carga con tabla de pedidos
- [ ] Búsqueda funciona por ID o cliente
- [ ] Filtro por estado funciona (Todos, Pendiente, Procesando, etc.)
- [ ] Botón "Cambiar Estado" abre modal
- [ ] Modal muestra cliente, total y estado actual
- [ ] Selector de nuevo estado tiene todas las opciones
- [ ] Cambiar estado funciona
- [ ] Estado se actualiza en la tabla
- [ ] Badges de estado tienen colores correctos
- [ ] Fecha se formatea correctamente

---

## Servicios HTTP

### AuthService
```javascript
✅ AuthService.login(email, password)
✅ AuthService.registrar(datos)
✅ AuthService.logout()
✅ AuthService.refreshToken()
✅ AuthService.isAutenticado()
✅ AuthService.getToken()
✅ AuthService.getUsuarioActual()
```

### ProductosService
```javascript
✅ ProductosService.getAll()
✅ ProductosService.getById(id)
✅ ProductosService.create(datos)      // admin
✅ ProductosService.update(id, datos)  // admin
✅ ProductosService.delete(id)         // admin
```

### PedidoService (Cliente)
```javascript
✅ PedidoService.getAll()
✅ PedidoService.getById(id)
✅ PedidoService.create(datos)
✅ PedidoService.cancel(id)
```

### PerfilService
```javascript
✅ PerfilService.get()
✅ PerfilService.update(datos)
✅ PerfilService.cambiarPassword(actual, nueva)
```

### Admin Services
```javascript
✅ AdminProductoService (CRUD)
✅ AdminUsuarioService (CRUD)
✅ AdminPedidoService (updateStatus)
✅ DashboardService (stats)
```

---

## Interfaz de Usuario

### Diseño y Estilos
- [ ] Colores son consistentes
- [ ] Tema oscuro/claro se ve bien
- [ ] Bootstrap Icons se cargan correctamente
- [ ] Tipografía es legible
- [ ] Espaciado es consistente

### Responsive
- [ ] Desktop (1920px) se ve bien
- [ ] Tablet (768px) se ve bien
- [ ] Mobile (375px) se ve bien
- [ ] No hay scroll horizontal innecesario
- [ ] Elementos se adaptan correctamente

### Formularios
- [ ] Campos tienen placeholder
- [ ] Errores se muestran en rojo
- [ ] Botones tienen estados (normal, hover, disabled)
- [ ] Validaciones funcionan
- [ ] Mensajes de error son claros

### Tablas
- [ ] Encabezados son claros
- [ ] Datos se alinean correctamente
- [ ] Acciones están al final
- [ ] Se puede hacer scroll en mobile
- [ ] Filas tienen hover effect

---

## Manejo de Errores

### Validación
- [ ] Email valida formato
- [ ] Contraseña valida mínimo caracteres
- [ ] Campos requeridos muestran error
- [ ] Errores desaparecen al corregir

### Errores API
- [ ] Error 401 redirige a login
- [ ] Error 403 muestra acceso denegado
- [ ] Error 404 muestra "no encontrado"
- [ ] Error 500 muestra "error del servidor"
- [ ] Errores se muestran en el UI

### Estados
- [ ] Loading muestra spinner/mensaje
- [ ] Empty state muestra mensaje apropiado
- [ ] Success muestra confirmación
- [ ] Error muestra mensaje con detalles

---

## Rendimiento

### Velocidad
- [ ] Página home carga en < 3s
- [ ] Búsqueda es responsiva
- [ ] Modal abre sin lag
- [ ] Transiciones son suaves

### Recursos
- [ ] Imágenes están optimizadas
- [ ] CSS no es demasiado grande
- [ ] JavaScript no es bloqueante
- [ ] No hay memory leaks

---

## Compatibilidad

### Navegadores
- [ ] Chrome/Edge funciona
- [ ] Firefox funciona
- [ ] Safari funciona
- [ ] Mobile browser funciona

### Funcionalidades
- [ ] localStorage funciona
- [ ] Cookies se pueden usar
- [ ] CORS está configurado
- [ ] APIs REST funcionan

---

## Documentación

- [ ] INICIO_RAPIDO.md existe
- [ ] API_SETUP.md existe
- [ ] VISTAS.md existe
- [ ] FRONTEND_SETUP.md existe
- [ ] IMPLEMENTACION_COMPLETA.md existe
- [ ] ESTRUCTURA_PROYECTO.md existe
- [ ] Este checklist existe

---

## Despliegue

### Build
- [ ] `npm run build` funciona
- [ ] `dist/` se crea sin errores
- [ ] No hay warnings en console

### Vercel (si aplica)
- [ ] Proyecto está en GitHub
- [ ] `.env.example` está en el repo (sin datos sensibles)
- [ ] `.env.local` NO está en GitHub
- [ ] Vercel tiene `.env.local` configurado
- [ ] Deployment funciona

---

## Conclusión Final

### ✅ Antes de Dar por Completado

- [ ] Todas las secciones anteriores son cumplidas
- [ ] Nada está roto o sin terminar
- [ ] Documentación es clara y completa
- [ ] Código está bien comentado
- [ ] No hay console.errors
- [ ] Performance es aceptable
- [ ] Código está listo para producción

### 📋 Últimos Pasos

1. [ ] Hacer commit de los cambios
2. [ ] Hacer push a GitHub
3. [ ] Verificar en GitHub que los archivos estén
4. [ ] Probar en Vercel (si aplica)
5. [ ] Compartir con el equipo

---

## 🎉 ¡Listo!

Si todos los checkboxes están marcados, tu frontend está **completamente funcional y listo para usar**.

Para cualquier duda, revisa la documentación:
- Inicio rápido: `INICIO_RAPIDO.md`
- Detalles completos: `IMPLEMENTACION_COMPLETA.md`
