import "./Register.css"
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import heroImg from "../../assets/registration-form-1.jpg";
import axiosBaseUrl from "../../App/axiosBaseUrl";
import { useGetDataProtected } from "../../App/api/useGetData";
import { ContextUser } from "../../App/context/UserContext";
import { usePostWithoutRole } from "../../App/api/usePostData";
function Register() {
  const param = useParams()
  const navigate = useNavigate()
  const {user,setUser} = useContext(ContextUser)
  const [credentials, setCredentials] = useState({ firstName: "", lastName: '', email: "", gender: "", password: "",confirmPassword:"",registerAs:"",pinCode: "",phone:""})
    // show and hide password 
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
    // set  credentials of user 
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token") && localStorage.getItem("Role")) {
      useGetDataProtected(`/me`)
      .then((data) =>{
       if (data.success) {
        setUser(data)
        if (data.data.role === "student" || data.data.role === "teacher") {
          navigate("/mainDasboard")
        }
       }
     })}
  }, [])
    // form submit handler 
  const handleSubmit = async (e) => {
    e.preventDefault()
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!credentials.email && !credentials.firstName && !credentials.password  && !credentials.lastName) {
        toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password !== credentials.confirmPassword) {
        toast.error("password and confirm password don't match", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.firstName.length < 1 ) {
        toast.error("Please enter valid name", { autoClose: 500, theme: 'colored' })
      }
      else if (emailRegex.test(credentials.email)===false) {
        toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.phone.length !== 10) {
        toast.error("Please enter valid Phone Number", { autoClose: 500, theme: 'colored' })
      }
      else if (!["male","female","other"].includes(credentials.gender)) {
        toast.error("Please select gender", { autoClose: 500, theme: 'colored' })
      }
      else if (!["teacher","student"].includes(param.user)) {
        toast.error("somthing was wrong please try again later", { autoClose: 500, theme: 'colored' })
        navigate('/')
      }
      else if (credentials.password.length < 5) {
        toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.email && credentials.firstName  && credentials.password) {
        setLoading(true)
        let name = credentials.lastName
        if (name) {
          name = credentials.firstName + ' ' + credentials.lastName
        }
        else{
          name = credentials.firstName
        }
        let sendAuth;
        if(localStorage.getItem("token") && localStorage.getItem("Role") && user.data.role === "admin"){
          sendAuth = await usePostWithoutRole(`admin/${param.user}/create`,
          {
            name:name, 
            email: credentials.email,
            gender: credentials.gender,
            phone: credentials.phone,
            password: credentials.password,

          })
          console.log("ldd")
        }else{
          sendAuth = await axiosBaseUrl.post(`/${param.user}/register`,
           {
             name:name, 
             email: credentials.email,
             gender: credentials.gender,
             phone: credentials.phone,
             password: credentials.password,
           })
          
        }
        const receive = await sendAuth.data
        setLoading(false)
        if (receive.success === true) {
          toast.success(`${receive.message}`, { autoClose: 900, theme: 'colored' })
          navigate('/')
        }
        else {
          toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })


    }

  }
  const registerHandler = async() => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!credentials.email && !credentials.firstName && !credentials.password  && !credentials.lastName) {
        toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password !== credentials.confirmPassword) {
        toast.error("password and confirm password don't match", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.pinCode < 2) {
        toast.error("please enter valid pinCode", { autoClose: 500, theme: 'colored' })
      }
      else if (emailRegex.test(credentials.email)===false) {
        toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
      }
      else if (!["male","female","other"].includes(credentials.gender)) {
        toast.error("Please select gender", { autoClose: 500, theme: 'colored' })
      }
      else if (!["teacher","student"].includes(param.user)) {
        toast.error("Please select register as", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password.length < 5) {
        toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.email && credentials.firstName  && credentials.password) {
        setLoading(true)
        let name = credentials.lastName
        if (name) {
          name = credentials.firstName + ' ' + credentials.lastName
        }
        else{
          name = credentials.firstName
        }
        const sendAuth = await usePostWithoutRole(`admin/${param.user}/create`,
          {
            name:name, 
            email: credentials.email,
            gender: credentials.gender,
            password: credentials.password,

          })
        const receive = await sendAuth.data
        setLoading(false)
        if (receive.success === true) {
          toast.success(`${receive.message}`, { autoClose: 900, theme: 'colored' })
          navigate('/dashboard')
        }
        else {
          toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
          navigate('/')
        }
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })


    }
  }
// login model jsx
  return (
<div
  className="wrapper "
>
  <div className="inner ">
    <div className="image-holder">
      <img src={heroImg} alt="" />
    </div>
    <form onSubmit={handleSubmit}>
      <h3>Registration Form</h3>
      <div className="form-group">
        <input onChange={handleOnChange} type="text" placeholder="First Name" className="rgt-form-control " name="firstName"/>
        <input onChange={handleOnChange} type="text" placeholder="Last Name" className="rgt-form-control" name="lastName"/>
      </div>
      <div className="rgt-form-wrapper">
        <input
        onChange={handleOnChange}
          type="text"
          placeholder="Email Address"
          className="rgt-form-control "
          name="email"
        />
        <i className="zmdi zmdi-email" />
      </div>
      <div className="rgt-form-wrapper">
        <input
        onChange={handleOnChange}
          type="number"
          placeholder="Phone Number"
          className="rgt-form-control "
          name="phone"
        />
        <i className="fa fa-phone"></i>
      </div>
      <div className="rgt-form-wrapper">
        <select onChange={handleOnChange} name="gender"  className="rgt-form-control form-selecter">
          <option >
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <i className="zmdi zmdi-caret-down" style={{ fontSize: 17 }} />
      </div>
      <div className="rgt-form-wrapper">
        <input
        onChange={handleOnChange}
        type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="rgt-form-control "
          name="password"
        />
        <div onClick={handleClickShowPassword}>
        {showPassword ?<i  className="fa fa-eye "></i>  :<i  className="fa fa-eye-slash" ></i> }
        </div>
      </div>
      <div className="rgt-form-wrapper">
        <input
        onChange={handleOnChange}
          type="password"
          placeholder="Confirm Password"
          className="rgt-form-control"
          name="confirmPassword"
        />
        
        <i className="zmdi zmdi-lock" />
      </div>
    <button className='rgt-button' type="submit">
        {Loading? <div className="btn-custom-loader"></div>:<>Register <i className="zmdi zmdi-arrow-right" /> </>}
        
      </button>
    </form>
  </div>
</div>


  )
}

export default Register
