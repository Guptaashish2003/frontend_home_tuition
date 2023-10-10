import { React, useRef,useState, useEffect } from "react";
import { useNavigate,useParams } from 'react-router-dom'
import "./EmailVerifedCard.css";
import { toast } from 'react-toastify'
import axiosBaseUrl from "../../App/axiosBaseUrl";
import WindowLoader from "../../Components/WindowLoader/WindowLoader";

function EmailVerifedCard() {
  const param = useParams()
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const navigate = useNavigate()
  const showRef = useRef();
 
  useEffect(() => {
    showRef.current.showModal()
    setLoading(true);
    axiosBaseUrl.get(`/${param.user}/verify/email/${param.verificationToken}`)
    .then((res) => {
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      showRef.current.close()
      toast.error(err.response.data.message, { autoClose: 500, theme: 'colored' })
      navigate("/")
    })
    
  }, []);
  return (
    <>
      <dialog ref={showRef} id="dialog" className="ver-container">
        {Loading ?<div className="sc-ld-container"> <div class="screen-loader"></div></div>:<div className="verify-content">
          <h1>Email Verification Successfully</h1>
          <div>
          <i class="fa fa-check-circle"></i>
         verification Successfully please login to verify your verification
          </div>

        </div>}
    <button onClick={()=>{showRef.current.close(); navigate("/")}} aria-label="close" className="x">
      ❌
    </button>
  </dialog>
    
    </>
  );
}

export default EmailVerifedCard;
