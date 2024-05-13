import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../src/provider/AuthProvider'
import Loading from '../src/pages/Loading'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <Loading></Loading>
  if(!user){
    return <Navigate to='/login' state={location?.pathname || '/'} ></Navigate>
}
return (
    <div>
        {children}
    </div>
);
}

export default PrivateRoute