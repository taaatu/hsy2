import styles from './CreateSurvey.module.css';
import Card from 'react-bootstrap/Card';
import { FaTrashAlt } from 'react-icons/fa';
import { Control, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import { Survey } from '../../../../interfaces/Survey';

type Props = {
  index: number;
  register: UseFormRegister<Survey>;
  control: Control<Survey>;
  remove: UseFieldArrayRemove;
};
// Component for adding questions to survey
const AddQuestion = ({ index, register, /* control, */ remove }: Props) => {
  // const output = useWatch({
  //   name: 'questions',
  //   control,
  // });

  return (
    <Card id={`question-${index + 1}`}>
      <Card.Header as="h4">Kysymys {index + 1}</Card.Header>
      <Card.Body>
        <textarea
          placeholder="Kysymys"
          id="question"
          className={styles.input}
          {...register(`questions.${index}.question`, {
            required: {
              value: true,
              message: 'Kysymys vaaditaan',
            },
          })}
        />
        <div className="column" style={{ gap: '0.5rem' }}>
          <div className="center-align">
            <span className={styles.dot} />
            <input
              className={`${styles.optionInput} line`}
              id={`question-${index + 1}-option-1`}
              placeholder="Vastaus 1"
              {...register(`questions.${index}.option_1`, {
                required: {
                  value: true,
                  message: '1. vastausvaihtoehto vaaditaan',
                },
              })}
            />
            <div>+1</div>
          </div>
          <div className="center-align">
            <span className={styles.dot} />
            <input
              className={`${styles.optionInput} line`}
              id={`question-${index + 1}-option-2`}
              placeholder="Vastaus 2"
              {...register(`questions.${index}.option_2`, {
                required: {
                  value: true,
                  message: '2. vastausvaihtoehto vaaditaan',
                },
              })}
            />
            <div>+0,5</div>
          </div>
          <div className="center-align">
            <span className={styles.dot} />
            <input
              className={`${styles.optionInput} line`}
              id={`question-${index + 1}-option-3`}
              placeholder="Vastaus 3"
              {...register(`questions.${index}.option_3`, {
                required: {
                  value: true,
                  message: '3. vastausvaihtoehto vaaditaan',
                },
              })}
            />
            <div>0</div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <button onClick={() => remove(index)} className="delete">
          <FaTrashAlt />
        </button>
      </Card.Footer>
    </Card>
  );
};

export default AddQuestion;
