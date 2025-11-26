/**
 * GIF Converter Service
 * 
 * Converts sprite sheets to animated GIFs.
 * This mirrors the functionality of img2gif.py but runs client-side.
 */

// CDNから読み込んだGIFライブラリの型宣言
declare const GIF: any;

export interface GifConfig {
  rows: number;        // 行数 (縦方向の分割数)
  cols: number;        // 列数 (横方向の分割数)
  duration: number;    // 各フレームの表示時間 (ミリ秒)
  quality?: number;    // GIF品質 (1-30, 低いほど高品質)
  workers?: number;    // Web Worker数
}

export interface ConversionResult {
  blob: Blob;
  url: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
}

export interface ConversionProgress {
  type: 'extracting' | 'encoding' | 'finished';
  progress?: number;
}

const DEFAULT_CONFIG: GifConfig = {
  rows: 4,
  cols: 4,
  duration: 100,
  quality: 10,
  workers: 2,
};

/**
 * スプライトシートからGIFを生成する
 * 
 * @param imageSource - 画像ソース (File, Blob, または data URL)
 * @param config - GIF設定
 * @param onProgress - 進捗コールバック
 * @returns 生成されたGIFの情報
 */
export async function createGifFromSpriteSheet(
  imageSource: File | Blob | string,
  config: Partial<GifConfig> = {},
  onProgress?: (progress: ConversionProgress) => void
): Promise<ConversionResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const { rows, cols, duration, quality, workers } = finalConfig;

  // 画像を読み込む
  const img = await loadImage(imageSource);
  
  // 1フレームあたりの幅と高さを計算
  const frameWidth = Math.floor(img.width / cols);
  const frameHeight = Math.floor(img.height / rows);
  
  onProgress?.({ type: 'extracting' });

  // キャンバスを作成
  const canvas = document.createElement('canvas');
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas 2D context');
  }

  // GIF生成の設定
  const gif = new GIF({
    workers,
    quality,
    width: frameWidth,
    height: frameHeight,
    workerScript: '/gif.worker.js'
  });

  // 左上から右下へ順番にフレームを抽出・追加
  const frameCount = rows * cols;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // 切り出す座標を計算
      const left = col * frameWidth;
      const top = row * frameHeight;

      // キャンバスをクリアして画像をクロップ描画
      ctx.clearRect(0, 0, frameWidth, frameHeight);
      ctx.drawImage(
        img,
        left, top, frameWidth, frameHeight,  // ソース座標
        0, 0, frameWidth, frameHeight         // 出力座標
      );

      // フレームを追加
      gif.addFrame(canvas, { copy: true, delay: duration });
    }
  }

  onProgress?.({ type: 'encoding' });

  // GIFをレンダリング
  return new Promise((resolve, reject) => {
    gif.on('finished', (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      onProgress?.({ type: 'finished' });
      resolve({
        blob,
        url,
        frameCount,
        frameWidth,
        frameHeight,
      });
    });

    gif.on('error', (error: Error) => {
      reject(error);
    });

    gif.render();
  });
}

/**
 * 画像を読み込むヘルパー関数
 */
async function loadImage(source: File | Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));

    if (typeof source === 'string') {
      // data URL または URL
      img.src = source;
    } else {
      // File または Blob
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(source);
    }
  });
}

/**
 * 設定のバリデーション
 */
export function validateConfig(config: Partial<GifConfig>): string[] {
  const errors: string[] = [];
  
  if (config.rows !== undefined && (config.rows < 1 || config.rows > 20)) {
    errors.push('Rows must be between 1 and 20');
  }
  
  if (config.cols !== undefined && (config.cols < 1 || config.cols > 20)) {
    errors.push('Columns must be between 1 and 20');
  }
  
  if (config.duration !== undefined && (config.duration < 10 || config.duration > 2000)) {
    errors.push('Duration must be between 10ms and 2000ms');
  }
  
  return errors;
}

/**
 * デフォルト設定を取得
 */
export function getDefaultConfig(): GifConfig {
  return { ...DEFAULT_CONFIG };
}

