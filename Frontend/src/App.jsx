import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Doctors from "./pages/Doctors";
import About from './pages/About';
import Login from './pages/Login';
import Contect from './pages/Contect';
import Myprofile from './pages/Myprofile';
import Register from "./pages/Register";
import Doctorsdetials from "./components/Doctorsdetials";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminNavbar from "./components/AdminNavbar";
import AdminAddDoctors from "./components/AdminAddDoctors";
import AdminDoctorslist from "./components/AdminDoctorslist";
import AdminDashboard from "./components/AdminDashboard";
import Doctorappoinment from "./components/Doctorappoinment ";
import MyAppointments from "./pages/Myappointments";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/contect" element={<Contect/>}/>
          <Route path="/myprofile" element={<Myprofile/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/doctorsdetails/:id" element={<Doctorsdetials />} />
          <Route path="/adminLogin" element={<AdminLogin/>}/>
          <Route path="/adminnavbar" element={<AdminNavbar/>}/>
          <Route path="/adminadddoctors" element={<AdminAddDoctors/>}/>
          <Route path="/admindoctorslist" element={<AdminDoctorslist/>}/>
          <Route path="/admindashboard" element={<AdminDashboard/>}/>
          <Route path="/doctorappoinment" element={<Doctorappoinment/>}/>
          <Route path="/my-appointments" element={<MyAppointments/>}/>


        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;
