# Data-X Industrial Data Platform

## Overview

Data-X is a full-stack web application serving as a marketplace for industrial data, APIs, and AI agents. The platform enables users to discover, purchase, and manage data resources, submit their own resources for listing, and interact with AI-powered search and agent chat features. It includes both a public-facing marketplace and an admin portal for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter with hash-based location for client-side routing (supports GitHub Pages deployment)
- **State Management**: TanStack React Query for server state, React Context for language/i18n
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming, Inter and Outfit fonts
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful endpoints under `/api` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

### Data Layer
- **Database**: PostgreSQL (via Neon serverless or standard pg Pool)
- **Schema Location**: `shared/schema.ts` - shared between frontend and backend
- **Migrations**: Drizzle Kit with migrations output to `./migrations`
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod

### Core Data Models
- **Users**: Authentication with username/password
- **Resources**: Marketplace listings with multilingual support (English/Korean), pricing, and metadata
- **Reviews**: User reviews linked to resources with optional provider replies

### Key Design Patterns
- **Monorepo Structure**: Client (`client/`), server (`server/`), and shared code (`shared/`)
- **Path Aliases**: `@/` for client source, `@shared/` for shared modules, `@assets/` for attached assets
- **Internationalization**: Context-based language switching with `t(english, korean)` helper function
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` allows swapping implementations

### Build and Deployment
- **Development**: Vite dev server with HMR, Express backend with tsx
- **Production**: esbuild bundles server to CJS, Vite builds client to `dist/public`
- **Static Serving**: Production serves built client from `dist/public` with SPA fallback
- **GitHub Pages**: Separate Vite config with relative base path for static deployment

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Neon Serverless**: Optional serverless PostgreSQL driver (`@neondatabase/serverless`)

### UI Libraries
- **Radix UI**: Complete set of accessible primitives (dialogs, menus, forms, etc.)
- **Lucide React**: Icon library
- **Recharts**: Data visualization charts
- **Embla Carousel**: Carousel component
- **React Day Picker**: Date picker with date-fns
- **cmdk**: Command palette component

### Form and Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod resolver for React Hook Form

### Content and Markdown
- **React Markdown**: Markdown rendering
- **remark-gfm**: GitHub Flavored Markdown support

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **TypeScript**: Full type coverage across client and server
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner for Replit environment