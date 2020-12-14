import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className="galaxy">
      <h2><Link to="/robots">ALL ROBOTS</Link></h2>
      <h2> <Link to="/projects">ALL PROJECTS</Link></h2>
    </div>
  )
}

export default Home
