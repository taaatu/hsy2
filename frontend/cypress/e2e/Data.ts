import { Question } from '../../src/interfaces/Question';
import { SurveyHeader } from '../../src/interfaces/Survey';
import { User } from '../../src/interfaces/User';

const testUser: User = {
  email: 'testuser@test.com',
  password: 'Test1234',
  full_name: 'John Doe',
  company: 'Test Company',
};

export const testSurveyHeader: Partial<SurveyHeader> = {
  survey_title: 'Test Survey ' + Math.floor(Math.random() * 90000) + 10000,
  end_time: '2030-12-12',
  description: 'Test Survey Description',
};

export const testQuestions: Question[] = [
  {
    question: 'Test Question 1',
    option_1: 'Question 1 Option 1',
    option_2: 'Question 1 Option 2',
    option_3: 'Question 1 Option 3',
  },
  {
    question: 'Test Question 2',
    option_1: 'Question 2 Option 1',
    option_2: 'Question 2 Option 2',
    option_3: 'Question 2 Option 3',
  },
  {
    question: 'Test Question 3',
    option_1: 'Question 3 Option 1',
    option_2: 'Question 3 Option 2',
    option_3: 'Question 3 Option 3',
  },
];
