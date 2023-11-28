import { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classname?: any;
  id?: string;
};

export const ButtonLoading = ({ text, onClick, classname, id }: Props) => {
  const { isLoading } = useContext(MainContext);
  return (
    <button
      className={classname}
      id={id}
      style={{ display: 'flex', gap: '1em', alignItems: 'center' }}
      disabled={isLoading}
      onClick={onClick}
    >
      {text} {isLoading && <Spinner size="sm" />}
    </button>
  );
};
