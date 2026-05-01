import Footer from '@/components/Footer'
import HomeHeroSection from '@/components/HomeHeroSection'
import Navbar from '@/components/Navbar'
import ProgrammeInfoSection from '@/components/ProgrammeInfoSection'
import TestimonialSection from '@/components/TestimonialSection'
import WorkSection from '@/components/WorkSection'

const Home = () => {
  return (
    <div className='relative space-y-16 flex flex-col items-center w-full'>
      <Navbar/>
      <div id="home" className="w-full scroll-mt-5 ">
        <HomeHeroSection/>
      </div>
      <div id="about" className="w-full scroll-mt-24">
        <ProgrammeInfoSection/>
      </div>
      <div id="work" className="w-full scroll-mt-5">
        <WorkSection/>
      </div>
      <div id="testimonials" className="w-full scroll-mt-24">
        <TestimonialSection/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home