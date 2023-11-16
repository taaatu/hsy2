import { FieldErrors } from 'react-hook-form';
import { Survey } from '../../../../interfaces/Survey';
import { FormFieldError } from '../../../../components/FormFieldError';
import { Question } from '../../../../interfaces/Question';

type Props = {
  errors: FieldErrors<Survey>;
  questions: Question[];
};
export const FormErrorList = ({ errors, questions }: Props) => {
  return (
    <>
      <FormFieldError error={errors.survey_header?.survey_title} />
      <FormFieldError error={errors.survey_header?.start_time} />
      <FormFieldError error={errors.survey_header?.end_time} />
      <FormFieldError error={errors.survey_header?.description} />

      {errors.questions &&
        questions.map((_, index) => (
          <>
            <p className="error">Kysymys {index + 1}</p>
            <FormFieldError
              error={errors.questions && errors.questions[index]?.question}
            />
            <FormFieldError
              error={errors.questions && errors.questions[index]?.option_1}
            />
            <FormFieldError
              error={errors.questions && errors.questions[index]?.option_2}
            />
            <FormFieldError
              error={errors.questions && errors.questions[index]?.option_3}
            />
          </>
        ))}
    </>
  );
};
