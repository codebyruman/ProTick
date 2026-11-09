import React, { useState } from 'react';
import { Question, StudentProfile } from '../types/exam';
import { ProTickLogo } from './ProTickLogo';

interface ReviewDashboardScreenProps {
  student: StudentProfile;
  questions: Question[];
  selectedAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Record<number, boolean>;
  onReturnToExam: (targetQuestionIndex?: number) => void;
  onConfirmFinalSubmission: () => void;
}

export const ReviewDashboardScreen: React.FC<ReviewDashboardScreenProps> = ({
  student,
  questions,
  selectedAnswers,
  flaggedQuestions,
  onReturnToExam,
  onConfirmFinalSubmission,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.keys(flaggedQuestions).filter((k) => flaggedQuestions[Number(k)]).length;
  const unansweredCount = totalQuestions - answeredCount;

  const answeredPercent = ((answeredCount / totalQuestions) * 100).toFixed(1);
  const unansweredPercent = ((unansweredCount / totalQuestions) * 100).toFixed(1);
  const reviewPercent = ((reviewCount / totalQuestions) * 100).toFixed(1);

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmFinalSubmission();
    }, 1200);
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen antialiased select-none">
      {/* Fixed Top Header */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-primary-container shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
        <div className="h-20 px-margin-mobile flex items-center justify-between text-on-primary max-w-6xl mx-auto">
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Back"
              onClick={() => onReturnToExam()}
              className="w-11 h-11 flex items-center justify-center text-on-primary rounded hover:bg-on-primary/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <ProTickLogo className="w-8 h-8" />
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-primary leading-none">
                  Submission Verification
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

      {/* Main Review Body */}
      <main className="flex flex-col relative w-full pt-20 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-2xl mx-auto px-margin-mobile py-space-md gap-space-md">
          {/* Candidate Context & Course Banner */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
            <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                  CBT Verification Stage
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-code text-label-code">
                <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                <span>SESSION-HASH #8A92</span>
              </div>
            </div>

            <div className="flex items-start gap-space-md pt-space-xs">
              <img
                className="w-14 h-14 rounded-lg object-cover bg-surface-container shrink-0 shadow-sm border border-outline-variant/30"
                alt="Candidate"
                src={student.avatarUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23dce9ff"/><circle cx="50" cy="38" r="20" fill="%234059aa"/><path d="M20 85 C20 65, 35 60, 50 60 C65 60, 80 65, 80 85 Z" fill="%234059aa"/></svg>';
                }}
              />
              <div className="flex flex-col min-w-0">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                  {student.name}
                </h2>
                <div className="flex items-center gap-space-xs mt-0.5">
                  <span className="font-label-code text-label-code text-on-surface-variant font-medium">
                    USN: {student.usn}
                  </span>
                  <span className="text-on-surface-variant text-label-sm">•</span>
                  <span className="font-label-sm text-label-sm text-secondary truncate font-medium">
                    {student.department}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">
                  {student.courseCode}: {student.courseName}
                </p>
              </div>
            </div>
          </div>

          {/* Exam Meta Ticker */}
          <div className="grid grid-cols-2 gap-gutter-mobile">
            <div className="bg-surface-container-low rounded-xl p-space-md flex items-center gap-space-sm shadow-sm border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">timer</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Time Left
                </span>
                <span className="font-display-timer-mobile text-display-timer-mobile text-error leading-none mt-0.5 font-bold">
                  00:14:22
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md flex items-center gap-space-sm shadow-sm border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Terminal Integrity
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5 flex items-center gap-1">
                  100%
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">Passed</span>
                </span>
              </div>
            </div>
          </div>

          {/* Stats: High-Impact Metric Cards */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Response Reconciliation
              </span>
              <span className="font-label-code text-label-code text-on-surface-variant font-semibold">
                Total: {totalQuestions} Questions
              </span>
            </div>

            {/* Metric 1: Answered */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between border border-outline-variant/30">
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    task_alt
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-bold">Answered</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Saved for final scoring
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-lg text-headline-lg font-bold text-primary">
                  {String(answeredCount).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  {answeredPercent}%
                </span>
              </div>
            </div>

            {/* Metric 2: Unanswered */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between border border-outline-variant/30">
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-outline shrink-0">
                  <span className="material-symbols-outlined text-[28px]">radio_button_unchecked</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-bold">Unanswered</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Will receive 0 marks
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-lg text-headline-lg font-bold text-outline">
                  {String(unansweredCount).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  {unansweredPercent}%
                </span>
              </div>
            </div>

            {/* Metric 3: Marked for Review */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between border border-outline-variant/30">
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    flag
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-bold">Marked for Review</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Needs candidate check
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-lg text-headline-lg font-bold text-secondary">
                  {String(reviewCount).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  {reviewPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Section Palette Breakdown Card with Matrix Preview */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-bold">Question Palette Preview</span>
              <button
                type="button"
                onClick={() => onReturnToExam()}
                className="font-label-sm text-label-sm text-secondary flex items-center gap-1 hover:underline cursor-pointer font-semibold"
              >
                <span>Jump to Matrix</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Palette mini chips */}
            <div className="grid grid-cols-6 gap-2">
              {questions.slice(0, 12).map((q, idx) => {
                const isAnswered = !!selectedAnswers[q.id];
                const isFlagged = !!flaggedQuestions[q.id];

                let chipClass = 'h-9 rounded flex items-center justify-center font-label-code text-label-code font-bold transition-transform hover:scale-105 cursor-pointer ';
                if (isFlagged) {
                  chipClass += 'bg-secondary-fixed text-on-secondary-fixed-variant';
                } else if (isAnswered) {
                  chipClass += 'bg-surface-container text-primary';
                } else {
                  chipClass += 'bg-surface-container-low text-outline';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => onReturnToExam(idx)}
                    className={chipClass}
                    title={`Click to inspect Question ${q.questionNumber}`}
                  >
                    {String(q.questionNumber).padStart(2, '0')}{isFlagged ? '⚑' : ''}
                  </button>
                );
              })}
            </div>

            {/* Synchronized Offline Buffer Status */}
            <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center gap-space-sm border border-surface-container">
              <span className="material-symbols-outlined text-[18px] text-primary">lan</span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Local SQLite Ledger Synced
                </span>
                <span className="font-label-code text-label-code text-on-surface-variant truncate">
                  SHA-256: 7fc2a8d119be449f8016
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-space-xs pb-space-lg flex flex-col gap-space-sm">
            <button
              id="openModalBtn"
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-space-xs shadow-md hover:bg-secondary active:scale-[0.99] transition-all cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>Proceed to Examination Submission</span>
            </button>
            <p className="font-label-sm text-label-sm text-center text-on-surface-variant">
              Workstation verification token will be finalized upon submission.
            </p>
          </div>
        </div>
      </main>

      {/* Confirmation Modal Overlay */}
      {isModalOpen && (
        <div
          id="confirmationBackdrop"
          className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-margin-mobile animate-in fade-in duration-200"
        >
          <div
            id="confirmationDialog"
            className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md border border-outline-variant/30"
          >
            {/* Header */}
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield_with_heart
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm text-error uppercase font-bold tracking-wider">
                    Terminal Locked
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                  Confirm Final Exam Submission
                </h3>
              </div>
            </div>

            {/* Warning Notice Box */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs border border-error/20">
              <div className="flex items-center gap-space-xs text-on-surface font-label-md text-label-md font-semibold">
                <span className="material-symbols-outlined text-[18px] text-error">warning</span>
                <span>Irreversible Action Notice</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Are you sure you want to end this examination? Once submitted, your responses will be encrypted, locked, and transmitted to the university grading server. You cannot return or modify any answers.
              </p>
            </div>

            {/* Quick Breakdown Pill */}
            <div className="bg-surface-container rounded-xl p-space-sm flex items-center justify-around text-center">
              <div className="flex flex-col items-center">
                <span className="font-label-code text-label-code font-bold text-primary text-[16px]">
                  {String(answeredCount).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Answered</span>
              </div>
              <div className="w-px h-6 bg-outline-variant"></div>
              <div className="flex flex-col items-center">
                <span className="font-label-code text-label-code font-bold text-outline text-[16px]">
                  {String(unansweredCount).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Unanswered</span>
              </div>
              <div className="w-px h-6 bg-outline-variant"></div>
              <div className="flex flex-col items-center">
                <span className="font-label-code text-label-code font-bold text-secondary text-[16px]">
                  {String(reviewCount).padStart(2, '0')}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Review</span>
              </div>
            </div>

            {/* Machine Verification Fingerprint */}
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Lab Station Node</span>
              <span className="font-label-code text-label-code text-primary font-semibold">
                {student.terminalId} // DISK-OK
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <button
                id="finalSubmitBtn"
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="w-full h-12 bg-primary text-on-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-space-sm shadow-md hover:bg-secondary active:scale-[0.99] transition-all cursor-pointer font-bold disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                    <span>Encrypting & Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      lock
                    </span>
                    <span>Confirm Final Submission</span>
                  </>
                )}
              </button>

              <button
                id="cancelModalBtn"
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsModalOpen(false)}
                className="w-full h-12 bg-surface-container-low text-on-surface rounded-xl font-label-md text-label-md flex items-center justify-center gap-space-xs hover:bg-surface-container active:bg-surface-container-high transition-colors cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">keyboard_return</span>
                <span>Cancel & Return to Exam</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

