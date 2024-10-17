import React from "react";
import NavBar from "./NavBar";
import Menu from "./Menu";
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blue-500">U N A C H</Link>
        </div>
        <NavBar />
        <Menu />
      </div>
    </header>
  )
}

export default Header;
