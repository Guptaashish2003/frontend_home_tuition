import React, { useEffect } from "react";
import "./AboutPage.css";
function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-page">
      <div className="about-content">
        <h2>About Our Tutors</h2>
        <p>
          At <h4>Studyspotindia</h4>, we are dedicated to fostering academic excellence and empowering students on their educational journey. With a passion for education and a commitment to excellence, we have curated a team of exceptional tutors to guide students from 1st grade to graduation across all subjects.

          Our Commitment to Excellence

          <h4>Our tutors are more than educators:</h4> they are mentors who believe in the potential of every student. We take pride in carefully matching each student with the perfect tutor, ensuring a strong connection and effective learning.

          Key Features

           Our tutors provide individualized, one-on-one guidance, allowing students to grasp concepts at their own pace while addressing their unique challenges.

          <h4>Customized Curriculum:</h4> Tailored lessons guarantee that students receive targeted support where they need it most. Our curriculum adapts to the student's learning style and goals.

          <h4>Flexible Scheduling:</h4> We understand the demands of busy lifestyles. That's why we offer flexible scheduling options, including evenings and weekends, to accommodate every student's availability.

          <h4>Experienced Tutors:</h4>Our team of tutors comprises highly qualified and experienced professionals with a proven track record of helping students achieve their academic aspirations.

          <h4>Competitive Pricing:</h4> Quality education should be accessible to all. We are proud to offer competitive rates, ensuring our services remain affordable for students from all backgrounds.

          Our Mission

          <h4>We are driven by a singular mission:</h4> to empower students to unlock their full potential academically and beyond. Our commitment to personalized learning, flexibility, and affordability makes us the ideal choice for students and parents seeking top-quality home tuition services.

          Join us today and embark on a journey towards educational excellence with <h4>Studyspotindia</h4>.

        </p>
      </div>
    </div>
  );
}

export default AboutPage;
