import { useState, useEffect } from 'react';
import { initialStudentProfile, examQuestions, initialAnswers, initialFlags } from './data/mockExamData';
import { LoginScreen } from './components/LoginScreen';
import { InstructionScreen } from './components/InstructionScreen';
import { ExamScreen } from './components/ExamScreen';
import { ReviewDashboardScreen } from './components/ReviewDashboardScreen';
import { PostSubmissionScreen } from './components/PostSubmissionScreen';
import { NavigationBanner } from './components/NavigationBanner';

type ViewType = 'login' | 'instructions' | 'exam' | 'review' | 'post-submission';

const getViewFromPath = (): ViewType => {
  if (typeof window === 'undefined') return 'login';
  const path = window.location.pathname.toLowerCase();
  if (path.includes('instruction')) return 'instructions';
  if (path.includes('exam')) return 'exam';
  if (path.includes('review') || path.includes('app')) return 'review';
  if (path.includes('post') || path.includes('submit')) return 'post-submission';
  return 'login';
};

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>(getViewFromPath);
  const [student, setStudent] = useState(initialStudentProfile);
  const [questions] = useState(examQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>(initialAnswers);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>(initialFlags);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(13); // Question 14 (Floyd-Warshall)

  // Sync state when browser navigation happens
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const changeView = (view: ViewType) => {
    setCurrentView(view);
    const path = view === 'login' ? '/' : `/${view}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  // Login handler
  const handleLoginSuccess = (usn: string, dob: string) => {
    setStudent((prev) => ({ ...prev, usn, dob }));
    changeView('instructions');
  };

  // Option selection handler
  const handleSelectOption = (questionId: number, optionKey: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  // Toggle flag / review
  const handleToggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Reset demo
  const handleResetSession = () => {
    setSelectedAnswers(initialAnswers);
    setFlaggedQuestions(initialFlags);
    setCurrentQuestionIndex(13);
    changeView('login');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      {/* Active Screen Rendering */}
      {currentView === 'login' && (
        <LoginScreen
          student={student}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'instructions' && (
        <InstructionScreen
          student={student}
          onBackToLogin={() => changeView('login')}
          onStartExam={() => changeView('exam')}
        />
      )}

      {currentView === 'exam' && (
        <ExamScreen
          student={student}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          onSelectOption={handleSelectOption}
          onToggleFlag={handleToggleFlag}
          onNavigateQuestion={(idx) => setCurrentQuestionIndex(idx)}
          onSubmitExam={() => changeView('review')}
          onBackToInstructions={() => changeView('instructions')}
        />
      )}

      {currentView === 'review' && (
        <ReviewDashboardScreen
          student={student}
          questions={questions}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          onReturnToExam={(targetIdx) => {
            if (targetIdx !== undefined) {
              setCurrentQuestionIndex(targetIdx);
            }
            changeView('exam');
          }}
          onConfirmFinalSubmission={() => changeView('post-submission')}
        />
      )}

      {currentView === 'post-submission' && (
        <PostSubmissionScreen
          student={student}
          totalQuestions={questions.length}
          answeredCount={Object.keys(selectedAnswers).length}
          onResetSession={handleResetSession}
        />
      )}

      {/* Floating Stitch Screens Navigator Bar */}
      <NavigationBanner
        currentView={currentView}
        onSelectView={(view) => changeView(view)}
      />
    </div>
  );
}

export default App;
