import lamp from '../../../assets/lamp.png';
import chair from '../../../assets/chair.png';
import plant from '../../../assets/plant.png';
import mirror from '../../../assets/mirror.png';
import bookshelf from '../../../assets/book-shelf.png';
import {
  MESSAGE_1,
  MESSAGE_2,
  MESSAGE_3,
  MESSAGE_4,
  MESSAGE_5,
} from './Messages';

type Props = {
  pointsPercentage: number;
};

type ResultMessage = {
  itemName: string;
  message: string;
  image: string;
};

export const ResultsMessage = ({ pointsPercentage }: Props) => {
  return (
    <div className="padding1 column" style={{ margin: 'auto' }}>
      <img src={getMessage(pointsPercentage).image} alt="Result image" />
      <h4 style={{ textAlign: 'center', fontWeight: 'bolder' }}>
        Olet {getMessage(pointsPercentage).itemName}
      </h4>
      <p style={{ textAlign: 'center' }}>
        {getMessage(pointsPercentage).message}
      </p>
    </div>
  );
};

const getMessage = (pointsPercentage: number): ResultMessage => {
  if (pointsPercentage <= 19) {
    return {
      itemName: 'nojatuoli',
      message: MESSAGE_5,
      image: chair,
    };
  } else if (pointsPercentage >= 20 && pointsPercentage <= 39) {
    return {
      itemName: 'kasvi',
      message: MESSAGE_4,
      image: plant,
    };
  } else if (pointsPercentage >= 40 && pointsPercentage <= 59) {
    return {
      itemName: 'peili',
      message: MESSAGE_3,
      image: mirror,
    };
  } else if (pointsPercentage >= 60 && pointsPercentage <= 79) {
    return {
      itemName: 'kirjahylly',
      message: MESSAGE_2,
      image: bookshelf,
    };
  }
  return {
    itemName: 'kattokruunu',
    message: MESSAGE_1,
    image: lamp,
  };
};
