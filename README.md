# Homia

Landing page para **Homia Studio**, estudio de edición fotográfica inmobiliaria en Santiago, Chile. Diseñada con estética editorial de revista de arquitectura.

---

## Stack

| Tecnología | Versión |
|---|---|
| [Astro](https://astro.build) | 5.x |
| [React](https://react.dev) | 19.x |
| [Tailwind CSS](https://tailwindcss.com) | 4.x |
| [TypeScript](https://www.typescriptlang.org) | 5.x |
| [pnpm](https://pnpm.io) | 10.x |

---

## Características

- **Hero full-bleed** con foto inmobiliaria, overlay editorial y métricas clave
- **Marquee animado** con portales: Mercado Libre, Portal Inmobiliario, Yapo, TocToc
- **Antes / Después** con slider arrastrable (4 habitaciones reales, WebP)
- **Mockup de Instagram** con carrusel auto-rotante (4 slides)
- **Cotizador a medida** — formulario con chips de servicios y segmented control de cantidad de fotos
- **Secciones:** Problema, Antes/Después, Servicios, Instagram, Cotización
- **Dark mode / Light mode** con toggle en la nav, persistido en `localStorage`
- **Nav adaptativa:** texto blanco sobre el hero oscuro, glassmorphism al hacer scroll
- **Botón flotante de WhatsApp**
- **Animaciones reveal** al hacer scroll con `IntersectionObserver`
- **100% responsive** — mobile, tablet y desktop

---

## Paleta de colores

```
Verde profundo   #1F4D3F   --green
Fondo crema      #F6F3EC   --bg
Crema acento     #E8D4B8   --cream
Tinta            #14201C   --ink
```

## Tipografía

- **Fraunces** — Display serif variable (títulos, citas, números)
- **Inter** — Sans-serif limpia (cuerpo, UI)

---

## Estructura del proyecto

```
src/
├── styles/
│   └── global.css                 # Tokens @theme Tailwind v4 + CSS del sistema de diseño
├── layouts/
│   └── Layout.astro               # HTML shell, fuentes, anti-FOUC dark mode, reveal script
├── pages/
│   └── index.astro                # Página principal — ensambla todos los componentes
└── components/
    ├── Nav.tsx                    # React — scroll blur, menú móvil, dark/light toggle
    ├── Hero.astro
    ├── Marquee.astro
    ├── Problem.astro
    ├── BeforeAfterSection.tsx     # React — comparador slider arrastrable
    ├── Services.astro
    ├── InstagramShowcase.tsx      # React — carrusel auto-rotante en mockup iPhone
    ├── QuoteModule.tsx            # React — formulario de cotización con chips + segmented control
    ├── Footer.astro
    └── WhatsAppFloat.astro
```

Orden actual de secciones: **Nav → Hero → Marquee → Problem → BeforeAfter → Services → Instagram → Quote → Footer → WhatsAppFloat**.

Los componentes `.astro` se pre-renderizan en build time. Los componentes React usan `client:load` solo donde hace falta interactividad.

---

## Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

El servidor de desarrollo corre en `http://localhost:4321`.

---

## Dark mode

El tema se alterna con el botón de la nav (ícono de luna/sol). Se persiste en `localStorage` bajo la clave `fpTheme` y se aplica como atributo `data-theme="dark"` en el `<html>`, evitando el flash de contenido sin estilo (FOUC) mediante un script inline en el head.

---

## Componentes interactivos

### `BeforeAfterSection.tsx`
Comparador antes/después con slider arrastrable sobre una grilla 2×2 de habitaciones reales (living, cocina, dormitorio, oficina). Las imágenes son WebP optimizado (~1.3 MB total).

### `InstagramShowcase.tsx`
Mockup de teléfono con carrusel de 4 slides que rota automáticamente cada 3.2 s. El primer slide es editorial (tipografía + datos), los siguientes son fotos de la propiedad.

### `QuoteModule.tsx`
Formulario de cotización a medida. Permite seleccionar uno o varios servicios (edición, carrusel Instagram, descripción, Mercado Libre) y la cantidad aproximada de fotos. Sustituye a los antiguos módulos de Pricing/Benefits/Testimonials/CTA.

> **Nota:** el `onSubmit` actual solo cambia estado local — falta cablearlo a un backend real (Formspree, Netlify Forms o un endpoint propio) antes de producción.

### `Nav.tsx`
- Scroll listener que activa el fondo glassmorphism a los 24 px
- Texto blanco sobre el hero, texto oscuro con fondo
- Menú hamburguesa en mobile
- Toggle dark/light mode

---

## Licencia

Proyecto privado — todos los derechos reservados © 2026 Homia Studio.
