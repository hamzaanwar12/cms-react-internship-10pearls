// src/routes/AppRoutes.tsx
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';

const AppRoutes = () => {
  return (
    <>
      <AuthenticatedRoutes />
      <UnauthenticatedRoutes />
    </>
  );
};

export default AppRoutes;
