import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion'; // For animations
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const githubLink = 'https://github.com/bunnysayzz';
  const linkedinLink = 'https://www.linkedin.com/in/md-azharuddin-85742b221/';
  const email = 'azharsayzz@gmail.com';
  const phoneNumber = '911';

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <p className="text-lg mb-4">I am a passionate developer with expertise in web technologies. Currently pursuing a Bachelor's degree in Computer Science.</p>
        
        <div className="flex items-center space-x-4">
          <Link to={githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FiGithub className="w-6 h-6" />
          </Link>
          <Link to={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FiLinkedin className="w-6 h-6" />
          </Link>
          <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800">
            <FiMail className="w-6 h-6" />
          </a>
          <a href={`tel:${phoneNumber}`} className="text-blue-600 hover:text-blue-800">
            <FiPhone className="w-6 h-6" />
          </a>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Tech Stack:</h2>
          <p>JavaScript, React, Node.js, Express, MongoDB, HTML5, CSS3, Tailwind CSS, Git</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <p>I love building interactive web applications and exploring new technologies. Feel free to reach out to me for collaborations or just to say hi!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
