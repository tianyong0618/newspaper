import React, { useRef, useState, useCallback } from 'react';
import domToImage from 'dom-to-image-more';
import type { TabloidContent } from '../types';
import ContentSection from './ContentSection';

interface TabloidLayoutProps {
  content: TabloidContent;
}

const TabloidLayout: React.FC<TabloidLayoutProps> = ({ content }) => {
  const tabloidRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!tabloidRef.current || !downloadButtonRef.current) return;

    setIsDownloading(true);
    const button = downloadButtonRef.current;
    const node = tabloidRef.current;
    
    // Temporarily hide the button to prevent it from appearing in the screenshot
    button.style.display = 'none';

    try {
      const dataUrl = await domToImage.toPng(node, {
        quality: 1.0,
        scale: 2, // Upscale for higher resolution
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${content.mainTitle}-手抄报.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download image', error);
      alert('下载失败，请稍后重试。');
    } finally {
      // Show the button again
      button.style.display = '';
      setIsDownloading(false);
    }
  }, [content.mainTitle]);

  return (
    <div className="relative">
      <button
        ref={downloadButtonRef}
        onClick={handleDownload}
        disabled={isDownloading}
        className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm text-red-600 font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-white transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait flex items-center gap-2"
        aria-label="下载手抄报"
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            下载中...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            一键下载
          </>
        )}
      </button>

      <div ref={tabloidRef} className="bg-amber-50 p-6 rounded-lg border-4 border-dashed border-red-200 animate-fade-in shadow-2xl">
        {/* Main Title */}
        <div className="text-center mb-8 pb-4 border-b-4 border-double border-red-400">
          <h1 className="text-5xl md:text-6xl font-display text-red-700 tracking-widest">{content.mainTitle}</h1>
          <p className="text-xl text-yellow-700 mt-2 font-semibold">{content.subtitle}</p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Article taking 2/3 width */}
          <ContentSection title={content.mainArticle.title} icon="📖" isPrimary className="md:col-span-2">
            <p className="text-justify indent-8 leading-relaxed">{content.mainArticle.content}</p>
          </ContentSection>

          {/* Introduction taking 1/3 width */}
          <ContentSection title={content.introduction.title} icon="👋">
            <p className="text-justify indent-8">{content.introduction.content}</p>
          </ContentSection>

          {/* Poem taking 2/3 width */}
          <ContentSection title={content.poem.title} icon="📜" className="md:col-span-2">
              <div className="text-center space-y-2 font-serif">
                  {content.poem.content.map((line, index) => (
                      <p key={index} className="italic">{line}</p>
                  ))}
                  <p className="text-right mt-4 text-sm text-slate-600 not-italic">—— {content.poem.author}</p>
              </div>
          </ContentSection>

          {/* Knowledge Corner taking 1/3 width */}
          <ContentSection title={content.knowledgeCorner.title} icon="💡">
            <p>{content.knowledgeCorner.content}</p>
          </ContentSection>

          {/* Illustration Ideas taking full width */}
          <ContentSection title={content.illustrationIdeas.title} icon="🎨" className="md:col-span-3">
            <div className="flex justify-center">
              {content.illustrationIdeas.items.map((idea, index) => (
                <div key={index} className="flex flex-col items-center text-center w-full max-w-sm">
                  <div className="w-full aspect-square p-4 bg-amber-50/50 rounded-lg border-2 border-yellow-300 mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-red-600" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
                        <path d={idea.svgPath} stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-draw" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-700 mt-2">{idea.description}</p>
                </div>
              ))}
            </div>
          </ContentSection>
          
          {/* Slogans taking full width */}
          <ContentSection title={content.slogans.title} icon="📣" className="md:col-span-3">
            <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {content.slogans.items.map((slogan, index) => (
                    <li key={index} className="font-bold text-red-600 text-center">"{slogan}"</li>
                ))}
            </ul>
          </ContentSection>
        </div>
      </div>
    </div>
  );
};

export default TabloidLayout;