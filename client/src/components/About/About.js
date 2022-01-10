import React from 'react';

import person1 from '../../Images/person1.jpg';
import person2 from '../../Images/person2.jpeg';
import Footer from '../Footer/Footer';
import './styles.css';
import linkedIn from '../../Images/icons8-linkedin-48.png'
import github from '../../Images/icons8-github-48.png'

const About = () => {
    return (
        <>
        <div id='AboutPage' className='About'>
            <h1>About Us</h1>
            <div className="aboutContent">
                <div className="person">
                    <div className="photo"><img src={person1} alt="person1" /></div>
                    <div className="personInfo">
                        <h3><span>Name: </span>Niket Gupta</h3>
                        <h3><span>College: </span>IIT(ISM) Dhanbad</h3>
                        <h3><span>Field of Interest: </span>Web Development, Competitive Programming</h3>
                        <h3><span>Email-Id: </span>niketgupta101@gmail.com</h3>
                        <h3><span>Phone no.: </span>+91-7600420703</h3>
                        <h3><span>Social Links: </span> 
                        <a href="https://github.com/Niketgupta101"><img src={github} alt="" className='links' /></a> 
                        <a href="https://www.linkedin.com/in/niket-gupta-88bb451a6"><img src={linkedIn} alt="" className='links'/></a>
                        </h3>
                    </div>
                </div>
                <div className="person">
                <div className="photo"><img src={person2} alt="person1" /></div>
                    <div className="personInfo">
                        <h3><span>Name: </span>Piyush Pandey</h3>
                        <h3><span>College: </span>IIT(ISM) Dhanbad</h3>
                        <h3><span>Field of Interest: </span>Deep Learning, Computer Vision, NLP.</h3>
                        <h3><span>Email-Id: </span>piyushpandey.19je0607@me.iitism.ac.in</h3>
                        <h3><span>Phone no.: </span>+91-8572928665</h3>
                        <h3><span>Social Links: </span> 
                        <a href="https://github.com/P-yushh"><img src={github} alt="" className='links'/></a> 
                        <a href="https://www.linkedin.com/in/p-yushh"><img src={linkedIn} alt="" className='links'/></a></h3>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default About
