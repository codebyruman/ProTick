export interface Question {
  id: number;
  questionNumber: number;
  text: string;
  contextHeader?: string;
  contextFormula?: string;
  contextFormulaNote?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  marksPositive: number;
  marksNegative: number;
}

export type QuestionStatus = 'answered' | 'review' | 'unanswered';

export interface StudentProfile {
  name: string;
  usn: string;
  dob: string;
  department: string;
  semester: string;
  courseCode: string;
  courseName: string;
  qpCode: string;
  slot: string;
  terminalId: string;
  terminalIp: string;
  labName: string;
  proctorName: string;
  proctorId: string;
  avatarUrl: string;
}

export interface ExamState {
  currentView: 'login' | 'instructions' | 'exam' | 'review' | 'post-submission';
  student: StudentProfile;
  selectedAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Record<number, boolean>;
  currentQuestionIndex: number;
  timeRemainingSeconds: number; // e.g., 90 mins or custom
  defocusCount: number;
  lastAutosaveSecondsAgo: number;
  submissionHash?: string;
  submissionTimestamp?: string;
}

