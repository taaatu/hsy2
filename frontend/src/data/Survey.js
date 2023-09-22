import { Question } from './Question';

export class Survey {
  constructor(title, description, startDate, endDate, questions) {
    this.title = title;
    this.description = description;
    this.endDate = endDate;
    this.startDate = startDate;
    this.questions = questions;
  }
}

const q1 = new Question(
  'Suljetko valot poistuessasi huoneesta?',
  'Pidän tärkeänä tai toiminin näin',
  'Asialla ei ole merkitystä tai asia ei koske minua',
  'En pidä tärkeänä tai en toimi näin'
);
const q2 = new Question(
  'Pyrin pitämään huonelämpötilan suositusten mukaisena',
  'Pidän tärkeänä tai toiminin näin',
  'Asialla ei ole merkitystä tai asia ei koske minua',
  'En pidä tärkeänä tai en toimi näin'
);
export const testSurvey = new Survey(
  'Test Survey',
  'This is a test survey',
  '2021-01-01',
  '2021-01-31',
  [q1, q2]
);
