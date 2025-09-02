# Multibox Frontend

A Vue 3 application built with TypeScript and Vite.

## 📖 Overview

This is the frontend of the **Multibox** project.  
It was developed as a test project to demonstrate skills in **Vue 3, TypeScript, TailwindCSS, and PrimeVue**.

The application includes a flow for managing purchases and refund requests, with reusable components and clean code patterns.

## ✨ Features

- Purchase listing and details
- Refund request flow (with OTP verification)
- Reusable UI components (`BaseButton`, custom `Dialog`, etc.)
- Internationalization with `vue-i18n` (EN, PT-BR, DE)
- Responsive design with TailwindCSS
- Built with Vue 3 Composition API
- TypeScript integration
- Vite for fast development and building

## 📂 Project Structure

multibox-frontend/
├── public/ # Static assets
├── src/ # Source code
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable Vue components
│ ├── screens/ # Page-level components
│ ├── router/ # Vue Router configuration
│ ├── composables/ # Reusable composition functions
│ ├── locales/ # i18n translation files
| |── utils/ # Functions
│ ├── App.vue # Root component
│ └── main.ts # Application entry point
├── tests/ # Unit test files (Vitest)
├── vite.config.ts # Vite configuration
├── package.json # Project metadata & scripts
└── tsconfig.json # TypeScript configuration

## 🛠️ Technologies

- [Vue 3](https://vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [PrimeVue](https://primevue.org/) (UI components)
- [Vitest](https://vitest.dev/) for unit testing
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 16)
- npm, yarn, or pnpm

### Installation

```sh
npm install
```

#### Development Server

```sh
npm run dev
```

#### Build for Production

```sh
npm run build
```

#### Run Tests

```sh
npm run test
```

## 🔍 Code Quality

### Linting

```sh
npm run lint
```

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile devices
