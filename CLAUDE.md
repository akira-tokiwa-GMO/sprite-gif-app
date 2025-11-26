# CLAUDE.md - AI Assistant Context for Sprite → GIF

This file provides context for AI assistants working with this codebase.

## Project Overview

**Sprite → GIF** is a client-side web application that converts sprite sheets into animated GIFs. It runs entirely in the browser with no server-side processing required.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with custom CSS animations
- **GIF Encoding**: gif.js (loaded from CDN)
- **UI Font**: Outfit (Google Fonts)

## Project Structure

```
sprite-gif-app/
├── public/
│   └── gif.worker.js        # Web worker for GIF encoding
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles & animations
│   ├── lib/
│   │   ├── gifConverter.ts  # Core GIF conversion logic
│   │   └── utils.ts         # Utility functions (cn helper)
│   └── components/ui/       # shadcn/ui components
├── index.html               # Entry HTML (includes gif.js CDN)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Key Files

### `src/lib/gifConverter.ts`
Core conversion module that:
- Takes a sprite sheet image (File/Blob/URL)
- Splits it into frames based on rows × cols grid
- Encodes frames into an animated GIF using gif.js
- Returns a blob URL for download/preview

### `src/App.tsx`
Main React component handling:
- Drag-and-drop file upload
- Configuration sidebar (rows, cols, frame duration)
- GIF preview and download
- Progress states during conversion

### `src/index.css`
Custom styling with:
- Glassmorphism cards
- Animated gradient background with floating orbs
- OKLCH color space for modern color handling
- Responsive design

## Configuration Defaults

```typescript
{
  rows: 4,        // Vertical frame divisions
  cols: 4,        // Horizontal frame divisions  
  duration: 100,  // Frame delay in milliseconds
  quality: 10,    // GIF quality (1-30, lower = better)
  workers: 2      // Web workers for encoding
}
```

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture Notes

1. **Client-Side Only**: All processing happens in-browser. No backend needed.

2. **gif.js Library**: Loaded from CDN in `index.html`. The worker script (`gif.worker.js`) must be in `/public/`.

3. **Frame Extraction**: Uses Canvas API to crop sprite sheet into individual frames, reading left-to-right, top-to-bottom.

4. **State Management**: Uses React's built-in `useState` hooks. No external state library needed for this scope.

## Common Tasks

### Adding new configuration options
1. Add state in `App.tsx`
2. Add to `GifConfig` interface in `gifConverter.ts`
3. Update `DEFAULT_CONFIG` and `createGifFromSpriteSheet` function
4. Add UI controls in the sidebar

### Modifying visual design
- Colors: Edit CSS custom properties in `src/index.css` `:root`
- Animations: Modify `@keyframes` rules in `src/index.css`
- Layout: Edit Tailwind classes in `App.tsx`

### Changing supported grid sizes
- Edit validation in `validateConfig()` in `gifConverter.ts`
- Update min/max attributes on input elements in `App.tsx`

## Dependencies

### Runtime
- `react`, `react-dom` - UI framework
- `clsx`, `tailwind-merge` - Utility class handling
- `class-variance-authority` - Component variants
- `lucide-react` - Icon library
- `tailwindcss-animate` - Animation utilities

### Development
- `vite` - Build tool
- `typescript` - Type checking
- `tailwindcss` - CSS framework
- `eslint` - Linting

## Notes for AI Assistants

- The app is intentionally simple. Avoid over-engineering.
- gif.js is loaded externally via CDN, hence `declare const GIF: any;`
- OKLCH colors are used throughout for better color manipulation
- The sidebar pattern uses CSS transforms for slide-in animation
- All file processing is async to prevent UI blocking

