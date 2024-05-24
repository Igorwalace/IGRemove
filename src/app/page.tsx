
//react
import React from 'react'

//pages
import Home from './pages/home'
import Header from './pages/header'
import Footer from './pages/footer'

const Page = () => {
  return (
    <div className='' >
      <div className='md:px-16 px-5 md:py-3 py-3 bg-white w-full' >
        <Header />
      </div>
      <div className='md:px-16 px-5 md:py-5 py-3'>
        <Home />
      </div>
      <div className='md:px-[128px] px-5 pt-3 md:static absolute bottom-0 left-0 right-0 bg-white' >
        <Footer />
      </div>

    </div>
  )
}

export default Page