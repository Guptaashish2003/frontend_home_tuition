import {React,useState} from "react";
import "./SearchBarTemp.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function SearchBarTemp({children,title,model}) {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ value: ""})
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    
  }

  const handleClick = () => {
    if (!credentials.value ) {
      toast.error("search field is empty", { autoClose: 500, theme: 'colored' })
    }
    else if (isNaN(credentials.value) && model === "pinCode") {

      toast.error("please enter a valid location", { autoClose: 500, theme: 'colored' })
    } 
      
      else if (credentials.value) {
        navigate(`/search/${model}/${credentials.value}`)
        
      }

  }
  
  return (
    <div className="search-bar-container">
<div className="search-fill">
  <input type="text" placeholder={title} value={credentials.value}
                      name="value"
                      onChange={handleOnChange}/>
    <button className="button-src" onClick={handleClick}><span>Search</span>  {children}</button>
</div>

    </div>
  );
}

export default SearchBarTemp;
