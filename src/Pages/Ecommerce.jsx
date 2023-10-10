import {React,useEffect,useContext, useState }from 'react';
import { BsCurrencyRupee } from 'react-icons/bs';
import { Stacked,   SparkLine } from '../Components';
import {  SparklineAreaDataStudent,SparklineAreaDataTeacher } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useGetDataProtected,useGetUserData } from '../App/api/useGetData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { ContextUser } from '../App/context/UserContext';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
const Ecommerce = () => {
  const {user,setUser } = useContext(ContextUser)
  const [dashboardData , setDashboardData ] = useState([]);
  const [headerData , setHeaderData ] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
  
    useGetDataProtected(`/me`)
    .then((data) =>{
     setUser(data);
     if(data.data.role!=="admin"){
       navigate("/mainDasboard")
       toast.error("something was wrong Please !login again", { autoClose: 500, theme: 'colored' })
     }
   })
   .catch((error) =>{

     navigate('/mainDasboard')
     toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
   })
   useGetUserData("dashboard").then((data) =>{
    setDashboardData(data.data);


  
  })
  .catch((error) =>{
    navigate('/mainDasboard')
    toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
  })
   
   
 }, []);

  const { currentColor  } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">{dashboardData?.totalRevenue}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4 round"
            >
              <BsCurrencyRupee />
            </button>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
        <div className="bg-white h-44  dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: 'red-600' }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl round"
              >
                {<MdOutlineSupervisorAccount />}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{dashboardData?.studentCount}</span>
    
              </p>
              <p className="text-sm text-gray-400  mt-1">{'Student'}</p>
            </div>
        <div className="bg-white h-44  dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: 'red-600' }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl round"
              >
                {<MdOutlineSupervisorAccount />}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{dashboardData?.teacherCount}</span>
    
              </p>
              <p className="text-sm text-gray-400  mt-1">{'Teacher'}</p>
            </div>
        <div className="bg-white h-44  dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: 'red-600' }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl round"
              >
                {<FiBarChart />}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{dashboardData?.bookingCount}</span>
    
              </p>
              <p className="text-sm text-gray-400  mt-1">{'Booking'}</p>
            </div>
            
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white  dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                <BsCurrencyRupee />
                </span>
                <span>Revenue</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div>
              <Stacked  width="90%" height="90%" />
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between'>

          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Teacher</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">{dashboardData?.teacherCount}</p>
                <p className="text-gray-200">Monthly </p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="column-sparkLine-teacher" height="100px" type="Column" data={SparklineAreaDataTeacher} width="320" color="rgb(242, 252, 253)" />
            </div>

            
          </div>


          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Student</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">{dashboardData?.studentCount}</p>
                <p className="text-gray-200">Monthly </p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparklineAreaDataStudent} width="320" color="rgb(242, 252, 253)" />
            </div>

            
          </div>
 

        </div>
      </div>

    </div>
  );
};

export default Ecommerce;
