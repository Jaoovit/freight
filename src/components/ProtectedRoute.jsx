import { Navigate } from 'react-router-dom'; // Use Navigate from react-router-dom v6
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

