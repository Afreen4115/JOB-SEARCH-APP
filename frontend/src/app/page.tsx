import { Hero } from '@/components/hero'
import CareerGuide from '@/components/career-guide'
import React from 'react'
import ResumeAnalyzer from '@/components/resume-analyzer'

const Home = () => {
  return (
    <div>
      <Hero />
      <CareerGuide />
      <ResumeAnalyzer/>
    </div>
  )
}

export default Home