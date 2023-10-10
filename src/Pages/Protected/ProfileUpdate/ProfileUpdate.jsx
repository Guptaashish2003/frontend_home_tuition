import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileUpdate.css";
import { toast } from 'react-toastify'
import Select from "react-select";
import { getAllSubCategory } from "../../../App/Constants/Constant";
import { ContextCategory } from "../../../App/context/Context";
import { useGetDataProtected } from "../../../App/api/useGetData";
import { useUpdateData, useUpdateDataWithImg } from "../../../App/api/useUpdateData";
import WindowLoader from "../../../Components/WindowLoader/WindowLoader"
import { ContextUser } from "../../../App/context/UserContext";
import userLogo from "../../../assets/user-logo.jpg";
function ProfileUpdate() {
  const navigate = useNavigate()
  const { Category, setCategory, Subject, setSubject, College, setCollege, School, setSchool, Hobbies, setHobbies, Languages, setLanguages } = useContext(ContextCategory)
  const { user, setUser } = useContext(ContextUser);
  const [credentials, setCredentials] = useState({
    category: "", name: '', currentPassword: "",
    newPassword: "", gender: "", phone: "", address: "", studentCategory: "", city: "", pinCode: "", country: "", state: "", school: "", college: "", languages: "", hobbies: "", subject: "", experience: "", qualification: "", charge: "", teacherCategory: "", avatar: "", street: "", about: "", budget: "", resume: ""
  })


  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [FullLoader, setFullLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFullLoader(true);
    getAllSubCategory(setSubject, setCollege, setSchool, setHobbies, setLanguages)
    useGetDataProtected(`/me`)
      .then((data) => {
        setUser(data);
        if (!data.role) {
          navigate("/mainDashboard")
          toast.error("something was wrong Please !login again", { autoClose: 500, theme: 'colored' })
        }
        setCredentials({ ...credentials, ...data.data })
        setFullLoader(false)
      })
      .catch((error) => {
        navigate('/mainDasboard')
        toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
      })

  }, []);

  const handleOnChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    const { name, value } = e.target;

    if (name === 'category') {
      if (value === 'school') {
        setCredentials({
          ...credentials,
          [name]: value,
          school: credentials.category === 'college' ? '' : credentials.school,
          college: ''
        });
      } else if (value === 'college') {
        setCredentials({
          ...credentials,
          [name]: value,
          college: credentials.category === 'school' ? '' : credentials.college,
          school: ''
        });
      } else {
        setCredentials({
          ...credentials,
          [name]: value
        });
      }
    } else {
      setCredentials({
        ...credentials,
        [name]: value
      });
    }



  }
  const handlePhoto = (e) => {
    setCredentials({ ...credentials, avatar: e.target.files[0] });

  }
  const documentHandler = (e) => {
    setCredentials({ ...credentials, resume: e.target.files[0] });
  }
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!credentials.newPassword && !credentials.currentPassword) {
      toast.error("Password is not be empty", { autoClose: 500, theme: 'colored' })
    }
    else if (credentials.newPassword < 5) {
      toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
    }
    else if (credentials.newPassword && credentials.currentPassword) {
      setLoading(true);
      useUpdateData("/me/changepassword", credentials)
        .then((data) => {
          setLoading(false);
          if (data.success) {
            navigate('/mainDasboard')
            toast.success(data.message, { autoClose: 500, theme: 'colored' })
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
        })
    }


  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!credentials.name && !credentials.phone && !credentials.address && !credentials.city && !credentials.state && !credentials.pinCode && !credentials.country) {
        toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password !== credentials.confirmPassword) {
        toast.error("password and confirm password don't match", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.name.length < 1) {
        toast.error("Please enter valid name", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.city.length < 1) {
        toast.error("Please enter valid city", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.street.length < 1) {
        toast.error("Please enter valid street", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.budget.length < 1 && user.role === "student") {
        toast.error("Please enter valid budget", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.state.length < 1) {
        toast.error("Please enter valid state", { autoClose: 500, theme: 'colored' })
      }
      else if (!isNaN(credentials.value)) {
        toast.error("Please valid pinCode", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.phone.length !== 10) {
        toast.error("Please enter a valid mobile number", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.name && credentials.phone && credentials.pinCode && credentials.city) {
        setLoading(true)
        const data = await useUpdateDataWithImg("/me/update", { ...credentials, resume: "", avatar: "" })
        if (data.success) {
          navigate('/mainDasboard')
          toast.success(data.message, { autoClose: 500, theme: 'colored' })
        }
        setLoading(false)
        if (receive.success === true) {
          toast.success(`${receive.message}`, { autoClose: 900, theme: 'colored' })
          navigate('/mainDasboard')
        }
        else {
          setLoading(false);
          toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
          navigate('/mainDasboard')
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })


    }

  }

  const resumeUploadHandler = async () => {
    try {
      if (!credentials.resume) {
        toast.error("Please select resume", { autoClose: 500, theme: 'colored' })
      } else if (credentials.resume) {
        setLoading(true)
        const data = await useUpdateDataWithImg("/me/resume", { resume: credentials.resume })
        if (data.success) {
          setLoading(false)
          toast.success(data.message, { autoClose: 500, theme: 'colored' })
        }

      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    }
  }
  const avatarUploadHandler = async () => {
    try {
      if (!credentials.avatar) {
        toast.error("Please select avatar", { autoClose: 500, theme: 'colored' })
      } else if (credentials.avatar) {
        setLoading(true)
        const data = await useUpdateDataWithImg("/me/avatar", { avatar: credentials.avatar })
        if (data.success) {
          setLoading(false)
          toast.success(data.message, { autoClose: 500, theme: 'colored' })
        }

      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {FullLoader ? <WindowLoader /> : <div className="profile-up-container">
          {/* profile  */}
          <div className=" flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 h-full profile-body">
            <div className="flex-auto p-6">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    {user?.data?.avatar ? <img src={user?.data?.avatar} alt="" /> : <img src={userLogo} alt="" />}
                  </div>
                  <h5 className="user-name">{user?.data?.name}</h5>
                  <h6 className="user-email">{user?.data?.email}</h6>
                </div>
                <div className="about">
                  <h5>About</h5>
                  {user?.role === "student" ? <div className="profile-about">
                    {user?.data?.studentCategory}

                    <div><br />
                      {user?.data?.school}<br />
                      <span>colllege </span>{user?.data?.college}</div>
                    <div><span>hobbies </span>{user?.data?.hobbies}</div>
                    <div><span>languages </span>{user?.data?.languages}</div>

                  </div> : <div className="profile-about">
                    {user?.data?.teacherCategory}

                    <div>{user?.data?.about}</div>
                    <div><span>Charge per hour </span>{user?.data?.charge}</div>
                    <div><span>qualification </span>{user?.data?.qualification}</div>
                    <div><span>experience </span>{user?.data?.experience}</div>

                  </div>

                  }
                </div>
              </div>
            </div>
          </div>
          <div className="up-form-container">
            <div className="flex-auto p-6">

              {/* person detail  */}
              <div className="flex flex-wrap  gutters">
                <div className="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4 md:w-full pr-4 pl-4 sm:w-full pr-4 pl-4 w-full">
                  <h3 className="my-3 theme-dark uppercase">Personal Details</h3>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.name}
                      name='name'
                      onChange={handleOnChange}
                      placeholder="Enter full name"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.currentPassword}
                      name='currentPassword'
                      onChange={handleOnChange}
                      placeholder="Enter Your Current Password"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="number"
                      className="rgt-form-control"
                      value={credentials.phone}
                      name='phone'
                      onChange={handleOnChange}
                      id="phone"
                      placeholder="Enter phone number"
                    />
                  </div>

                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control fix-pass-btn"
                      value={credentials.newPassword}
                      name='newPassword'
                      onChange={handleOnChange}
                      placeholder="Enter Your new Password"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4 avatar-input flex justify-center items-center">
                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg" className="rgt-form-control " onChange={handlePhoto} />
                    <div className="w-48">
                      <div className=' rgt-button changePass-btn mb-8 ' onClick={avatarUploadHandler}>
                        {loading ? <div class="btn-custom-loader"></div> : <>Upload Avatar </>}  </div>
                    </div>
                  </div>

                </div>

                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className='rgt-button changePass-btn' onClick={handlePasswordChange}>
                    {loading ? <div class="btn-custom-loader"></div> : <>Change Password </>}  </div>
                </div>
              </div>
              {user?.data?.role === "teacher" ? <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                <div className="mb-4 resume-input flex justify-center items-center">
                  <input type="file" name="resume" accept=".pdf" className="rgt-form-control " onChange={documentHandler} />
                  <div className="w-48">
                    <div className=' rgt-button changePass-btn mb-8 ' onClick={resumeUploadHandler}>
                      {loading ? <div class="btn-custom-loader"></div> : <>Upload Resume </>}  </div>
                  </div>
                </div>
              </div> : ""}

              {/* address  */}

              <div className="flex flex-wrap  gutters">
                <div className="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4 md:w-full pr-4 pl-4 sm:w-full pr-4 pl-4 w-full">
                  <h3 className="my-3 theme-dark uppercase">Address</h3>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={credentials.address}
                      name='address'
                      onChange={handleOnChange}
                      className="rgt-form-control"
                      placeholder="Address Line"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.street}
                      name='street'
                      onChange={handleOnChange}
                      placeholder="Enter Your Street"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.city}
                      name='city'
                      onChange={handleOnChange}
                      placeholder="Enter Your City"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={credentials.state}
                      name='state'
                      onChange={handleOnChange}
                      className="rgt-form-control"
                      placeholder="Enter Your State"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.country}
                      name='country'
                      onChange={handleOnChange}
                      placeholder="country"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.pinCode}
                      name='pinCode'
                      onChange={handleOnChange}
                      placeholder="Pin Code"
                    />
                  </div>
                </div>
              </div>

              {/* profaction details */}

              {user?.role === "student" ? <div className="flex flex-wrap  gutters">
                <div className="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4 md:w-full pr-4 pl-4 sm:w-full pr-4 pl-4 w-full">
                  <h3 className="my-3 theme-dark uppercase">Profession Details</h3>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <select name="studentCategory" onChange={handleOnChange} className="rgt-form-control rgt-select form-selecter">
                      <option >
                        You Are a
                      </option>
                      <option value="parent">Parent</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4  flex justify-between px-6 radio-btn" onChange={handleOnChange}>
                    <div>
                      <input type="radio" id="school" name="category" value="school" defaultChecked={credentials.category === 'school'} />
                      <label htmlFor="school">School</label>
                    </div>
                    <div>
                      <input type="radio" id="college" name="category" value="college" defaultChecked={credentials.category === 'college'} />
                      <label htmlFor="college">College</label>
                    </div>
                    <div>
                      <input type="radio" id="Non-academic" name="category" value="non-academic" />
                      <label htmlFor="Non-academic">Non-academic</label>
                    </div>
                  </div>

                  <div className="mb-4 ">
                    <input
                      type="number"
                      value={credentials.budget}
                      name='budget'
                      onChange={handleOnChange}
                      className="rgt-form-control mt-8"
                      placeholder="Enter Your ₹ Budget "
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  {credentials.category === "school" ? <div>
                    <h4>School</h4>
                    <Select
                      classNamePrefix="select"
                      defaultValue={School[0]}
                      isClearable={true}
                      isSearchable={true}
                      options={School}
                      name="school"
                      onChange={(selected) => {
                        setSelectedSchool(selected);
                        setCredentials({ ...credentials, "school": selected.value })
                      }}
                      className="filter-select"
                    />
                  </div> : credentials.category === "college" ? <div>
                    <h4>College</h4>
                    <Select
                      classNamePrefix="select"
                      defaultValue={School[0]}
                      isClearable={true}
                      isSearchable={true}
                      options={College}
                      name="college"
                      onChange={(selected) => {
                        setSelectedCollege(selected)
                        setCredentials({ ...credentials, "college": selected.value })
                      }}
                      className="filter-select"
                    />

                  </div> : <div>
                    <div className="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4 md:w-full pr-4 pl-4 sm:w-full pr-4 pl-4 w-full">
                      <h4>Hobbies</h4>
                      <Select
                        isMulti
                        value={selectedHobbies}
                        options={Hobbies}
                        name="hobbies"
                        onChange={(selected) => {
                          setSelectedHobbies(selected);
                          const val = selected.map((select) => select.value)
                          setCredentials({ ...credentials, "hobbies": val })
                        }}
                        className="filter-select"
                      />
                    </div>
                    <div className="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4 md:w-full pr-4 pl-4 sm:w-full pr-4 pl-4 w-full">
                      <h4>Languages</h4>
                      <Select
                        isMulti
                        value={selectedLanguages}
                        options={Languages}
                        name="languages"
                        onChange={(selected) => {
                          setSelectedLanguages(selected);
                          const val = selected.map((select) => select.value)
                          setCredentials({ ...credentials, "languages": val })
                        }}
                        className="filter-select"
                      />

                    </div>


                  </div>}
                </div>

              </div> : <div className="flex flex-wrap  gutters">
                <div className="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4 md:w-full pr-4 pl-4 sm:w-full pr-4 pl-4 w-full">
                  <h3 className="my-3 theme-dark uppercase">Profession Details</h3>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <select name="teacherCategory" onChange={handleOnChange} className="rgt-form-control rgt-select form-selecter">
                      <option >
                        You Are a
                      </option>
                      <option value="individual-teacher">individual Teacher</option>
                      <option value="institute-student">institute's Teacher</option>
                    </select>
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="number"
                      value={credentials.charge}
                      name='charge'
                      onChange={handleOnChange}
                      className="rgt-form-control"
                      placeholder="charge per hour"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={credentials.experience}
                      name='experience'
                      onChange={handleOnChange}
                      className="rgt-form-control"
                      placeholder="Experience"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.qualification}
                      name='qualification'
                      onChange={handleOnChange}
                      placeholder="Qualification"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="rgt-form-control"
                      value={credentials.about}
                      name='about'
                      onChange={handleOnChange}
                      placeholder="About Me"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div>
                    <h4>School</h4>
                    <Select
                      isMulti
                      value={selectedSchool}
                      options={School}
                      name="school"
                      onChange={(selected) => {
                        setSelectedSchool(selected);
                        const val = selected.map((select) => select.value)
                        setCredentials({ ...credentials, "school": val })

                      }}
                      className="filter-select"
                    />
                  </div>


                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div>
                    <h4>College</h4>
                    <Select
                      isMulti
                      value={selectedCollege}
                      options={College}
                      name="college"
                      onChange={(selected) => {
                        setSelectedCollege(selected);
                        const val = selected.map((select) => select.value)
                        setCredentials({ ...credentials, "college": val })
                      }}
                      className="filter-select"
                    />
                  </div>

                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div>
                    <h4>Subject</h4>
                    <Select
                      isMulti
                      value={selectedSubject}
                      options={Subject}
                      name="subject"
                      onChange={(selected) => {
                        setSelectedSubject(selected);
                        const val = selected.map((select) => select.value)
                        setCredentials({ ...credentials, "subject": val })

                      }}
                      className="filter-select"
                    />
                  </div>
                </div>

                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div>
                    <h4>Hobbies</h4>
                    <Select
                      isMulti
                      value={selectedHobbies}
                      options={Hobbies}
                      name="hobbies"
                      onChange={(selected) => {
                        setSelectedHobbies(selected);
                        const val = selected.map((select) => select.value)
                        setCredentials({ ...credentials, "hobbies": val })
                      }}
                      className="filter-select"
                    />
                  </div>
                </div>
                <div className="xl:w-1/2 pr-4 pl-4 lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
                  <div>
                    <h4>Languages</h4>
                    <Select
                      isMulti
                      value={selectedLanguages}
                      options={Languages}
                      name="school"
                      onChange={(selected) => {
                        setSelectedLanguages(selected);
                        const val = selected.map((select) => select.value)
                        setCredentials({ ...credentials, "languages": val })
                      }}
                      className="filter-select"
                    />
                  </div>
                </div>

              </div>}

              <div className="flex flex-wrap  gutters">
                <div className="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4 md:w-full pr-4 pl-4 sm:w-full pr-4 pl-4 w-full">
                  <div className="text-right">
                    <button className='rgt-button' type="submit">
                      {loading ? <div class="btn-custom-loader"></div> : <>Update Profile <i className="zmdi zmdi-arrow-right" /> </>}

                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </form>
    </>
  );
}

export default ProfileUpdate;


// test 


