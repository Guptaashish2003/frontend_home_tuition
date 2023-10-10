import React, { useState, useEffect, useContext } from 'react'
import "./MainDasboard.css"
import { toast } from 'react-toastify'
import welcome_logo from "../../../assets/welcome-logo.png"
import { useGetDataProtected } from '../../../App/api/useGetData'
import { ContextUser } from '../../../App/context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
function MainDasboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, userRef } = useContext(ContextUser);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState([]);
  const [complete, setComplete] = useState([]);
  const options = ['Pending Order', 'Complete Order'];
  const navigate = useNavigate()
  const penComHandler = async () => {
    const data = await useGetDataProtected("/booking/me")
    setPending(data.pending)
    setComplete(data.completed)
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    if (userRef) {
      userRef.classList.remove("show")
      userRef.classList.remove("closed-mod");
    }
    setLoading(true);
    penComHandler()
    useGetDataProtected(`/me`)
      .then((data) => {
        setUser(data);
        if (data.success === true) {
          if (!data.role) {
            navigate("/")
            toast.error("something was wrong Please !login again", { autoClose: 500, theme: 'colored' })
          }
          setLoading(false)
          if (!data.data.pinCode) navigate("/profileUpdate")
        }
        else {

          setLoading(false)
          navigate("/")
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
        setLoading(false)
        navigate("/")

      })
  }, []);
  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const bookingHandler = (p) => {
    navigate(`/bookingdetails/${p}`)
  }
  return (
    <>
      {loading ? <div className="sc-ld-container"> <div class="screen-loader"></div></div> :
        <section className="main-container">
          <div id="scene">
            <div id="left-zone">
              <ul className="list">
                <li className="item">
                  <input
                    type="radio"
                    id="student_dashboard"
                    name="basic_carousel"
                    defaultChecked="checked"
                  />
                  <label
                    className="middle-slider dash-icon"
                    htmlFor="student_dashboard"
                  >
                    <span>Dashboard</span>
                  </label>
                  <div className="content content_strawberry das-container">
                    <div className="wel-logo">
                      <img src={welcome_logo} alt="" />
                    </div>
                    <h1>Hey! {user?.data?.name} 👋</h1>
                    <h1>Welcome To StudySpot</h1>

                    {user?.data?.role === "teacher" ?
                      <>
                        <p>Let's Start to Learn with Our Experienced Tutors</p>
                        {user?.data?.isVerified ? <h1 className='mt-4'>welcome back</h1> : <h1 className='mt-4' >your profile is under verification</h1>}

                      </> : <>
                        <p>Let's Start to Learn with Our Experienced Tutors</p>
                        <Link to="/search/all/all">
                          <button className="rgt-button das-btn">
                            find Teacher
                            <i className="zmdi zmdi-arrow-right" />
                          </button>
                        </Link> </>}
                  </div>
                </li>
                <li className="item">
                  <input type="radio" id="booking" name="basic_carousel" />
                  <label className="middle-slider book-icon" htmlFor="booking">
                    <span>Booking</span>
                  </label>
                  <div className="content booking-pending ">
                    <div className="dropdown-dashboard">
                      <button className="dropdown-dashboard-button" onClick={toggleDropdown}>
                        Status
                      </button>
                      {isOpen && (
                        <ul className="dropdown-dashboard-list">
                          {options.map((option, index) => (
                            <li
                              key={index}
                              className="dropdown-dashboard-item"
                              onClick={() => handleOptionSelect(option)}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pending-order-container ">
                      <h3>{selectedOption === "Pending Order" ? "Pending Order" : "Completed Order"}</h3>


                      {selectedOption === "Pending Order" ? pending.length === 0 ? <div className="flex justify-center items-center  mx-auto text-2xl">NOT FOUND</div> : pending?.map((pen) => {
                        return (
                          <div onClick={() => bookingHandler(pen._id)} className="teacher-card dash-teacher-card" key={pen._id} >
                            <div className="teacher-info">
                              <h2 className="teacher-name">Booking Status <span className='text-slate-400'>{pen.bookingStatus}</span></h2>
                              <p className="teacher-email"><span className='text-lg text-black'>studyMode</span> {pen.studyMode}</p>
                              <p className="teacher-email"><span className='text-lg text-black'>study Days</span> {pen.studyTerm} day</p>
                              <p className="teacher-email"><span className='text-lg text-black'>study Hours</span> {pen.studyHours} Hour</p>
                              <p className="teacher-email"><span className='text-lg text-black'>Demo</span> {pen.isDemo ? "true" : "false"}</p>

                            </div>

                          </div>
                        );
                      }
                      ) : complete.length === 0 ? <div className="flex justify-center items-center  mx-auto text-2xl">NOT FOUND</div> : complete.map((pen) => {
                        return (
                          <div onClick={() => bookingHandler(pen._id)} className="teacher-card dash-teacher-card" key={pen._id} >
                            <div className="teacher-info">
                              <h2 className="teacher-name">Booking Status <span className='text-slate-400'>{pen.bookingStatus}</span></h2>
                              <p className="teacher-email"><span className='text-lg text-black'>studyMode</span> {pen.studyMode}</p>
                              <p className="teacher-email"><span className='text-lg text-black'>study Days</span> {pen.studyTerm} day</p>
                              <p className="teacher-email"><span className='text-lg text-black'>study Hours</span> {pen.studyHours} Hour</p>
                              <p className="teacher-email"><span className='text-lg text-black'>Demo</span> {pen.isDemo ? "true" : "false"}</p>

                            </div>

                          </div>
                        );
                      }
                      )}

                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>}
    </>
  );
}

export default MainDasboard
