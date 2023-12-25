"use client"

import { useRef } from "react"
import AboutSection from "@/components/AboutSection"
import HeroSection from "@/components/HeroSection"
import GuideSection from "@/components/GuideSection"
import Contact from "@/components/Contact"
import {useScroll,motion, useTransform } from  'framer-motion'

export default function Home() {

  const ref = useRef<HTMLDivElement>(null)
  const refGuide = useRef<HTMLDivElement>(null)

  const {scrollYProgress} = useScroll({
    target:ref,
    offset:["0 1","0 0.1"]

  })
  const scaleProgress = useTransform(scrollYProgress, [0,0] , [0.5,1])


  const { scrollYProgress: guideScrollYProgress } = useScroll({
    target: refGuide,
    offset:["0 1","0 0.1"],
  });
  const guideScaleProgress = useTransform(guideScrollYProgress, [0, 0], [0.5, 1]);


  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">
        
         <HeroSection />
      
      <motion.div 
          ref={ref}
          style={{
            scale:scaleProgress,
            opacity:scrollYProgress
          }}>
      <AboutSection />
      </motion.div>

      <motion.div 
          ref={refGuide}
          style={{
            scale: guideScaleProgress,
            opacity: guideScrollYProgress,
          }}>
      <GuideSection />
      </motion.div>
      
      <div>
       <Contact />
     </div>
      
    </main>
  )
}