import "./Page.css";
import HeroSection from "../../Components/HeroSection/HeroSection";
import SearchBar from "../../Components/searchBars/SearchBar";
import CarouselCard from "../../Components/CarouselCard/CarouselCard";
import { React, useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../../Data";
import { Outlet, isRouteErrorResponse } from "react-router-dom";
import { getAllTeacher } from "../../App/Constants/Constant";
import whatapp from "../../assets/whatapp.png"
import dailer from "../../assets/dailer.png"
import { useGetDataProtected } from "../../App/api/useGetData";
import { ContextUser } from "../../App/context/UserContext";
import { toast } from 'react-toastify'
function HomePage() {
  const [loading, setLoading] = useState(true);
  const [Result, setResult] = useState([]);
  const {user,setUser} = useContext(ContextUser)

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token") && localStorage.getItem("Role")) {
      useGetDataProtected(`/me`)
      .then((data) =>{
       setUser(data);
     })
     .catch((error) =>{
       toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
     })
      
    }
    getAllTeacher({ currentPage: 1,subject:"",school:"",college:"",hobbies:"",languages:"",  }).then((data) => {
      setResult(data.data)
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false);
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    })
  }, []);

  return (
    <>
      <Outlet/>
      <HeroSection />
      <SearchBar />
      {Result.length>=3 ?<section className="card-container">
        <div className="carousel-container">
          {loading ? (
            <h1>loading</h1>
          ) : 
          (
            <Slider {...settings}>
             {Result.map((teacher) => (<CarouselCard key={teacher._id} id={teacher._id} login={user?.success} name={teacher.name} title={teacher.qualification} about={teacher.about} charge={teacher.charge} verification={teacher.isVerified}  className="card-sizing" />
              ))}
            </Slider>
          )
          }
        </div>
        <div className=" fixed bottom-8 right-10 flex justify-center flex-col items-center">
        <div className="w-16">
          <a href="tel:+918826611071" target="_blank" >
          <img className="w-full h-full" src={dailer} alt=""  />
          </a>
        </div>
        <div className="w-12 ">
          <a href="https://wa.me/+918826611071" target="_blank" >
          <img className="w-full h-full" src={whatapp} alt=""  />
          </a>
        </div>

        </div>
      </section>:""}
    </>
  );
}

export default HomePage;
