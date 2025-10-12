"use client";
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Water Wave Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center, 
              rgba(255,255,255,0.05) 0%, 
              rgba(240,240,240,0.1) 50%, 
              rgba(230,230,230,0.05) 100%
            ),
            repeating-linear-gradient(
              45deg, 
              rgba(250,250,250,0.02) 0, 
              rgba(240,240,240,0.04) 25px, 
              rgba(255,255,255,0.02) 50px
            )
          `,
          backgroundSize: '400% 400%',
          filter: 'blur(80px)',
        }}
        animate={{
          backgroundPosition: [
            '0% 0%', 
            '100% 100%', 
            '0% 100%', 
            '100% 0%'
          ],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "easeInOut"
        }}
      />

      {/* Water Wave Overlay */}
      <motion.div 
        className="absolute inset-0 z-1"
        style={{
          background: `
            linear-gradient(
              transparent, 
              rgba(240,240,240,0.05), 
              rgba(250,250,250,0.1)
            )
          `,
          maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
        }}
        animate={{
          backgroundPosition: [
            '0% 0%', 
            '0% 100%', 
            '0% 0%'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-6"
      >
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Ajit Yadav
        </h1>
        
        <div className="text-2xl md:text-3xl text-gray-300">
          <TypeAnimation
            sequence={[
              'Software Engineer',
              2000,
              'AI Engineer',
              2000,
              'Cloud Security Specialist',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        
        <Link 
          href="/ResumeAjitYadav.pdf"
          download
          className="inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg py-3 px-6 font-medium hover:opacity-90 transition-all duration-300"
        >
          Download Resume
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;