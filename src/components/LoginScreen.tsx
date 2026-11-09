import React, { useState } from 'react';
import { StudentProfile } from '../types/exam';
import { ProTickLogo } from './ProTickLogo';

interface LoginScreenProps {
  student: StudentProfile;
  onLoginSuccess: (usn: string, dob: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ student, onLoginSuccess }) => {
  const [usn, setUsn] = useState(student.usn);
  const [dob, setDob] = useState(student.dob);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [invigilatorCalled, setInvigilatorCalled] = useState(false);

  const isUsnValid = usn.length === 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usn || !dob) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        onLoginSuccess(usn, dob);
      }, 700);
    }, 1100);
  };

  return (
    <div className="flex flex-col relative w-full bg-surface min-h-screen">
      <div className="flex flex-col w-full px-margin-mobile py-space-md max-w-xl mx-auto my-auto">
        {/* Header Branding */}
        <header className="flex flex-col items-center text-center space-y-space-xs mb-space-md">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-surface-container shadow-sm p-1.5 mb-space-xs">
            <ProTickLogo className="w-12 h-12" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>SECURE TERMINAL READY</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-space-xs font-bold">
            ProTick Academic CBT Portal
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            State Board Computer-Based Examination • Offline Terminal 19
          </p>
        </header>

        {/* Login Container Box */}
        <div className="w-full bg-surface-container-lowest rounded-xl shadow-md p-space-md sm:p-space-lg flex flex-col space-y-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
            <div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Authorized Student Login</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-code text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">wifi_off</span>
              <span>MESH #04</span>
            </div>
          </div>

          <form className="flex flex-col space-y-space-md" onSubmit={handleSubmit}>
            {/* USN Input */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface flex items-center justify-between" htmlFor="usn-input">
                <span>USN (University Seat Number)</span>
                <span className="text-secondary font-body-sm text-label-sm font-semibold">REQUIRED</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  id="usn-input"
                  type="text"
                  maxLength={10}
                  value={usn}
                  onChange={(e) => setUsn(e.target.value.toUpperCase())}
                  placeholder="e.g. 1RV21CS089"
                  required
                  spellCheck="false"
                  autoComplete="off"
                  className="w-full h-12 pl-10 pr-10 bg-surface-container-low rounded-lg font-label-code text-label-code uppercase tracking-wider text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none transition-all border border-transparent focus:border-secondary"
                />
                <span
                  className={`absolute right-3 material-symbols-outlined text-[20px] pointer-events-none transition-colors ${
                    isUsnValid ? 'text-secondary' : 'text-outline'
                  }`}
                >
                  check_circle
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant pl-0.5">
                Enter your 10-digit registered Seat Number exactly as printed on admit card.
              </p>
            </div>

            {/* DOB Input */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface flex items-center justify-between" htmlFor="dob-input">
                <span>Date of Birth (DOB)</span>
                <span className="text-on-surface-variant font-label-code text-label-sm">YYYY-MM-DD</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
                  calendar_today
                </span>
                <input
                  id="dob-input"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-3 bg-surface-container-low rounded-lg font-label-code text-label-code text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none transition-all border border-transparent focus:border-secondary"
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant pl-0.5">
                Format: Select registered candidate date of birth for identity confirmation.
              </p>
            </div>

            {/* Offline Integrity Banner */}
            <div className="p-space-sm rounded-lg bg-surface-container flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5 shrink-0">
                verified_user
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Offline Integrity Active</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Station sync completed at 08:45 AM. Uninterrupted testing enabled.</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="login-btn"
              type="submit"
              disabled={isVerifying || isVerified}
              className={`w-full h-12 rounded-lg text-on-primary font-label-md text-label-md flex items-center justify-center gap-space-sm shadow-md active:scale-[0.99] transition-all cursor-pointer ${
                isVerified
                  ? 'bg-secondary'
                  : isVerifying
                  ? 'bg-primary-container opacity-90'
                  : 'bg-primary-container hover:bg-secondary'
              }`}
            >
              {isVerifying ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                  <span>Verifying Offline Credentials...</span>
                </>
              ) : isVerified ? (
                <>
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Identity Verified • Launching Paper</span>
                </>
              ) : (
                <>
                  <span>Login to Examination</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Security details */}
          <div className="pt-space-xs flex flex-col space-y-space-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px] text-outline">shield</span>
              <span>Terminal locked to ProTick Secure Browser v4.2</span>
            </div>
            <p className="font-label-sm text-label-sm text-outline-variant max-w-sm mx-auto leading-relaxed">
              Biometric and session logs are monitored offline. Any attempt to minimize or switch display triggers immediate supervisor notification.
            </p>
          </div>
        </div>

        {/* Footer Meta Strip */}
        <div className="mt-space-md flex flex-wrap items-center justify-center gap-space-md text-on-surface-variant text-label-sm font-label-sm">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
            <span>Terminal ID: WS-104-E</span>
          </div>
          <span className="text-outline">•</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">speed</span>
            <span>Latency: 0ms (Local)</span>
          </div>
          <span className="text-outline">•</span>
          <button
            type="button"
            onClick={() => setInvigilatorCalled(true)}
            className="text-secondary hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">help</span>
            <span>Call Invigilator</span>
          </button>
        </div>
      </div>

      {/* Invigilator Summon Modal */}
      {invigilatorCalled && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-sm w-full p-space-md rounded-xl shadow-xl flex flex-col gap-3 border border-secondary/20">
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <span>Invigilator Summoned</span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              An assistance request has been transmitted for <strong>Terminal WS-19</strong>. The lab proctor has been notified. Please remain at your workstation.
            </p>
            <button
              onClick={() => setInvigilatorCalled(false)}
              className="mt-2 w-full h-10 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-secondary transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

