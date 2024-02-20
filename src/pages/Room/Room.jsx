import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '../../components/sharred/Container';
import RoomInfo from './RoomInfo';
import RoomReservation from './RoomReservation';
import RoomBookings from './RoomBookings';

const Room = () => {
    const roomData = useLoaderData()
    console.log(roomData);

    return (
       <div className='pt-28 max-w-screen-xl mx-auto'>
         <Container >
           <RoomInfo roomData={roomData}></RoomInfo>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
          <RoomReservation  roomData={roomData}></RoomReservation>
           <RoomBookings roomData={roomData}></RoomBookings>
          </div>
        </Container>
       </div>
    );
};

export default Room;