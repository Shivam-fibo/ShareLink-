import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './component/Navbar'
import Howitwork from './component/Howitwork'
import Home from './component/Home'
import Footer from './component/Footer'
import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/howitwork' element = {<Howitwork/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
     <Toaster/>
    </div>
  )
}

export default App