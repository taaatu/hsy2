import { useContext } from 'react';
import { MainContext } from '../context/MainContext';

type Props = {
  text: string;
  onClick?: () => void;
};

export const ButtonLoading = ({ text, onClick }: Props) => {
  const { isLoading } = useContext(MainContext);
  return (
    <button
      style={{ display: 'flex', gap: '1em', alignItems: 'center' }}
      disabled={isLoading}
      onClick={onClick}
    >
      {text} {isLoading && <div className="loader"></div>}
    </button>
  );
};
