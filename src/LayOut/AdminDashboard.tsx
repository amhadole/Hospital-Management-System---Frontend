import Header from '../Component/Header/Header'
import Sidebar from '../Component/Doctor/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
     <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
