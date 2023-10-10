import {React,useEffect,useRef,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast,ToastContainer,Flip } from 'react-toastify'
import axiosBaseUrl from "../../App/axiosBaseUrl";
function AddNewPassword() {
  const navigate = useNavigate()
    const param = useParams()
    const showRef = useRef()
    const [credentials, setCredentials] = useState({ confirmPassword: "", newPassword: "" })
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    useEffect(() => {
      showRef.current.showModal();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          if (!credentials.newPassword && !credentials.confirmPassword) {
            navigate('/')
            showRef.current.close()
            toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.newPassword.length < 5 && !credentials.confirmPassword.length < 5) {
            navigate('/')
            showRef.current.close()
            toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.newPassword !== credentials.confirmPassword) {
            navigate('/')
              showRef.current.close()
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
              showRef.current.close()
            }
            else{
              navigate('/')
              showRef.current.close()
              toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
            }
          }
        }
        catch (error) {
          navigate('/')
          showRef.current.close()
           toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
        }
    
      }
    return (
      <>
      <dialog ref={showRef} id="dialog" >

           <form className='register-form' onSubmit={handleSubmit}>
      <h3 className='login-title'>Reset Password</h3>
      <div className="rgt-form-wrapper Login-btn">
        <input
          type="text"
          value={credentials.newPassword}
            name='newPassword'
            onChange={handleOnChange}
          placeholder="New Password"
          className="rgt-form-control rgt-input"
        />
      </div>
      <div className="rgt-form-wrapper Login-btn">
        <input
          type="text"
          value={credentials.confirmPassword}
            name='confirmPassword'
            onChange={handleOnChange}
          placeholder="Confirm Password"
          className="rgt-form-control rgt-input"
        />

      </div>

     
      <button className='rgt-button Login-btn' type='submit'>
        Reset Password
        <i className="zmdi zmdi-arrow-right" />
      </button>
    </form>
  
        <button
          onClick={() => {showRef.current.close(); navigate('/')}}
          aria-label="close"
          className="x"
        >
          ❌
        </button>

      </dialog>
      </>
    );
  }

export default AddNewPassword
