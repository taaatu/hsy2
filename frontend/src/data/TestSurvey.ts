// import { Question } from './Question';
import { Question } from '../interfaces/Question';
import { Survey } from '../interfaces/Survey';

const question1: Question = {
  question: 'Pyrin pitämään huonelämpötilan suositusten mukaisena',
  answer1: 'Pidän tärkeänä tai toiminin näin',
  answer2: 'Asialla ei ole merkitystä tai asia ei koske minua',
  answer3: 'En pidä tärkeänä tai en toimi näin',
};
const question2: Question = {
  question: 'Suljetko valot poistuessasi huoneesta?',
  answer1: 'Pidän tärkeänä tai toiminin näin',
  answer2: 'Asialla ei ole merkitystä tai asia ei koske minua',
  answer3: 'En pidä tärkeänä tai en toimi näin',
};

export const testSurvey: Survey = {
  title: 'Test Survey',
  description: 'This is a test survey',
  startDate: '2021-01-01',
  endDate: '2021-01-31',
  questions: [question1, question2],
};
