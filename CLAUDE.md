# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vinelier is a dish-first dining platform built with Next.js 15, React 19, and TypeScript. The application helps users discover restaurants through specific dishes rather than just locations, focusing on making food discovery more visual and intuitive.

## Development Commands

- **Development server**: `pnpm dev` (uses Turbopack for faster builds)
- **Production build**: `pnpm build`
- **Production server**: `pnpm start`
- **Linting**: `pnpm lint`

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons React
- **Package Manager**: pnpm

### Project Structure
```
src/
├── app/
│   ├── Components/
│   │   ├── AppNavbar.tsx    # Simple logo/title navbar
│   │   └── Navbar.tsx       # Main navigation with menu items
│   ├── fonts.tsx            # Font configurations (Antonio, SF Pro Display, Roboto)
│   ├── globals.css          # Global Tailwind styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── fonts/                   # SF Pro Display font files (.otf)
└── public/
    ├── Icons/               # SVG icons (Bandaids, BowlFood, etc.)
    ├── Images/              # Section images
    └── Logo/                # Brand assets
```

### Key Components

- **Navbar**: Main navigation with backdrop blur effects and responsive design
- **AppNavbar**: Simplified header with logo and title
- **Landing Page**: Multi-section layout showcasing the platform's value proposition

### Font System
- **Antonio**: Display font for headlines (weights: 100-700)
- **SF Pro Display**: Local font for body text (Ultralight to Bold)
- **Geist/Geist Mono**: Default Next.js fonts as fallbacks

### Styling Patterns
- Responsive design with mobile-first approach using max-[440px]: breakpoints
- Extensive use of backdrop blur effects (`backdrop-blur-md`)
- Custom color palette: Primary blue (#041DD9), Background blue (#3746B5)
- Glass morphism effects with `bg-white/50` transparency patterns

### Path Aliases
- `@/*` maps to `./src/*` for clean imports

## Development Notes

- The project uses pnpm as the package manager
- Components are primarily functional with React hooks
- Responsive design heavily focuses on mobile (440px) and desktop breakpoints
- Images are optimized using Next.js Image component
- Custom fonts are loaded locally from the fonts directory