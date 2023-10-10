import React, { useState, useEffect, useContext } from 'react'
import "./BookingPage.css"
import { useParams } from 'react-router-dom';
import Select from "react-select";
import { ContextUser } from '../../App/context/UserContext';
import { useGetDataProtected, useGetUserData, useGetData } from '../../App/api/useGetData';
import { usePostWithoutRole } from '../../App/api/usePostData';
import { toast } from 'react-toastify'
import WindowLoader from '../../Components/WindowLoader/WindowLoader';
import { studyMode, studyTerm, studyHours, priceValueDays, priceValuesHours } from '../../Data';
import { useNavigate } from 'react-router-dom';
import userLogo from "../../assets/user-logo.jpg"

function BookingPage() {
  const [selectorSpecialization, setSelectorSpecialization] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(false);
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);
  const { user, setUser } = useContext(ContextUser)
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(false)
  const [booking, setBooking] = useState({ studyMode: "", locationUrl: "", studyTerm: 1, specialization: "", studyHours: 1, chargePerHour: "", coupon: "", });
  const [paymentInfo, setPaymentInfo] = useState({ key: "", hash: "", salt: "", txnid: "", productinfo: "", amount: "", email: "", firstname: "", surl: "", furl: "", phone: "", curl: "" });
  const navigate = useNavigate()
  const param = useParams()

  const getData = async () => {
    setLoading(true);
    try {
      const data = await useGetDataProtected(`/me`)

      if (data.success) {
        setUser(data);
        if (data.role !== "teacher" && data.role !== "student") {
          navigate("/")
        }
      } else {
        toast.error("something was wrong", { autoClose: 500, theme: 'colored' })

      }

      const teacherData = await useGetUserData(`teacher/${param.id}`)
      if (teacherData.success) {
        setBooking({ ...booking, chargePerHour: teacherData.data.charge })
        const { subject, hobbies, languages, school, college } = { ...teacherData.data }
        const Specialization = [...subject, ...hobbies, ...languages]
        const targetStudent = [...school, ...college]
        setTotalPrice(teacherData.data.charge)
        const option = Specialization.map((val) => {
          return { value: val, label: val }
        })

        setSpecialization(option)
        setTeacher({ ...teacherData.data, Specialization, targetStudent })
      } else {
        navigate('/mainDasboard')
        toast.error("something was wrong", { autoClose: 500, theme: 'colored' })
      }
      if (data.data.role !== "admin") {

        const isDemo = await usePostWithoutRole('/booking/demo', { teacherId: param.id, })
        if (isDemo.data.success) {
          setDemo(isDemo.data.demo)
          if (isDemo.data.demo) {
            setTotalPrice(0)
          }

        }
      }
      if (param.student && data.data.role === 'admin') {
        const stuData = await useGetUserData(`admin/student/${param.student}`)
        if (stuData.success) {
          setStudent(stuData.data)
        }
      }
      else {
        setStudent(data.data)
      }

      setLoading(false)

    } catch (error) {

      setLoading(false)
      navigate('/mainDasboard')
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    getData()
  }, []);
  console.log()
  const demoClassHandler = async () => {
    try {
      if (!teacher.isVerified) {
        toast.error("teacher is not verified", { autoClose: 500, theme: 'colored' })
      }
      else if (!booking.specialization) {
        toast.error("please select I Want To Learn..", { autoClose: 500, theme: 'colored' })
      }
      else if (booking.studyMode === "") {
        toast.error("please select I Want To Learn..", { autoClose: 500, theme: 'colored' })
      }
      else if (booking.studyMode && booking.specialization) {
        const isDemo = await usePostWithoutRole('/booking/new', { ...booking, totalPrice, teacherId: param.id })
        if (isDemo.data.success) {
          navigate(`/bookingdetails/${isDemo.data.booking._id}`)
          toast.success("demo class booked successfully", { autoClose: 500, theme: 'colored' })
        }

      }

    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    }

  }

  const bookingSubmitHandler = () => {
    if (!teacher.isVerified) {
      toast.error("teacher is not verified", { autoClose: 500, theme: 'colored' })
    }
    else if (booking.studyMode === "") {
      toast.error("Please select study mode", { autoClose: 500, theme: 'colored' })
    }
    else if (!booking.specialization) {
      toast.error("please select I Want To Learn..", { autoClose: 500, theme: 'colored' })

    }
    else if (booking.studyMode && booking.specialization) {

      usePostWithoutRole('/pay', { email: user?.data?.email, phone: user?.data?.phone, name: user?.data?.name, teacherId: param.id, totalPrice, ...booking }).then((response) => {
        setPaymentInfo(response.data.data)
        toast.success("Data validate successfully Please Proceed to Pay", { autoClose: 500, theme: 'colored' })
      }).catch((error) => toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' }))

    }

  }

  const submitForm = async () => {
    const form = document.getElementById('payuForm');
    form.submit();
  };

  const applyCoupon = async () => {
    try {
      const data = await useGetUserData(`coupon/${booking.coupon}`)
      if (data.success) {
        const Finalprice = totalPrice - ((totalPrice * data.data.percentage) / 100)
        setTotalPrice(Finalprice)
        setDiscountPrice(true);
        toast.success(data.message, { autoClose: 500, theme: 'colored' })
      }

    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    }
  }
  const adminAllotTeacher = async () => {
    try {
      if (!booking.specialization) {
        toast.error("please select I Want To Learn..", { autoClose: 500, theme: 'colored' })
      }
      else if (booking.studyMode === "") {
        toast.error("please select I Want To Learn..", { autoClose: 500, theme: 'colored' })
      }
      else if (booking.studyMode && booking.specialization) {
        const data = await usePostWithoutRole('/admin/allotTeacher/', { ...booking, totalPrice, teacherId: param.id, studentId: param.student, paymentMode: "By Cash" })
        if (data.data.success) {
          navigate(`/bookingdetails/${data.data.booking._id}`)
          toast.success("Booked successfully payment done through cash", { autoClose: 500, theme: 'colored' })
        }

      }

    } catch (error) {

      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    }
  }


  return (
    <>
      {loading ? <WindowLoader /> : <div className="booking-page-container">
        <main className="dashboard">
          <article className="BookingDetails-panel">
            <div className="teacher-card">
              <div className="teacher-avatar">
                {teacher?.avatar ? <img src={teacher?.avatar} alt="" /> : <img src={userLogo} alt="" />}
              </div>
              <div className="teacher-info">
                <h2 className="teacher-name">{teacher?.name}</h2>
                <p className="teacher-email">Email: {teacher?.email}</p>
                <p className="teacher-subject">Qualification: {teacher?.qualification}</p>
                <p className="teacher-subject">Experience: {teacher?.experience} yrs.</p>
                <p className="teacher-subject"> Charge Per Hour {teacher?.charge}₹</p>
                <p className="teacher-subject"> Specialization : {teacher?.Specialization?.map((item, index) => (
                  <span key={index}> {item} </span>
                ))}</p>
                <p className="teacher-subject"> Target Student :  {teacher?.targetStudent?.map((item, index) => (
                  <span key={index}> {item} </span>
                ))}</p>

              </div>
            </div>
            <section className="section">
              <div className="section-titles">
                <div className="section-title">Booking Detail&nbsp;👨‍🏫</div>

              </div>
              <form className='selection-form' onSubmit={bookingSubmitHandler}>
                <div>
                  <h4>I Want To Learn...</h4>
                  <Select
                    isMulti
                    value={selectorSpecialization}
                    options={specialization}
                    name="Specialization"
                    onChange={(selected) => {
                      setSelectorSpecialization(selected)
                      const val = selected.map((select) => select.value)
                      setBooking({ ...booking, "specialization": val })
                    }}
                    className="filter-select"
                  />
                </div>
                <div>
                  <h4>Study Term</h4>
                  <Select
                    classNamePrefix="select"
                    defaultValue={demo ? studyTerm[0] : ""}
                    isDisabled={demo}
                    isClearable={true}
                    isSearchable={true}
                    options={studyTerm}
                    name="StudyTerm"
                    onChange={(selected) => {
                      setBooking({ ...booking, 'studyTerm': priceValueDays[selected.value] })
                      setTotalPrice(booking.chargePerHour * priceValueDays[selected.value] * booking.studyHours)

                    }}
                    className="filter-select"
                  />
                </div>
                <div>
                  <h4>Study Hours</h4>
                  <Select
                    classNamePrefix="select"
                    defaultValue={demo ? studyHours[0] : ""}
                    isDisabled={demo}
                    isClearable={true}
                    isSearchable={true}
                    options={studyHours}
                    name="StudyHours"
                    onChange={(selected) => {
                      setBooking({ ...booking, 'studyHours': priceValuesHours[selected.value] })
                      setTotalPrice(booking.chargePerHour * booking.studyTerm * priceValuesHours[selected.value])
                    }}
                    className="filter-select"
                  />
                </div>
                <div>
                  <h4>Mode Of Study</h4>
                  <Select
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    options={studyMode}
                    name="Study-Mode"
                    onChange={(selected) => {
                      setBooking({ ...booking, 'studyMode': selected.value })
                    }}
                    className="filter-select"
                  />
                </div>
                {booking.studyMode === "Online" ? <div></div> : <div>
                  <h4>Location Url </h4>
                  <input type="url" name='locationUrl' className='w-full h-9 input-url' onChange={(event) => setBooking({ ...booking, [event.target.name]: event.target.value })} />
                </div>}
              </form>
            </section>
          </article>
          <article className="booking-panel">
            <section className="section" id="order">
              <div className="section-title">Student Detail&nbsp;😎</div>
              <div className="order-info">
                <h2>{student?.name}</h2>
                <div className="address">
                  <div className="address-name">{`${student?.address}  ${student?.street}  ${student?.city} ${student?.state} ${student?.pinCode} ${student?.country}`}</div>
                </div>
                <div className="address-name">{student?.phone}</div>
                <div className="address-name">{student?.email}</div>
                <div className="address-name">{student?.school}</div>
                <div className="address-name">{student?.college}</div>

              </div>
              <div className="total-price">
                <div className="total">Total:</div>
                <div className="price">₹{totalPrice}</div>
              </div>
              <div className="buy-action">

                {demo || discountPrice ? "" : <div className="person-number-input my-4 flex justify-between w-full items-start">
                  <input type="text" name='coupon' className='w-3/4 h-9 input-url px-4 mx-4' placeholder='Enter your coupon' onChange={(event) => setBooking({ ...booking, [event.target.name]: event.target.value })} />
                  <div className="checkout-btn cursor-pointer h-9 " onClick={applyCoupon}>Apply</div>
                </div>}

                {param.student && user?.data?.role === 'admin' ? <button className="checkout-btn cursor-pointer" onClick={adminAllotTeacher}>
                  Book Now
                  <svg
                    width={60}
                    height={18}
                    className="arrow"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                  </svg>
                </button> : <div>
                  {demo ? <button className="checkout-btn cursor-pointer" onClick={demoClassHandler}>
                    Book Demo Class
                    <svg
                      width={60}
                      height={18}
                      className="arrow"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                    </svg>
                  </button> :
                    <div>
                      <form id="payuForm" method="post" action={`${paymentInfo.payUBaseUrl}/_payment`}>
                        {/* Add hidden input fields for payment data */}

                        <input type="hidden" name="key" value={paymentInfo.key} />
                        <input type="hidden" name="hash" value={paymentInfo.hash} />
                        <input type="hidden" name="salt" value={paymentInfo.salt} />
                        <input type="hidden" name="txnid" value={paymentInfo.txnid} />
                        <input type="hidden" name="productinfo" value={paymentInfo.productinfo} />
                        <input type="hidden" name="amount" value={paymentInfo.amount} />
                        <input type="hidden" name="email" value={paymentInfo.email} />
                        <input type="hidden" name="firstname" value={paymentInfo.firstname} />
                        <input type="hidden" name="surl" value={paymentInfo.surl} />
                        <input type="hidden" name="furl" value={paymentInfo.furl} />
                        <input type="hidden" name="curl" value={paymentInfo.curl} />
                        <input type="hidden" name="phone" value={paymentInfo.phone} />
                        {paymentInfo.key === "" ? <button className="checkout-btn cursor-pointer" type="button" onClick={bookingSubmitHandler}>
                          Book Now
                          <svg
                            width={60}
                            height={18}
                            className="arrow"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                          </svg>
                        </button> : <button className="checkout-btn cursor-pointer" type="button" onClick={submitForm}>Proceed to Pay</button>}
                      </form>
                    </div>}
                </div>}
              </div>
            </section>
          </article>
        </main>
      </div>}
    </>
  );
}

export default BookingPage
