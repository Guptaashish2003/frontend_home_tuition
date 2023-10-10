import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import "./SearchFilter.css";
import CarouselCard from "../../Components/CarouselCard/CarouselCard";
import {
  getAllSubCategory,
  getAllTeacher,
} from "../../App/Constants/Constant";
import { ContextCategory } from "../../App/context/Context";
import { useContext } from "react";
import WindowLoader from "../../Components/WindowLoader/WindowLoader";
import Pagination from "../../Components/Pagination/Pagination";
import { ContextUser } from "../../App/context/UserContext";
import { useGetDataProtected } from "../../App/api/useGetData";
function SearchFilter() {
  const navigate = useNavigate()
  const searchRef = useRef();
  const filterRef = useRef();
  const {
    Category,
    Subject,
    setSubject,
    College,
    setCollege,
    School,
    setSchool,
    Hobbies,
    setHobbies,
    Languages,
    setLanguages,
  } = useContext(ContextCategory);

  const {user,setUser,userRef} = useContext(ContextUser)
  
  let  {keyword,value,student}  = useParams();
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Result, setResult] = useState([]);
  const [search, setSearch] = useState({search:"",val:""});
  const [currentPage, setCurrentPage] = useState(1);
  const [login, setLogin] = useState(false);
  const [totalPages, setTotalPages] = useState()
  const[teacherCount, setTeacherCount ] = useState(true);

  const clearFilter = () => {
    setSelectedSchool([])
    setSelectedCollege([])
    setSelectedLanguages([])
    setSelectedHobbies([])
    setSelectedSubject([])
    setSearch({search:"",val:""})
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    if(userRef){
      userRef.classList.remove("show")
      userRef.classList.remove("closed-mod");
    }
    setLoading(true);
    if (localStorage.getItem("token")) {
      useGetDataProtected(`/me`)
     .then((data) =>{
      setUser(data);
      setLogin(true);
      if(!data.role){
        navigate("/")
        toast.error("something was wrong Please !login again", { autoClose: 500, theme: 'colored' })
      }
    })
    .catch((error) =>{
      navigate('/')
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    })
    } 
    getAllSubCategory(
      setSubject,
      setCollege,
      setSchool,
      setHobbies,
      setLanguages
    );
    getAllTeacher({ currentPage: currentPage, keyword, value,subject:selectedSubject,school:selectedSchool,college:selectedCollege,hobbies:selectedHobbies,languages:selectedLanguages,search }).then((data) => {
      setResult(data.data)
      setTotalPages(data.totalPages);
      setTeacherCount(data.count)
      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    })
    window.scroll(0, 0);
  }, [selectedSchool,selectedCollege,selectedHobbies,selectedLanguages,selectedSubject,search,currentPage]);

  
  const searchHandler = async ( ) => {
    if (isNaN(searchRef.current.value)) {
      setSearch({...search,"search":"keyword",val:searchRef.current.value})
    }
    else{
      setSearch({...search,"search":"pinCode",val:searchRef.current.value})

    }
  
  }


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filterEnable=() =>{
    filterRef.current.classList.toggle('enableFilter');
  }
  return (
    <>
      {Loading ? (
        <WindowLoader />
      ) : (
        <section className="Sr-ft-container">
          <div className="filter-section">
            <div className="ft-by-category">
              <input
                ref={searchRef}
                type="text"
                name="search"
                placeholder="Search BY Name or PinCode"
                className="serch-box-filter text-center"
              />
              <button
                className="rgt-button Login-btn filter-btn-fix"
                onClick={searchHandler}
              >
                Search
                <i className="fa fa-search"></i>
              </button>
              <button
                className="rgt-button result-clear filter-button"
                onClick={filterEnable}
              >
                Filter
              </button>
                  <div className="filter-disable" ref={filterRef}>
                    <h2 className="filter-title">Category</h2>
                    <a href="">Academic</a>
                    <a href="">creative fields</a>

                    <div className="ft-by-category ft-by-subCategory">
                      <h2 className="filter-title">SubCategory</h2>
                      <div>
                        <h4>School</h4>
                        <Select
                          isMulti
                          value={selectedSchool}
                          options={School}
                          name="school"
                          onChange={(selected) => setSelectedSchool(selected)}
                          className="filter-select"
                        />
                      </div>
                      <div>
                        <h4>College</h4>
                        <Select
                          isMulti
                          value={selectedCollege}
                          options={College}
                          onChange={(selected) => setSelectedCollege(selected)}
                          className="filter-select"
                        />
                      </div>
                      <div>
                        <h4>subject</h4>
                        <Select
                          isMulti
                          value={selectedSubject}
                          options={Subject}
                          onChange={(selected) => setSelectedSubject(selected)}
                          className="filter-select"
                        />
                      </div>
                      <div>
                        <h4>Hobbies</h4>
                        <Select
                          isMulti
                          value={selectedHobbies}
                          options={Hobbies}
                          onChange={(selected) => setSelectedHobbies(selected)}
                          className="filter-select"
                        />
                      </div>
                      <div>
                        <h4>Languages</h4>
                        <Select
                          isMulti
                          value={selectedLanguages}
                          options={Languages}
                          onChange={(selected) =>
                            setSelectedLanguages(selected)
                          }
                          className="filter-select"
                        />
                      </div>
                    </div>
                    <button onClick={clearFilter} className="rgt-button result-clear">Clear</button>
                  </div>
            </div>
          </div>
          <div className="result-section scrole-none w-full">
            <div className="filter-result  h-full ">
              {teacherCount === 0 ? <div className="sc-ld-container"><div className="flex justify-center items-center  mx-auto text-8xl">NOT FOUND</div></div>:Result.map((user) => (
                <CarouselCard
                  key={user._id}
                  id={user._id}
                  login={login}
                  student={student}
                  name={user.name}
                  title={user.qualification}
                  about={user.about}
                  charge={user.charge}
                  img={user.avatar}
                  verification={user.isVerified}  
                  className="filter-card-sizing"
                />
              ))}
            </div>
           {teacherCount>9? <div className="result-paging">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>:""}
          </div>
        </section>
      )}
    </>
  );
}

export default SearchFilter;
