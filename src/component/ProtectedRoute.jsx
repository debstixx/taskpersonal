import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");//check if the user has a token in local storage

    //condition if token doesn't exists, boot them back to the login screen
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;//if they have a token, let them through to the page
};

export default ProtectedRoute;
