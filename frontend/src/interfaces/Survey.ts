import { Question } from './Question';

interface Survey {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  questions: Question[];
}

export { Survey };
