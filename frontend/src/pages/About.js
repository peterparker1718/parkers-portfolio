import React from 'react';

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Parker</h1>
        <p>Passionate developer with expertise in modern web technologies</p>
      </section>
      
      <section className="about-content">
        <div className="about-text">
          <h2>My Story</h2>
          <p>
            I'm a full-stack developer with a passion for creating elegant solutions 
            to complex problems. With expertise in React, Node.js, and modern web 
            technologies, I build scalable applications that deliver exceptional user experiences.
          </p>
        </div>
        
        <div className="skills">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>JavaScript/TypeScript</li>
                <li>HTML5/CSS3</li>
                <li>Vue.js</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>Python</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <ul>
                <li>Git/GitHub</li>
                <li>Docker</li>
                <li>MongoDB/PostgreSQL</li>
                <li>AWS/Vercel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;