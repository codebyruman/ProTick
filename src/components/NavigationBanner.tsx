import React, { useState } from 'react';

interface NavigationBannerProps {
  currentView: 'login' | 'instructions' | 'exam' | 'review' | 'post-submission';
  onSelectView: (view: 'login' | 'instructions' | 'exam' | 'review' | 'post-submission') => void;
}

export const NavigationBanner: React.FC<NavigationBannerProps> = ({ currentView, onSelectView }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const views: { id: 'login' | 'instructions' | 'exam' | 'review' | 'post-submission'; label: string; number: number }[] = [
    { id: 'login', label: 'View 1: Login', number: 1 },
    { id: 'instructions', label: 'View 2: Instructions', number: 2 },
    { id: 'exam', label: 'View 3: Examination', number: 3 },
    { id: 'review', label: 'View 4: Review & Submit', number: 4 },
    { id: 'post-submission', label: 'View 5: Post-Submission', number: 5 },
  ];

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-3 right-3 z-50 bg-primary text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-secondary/40 flex items-center gap-1.5 hover:bg-secondary transition-all cursor-pointer"
        title="Open Stitch Screen Navigator"
      >
        <span className="material-symbols-outlined text-[16px]">visibility</span>
        <span>Stitch Views Switcher</span>
      </button>
    );
  }

  return (
    <nav aria-label="Stitch Screens Quick Switcher" className="fixed bottom-0 left-0 right-0 z-50 bg-primary/95 text-white backdrop-blur-md border-t border-secondary/30 px-3 py-2 shadow-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-label-code text-secondary-container uppercase tracking-wider font-bold hidden sm:inline">
            Stitch ID: 1616506073780318223
          </span>
          <span className="text-secondary-fixed text-[11px] font-semibold hidden md:inline">
            • 5 Screens
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-0.5">
          {views.map((v) => {
            const isActive = currentView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelectView(v.id)}
                className={`text-[12px] font-medium px-2.5 py-1 rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-secondary text-white font-bold shadow-sm ring-1 ring-white/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">
                  {v.number}
                </span>
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          title="Minimize switcher"
        >
          <span className="material-symbols-outlined text-[18px]">expand_more</span>
        </button>
      </div>
    </nav>
  );
};

