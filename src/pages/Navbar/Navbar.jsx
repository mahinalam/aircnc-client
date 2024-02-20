import React from 'react';
import Container from '../../components/sharred/Container';
import img from '../../assets/logo.png'
import Search from './Search';
import MenuDropDown from './MenuDropDown';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

    <Container>
      <nav className='p-5 shadow-sm fixed top-0 bg-white  right-0 left-0 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 z-10 '>

        <div className='flex justify-between items-center'>
          <div>
            <Link to='/'><img src={img} className='hidden md:block w-[100px] h-auto' alt="" /></Link>
          </div>

          <Search></Search>
          <MenuDropDown></MenuDropDown>
        </div>
      </nav>
    // </Container>

  );
};

export default Navbar;