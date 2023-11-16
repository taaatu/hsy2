import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import Placeholder from 'react-bootstrap/Placeholder';

type Props = {
  children: React.ReactNode;
};

export const LoadingList = ({ children }: Props) => {
  const { isLoading } = useContext(MainContext);
  return (
    <>
      <div className="list color3">
        {isLoading ? <ListSkeleton /> : children}
      </div>
    </>
  );
};

const ListSkeleton = () => (
  <>
    {[...Array(10)].map(() => (
      <>
        <Placeholder as="p" animation="glow">
          <div className="list-item">
            <Placeholder xs={12} size="lg" />
          </div>
        </Placeholder>
      </>
    ))}
  </>
);
