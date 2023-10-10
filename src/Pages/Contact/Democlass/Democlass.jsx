import {React,useEffect,useRef,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast,ToastContainer,Flip } from 'react-toastify'
import axiosBaseUrl from "../../App/axiosBaseUrl";
function AddNewPassword() {
  const navigate = useNavigate()
    const param = useParams()
    const demoRef = useRef()
    const [credentials, setCredentials] = useState({ confirmPassword: "", newPassword: "" })
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    useEffect(() => {
      demoRef.current.showModal();
    }, []);

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

    );
  }

export default AddNewPassword
