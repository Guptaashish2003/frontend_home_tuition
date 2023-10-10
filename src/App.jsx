
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/ContactPage";
import HomePage from "./Pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import Context from "./App/context/Context";
import UserContext from "./App/context/UserContext";
import Register from "./Auth/register/Register";
import SearchFilter from "./Pages/SearchFilter/SearchFilter";
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainDasboard from "./Pages/Protected/MainDasboard/MainDasboard";
import EmailVerifedCard from "./Auth/EmailVfCard/EmailVerifedCard";
import AddNewPassword from "./Auth/NewPassword/AddNewPassword";
import ProfileUpdate from "./Pages/Protected/ProfileUpdate/ProfileUpdate";
import BookingPage from "./Pages/Booking/BookingPage";
import BookingDetail from "./Pages/Booking/BookingDetail";
import MainLayout from "./MainLayout";
import { Ecommerce, Orders,  Employees, Stacked, Customers, Kanban, Pie } from './Pages';
import OtherLayout from "./OtherLayout";
import Coupon from "./Pages/Coupon";
function App() {
  return (
    <>
      <ToastContainer  toastClassName='toastContainerBox' transition={Flip} position='top-right' />

      <UserContext>
      <Context>
        <Routes>
          {/* user pages  */}
          <Route element={<MainLayout />}>




            
            <Route  path="/" element={<HomePage />} > 
            <Route path=':user/verify/email/:verificationToken' element={<EmailVerifedCard/>} />
            <Route path=':user/resetPassword/:resetToken' element={<AddNewPassword/>} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register/:user" element={<Register />} />
            <Route path="/search/:keyword/:value" element={<SearchFilter />} />
            <Route path="/search/:keyword/:value/:student" element={<SearchFilter />} />
            <Route path="/profileUpdate" element={<ProfileUpdate/>}/>
            <Route path="/mainDasboard" element={<MainDasboard/>}/>
            <Route path="/booking/:id" element={<BookingPage/>}/>
            <Route path="/booking/:id/:student" element={<BookingPage/>}/>
            <Route path="/bookingdetails/:id" element={<BookingDetail/>}/>
             <Route path="*" element={<HomePage />}/>
          </Route>

          {/* admin pages  */}
          <Route element={<OtherLayout/>}>
            {/* dashboard  */}

                <Route path="/dashboard" element={(<Ecommerce />)} />
                {/* pages  */}
                <Route path="/booking" element={<Orders />} />
                <Route path="/teacher" element={<Employees />} />
                <Route path="/student" element={<Customers />} />
                <Route path="/Coupon" element={<Coupon/>} />
                {/* apps  */}
                <Route path="/taskbar" element={<Kanban />} />
                {/* charts  */}
                <Route path="/pie" element={<Pie />} />
                <Route path="/stacked" element={<Stacked />} />
          </Route>
          
        </Routes>
      </Context>
      </UserContext>
    </>
  );
}

export default App;
