import React from "react";
import "./CarouselCard.css";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import bluetick from "../../assets/blueTick.png"
import userLogo from "../../assets/user-logo.jpg"
function CarouselCard({ className, id,login,verification, name, title='Teacher',about='A motivator and cheerleader who encourages students to believe in themselves.', img,charge='Not found',student }) {
const navigate = useNavigate()

  const handleBooking = () => {
    if(student){
      navigate(`/booking/${id}/${student}`)
    }
    else if(login){
      navigate(`/booking/${id}`)
    }
    else{
      navigate(`/register`)
      toast.error("Please Login first", { autoClose: 500, theme: 'colored' })
    }
  }
  
  return (
    <>
      <div className={`card-wrapper ${className}`}>
        <div className="profile">
        { img? <img className="thumbnail" src={img}alt="" />: <img src={userLogo} className="thumbnail"  alt="" />}
          <h3 className="name">{name}{verification? <span className="w-4 inline-block"><img className="w-full h-full" src={bluetick} alt="" /></span> :"" }</h3>
          <p className="title">{title}</p>
          <p className="description ">
            {about}
          </p>
          <div className="flex flex-row justify-center items-center mt-3">
            <span className="number">
              {charge} <span className="follow">Charge Per Hour</span>
            </span>
          </div>
            <button onClick={handleBooking} className=" cursor-pointer btn1 bg-gray-900 text-white hover:bg-gray-900 mt-2">
              Demo Class
            </button>

        </div>
      </div>
    </>
  );
}

export default CarouselCard;
