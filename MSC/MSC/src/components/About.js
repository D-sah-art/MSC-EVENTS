import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaLightbulb, FaGlobe } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaRocket />,
      title: "Innovation",
      description: "Explore cutting-edge Microsoft technologies"
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "Join a vibrant network of tech enthusiasts"
    },
    {
      icon: <FaLightbulb />,
      title: "Learning",
      description: "Hands-on experience with real-world projects"
    },
    {
      icon: <FaGlobe />,
      title: "Impact",
      description: "Make a meaningful difference in the tech world"
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Microsoft Student Community
          </motion.h2>
          
          <motion.div 
            className="about-main"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="about-text">
              <h3 className="about-subtitle">Microsoft Student Community SRMAP - Be a Force for Good!</h3>
              <p className="about-description">
                The Microsoft Student Community, Amaravati at SRM University AP is a vibrant, collaborative student-led organization that brings together tech enthusiasts eager to explore, learn, and innovate with Microsoft tools and technologies. Our mission is to empower students with practical, hands-on experience in areas like Azure, AI, and cloud computing, fostering a collaborative and inclusive environment where members can develop real-world skills.
              </p>
              <p className="about-description">
                Through workshops, hackathons, mentorship sessions, and industry speaker events, we aim to inspire future tech leaders and make a meaningful impact within the university and beyond.
              </p>
            </div>
            
            <div className="about-visual">
              <div className="about-logo-large">
                <div className="logo-circle-large">
                  <img 
                    src="https://msc-srmap.web.app/assets/logo-D0Qzz_Oa.png" 
                    alt="MSC Logo"
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="features-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
