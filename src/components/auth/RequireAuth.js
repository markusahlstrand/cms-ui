const { Navigate } = require('react-router-dom');
const AuthConsumer = require('./Auth');

export function RequireAuth({ children }) {
  const { authed } = AuthConsumer.default();

  return authed !== null ? children : <Navigate to="/login" replace />;
}
