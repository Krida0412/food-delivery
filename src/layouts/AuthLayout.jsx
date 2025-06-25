const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      {children}
    </div>
  );
};

export default AuthLayout;
