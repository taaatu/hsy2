// import { Question } from './Question';
import { Question } from '../interfaces/Question';
import { Survey, SurveyHeader } from '../interfaces/Survey';

const question1: Question = {
  question: 'Pyrin pitämään huonelämpötilan suositusten mukaisena',
  option_1: 'Pidän tärkeänä tai toiminin näin',
  option_2: 'Asialla ei ole merkitystä tai asia ei koske minua',
  option_3: 'En pidä tärkeänä tai en toimi näin',
};
const question2: Question = {
  question: 'Suljetko valot poistuessasi huoneesta?',
  option_1: 'Pidän tärkeänä tai toiminin näin',
  option_2: 'Asialla ei ole merkitystä tai asia ei koske minua',
  option_3: 'En pidä tärkeänä tai en toimi näin',
};
const sHeader: SurveyHeader = {
  survey_title: 'Testi kysely',
  survey_id: 1,
  description: 'Tämä on testi kysely',
};
export const testSurvey: Survey = {
  survey_header: sHeader,
  startDate: '2021-01-01',
  endDate: '2021-01-31',
  questions: [question1, question2],
};
