import { jwtDecode } from "jwt-decode"
import { JSX } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


interface PublicRouteProps{
    children:JSX.Element
}
const PublicRoute:React.FC<PublicRouteProps>=({children})=>{
    const token = useSelector((state:any)=>state.jwt.token)
    if(token){
        const user:any = jwtDecode(token);
        return<Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace/>
    }
    return children
}

export default PublicRoute;