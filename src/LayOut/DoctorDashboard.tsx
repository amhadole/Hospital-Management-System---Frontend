import Header from '../Component/Header/Header'

import { Outlet } from 'react-router-dom'
import Sidebar from '../Component/Doctor/Sidebar/Sidebar'


const DoctorDashboard = () => {
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

export default DoctorDashboard
