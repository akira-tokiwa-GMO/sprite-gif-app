# Sprite → GIF

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
</p>

A sleek, client-side web app that converts sprite sheets into animated GIFs. Drop your sprite sheet, configure the grid, and download your animation—all in the browser.

![Sprite to GIF Converter](https://via.placeholder.com/800x400/1a1625/75b8b0?text=Sprite+→+GIF+Converter)

## ✨ Features

- **🖱️ Drag & Drop** - Simply drag your sprite sheet onto the drop zone
- **⚙️ Configurable Grid** - Set rows and columns (1-20) to match your sprite layout
- **⏱️ Adjustable Speed** - Control frame duration from 10ms to 500ms
- **👀 Live Preview** - See your animated GIF before downloading
- **📥 One-Click Download** - Export your animation instantly
- **🔒 Privacy First** - All processing happens in your browser. No uploads.
- **🎨 Beautiful UI** - Glassmorphism design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sprite-gif-app.git
cd sprite-gif-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Usage

1. **Upload** - Drag a sprite sheet image onto the drop zone, or click to browse
2. **Configure** - Click the ⚙️ settings button to adjust:
   - **Rows**: Number of frame rows in your sprite sheet
   - **Columns**: Number of frame columns in your sprite sheet  
   - **Speed**: Milliseconds per frame (lower = faster)
3. **Preview** - Watch your animation play in the result panel
4. **Download** - Click the download button to save your GIF

### Sprite Sheet Format

Your sprite sheet should be organized in a grid pattern:

```
┌─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │
├─────┼─────┼─────┼─────┤
│  5  │  6  │  7  │  8  │
├─────┼─────┼─────┼─────┤
│  9  │ 10  │ 11  │ 12  │
├─────┼─────┼─────┼─────┤
│ 13  │ 14  │ 15  │ 16  │
└─────┴─────┴─────┴─────┘
```

Frames are read left-to-right, top-to-bottom.

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

### Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # React entry point
├── index.css            # Global styles & animations
└── lib/
    ├── gifConverter.ts  # Core GIF conversion logic
    └── utils.ts         # Utility functions
```

### Tech Stack

- **[React 19](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool & dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **[gif.js](https://jnordberg.github.io/gif.js/)** - GIF encoding

## 🔧 Configuration

Default conversion settings can be modified in `src/lib/gifConverter.ts`:

```typescript
const DEFAULT_CONFIG: GifConfig = {
  rows: 4,        // Frame rows
  cols: 4,        // Frame columns
  duration: 100,  // Frame delay (ms)
  quality: 10,    // GIF quality (1-30, lower = better)
  workers: 2      // Web workers for encoding
};
```

## 🌐 Deployment

### Vercel / Netlify

Simply connect your GitHub repository. Both platforms will auto-detect Vite and deploy.

### Manual Build

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting service.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [gif.js](https://jnordberg.github.io/gif.js/) - JavaScript GIF encoder
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Outfit Font](https://fonts.google.com/specimen/Outfit) - Beautiful geometric sans-serif

---

<p align="center">
  Made with ❤️ for sprite animators everywhere
</p>
