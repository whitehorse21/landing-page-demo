# Travels' Landing Page

A modern, responsive landing page built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, clean design with a travel theme
- 📱 Fully responsive layout (mobile, tablet, desktop)
- ⚡ Built with Vite for fast development and builds
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 🧩 Modular component architecture

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
travels-landing-page/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section
│   │   ├── AboutUs.tsx         # About Us section
│   │   ├── Services.tsx        # Services sidebar
│   │   ├── Experience.tsx      # Experience section
│   │   ├── Testimonials.tsx    # Customer testimonials
│   │   ├── Subscribe.tsx       # Newsletter subscription
│   │   └── Footer.tsx          # Footer component
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles with Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## Customization

### Colors

The primary color scheme can be customized in `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#10b981', // emerald-500
    light: '#34d399',   // emerald-400
    dark: '#059669',    // emerald-600
  },
}
```

### Components

All components are modular and can be easily customized or extended. Each component is self-contained in the `src/components/` directory.

## License

MIT
