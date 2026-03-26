import { BrowserRouter, Route, Routes } from "react-router-dom";
import Random from "../Component/Random";
import AdminDashboard from "../LayOut/AdminDashboard";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "../LayOut/PatientDashboard";
import PatientProfilePage from "../Pages/Patient/PatientProfilePage";
import DoctorDashboard from "../LayOut/DoctorDashboard";
import DoctorProfilePage from "../Pages/Doctor/DoctorProfilePage";
import PatientAppointmentPage from "../Pages/Patient/PatientAppointmentPage";
import DoctorAppointmentPage from "../Pages/Doctor/DoctorAppointmentPage";
import DoctorAppointmentDetailsPage from "../Pages/Doctor/DoctorAppointmentDetailsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>}/>

        <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
          <Route path="dashboard" element={<Random />} />
          <Route path="profile" element={<PatientProfilePage />} />
          <Route path="appointments" element={<PatientAppointmentPage />} />
        </Route>

        <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
          <Route path="dashboard" element={<Random />} />
          <Route path="profile" element={<DoctorProfilePage />} />
          <Route path="pharmacy" element={<Random />} />
          <Route path="patients" element={<Random />} />
          <Route path="appointments" element={<DoctorAppointmentPage />} />
          <Route path="appointments/:id" element={<DoctorAppointmentDetailsPage />} />
        </Route>
         <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Random />} />
          <Route path="/pharmacy" element={<Random />} />
          <Route path="/doctors" element={<Random />} />
          <Route path="/patients" element={<Random />} />
          <Route path="/appointments" element={<Random />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
