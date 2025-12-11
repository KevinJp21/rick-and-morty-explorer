# Rick and Morty Explorer

![demo](https://github.com/KevinJp21/rick-and-morty-explorer/blob/c7cb2cb4e9dad69b9a4bcb01881ec902c027511f/public/demo.png)

Aplicación React + TypeScript + Vite que permite explorar personajes de la API de Rick and Morty con búsqueda, paginación y detalle en modal.

---

## Tabla de contenido

* Demo
* Stack y dependencias
* Funcionalidades
* Arquitectura y organización
* Ejecución y scripts
* Decisiones clave
* Tests implementados

---

## Demo

* Búsqueda por nombre y paginación sobre los resultados.
* Modal con detalles y episodios de cada personaje.
* Manejo de estados de carga, error y “sin resultados”.

URL de ejemplo para filtrar y paginar:
`http://localhost:5173/?page=2&search=Rick`

---

## Stack y dependencias

* React 18 + TypeScript
* Vite (desarrollo y build)
* react-router-dom (manejo de query params para paginación y búsqueda)
* Axios (HTTP) mediante helper `http.ts`
* Tailwind CSS (estilos utilitarios)
* Icons: lucide-react

---

## Funcionalidades

* **Listado de personajes** con paginación controlada por query params.
* **Búsqueda por nombre** sincronizada con la URL.
* **Modal de detalle** con datos extendidos:

  * Origen, Localización, Género.
  * Historial de episodios con nombre y código (ej: "S01E01 - Pilot").
* **Estados UI**: loading, error, y “sin resultados”.
* **Bloqueo de scroll** del body al abrir el modal.
* **Persistencia de estado**: página y búsqueda se mantienen en la URL al recargar.

---

## Arquitectura y organización

* `src/App.tsx`: coordina búsqueda, paginación, consumo del hook de datos y apertura/cierre del modal.
* `src/hooks/useCharacters.ts`: hook que encapsula obtención de personajes, estados (`loading`, `error`, `noResults`, `totalPages`) y función `retry`.
* `src/components/charactersSection.tsx`: renderiza lista de personajes y estados (loading/error/vacío).
* `src/components/searchBar.tsx`: input controlado de búsqueda.
* `src/components/pagination.tsx`: paginación con control de botones y número de página.
* `src/components/characterModal.tsx`: modal con detalle de personaje, carga y manejo de errores.
* `src/components/characterCard.tsx`: tarjeta de personaje.
* `src/services/*.ts`: servicios HTTP a la API (personajes y detalles), tipados con TypeScript.
* `src/utils/http.ts`: instancia base de Axios.
* `src/types/*`: tipados compartidos, interfaces y tipos TS.

---

## Ejecución y scripts

```
pnpm install
pnpm run dev       # modo desarrollo
pnpm run build     # build producción
pnpm run preview   # sirve el build
```

---

## Decisiones clave

* **Custom hook `useCharacters`**: separa lógica de datos del componente y facilita reuso/testing.
* **Manejo de 404** como "sin resultados": normalizado para UX consistente.
* **Estado en URL**: `page` y `search` permiten compartir/enlazar resultados.
* **Modal accesible**: bloqueo de scroll del body mientras está abierto.
* **Tipado seguro**: todos los servicios, hooks y componentes tipados para mejorar autocompletado y legibilidad.

---

## Testing

El proyecto incluye pruebas unitarias para el hook `useCharacters` utilizando **Vitest** y **@testing-library/react**.

### Ejecutar tests

```bash
pnpm test
```

### Tests implementados

Los siguientes casos de prueba están cubiertos en `src/hooks/useCharacters.test.ts`:

1. **Estado inicial**: Verifica que el hook inicia con `loading: true` y estados vacíos.
2. **Carga exitosa**: Valida que los personajes se cargan correctamente y se actualizan los estados.
3. **Búsqueda con parámetros**: Confirma que la búsqueda se ejecuta con los parámetros correctos.
4. **Sin resultados**: Verifica que `noResults` se establece cuando la respuesta está vacía.
5. **Error 404**: Valida que los errores 404 se manejan como "sin resultados" en lugar de error genérico.
6. **Otros errores**: Confirma que errores diferentes a 404 muestran el mensaje de error apropiado.
7. **Función retry**: Verifica que la función `retry` permite reintentar la carga después de un error.

### Stack de testing

* **Vitest**: Framework de testing rápido y compatible con Vite.
* **@testing-library/react**: Utilidades para testear hooks de React (`renderHook`, `waitFor`).
* **jsdom**: Entorno DOM simulado para ejecutar tests de React.

---