import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedTransporterRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || user.role !== "manager") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedTransporterRoute;