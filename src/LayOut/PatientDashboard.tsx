import Header from '../Component/Header/Header'

import { Outlet } from 'react-router-dom'
import Sidebar from '../Component/Patient/Sidebar/Sidebar'

const PatientDashboard = () => {
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

export default PatientDashboard
