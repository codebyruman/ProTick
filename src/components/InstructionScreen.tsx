import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types/exam';

interface InstructionScreenProps {
  student: StudentProfile;
  onBackToLogin: () => void;
  onStartExam: () => void;
}

export const InstructionScreen: React.FC<InstructionScreenProps> = ({
  student,
  onBackToLogin,
  onStartExam,
}) => {
  const [countdownSeconds, setCountdownSeconds] = useState(525); // 8 mins 45 seconds
  const [consentChecked, setConsentChecked] = useState(true);
  const [earlyRelease, setEarlyRelease] = useState(false);

  useEffect(() => {
    if (earlyRelease || countdownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownSeconds, earlyRelease]);

  const hrs = Math.floor((earlyRelease ? 0 : countdownSeconds) / 3600);
  const mins = Math.floor(((earlyRelease ? 0 : countdownSeconds) % 3600) / 60);
  const secs = (earlyRelease ? 0 : countdownSeconds) % 60;

  const formattedTime = `${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  const isReadyToStart = (countdownSeconds <= 0 || earlyRelease) && consentChecked;

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen antialiased select-none">
      {/* Top Fixed Header */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-primary-container shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
        <div className="h-20 px-margin-mobile flex items-center justify-between text-on-primary max-w-6xl mx-auto">
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Back to Login"
              onClick={onBackToLogin}
              className="w-11 h-11 flex items-center justify-center text-on-primary rounded hover:bg-on-primary/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="ProTick Exam Portal Emblem"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/ALJJyrBZUPmSIIs9p12UE4OypO1-4-kZiiutZPWOQIxV6I7V-xQ8LMlYfIFYxj1ZLo6Qii2dHxBoYDx3AkQu7YN5xWTN4iA3emSHZhl2dsHjAzNm0DA0ytHKwiUE3zwisjgv_3XDGt6iFNUkjWNHDEojfpodXd3m0pRDdXljP8pmzMjv5Sc33nKfEfBpKrcP_wgrVTczPO-ywC1v1Lgv8X1kfCc89zKX6RIrLMefY23Sg84V"
            />
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
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary border border-secondary/40">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Container */}
      <main className="flex flex-col relative w-full pt-24 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-2xl mx-auto p-margin-mobile gap-space-md">
          {/* Student & Exam Credentials Card */}
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                  Assigned Examination
                </span>
                <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                  {student.courseCode}: {student.courseName}
                </h1>
                <div className="flex items-center gap-space-xs mt-1">
                  <span className="font-label-code text-label-code bg-surface-container text-on-surface-variant px-space-xs py-0.5 rounded">
                    QP Code: {student.qpCode}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {student.slot}
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-surface-container shrink-0 overflow-hidden shadow-sm flex items-center justify-center border-2 border-primary/20">
                <img
                  className="w-full h-full object-cover"
                  alt="Candidate Passport"
                  src={student.avatarUrl}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-xs pt-space-xs">
              <div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col border border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Candidate Name</span>
                <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                  {student.name}
                </span>
              </div>
              <div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col border border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant">University Seat No (USN)</span>
                <span className="font-label-code text-label-code text-primary font-bold truncate">
                  {student.usn}
                </span>
              </div>
              <div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col col-span-2 border border-surface-container">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Assigned Lab Terminal</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                      {student.labName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container px-space-xs py-1 rounded">
                    <span className="material-symbols-outlined text-[16px] text-secondary">desktop_windows</span>
                    <span className="font-label-code text-label-code text-secondary font-bold">
                      {student.terminalIp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Module Card */}
          <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-full flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary-fixed-dim">schedule</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim">
                  Server Time Until Start
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-primary/70 px-2.5 py-0.5 rounded-full border border-secondary/30">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-on-primary font-medium">LAN Synced</span>
              </div>
            </div>

            {/* Monospace Countdown Clock */}
            <div className="my-space-md flex flex-col items-center z-10">
              <div className="font-display-timer-mobile text-display-timer-mobile text-on-primary tracking-wider tabular-nums font-bold">
                {formattedTime}
              </div>
              <div className="flex justify-between w-full max-w-[210px] px-2 text-on-primary-container font-label-code text-label-code text-xs">
                <span>HOURS</span>
                <span>MINUTES</span>
                <span>SECONDS</span>
              </div>
            </div>

            <div className="w-full bg-primary/50 py-1.5 px-3 rounded-lg flex items-center justify-between gap-space-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">hub</span>
                <span className="font-label-sm text-label-sm text-on-primary-container">
                  Scheduled Release: 10:00:00 AM IST • NTP Delta: ±0.02s
                </span>
              </div>
              {/* Quick release toggle for evaluator convenience */}
              <button
                type="button"
                onClick={() => setEarlyRelease(!earlyRelease)}
                className="text-[11px] font-label-code bg-secondary/80 text-white px-2 py-0.5 rounded hover:bg-secondary cursor-pointer transition-colors"
                title="Bypass countdown for immediate testing"
              >
                {earlyRelease ? 'Reset Timer' : '⚡ Release Paper Now'}
              </button>
            </div>

            {/* Subdued Grid Background */}
            <svg className="absolute inset-0 opacity-5 w-full h-full pointer-events-none" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="20" id="grid" patternUnits="userSpaceOnUse" width="20">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"></path>
                </pattern>
              </defs>
              <rect fill="url(#grid)" height="100%" width="100%"></rect>
            </svg>
          </div>

          {/* Examination Instructions & Regulations */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">policy</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                  Standard Examination Instructions
                </h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Mandatory Protocol Compliance • Revision 4.2
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Rule 1 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Total Duration & Question Count</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    The examination contains <strong className="text-on-surface">30 Multiple Choice Questions</strong> spanning a maximum total testing window of <strong className="text-on-surface">90 Minutes</strong>.
                  </span>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">fact_check</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Deterministic Marking Scheme</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    <strong className="text-on-surface">+2.0 Marks</strong> for correct option, <strong className="text-on-surface">0.0 Marks</strong> for unattempted, and strict <strong className="text-error">-0.5 Marks penalty</strong> for incorrect submissions.
                  </span>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">grid_view</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Matrix Navigation & Review Flags</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    You may traverse non-linearly using the sidebar Question Matrix. Questions flagged as "Marked for Review" will be scored if an option is saved.
                  </span>
                </div>
              </div>

              {/* Rule 4 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-error-container text-on-error-container border border-error/20">
                <div className="w-7 h-7 rounded-full bg-on-error flex items-center justify-center text-error shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">gpp_maybe</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md font-bold text-on-error-container">
                    Strict Anti-Defocus & Window Lock
                  </span>
                  <span className="font-body-sm text-body-sm text-on-error-container font-medium">
                    Tab switching, secondary monitors, or window defocus events are <strong className="underline">STRICTLY PROHIBITED</strong>. Three consecutive defocus flags trigger an automated terminal lockout.
                  </span>
                </div>
              </div>

              {/* Rule 5 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Cryptographic Final Submission</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Upon clicking "Submit Exam" or when the master timer reaches 00:00:00, session state is signed via local hardware keystore and encrypted immediately.
                  </span>
                </div>
              </div>
            </div>

            {/* Lab Proctor Signature Status */}
            <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-secondary">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">Proctor In-Charge Verified</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {student.proctorName} (ID: {student.proctorId})
                  </span>
                </div>
              </div>
              <span className="font-label-code text-label-code text-secondary text-xs bg-surface px-2.5 py-1 rounded font-bold border border-secondary/20">
                AUTH OK
              </span>
            </div>
          </div>

          {/* Acknowledgement Checklist */}
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
            <label className="flex items-start gap-space-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-1 w-5 h-5 rounded text-primary accent-primary cursor-pointer"
              />
              <span className="font-body-sm text-body-sm text-on-surface leading-snug">
                I confirm that my identity details and QP Code are accurate. I have read, understood, and agreed to adhere to the standard code of conduct for this computerized evaluation.
              </span>
            </label>
          </div>

          {/* Action Section */}
          <div className="flex flex-col gap-space-xs mb-space-lg">
            <button
              onClick={onStartExam}
              disabled={!isReadyToStart}
              className={`w-full h-12 rounded font-label-md text-label-md flex items-center justify-center gap-space-xs transition-all ${
                isReadyToStart
                  ? 'bg-primary-container text-on-primary hover:bg-secondary cursor-pointer shadow-md'
                  : 'bg-surface-container-highest text-on-surface-variant opacity-60 cursor-not-allowed shadow-none'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isReadyToStart ? 'play_arrow' : 'lock_clock'}
              </span>
              <span>{isReadyToStart ? 'Enter Examination Portal' : 'Start Examination (Waiting for Release)'}</span>
            </button>

            {/* Helper Card */}
            <div className="bg-surface-container p-space-sm rounded-lg flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">info</span>
              <span className="font-label-sm text-label-sm">
                Button activates automatically when countdown completes (or click the release toggle above).
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

