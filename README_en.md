# Sprite → GIF

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
</p>

<p align="center">
  <strong>🌐 Language / 言語:</strong> <a href="README.md">日本語</a> | English
</p>

---

A sleek, client-side web app that converts sprite sheets into animated GIFs. Drop your sprite sheet, configure the grid, and download your animation—all in the browser.

## ✨ Features

- **🖱️ Drag & Drop** - Simply drag your sprite sheet onto the drop zone
- **⚙️ Configurable Grid** - Set rows and columns (1-20) to match your sprite layout
- **⏱️ Adjustable Speed** - Control frame duration from 10ms to 500ms
- **👀 Live Preview** - See your animated GIF before downloading
- **📥 One-Click Download** - Export your animation instantly
- **🔒 Privacy First** - All processing happens in your browser. No uploads.
- **🎨 Beautiful UI** - Glassmorphism design with smooth animations

## 🎬 Demo

**Input: Sprite Sheet (4×4)**

<p align="center">
  <img src="docs/demo/sprite-sheet.png" alt="Sprite Sheet Input" width="400">
</p>

**Output: Animated GIF**

<p align="center">
  <img src="docs/demo/output.gif" alt="Generated GIF Output" width="200">
</p>

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/akira-tokiwa-GMO/sprite-gif-app.git
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

## Sprite Sheet Format

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ for sprite animators everywhere
</p>

