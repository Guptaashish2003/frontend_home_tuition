import React from 'react'
import "./SearchBar.css"
import SearchBarTemp from './SearchBarTemp/SearchBarTemp'
function SearchBar() {
  return (
    <section className='search-container'>
<>
  <h2 >Search Your Nearest home tutor</h2>
  <div className="warpper">
    <input
      className="radio"
      id="one"
      name="group"
      type="radio"
      
    />
    <input className="radio" id="two" name="group" type="radio" defaultChecked/>
    <div className="tabs">
      <label className="tab" id="one-tab" htmlFor="one">
        subject
      </label>
      <label className="tab" id="two-tab" htmlFor="two">
        pincode
      </label>

    </div>
    <div className="panels">
      <div className="panel" id="one-panel">
        <div className="panel-title">search by Subject </div>

        <SearchBarTemp title="search by subject" model="subject"> <i className="fa fa-search"></i></SearchBarTemp>
      </div>
      <div className="panel" id="two-panel">
        <div className="panel-title">search by pincode </div>

        <SearchBarTemp title="search by pincode" model="pinCode"><i className="fa fa-map-marker"></i></SearchBarTemp>
      </div>

    </div>
  </div>
</>

    </section>
  )
}

export default SearchBar
