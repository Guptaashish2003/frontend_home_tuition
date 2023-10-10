import React from 'react'
import "./HeroSection.css"
import { Link } from "react-router-dom";
function HeroSection() {
  return (
<header className='hero-container'>
  <section className="hero">
    <div className="left">
      <h1>
        The center <br />
        for home <br />
        <span>education</span>
      </h1>
      <p>
      Unlock the power of personalized learning with our online home tutoring platform. We connect you with experienced, dedicated tutors who provide tailored education in the comfort of your home. Elevate your child's academic journey today.
      </p>
        <Link to="search/all/all" className="cta">
        <span>Hire a Tutor</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
      </Link>
    </div>
    <div className="right">
      <img
        src="https://images.unsplash.com/photo-1510070009289-b5bc34383727?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
        alt=""
      />
    </div>
  </section>
</header>


  )
}

export default HeroSection
