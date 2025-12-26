# Prosigliere Challenge - Harry Potter Characters

This is a challenge project for the Senior Frontend position at Prosigliere. A Next.js application that displays Harry Potter characters with filtering, favorites, and dynamic theming based on house preferences.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack & Library Decisions

### Next.js 16.1.1

**Why Next.js?**

- **App Router**: Leverages the modern App Router architecture for better performance, improved developer experience, and built-in support for React Server Components
- **Server-Side Rendering (SSR)**: Initial page loads are faster with server-rendered content, improving SEO and Core Web Vitals
- **Static Site Generation (SSG)**: Character detail pages use `generateStaticParams` for optimal performance and reduced server load
- **Built-in Optimizations**: Image optimization, automatic code splitting, and route prefetching come out of the box
- **Metadata API**: Dynamic metadata generation for better SEO without additional libraries

**Key Features Used:**

- React Server Components for initial data fetching
- Client Components for interactive features
- Dynamic routes with `[id]` parameter
- Image optimization with Next.js Image component
- React Compiler enabled for automatic optimizations

### TanStack Query (React Query) v5.90.12

**Why TanStack Query?**

- **Declarative Data Fetching**: Simplifies server state management with hooks-based API
- **Automatic Caching**: Built-in caching reduces unnecessary API calls and improves performance
- **Background Refetching**: Keeps data fresh without user intervention
- **Optimistic Updates**: Better UX with immediate UI updates
- **Error Handling**: Centralized error handling and retry logic
- **Cache Management**: Smart cache invalidation and garbage collection

**Implementation:**

- Configured with 1-hour stale time and cache time
- Disabled refetch on window focus to reduce unnecessary requests
- Single retry attempt for failed requests
- Query keys structured for efficient cache management (`["characters", filter]`, `["character", id]`)

### Tailwind CSS 4

**Why Tailwind CSS?**

- **Utility-First**: Rapid UI development with utility classes
- **Design System**: Consistent spacing, colors, and typography through configuration
- **Custom Theme**: House colors defined in CSS variables for easy maintenance
- **Responsive Design**: Built-in responsive utilities for mobile-first approach
- **Performance**: Purges unused styles in production builds
- **Modern Features**: Tailwind 4 with PostCSS integration

**Custom Configuration:**

- House-specific colors (Gryffindor, Hufflepuff, Ravenclaw, Slytherin) defined as CSS variables
- Strong color variants for headers and accents
- Opacity utilities for theme transparency effects

### Class Variance Authority (CVA)

**Why CVA?**

- **Type-Safe Variants**: TypeScript support for component variants
- **Composable Styles**: Combines with Tailwind for maintainable component styling
- **House-Based Theming**: Used extensively for house-specific styling (cards, headers, backgrounds)
- **Clean API**: Declarative variant definitions improve code readability

### Biome 2.2.0

**Why Biome?**

- **Fast**: Written in Rust, significantly faster than ESLint
- **All-in-One**: Linting, formatting, and import organization in a single tool
- **Zero Configuration**: Works out of the box with sensible defaults
- **Next.js Support**: Built-in support for Next.js and React patterns
- **Modern**: Supports latest JavaScript/TypeScript features

### Radix UI (via shadcn/ui)

**Why Radix UI?**

- **Accessible**: Built with accessibility in mind (ARIA attributes, keyboard navigation)
- **Unstyled**: Full control over styling while maintaining functionality
- **Composable**: Primitive components that can be combined for complex UIs
- **TypeScript**: Full TypeScript support

### Lucide React

**Why Lucide React?**

- **Comprehensive**: Large icon library covering most use cases
- **Tree-Shakeable**: Only imports used icons, reducing bundle size
- **Consistent**: Uniform design language across all icons
- **Customizable**: Easy to style with Tailwind classes

## Architecture Decisions

### Component Architecture

**Structure:**
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (Server Component)
│   └── character/[id]/    # Dynamic character routes
├── components/            # Reusable UI components
│   ├── cards/            # Card components (Character, House)
│   ├── home/             # Home page specific components
│   ├── ui/               # Base UI components (shadcn)
│   └── header/           # Header component
├── hooks/                 # Custom React hooks
│   ├── useCharacters.ts  # Data fetching hook
│   ├── useCharacter.ts   # Single character hook
│   └── useTheme.tsx      # Theme management hook
├── lib/                   # Utility functions and configurations
│   ├── api.ts            # API client abstraction
│   ├── query-client.tsx  # React Query setup
│   └── utils.ts          # Helper functions
├── services/              # API service layer
│   └── getCharacters.ts  # Character data services
└── types/                 # TypeScript type definitions
```

**Design Patterns:**

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data fetching
2. **Service Layer**: API calls abstracted into service functions for reusability
3. **Custom Hooks**: Business logic encapsulated in hooks for component reusability
4. **Type Safety**: Comprehensive TypeScript types for all data structures
5. **Component Composition**: Small, focused components that compose into larger features

### State Management

**Approach:**

- **Server State**: Managed by TanStack Query (characters, filters)
- **Client State**: React Context API for theme management
- **Local Storage**: Persistence for favorites (characters and houses)
- **URL State**: Next.js router for navigation and route parameters

**Theme Management:**

- Context API with custom hook (`useTheme`)
- Persists favorite house in localStorage
- Applies theme to header and background dynamically
- Uses CVA for type-safe variant styling

### Data Fetching Strategy

**Hybrid Approach:**

1. **Server Components**: Initial data fetching on the server for SEO and performance
2. **Client Components**: Interactive filtering and updates via React Query
3. **Cache Optimization**: 
   - React Query cache for client-side data
   - Next.js fetch cache with 1-hour revalidation
   - Smart cache lookup in `useCharacter` hook to avoid unnecessary API calls

**Error Handling:**

- Try-catch blocks in Server Components with fallback to empty arrays
- React Query error states with user-friendly error messages
- Retry logic configured for transient failures

### Performance Optimizations

1. **Image Optimization**: Next.js Image component with AVIF/WebP formats
2. **Code Splitting**: Automatic route-based code splitting
3. **Static Generation**: Character pages pre-rendered at build time
4. **React Compiler**: Enabled for automatic memoization and optimization
5. **Query Caching**: Reduces redundant API calls
6. **Standalone Output**: Optimized production builds

## Next.js Specific Decisions

### App Router vs Pages Router

**Chosen: App Router**

- Modern architecture with better performance
- Server Components by default
- Improved data fetching patterns
- Better TypeScript support
- Future-proof approach

### Server vs Client Components

**Strategy:**

- **Server Components** (default): Used for initial data fetching, static content, and SEO-critical pages
- **Client Components** (`"use client"`): Used for interactivity, hooks, and browser APIs

**Examples:**

- `app/page.tsx`: Server Component for initial character fetch
- `components/home/HomeClient/index.tsx`: Client Component for filtering and interactions
- `app/character/[id]/page.tsx`: Server Component for static generation

### Static Generation

**Implementation:**

- `generateStaticParams` for character detail pages
- Pre-renders all character pages at build time
- Improves performance and reduces server load
- Fallback to dynamic rendering if character not found

### Metadata API

**Usage:**

- Dynamic metadata generation per character page
- Open Graph tags for social sharing
- Twitter card support
- SEO-optimized titles and descriptions

### Image Optimization

**Configuration:**

- Remote image patterns configured for ImageKit CDN
- Multiple image formats (AVIF, WebP)
- Responsive image sizes
- Minimum cache TTL for performance

## What Could Be Improved (Given More Time)

### Testing

**Missing:**

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Testing data flow and user interactions
- **E2E Tests**: Playwright or Cypress for critical user flows
- **Visual Regression**: Screenshot testing for UI consistency

**Implementation Ideas:**

```typescript
// Example test structure
__tests__/
├── components/
├── hooks/
├── services/
└── e2e/
```

### Error Handling & User Experience

**Improvements:**

1. **Error Boundaries**: React Error Boundaries for graceful error handling
2. **Better Error Messages**: More descriptive, actionable error messages
3. **Offline Support**: Service worker for offline functionality
4. **Loading Skeletons**: Better loading states with skeleton screens
5. **Toast Notifications**: User feedback for actions (favorites, errors)

### Accessibility (a11y)

**Enhancements:**

1. **ARIA Labels**: More comprehensive ARIA attributes
2. **Keyboard Navigation**: Full keyboard support for all interactions
3. **Focus Management**: Proper focus trapping in modals/dialogs
4. **Screen Reader Testing**: Testing with screen readers
5. **Color Contrast**: WCAG AA compliance verification
6. **Semantic HTML**: Better use of semantic elements

### Performance

**Optimizations:**

1. **Virtual Scrolling**: For large character lists (react-window or react-virtual)
2. **Image Lazy Loading**: Intersection Observer for below-fold images
3. **Prefetching**: Prefetch character data on hover
4. **Bundle Analysis**: Code splitting optimization
5. **Service Worker**: Caching strategy for offline support
6. **Web Vitals Monitoring**: Real User Monitoring (RUM)

### Type Safety

**Improvements:**

1. **API Response Types**: Stricter typing for API responses validating and normalizing with zod

### Developer Experience

**Enhancements:**

1. **Storybook**: Component documentation and development
2. **CI/CD**: GitHub Actions for automated testing and deployment
3. **Pre-commit Hooks**: Husky for linting and testing before commits

### SEO & Analytics

**Additions:**

1. **Analytics**: Google Analytics or Plausible integration
2. **Performance Monitoring**: Sentry or similar for error tracking

### UI/UX

**Polish:**

1. **Design**: The design UI can be improved
2. **Animations**: Framer Motion for smooth transitions
3. **Micro-interactions**: Delightful user interactions

## Project Structure

```
prosigliere-challenge/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and configurations
│   ├── services/           # API services
│   └── types/              # TypeScript types
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── biome.json              # Biome linter/formatter config
└── package.json            # Dependencies
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Environment

- **Node.js**: 20+
- **Package Manager**: npm, yarn, pnpm, or bun
- **Framework**: Next.js 16.1.1
- **React**: 19.2.3
- **TypeScript**: 5+

## License

This is a challenge project for Prosigliere.
