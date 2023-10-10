import React,{useState ,useContext,useEffect } from 'react'
import "./BookingDetail.css"
import { useParams  } from 'react-router-dom';
import { ContextUser } from '../../App/context/UserContext';
import { toast } from 'react-toastify'
import { useGetDataProtected, useGetUserData } from '../../App/api/useGetData';
 import { usePostWithoutRole } from '../../App/api/usePostData';
 import { useNavigate } from 'react-router-dom';
import { useUpdateDataAdmin } from '../../App/api/useUpdateData';
function BookingDetail() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(true);
  const [bookingDetail, setBookingDetail] = useState([]);
  const {user,setUser} = useContext(ContextUser)
  const [transaction, setTransaction] = useState(0);
  const [student, setStudent] = useState();
  const [teacher, setTeacher] = useState();
  const param =useParams()

  const getData = async ()=>{
    setLoading(true); 
    try {
      const data = await useGetDataProtected(`/me`)
      if(data.success){
        setUser(data);
      }else{
      toast.error("something was wrong", { autoClose: 500, theme: 'colored' })

    }
    
    const bookingDetails = await useGetUserData(`${data.role}/booking/${param.id}`)
    if (bookingDetails.success) {
      
      if(  data.data.role === "student" && bookingDetails.data.student._id !== data.data._id){
        navigate('/mainDasboard')
      }
      if(  data.data.role === "teacher" && bookingDetails.data.teacher._id !== data.data._id){
        navigate('/mainDasboard')
      }

      setBookingDetail(bookingDetails.data)
      setTeacher(bookingDetails.data.teacher)
      setStudent(bookingDetails.data.student)
      if(bookingDetails.data.paymentMode !=="By Cash" || bookingDetails.data.isDemo){
        const date = new Date(bookingDetails.data.transaction.paidAt);
      // Extract date components
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const day = date.getDate();

      // Extract time components
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      // Format date and time components as strings
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        setTransaction({...bookingDetails.data.transaction,Date:formattedDate,time:formattedTime})
      }

      
    }else{
      toast.error("something was wrong", { autoClose: 500, theme: 'colored' })
    }
    
    setLoading(false)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      navigate('/mainDasboard')
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    getData()
  }, []);

  const completeBookingHandler = async () =>{
    const data = await useUpdateDataAdmin(`booking/${param.id}`,{bookingStatus : "completed"})
    if (data.success) {
      navigate('/mainDasboard')
      toast.success("completed...", { autoClose: 500, theme: 'colored' })
    }
  }
  return (
    <div className="booking-page-container">

        <main className="dashboard">
          <article className="BookingDetails-panel">
        <div className="section-title">Booking Detail&nbsp;👨‍🏫</div>
              <div className="card">
                <div className="card-header">Booking Status</div>
                <div className="status">Status: {bookingDetail?.bookingStatus}</div>
               {bookingDetail?.isDemo || bookingDetail?.paymentMode === "By Cash"?"":<div>
                <div className="card-header">Transaction Detail </div>
                <div className="details">
                  Transaction ID: <span>{transaction?.txnid}</span>
                </div>
                <div className="details">
                  Transaction Date: <span>{transaction?.Date}</span>
                </div>
                <div className="details">
                  Transaction Time: <span>{transaction.time}</span>
                </div>
                </div>}

                <div className="card-header">Teacher Details</div>
                <div className="details">
                  Name: <span>{teacher?.name}</span>
                </div>
                <div className="details">
                  Qualification: <span>{teacher?.qualification}</span>
                </div>
                <div className="details">
                  Specialization: {teacher?.Specialization?.map((item, index) => (
                  <span key={index}> {item} </span>
                ))}
                </div>
                <div className="details">
                  Email: <span>{teacher?.email}</span>
                </div>
                <div className="card-header">Booking Details</div>
                <div className="details">
                  Study Mode: <span>{bookingDetail?.studyMode}</span>
                </div>
                <div className="details">
                  Study Hour: <span>{bookingDetail?.studyHours} hr</span>
                </div>
                <div className="details">
                  I Want To Learn: <span>{bookingDetail?.specialization}</span>
                </div>
              {bookingDetail.studyMode === "online" ? <div className="details">
                  locationUrl: <a className='text-blue-600' href={bookingDetail?.locationUrl} target='blank'>Click Here</a>
                </div> :""}
              </div>

          </article>
          <article className="booking-panel">
            <section className="section" id="order">
              <div className="section-title">Student Detail&nbsp;😎</div>
              <div className="order-info">
                <h2>{student?.name}</h2>
                <div className="address">
                  <div className="address-name">
                    {`${student?.address} ${student?.street} ${student?.city} ${student?.state} ${student?.pinCode} ${student?.country}`}
                  </div>
                </div>
                <div className="address-name">{student?.email}</div>
                <div className="address-name">+91 {student?.phone}</div>
                <div className="address-name">{student?.school}</div>
                <div className="address-name">{student?.college}</div>
              </div>
              <div className="total-price">
                <div className="total">Total:</div>
                <div className="price">₹{bookingDetail?.totalPrice}</div>
              </div>
              <div className="buy-action">
                <div className="person-number-input">
                  <div className="input-group input-spinner"></div>
                </div>
              {user?.data?.role ==='teacher'?  bookingDetail?.bookingStatus==="Pending"?<button className="checkout-btn" onClick={completeBookingHandler}>
                  Completed
                  <svg
                    width={60}
                    height={18}
                    className="arrow"
                    viewBox="0 0 24 24"
                    
                  >
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                  </svg>
                </button>:"" :""}
              </div>
            </section>
          </article>
        </main>
        
      </div>
    );
}
 
export default BookingDetail
