import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotFound from '../NotFound';

const RoleRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector((state) => state.account.user);
    const userRole = user.role;
    if (isAuthenticated && isAdminRoute && +userRole === 1) {
        return <>{props.children}</>;
    } else {
        return <NotFound />;
    }
};
const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    return (
        <>
            {isAuthenticated === true ? (
                <>
                    {props.children}
                </>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    );
};

export { ProtectedRoute, RoleRoute };