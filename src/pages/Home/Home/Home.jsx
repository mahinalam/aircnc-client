import React from 'react';
import Category from '../Category/Category';
import Rooms from '../Rooms/Rooms';
import Container from '../../../components/sharred/Container';

const Home = () => {
    return (
  
            <div className='min-h-[calc(100vh-300px)] z-0'>
                <Category></Category>
                <Rooms></Rooms>
            </div>
      
    );
};

export default Home;