
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-display">我</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 font-display">
                强国有我主题阅兵手抄报生成器
            </h1>
        </div>
        <div className="flex items-center space-x-2 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span className="font-semibold">AI 赋能创作</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
