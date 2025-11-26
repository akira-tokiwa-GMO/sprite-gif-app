# SpriteLoop – Sprite Sheet to GIF

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
</p>

<p align="center">
  <strong>🌐 Language / 言語:</strong> 日本語 | <a href="README_en.md">English</a>
</p>

---

SpriteLoop は、スプライトシートをアニメーション GIF に変換できるブラウザベースの Web アプリです。  
画像をドロップして、グリッドと速度を設定すれば、その場でプレビューして GIF をダウンロードできます。

## ✨ 機能

- **🖱️ ドラッグ＆ドロップ**
  - スプライトシート画像をドロップゾーンにドラッグ＆ドロップ、またはクリックして選択
- **⚙️ グリッド設定**
  - スプライトのレイアウトに合わせて行数・列数（1〜20）を指定
- **⏱️ 速度調整**
  - フレーム間隔を 10ms〜500ms の範囲で調整可能
- **👀 ライブプレビュー**
  - ダウンロード前にアニメーション GIF をその場で確認
- **📥 ワンクリックダウンロード**
  - 生成した GIF をボタンひとつで保存
- **🔒 プライバシーフレンドリー**
  - すべての処理がブラウザ内で完結し、サーバーへアップロードされません
- **🎨 シンプルで見やすい UI**
  - グラスモーフィズムのデザインとスムーズなアニメーションを採用

## 🎬 デモ

**入力：スプライトシート（4×4）**

<p align="center">
  <img src="docs/demo/sprite-sheet.png" alt="スプライトシート入力" width="400">
</p>

**出力：アニメーションGIF**

<p align="center">
  <img src="docs/demo/output.gif" alt="生成されたGIF出力" width="200">
</p>

## 🚀 クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/akira-tokiwa-GMO/sprite-gif-app.git
cd sprite-gif-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開きます。

## 📖 使い方

1. **アップロード** - スプライトシート画像をドロップゾーンにドラッグ＆ドロップ、またはクリックしてファイルを選択
2. **設定** - ⚙️ 設定ボタンをクリックして調整：
   - **行数**: スプライトシートのフレーム行数
   - **列数**: スプライトシートのフレーム列数
   - **速度**: フレームあたりのミリ秒（小さいほど速い）
3. **プレビュー** - 結果パネルでアニメーションを確認
4. **ダウンロード** - ダウンロードボタンをクリックしてGIFを保存

## スプライトシートのフォーマット

スプライトシートは、均等なグリッド状にフレームを配置した画像を想定しています。

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

フレームは「左から右、上から下」の順に読み込まれます。

## 📄 ライセンス

このプロジェクトはオープンソースであり、[MITライセンス](LICENSE)の下で利用可能です。