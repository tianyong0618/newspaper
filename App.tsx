import React, { useState, useCallback } from 'react';
import type { TabloidContent } from './types';
import { generateTabloidContent } from './services/geminiService';
import Header from './components/Header';
import TabloidLayout from './components/TabloidLayout';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [tabloidContent, setTabloidContent] = useState<TabloidContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setTabloidContent(null);
    try {
      const content = await generateTabloidContent();
      setTabloidContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成内容时发生未知错误，请稍后重试。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-700">“强国有我”主题阅兵手抄报</h2>
          <p className="mt-2 text-gray-600">
            只需点击一下，AI即可为你生成一份完整的手抄报内容和设计灵感！
          </p>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="mt-6 inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-gradient-to-r from-red-600 to-yellow-500 rounded-full shadow-lg hover:from-red-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在生成中...
              </>
            ) : (
             '✨ 一键生成我的手抄报'
            )}
          </button>
        </div>

        <div aria-live="polite">
          {isLoading && <LoadingSkeleton />}
          {error && <ErrorDisplay message={error} />}
          {tabloidContent && !isLoading && <TabloidLayout content={tabloidContent} />}
          {!tabloidContent && !isLoading && !error && (
              <div className="text-center text-gray-500 py-12 px-4 border-2 border-dashed rounded-lg bg-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-800">准备好创作你的“强国有我”手抄报了吗？</h3>
                <p className="mt-1 text-sm text-gray-600">点击上方的 “一键生成” 按钮，AI 将会为你提供丰富的内容和排版灵感！</p>
              </div>
          )}
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>由 Gemini AI 强力驱动 | 专为青少年爱国主义教育设计</p>
      </footer>
    </div>
  );
};

export default App;