import {React,useEffect,useRef,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast,ToastContainer,Flip } from 'react-toastify'
import axiosBaseUrl from "../../../App/axiosBaseUrl";
import "./Footer.css"
import { Link } from "react-router-dom";
function Footer() {
  const navigate = useNavigate()
  const param = useParams()
  const demoRef = useRef()
  const [credentials, setCredentials] = useState({ name: "", email: "",phone:"",class:"",subject:"" })
  const handleOnChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        if (!credentials.newPassword && !credentials.confirmPassword) {
          navigate('/')
          demoRef.current.close()
          toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
        }
        else if (credentials.newPassword.length < 5 && !credentials.confirmPassword.length < 5) {
          navigate('/')
          demoRef.current.close()
          toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' })
        }
        else if (credentials.newPassword !== credentials.confirmPassword) {
          navigate('/')
            demoRef.current.close()
          toast.error("password and confirm password don't match", { autoClose: 500, theme: 'colored' })
        }
        else if (credentials.newPassword && credentials.confirmPassword) {
          const sendAuth = await axiosBaseUrl.put(`/${param.user}/resetPassword/${param.resetToken.trim()}`,
          {
            newPassword: credentials.newPassword,
            confirmPassword: credentials.confirmPassword,
          })
          const receive = await sendAuth.data
          if (receive.success === true) {
            toast.success(receive.message, { autoClose: 500, theme: 'colored' })

            navigate('/')
            demoRef.current.close()
          }
          else{
            navigate('/')
            demoRef.current.close()
            toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
          }
        }
      }
      catch (error) {
        navigate('/')
        demoRef.current.close()
         toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
      }
  
    }
  return (
    <>
          <>
      <dialog ref={demoRef} id="dialog" >

           <form className='register-form' onSubmit={handleSubmit}>
      <h3 className='login-title'>Book Demo Class</h3>
      <div className="rgt-form-wrapper Login-btn">
        <input
          type="text"
          value={credentials.name}
            name='name'
            onChange={handleOnChange}
          placeholder="Name"
          className="rgt-form-control rgt-input"
        />
      </div>
      <div className="rgt-form-wrapper Login-btn">
        <input
          type="text"
          value={credentials.email}
            name='Email'
            onChange={handleOnChange}
          placeholder="Email"
          className="rgt-form-control rgt-input"
        />
      </div>
      <div className="rgt-form-wrapper Login-btn">
        <input
          type="text"
          value={credentials.phone}
            name='phone'
            onChange={handleOnChange}
          placeholder="Phone Number"
          className="rgt-form-control rgt-input"
        />
      </div>
      <div className="rgt-form-wrapper Login-btn">
        <input
          type="text"
          value={credentials.class}
            name='class'
            onChange={handleOnChange}
          placeholder="Class Name"
          className="rgt-form-control rgt-input"
        />
      </div>
      <div className="rgt-form-wrapper Login-btn">
        <input
          type="text"
          value={credentials.subject}
            name='subject'
            onChange={handleOnChange}
          placeholder="subject"
          className="rgt-form-control rgt-input"
        />
      </div>

      <button className='rgt-button Login-btn' type='submit'>
        Demo Class
        <i className="zmdi zmdi-arrow-right" />
      </button>
    </form>
  
        <button
          onClick={() => {demoRef.current.close(); navigate('/')}}
          aria-label="close"
          className="x"
        >
          ❌
        </button>

      </dialog>
      </>
    <section className="deneb_cta footer-container " >
    <div className="container w-11/12 mx-auto sm:px-4 " >
      <div className="cta_wrapper" >
        <div className="flex flex-wrap  items-center">
          <div className="lg:w-3/5 pr-4 pl-4">
            <div className="cta_content" >
              <h3>Book your first demo class</h3>
              <p>
              Our team of tutors comprises highly qualified and experienced professionals with a proven track record of helping students achieve their academic aspirations.
              </p>
            </div>
          </div>
          
          <div className="lg:w-2/5 pr-4 pl-4 z-30">
              <button className='rgt-button footer-btn cursor-pointer' onClick={()=>demoRef.current.showModal()}>
                  Demo Class
                <i className="zmdi zmdi-arrow-right" />
              </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="deneb_footer">
    <div
      className="widget_wrapper"
      style={{
        backgroundImage:
          "url(http://demo.tortoizthemes.com/deneb-html/deneb-ltr/assets/images/footer_bg.png)"
      }}
    >
      <div className="container  mx-auto sm:px-4">
        <div className="flex flex-wrap ">
          <div className="lg:w-1/3 pr-4 pl-4 md:w-1/2 pr-4 pl-4 w-full">
            <div className="widget widegt_about">
              <div className="widget_title">
                <img
                  src="assets/images/logo_1.png"
                  className="max-w-full h-auto"
                  alt=""
                />
              </div>
              <p>
              Welcome to our home tuition service! We provide top-quality tutoring services for students from 1st grade to graduation, covering all subjects. Our tutors are highly qualified and experienced, and we ensure that each student is matched with a tutor who is a perfect fit for their needs. Our goal is to help students achieve their academic potential and succeed in school and beyond.
              </p>
              <ul className="social">
                <li>
                  <a href="https://www.facebook.com/profile.php?id=61550046175257&mibextid=D4KYlr">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/StudyspotIndia">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/studyspot_india?utm_source=qr&igshid=OGU0MmVlOWVjOQ==">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/3 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-full pr-4 pl-4">
            <div className="widget widget_link">
              <div className="widget_title">
                <h4>Links</h4>
              </div>
              <ul>
                <li><Link to="about">About Us</Link>
                </li>
                <li><Link to="/contact">Contact US</Link></li>
                <li> <a href="https://www.instagram.com/a.r_gupta_2003/" target="_blank">Created By <i className="fab fa-instagram" />  </a></li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/3 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-full pr-4 pl-4">
            <div className="widget widget_contact">
              <div className="widget_title">
                <h4>Contact Us</h4>
              </div>
              <div className="contact_info">
                <div className="single_info">
                  <div className="icon">
                    <i className="fas fa-phone-alt" />
                  </div>
                  <div className="info">
                    <p>
                      <a href="tel:+918826611071">+91 8826611071</a>
                    </p>
                  </div>
                </div>
                <div className="single_info">
                  <div className="icon">
                    <i className="fas fa-envelope" />
                  </div>
                  <div className="info">
                    <p>
                      <a href="mailto:support@studyspotindia.com">support@studyspotindia.com</a>
                    </p>
                  </div>
                </div>
                <div className="single_info">
                  <div className="icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div className="info">
                    <p>
                      old mehrauli road,Near deep permarth school, palam colony,new delhi-110045
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright_area">
      <div className="container mx-auto sm:px-4">
        <div className="flex flex-wrap ">
          <div className="lg:w-full pr-4 pl-4">
            <div className="copyright_text">
              <p>Copyright © 2023 All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</>

  
  );
}

export default Footer;