import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const PagesWrapper = () => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Outlet />
    </Suspense>
  );
};
