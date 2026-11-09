import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StudentProfile } from '../types/exam';

interface PostSubmissionScreenProps {
  student: StudentProfile;
  totalQuestions: number;
  answeredCount: number;
  onResetSession: () => void;
}

export const PostSubmissionScreen: React.FC<PostSubmissionScreenProps> = ({
  student,
  totalQuestions,
  answeredCount,
  onResetSession,
}) => {
  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0f2744', '#1e3a8a', '#8fa7fe', '#4059aa', '#10b981']
    });

    // Kiosk anti-navigation safety handlers (as in the Stitch spec)
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F5' ||
        e.key === 'F11' ||
        e.key === 'F12' ||
        e.key === 'Escape' ||
        ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R' || e.key === 'w' || e.key === 'W')) ||
        (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  const currentFormattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }).format(new Date());

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface pt-safe pb-safe flex flex-col min-h-screen antialiased select-none">
      <main className="flex flex-col relative w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full px-margin-mobile py-space-md max-w-xl mx-auto items-center">
          {/* Security Authority Header */}
          <div className="w-full flex items-center justify-between bg-surface-container-low px-space-md py-space-sm rounded-xl mb-space-lg shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase font-bold">
                  ProTick CBT System
                </span>
                <span className="font-label-code text-[11px] text-on-surface-variant leading-none font-semibold">
                  SECURE KIOSK ENGINE v4.2
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-error-container text-on-error-container px-2.5 py-1 rounded-full border border-error/20">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              <span className="font-label-sm text-[11px] font-bold tracking-wider uppercase">
                Terminal Locked
              </span>
            </div>
          </div>

          {/* Primary Confirmation Module */}
          <div className="flex flex-col items-center text-center w-full mb-space-lg">
            {/* Glowing Success Emblem */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-space-md">
              <div className="absolute inset-0 rounded-full bg-surface-container-highest animate-ping opacity-25"></div>
              <div className="absolute inset-1 rounded-full bg-surface-container-high opacity-70"></div>
              <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xl">
                <span
                  className="material-symbols-outlined text-[44px] text-emerald-400"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                >
                  check_circle
                </span>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-secondary-container mb-space-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="font-label-sm text-label-sm">Cryptographic Handshake Finalized</span>
            </div>

            <h1 className="font-headline-md text-headline-md text-on-background font-bold tracking-tight mb-space-xs">
              Exam Submitted Successfully
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Your session is now closed. You may not re-enter the exam.
            </p>
          </div>

          {/* Session Audit & Encrypted Receipt Card */}
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md mb-space-md border border-outline-variant/30">
            {/* Receipt Header Strip */}
            <div className="flex items-center justify-between bg-surface-container-low px-space-md py-space-sm rounded-lg border border-surface-container">
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                  Session Audit Hash
                </span>
                <span className="font-label-code text-label-code text-primary font-bold select-all">
                  HASH-98F2-A109-CS602-SECURE
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                fingerprint
              </span>
            </div>

            {/* Integrity Breakdown Grid */}
            <div className="grid grid-cols-1 gap-space-sm">
              <div className="flex items-center justify-between px-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Verified Response Ledger
                </span>
                <span className="font-label-code text-[11px] text-secondary font-semibold">
                  AUDIT ID #22-30-VAULT
                </span>
              </div>
              {/* Candidate Details */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[20px]">badge</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Candidate</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold">{student.name}</span>
                  </div>
                </div>
                <span className="font-label-code text-label-code text-on-surface-variant bg-surface px-2.5 py-1 rounded font-bold border border-surface-container">
                  {student.usn}
                </span>
              </div>

              {/* Examination Details */}
              <div className="flex items-start justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface shrink-0">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Module & Paper</span>
                    <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                      {student.courseCode} - {student.courseName}
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-[11px] text-on-primary bg-primary px-2.5 py-1 rounded shrink-0 font-bold">
                  DEPT-CS
                </span>
              </div>

              {/* Metric Pairs */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="flex flex-col p-space-sm bg-surface-container-low rounded-lg border border-surface-container">
                  <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Responses Synced</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">
                    {answeredCount} / {totalQuestions}
                  </span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">Recorded in Vault</span>
                </div>
                <div className="flex flex-col p-space-sm bg-surface-container-low rounded-lg border border-surface-container">
                  <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Terminal Node</span>
                  <span className="font-label-code text-headline-sm text-primary font-bold mt-0.5">
                    {student.terminalId}
                  </span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">Mesh Local Host</span>
                </div>
              </div>

              {/* Finalization Timestamp */}
              <div className="flex items-center justify-between px-space-md py-space-sm bg-surface-container rounded-lg border border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">schedule</span>
                  <span className="font-label-sm text-[12px] text-on-surface-variant uppercase font-semibold">Timestamp</span>
                </div>
                <span className="font-label-code text-label-sm text-on-surface font-semibold">
                  {currentFormattedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Non-Interactive Proctor Directive Notice */}
          <div className="w-full bg-primary-container text-on-primary rounded-xl p-space-md shadow-sm flex items-start gap-space-sm mb-space-lg border border-secondary/30">
            <span className="material-symbols-outlined text-secondary-fixed text-[26px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              gavel
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-label-md text-label-md font-bold tracking-wide uppercase text-secondary-fixed">
                Important Proctor Notice
              </span>
              <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
                Please remain seated quietly until the lab proctor announces the end of the session. Do not shut down or disconnect this terminal.
              </p>
            </div>
          </div>

          {/* Terminal Isolation Watermark */}
          <div className="flex items-center justify-center gap-2 text-on-surface-variant opacity-75 mb-6">
            <span className="material-symbols-outlined text-[16px]">fitbit_arrow_upward</span>
            <span className="font-label-code text-[11px] tracking-wider uppercase font-semibold">
              KIOSK HARD-LOCKED • ALL PORTS MUTED • DO NOT REFRESH
            </span>
          </div>

          {/* Reset Session button for evaluator testing */}
          <button
            onClick={onResetSession}
            className="text-xs font-label-code text-secondary hover:text-primary hover:underline cursor-pointer flex items-center gap-1.5 py-1 px-3 rounded-full bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Reset Demo & Return to Login Screen</span>
          </button>
        </div>
      </main>
    </div>
  );
};

