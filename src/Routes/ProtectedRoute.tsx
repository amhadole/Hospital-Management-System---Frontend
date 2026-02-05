import { JSX } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


interface ProtectedRouteProps{
    children:JSX.Element
}
const ProtectedRoute:React.FC<ProtectedRouteProps>=({children})=>{
    const token = useSelector((state:any)=>state.jwt.token)
    if(!token){

        return<Navigate to="/login" replace/>;
    
    }
     return children;
}

export default ProtectedRoute;