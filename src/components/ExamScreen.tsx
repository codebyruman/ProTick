import React, { useState, useEffect } from 'react';
import { Question, StudentProfile } from '../types/exam';
import { ProTickLogo } from './ProTickLogo';

interface ExamScreenProps {
  student: StudentProfile;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Record<number, boolean>;
  onSelectOption: (questionId: number, optionKey: 'A' | 'B' | 'C' | 'D') => void;
  onToggleFlag: (questionId: number) => void;
  onNavigateQuestion: (index: number) => void;
  onSubmitExam: () => void;
  onBackToInstructions: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  student,
  questions,
  currentQuestionIndex,
  selectedAnswers,
  flaggedQuestions,
  onSelectOption,
  onToggleFlag,
  onNavigateQuestion,
  onSubmitExam,
  onBackToInstructions,
}) => {
  // Timer state (starting at 4 mins 48 seconds as shown in the Stitch design View 3, or counting down)
  const [secondsRemaining, setSecondsRemaining] = useState(288); // 00:04:48
  const [autosaveSeconds, setAutosaveSeconds] = useState(12);
  const [defocusCount, setDefocusCount] = useState(1);
  const [showDefocusBanner, setShowDefocusBanner] = useState(true);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Autosave ticker effect
  useEffect(() => {
    const saveTimer = setInterval(() => {
      setAutosaveSeconds((prev) => (prev >= 30 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(saveTimer);
  }, []);

  // Window defocus detection (as per the real exam specification)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setDefocusCount((prev) => {
          const next = prev + 1;
          setShowDefocusBanner(true);
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;

  const currentSelection = selectedAnswers[currentQuestion.id];
  const isCurrentFlagged = !!flaggedQuestions[currentQuestion.id];

  // Stats calculation
  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.keys(flaggedQuestions).filter((k) => flaggedQuestions[Number(k)]).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Format countdown mm:ss
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedCountdown = `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      onNavigateQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      onNavigateQuestion(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen antialiased select-none">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-primary-container shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
        <div className="h-20 px-margin-mobile flex items-center justify-between text-on-primary max-w-6xl mx-auto">
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Back"
              onClick={onBackToInstructions}
              className="w-11 h-11 flex items-center justify-center text-on-primary rounded hover:bg-on-primary/10 transition-colors cursor-pointer"
              title="Return to Instructions"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <ProTickLogo className="w-8 h-8" />
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-primary leading-none">
                  Active Exam Session
                </span>
                <span className="font-label-code text-label-code text-primary-fixed-dim px-space-xs py-0.5 rounded bg-primary/60">
                  {student.terminalId}
                </span>
              </div>
              <div className="flex items-center gap-space-xs mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container truncate max-w-[280px]">
                  SECURE LAB TERMINAL · OFFLINE MODE ACTIVE
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex flex-col relative w-full pt-20 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-28 max-w-4xl mx-auto">
          {/* Persistent Exam Meta HUD Strip */}
          <div className="w-full bg-primary text-on-primary px-margin-mobile py-space-sm shadow-md">
            <div className="flex flex-col gap-space-xs sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">badge</span>
                  <span className="font-label-md text-label-md text-on-primary font-semibold">{student.name}</span>
                  <span className="font-label-code text-label-code text-primary-fixed-dim bg-primary-container px-space-xs rounded">
                    {student.usn}
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">menu_book</span>
                  <span className="font-label-md text-label-md text-secondary-fixed">{student.courseCode} Algorithms</span>
                  <span className="font-label-sm text-label-sm text-on-primary-fixed-variant bg-surface-container-highest px-1.5 rounded font-medium">
                    {student.semester}
                  </span>
                </div>
              </div>

              {/* Critical Countdown Indicator (Under 5 minutes warning state) */}
              <div className="flex items-center justify-between sm:justify-end gap-space-sm pt-space-xs sm:pt-0">
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-error-container font-semibold">
                    Time Remaining
                  </span>
                  <div className="flex items-center gap-1.5 text-error bg-error-container px-space-sm py-1 rounded shadow-sm animate-pulse border border-error/30">
                    <span className="material-symbols-outlined text-[18px]">alarm_on</span>
                    <span className="font-display-timer-mobile text-display-timer-mobile leading-none font-bold">
                      {formattedCountdown}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Realtime Autosave & Security Alerts Stack */}
          <div className="w-full px-margin-mobile pt-space-sm flex flex-col gap-space-xs">
            {/* SQLite Local Sync Status */}
            <div className="self-start flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-full text-on-surface shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="material-symbols-outlined text-[15px] text-on-surface-variant">cloud_done</span>
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                Autosaved {autosaveSeconds}s ago (Local SQLite Synced)
              </span>
            </div>

            {/* Security Warning Defocus Banner */}
            {showDefocusBanner && (
              <div className="w-full bg-error text-on-error p-space-sm rounded-lg shadow-md flex items-start gap-space-sm border border-error-container">
                <span className="material-symbols-outlined text-[20px] text-error-container shrink-0 mt-0.5">warning</span>
                <div className="flex flex-col flex-1">
                  <span className="font-label-md text-label-md font-bold text-on-error">
                    Security Warning: Tab switch / Window defocus detected
                  </span>
                  <span className="font-body-sm text-body-sm text-error-container">
                    Incident Logged #{defocusCount} of 3 allowed. Exceeding threshold triggers automated locked submission.
                  </span>
                </div>
                <button
                  aria-label="Dismiss banner"
                  className="text-on-error hover:bg-error-container/20 rounded p-1 transition-colors cursor-pointer"
                  onClick={() => setShowDefocusBanner(false)}
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Question Workspace Container */}
          <div className="w-full px-margin-mobile pt-space-md flex flex-col gap-space-md">
            <section aria-labelledby="question-heading" className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-outline-variant/30">
              {/* Card Sub-header: Tracker & Score Bounds */}
              <div className="flex items-center justify-between bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold" id="question-heading">
                    Question {currentQuestion.questionNumber} of {totalQuestions}
                  </h2>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-code text-label-code bg-emerald-100 text-emerald-800 px-space-xs py-0.5 rounded shadow-sm font-bold">
                    +{currentQuestion.marksPositive.toFixed(1)}
                  </span>
                  <span className="font-label-code text-label-code bg-error-container text-on-error-container px-space-xs py-0.5 rounded shadow-sm font-bold">
                    -{currentQuestion.marksNegative.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Problem Prompt */}
              <div className="space-y-space-xs">
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                  {currentQuestion.text}
                </p>
              </div>

              {/* Optional Contextual Diagram / Formula Panel */}
              {currentQuestion.contextFormula && (
                <div className="w-full bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-space-xs border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                      {currentQuestion.contextHeader || 'Dynamic Programming Formulation Context'}
                    </span>
                    {currentQuestion.contextFormulaNote && (
                      <span className="font-label-code text-label-code font-bold">
                        {currentQuestion.contextFormulaNote}
                      </span>
                    )}
                  </div>
                  <div className="p-space-sm bg-surface-container-lowest rounded text-center overflow-x-auto shadow-inner border border-surface-container-high">
                    <code className="font-label-code text-label-code text-primary font-bold text-[15px]">
                      {currentQuestion.contextFormula}
                    </code>
                  </div>
                </div>
              )}

              {/* Options */}
              <fieldset className="w-full flex flex-col gap-space-sm">
                <legend className="sr-only">Choose one option for Question {currentQuestion.questionNumber}</legend>
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentSelection === opt.key;
                  return (
                    <label
                      key={opt.key}
                      onClick={() => onSelectOption(currentQuestion.id, opt.key)}
                      className={`group relative flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-surface-container-highest border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low border-transparent hover:bg-surface-container shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-space-md">
                        <span
                          className={`w-8 h-8 rounded-full font-label-md text-label-md flex items-center justify-center font-bold shadow-sm transition-colors ${
                            isSelected
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container-highest text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span
                          className={`font-body-md text-body-md transition-colors ${
                            isSelected ? 'text-primary font-bold' : 'text-on-surface font-medium'
                          }`}
                        >
                          {opt.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs">
                        {isSelected && (
                          <span className="material-symbols-outlined text-primary text-[20px]">
                            check_circle
                          </span>
                        )}
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          value={opt.key}
                          checked={isSelected}
                          onChange={() => onSelectOption(currentQuestion.id, opt.key)}
                          className="w-5 h-5 text-primary accent-primary"
                        />
                      </div>
                    </label>
                  );
                })}
              </fieldset>
            </section>

            {/* Operational Sticky Bottom Control Bar */}
            <div className="w-full grid grid-cols-3 gap-space-sm pt-space-xs">
              {/* Previous */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="h-12 px-space-sm rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Previous</span>
              </button>

              {/* Review Toggle */}
              <button
                type="button"
                onClick={() => onToggleFlag(currentQuestion.id)}
                className={`h-12 px-space-sm rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm cursor-pointer ${
                  isCurrentFlagged
                    ? 'bg-secondary text-white ring-2 ring-secondary'
                    : 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed/80'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCurrentFlagged ? 'flag' : 'star'}
                </span>
                <span className="truncate">{isCurrentFlagged ? 'Flagged' : 'Mark Review'}</span>
              </button>

              {/* Save & Next */}
              <button
                type="button"
                onClick={handleNext}
                className="h-12 px-space-sm rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-transform shadow-md hover:bg-primary cursor-pointer"
              >
                <span>Save & Next</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Question Palette Matrix */}
            <section aria-labelledby="palette-heading" className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md mt-space-sm border border-outline-variant/30">
              <div className="flex items-center justify-between mb-space-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-xs font-bold" id="palette-heading">
                  <span className="material-symbols-outlined text-secondary text-[20px]">grid_view</span>
                  Question Palette ({totalQuestions})
                </h3>
                <span className="font-label-code text-label-code bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant">
                  Section A: Core Theory
                </span>
              </div>

              {/* Color Coding Status Legend */}
              <div className="flex flex-wrap items-center gap-space-xs mb-space-md bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-space-sm py-1 rounded text-label-sm font-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-space-sm py-1 rounded text-label-sm font-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                  <span>Review ({reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container-highest text-on-surface-variant px-space-sm py-1 rounded text-label-sm font-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span>Unanswered ({unansweredCount})</span>
                </div>
              </div>

              {/* 30 Questions Grid Layout */}
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = !!selectedAnswers[q.id];
                  const isFlagged = !!flaggedQuestions[q.id];

                  let itemClasses = 'h-11 rounded-lg font-label-code text-label-code font-bold flex items-center justify-center transition-all cursor-pointer relative ';

                  if (isCurrent) {
                    itemClasses += 'bg-primary text-on-primary shadow-lg ring-2 ring-secondary ';
                  } else if (isFlagged) {
                    itemClasses += 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed/80 ';
                  } else if (isAnswered) {
                    itemClasses += 'bg-emerald-100 text-emerald-800 hover:opacity-90 ';
                  } else {
                    itemClasses += 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high ';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onNavigateQuestion(idx)}
                      className={itemClasses}
                      title={`Jump to Question ${q.questionNumber}`}
                    >
                      {String(q.questionNumber).padStart(2, '0')}
                      {isCurrent && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                      )}
                      {isFlagged && !isCurrent && (
                        <span className="absolute top-0.5 right-1 text-[10px]">⚑</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Submission Emergency Trigger */}
              <div className="mt-space-md pt-space-sm flex items-center justify-between border-t border-surface-container">
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span className="font-label-sm text-label-sm">Total Question Progress: {progressPercent}%</span>
                </div>
                <button
                  type="button"
                  onClick={onSubmitExam}
                  className="h-10 px-space-md rounded-lg bg-error text-on-error font-label-md text-label-md font-bold shadow-md hover:bg-red-700 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Submit Final Exam</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

