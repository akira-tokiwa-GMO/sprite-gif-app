import { useState, useRef, useCallback } from 'react';
import { 
  createGifFromSpriteSheet, 
  getDefaultConfig, 
  validateConfig,
  type GifConfig,
  type ConversionProgress 
} from './lib/gifConverter';

function App() {
  // Configuration state
  const defaultConfig = getDefaultConfig();
  const [rows, setRows] = useState(defaultConfig.rows);
  const [cols, setCols] = useState(defaultConfig.cols);
  const [duration, setDuration] = useState(defaultConfig.duration);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // App state
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [resultGif, setResultGif] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [frameInfo, setFrameInfo] = useState<{ count: number; width: number; height: number } | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      processImage(files[0]);
    } else {
      setError('Please drop an image file.');
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].type.startsWith('image/')) {
      processImage(files[0]);
    }
  };

  // Progress callback
  const handleProgress = useCallback((progress: ConversionProgress) => {
    switch (progress.type) {
      case 'extracting':
        setLoadingStatus('Extracting frames...');
        break;
      case 'encoding':
        setLoadingStatus('Encoding GIF...');
        break;
      case 'finished':
        setLoadingStatus('Complete!');
        break;
    }
  }, []);

  // Process image and generate GIF
  const processImage = async (file: File) => {
    setIsLoading(true);
    setResultGif(null);
    setError(null);
    setFrameInfo(null);
    setLoadingStatus('Loading image...');
    setCurrentFile(file);

    // Validate configuration
    const validationErrors = validateConfig({ rows, cols, duration });
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      setIsLoading(false);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    try {
      const config: Partial<GifConfig> = { rows, cols, duration };
      const result = await createGifFromSpriteSheet(file, config, handleProgress);
      
      setResultGif(result.url);
      setFrameInfo({
        count: result.frameCount,
        width: result.frameWidth,
        height: result.frameHeight,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate GIF');
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate with new settings
  const handleRegenerate = () => {
    if (currentFile) {
      processImage(currentFile);
      setSidebarOpen(false);
    }
  };

  // Download GIF
  const handleDownload = () => {
    if (resultGif) {
      const link = document.createElement('a');
      link.href = resultGif;
      link.download = 'sprite-animation.gif';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Reset
  const handleReset = () => {
    setResultGif(null);
    setUploadedImage(null);
    setError(null);
    setFrameInfo(null);
    setCurrentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Animated background */}
      <div className="gradient-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Configuration Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="text-base font-semibold text-[oklch(0.98_0.01_280)]">Settings</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="sidebar-close-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="sidebar-content">
          {/* Rows */}
          <div className="sidebar-field">
            <label className="sidebar-label">
              <span>Rows</span>
              <span className="sidebar-hint">{rows}</span>
            </label>
            <div className="sidebar-input-row">
              <button 
                onClick={() => setRows(Math.max(1, rows - 1))}
                className="sidebar-btn"
              >−</button>
              <input
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                className="sidebar-input"
              />
              <button 
                onClick={() => setRows(Math.min(20, rows + 1))}
                className="sidebar-btn"
              >+</button>
            </div>
          </div>

          {/* Columns */}
          <div className="sidebar-field">
            <label className="sidebar-label">
              <span>Columns</span>
              <span className="sidebar-hint">{cols}</span>
            </label>
            <div className="sidebar-input-row">
              <button 
                onClick={() => setCols(Math.max(1, cols - 1))}
                className="sidebar-btn"
              >−</button>
              <input
                type="number"
                min="1"
                max="20"
                value={cols}
                onChange={(e) => setCols(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                className="sidebar-input"
              />
              <button 
                onClick={() => setCols(Math.min(20, cols + 1))}
                className="sidebar-btn"
              >+</button>
            </div>
          </div>

          {/* Duration */}
          <div className="sidebar-field">
            <label className="sidebar-label">
              <span>Speed</span>
              <span className="sidebar-hint">{duration}ms</span>
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="sidebar-slider"
            />
            <div className="sidebar-slider-labels">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>

          {/* Summary */}
          <div className="sidebar-summary">
            <div className="sidebar-summary-item">
              <span className="text-[oklch(0.55_0.02_280)]">Grid</span>
              <span className="text-[oklch(0.75_0.18_180)]">{rows}×{cols}</span>
            </div>
            <div className="sidebar-summary-item">
              <span className="text-[oklch(0.55_0.02_280)]">Frames</span>
              <span className="text-[oklch(0.65_0.22_320)]">{rows * cols}</span>
            </div>
            <div className="sidebar-summary-item">
              <span className="text-[oklch(0.55_0.02_280)]">Loop</span>
              <span className="text-[oklch(0.70_0.15_200)]">{((rows * cols * duration) / 1000).toFixed(2)}s</span>
            </div>
          </div>

          {/* Regenerate Button */}
          <button 
            onClick={handleRegenerate}
            disabled={!currentFile || isLoading}
            className="regenerate-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoading ? 'Generating...' : 'Regenerate'}
          </button>
        </div>
      </aside>

      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="sidebar-toggle"
        title="Open settings"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="sidebar-toggle-badge">{rows}×{cols}</span>
      </button>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-8 fade-in">
          <h1 className="main-title text-2xl">Sprite → GIF</h1>
        </header>
        
        {/* Main Content - Side by Side */}
        <main className="flex-1 px-8 pb-8 flex gap-6">
          
          {/* Input Panel - Left */}
          <div className="flex-1 glass-card p-5 fade-in fade-in-delay-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.75_0.18_180)] to-[oklch(0.65_0.20_200)] flex items-center justify-center">
                <svg className="w-4 h-4 text-[oklch(0.12_0.02_280)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-[oklch(0.98_0.01_280)]">Input</h2>
            </div>

            <label className="flex-1 block cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`drop-zone h-full min-h-[300px] flex flex-col items-center justify-center gap-4 ${isDragOver ? 'active' : ''}`}
              >
                {uploadedImage && !isLoading ? (
                  <div className="relative w-full h-full p-4 flex items-center justify-center">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded sprite" 
                      className="max-w-full max-h-full object-contain rounded-lg opacity-90"
                    />
                    <button
                      onClick={(e) => { e.preventDefault(); handleReset(); }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[oklch(0.20_0.02_280)] border border-[oklch(1_0_0/10%)] flex items-center justify-center hover:bg-[oklch(0.30_0.02_280)] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-[oklch(0.70_0.02_280)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg 
                      className="icon-upload" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-center">
                      <p className="text-[oklch(0.75_0.03_280)] font-medium mb-1">
                        {isDragOver ? 'Release to upload' : 'Drop sprite sheet here'}
                      </p>
                      <p className="text-[oklch(0.50_0.02_280)] text-sm">
                        or click to browse
                      </p>
                    </div>
                  </>
                )}
              </div>
            </label>
            
            {error && (
              <div className="mt-3 p-2.5 rounded-lg bg-[oklch(0.30_0.15_25/30%)] border border-[oklch(0.60_0.20_25/50%)]">
                <p className="text-sm text-[oklch(0.75_0.15_25)]">{error}</p>
              </div>
            )}
          </div>

          {/* Result Panel - Right */}
          <div className="flex-1 glass-card p-5 fade-in fade-in-delay-2 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.22_320)] to-[oklch(0.60_0.20_280)] flex items-center justify-center">
                <svg className="w-4 h-4 text-[oklch(0.98_0.01_280)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-[oklch(0.98_0.01_280)]">Result</h2>
            </div>

            <div className="result-area flex-1 min-h-[300px] flex flex-col items-center justify-center gap-4">
              {isLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="loading-spinner" />
                  <p className="text-[oklch(0.70_0.10_180)] text-sm font-medium animate-pulse">
                    {loadingStatus || 'Generating...'}
                  </p>
                </div>
              ) : resultGif ? (
                <div className="scale-in flex flex-col items-center gap-4">
                  <div className="gif-container">
                    <img 
                      src={resultGif} 
                      alt="Generated GIF" 
                      className="max-w-[220px] max-h-[220px]"
                    />
                  </div>
                  {frameInfo && (
                    <p className="text-xs text-[oklch(0.55_0.02_280)]">
                      {frameInfo.count} frames • {frameInfo.width}×{frameInfo.height}px
                    </p>
                  )}
                  <button onClick={handleDownload} className="download-btn">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[oklch(0.20_0.02_280)] border border-[oklch(1_0_0/8%)] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[oklch(0.40_0.02_280)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[oklch(0.50_0.02_280)] text-sm">
                    Animation preview
                  </p>
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default App;
