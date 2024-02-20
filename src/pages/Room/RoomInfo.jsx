import React from 'react';
import Heading from '../../components/sharred/Heading';

const RoomInfo = ({roomData}) => {
    const {image,title,location} = roomData
    return (
        <div>
           <div className='flex flex-col gap-6 pt-10'>
                <div>
                    <p className='text-2xl font-bold'>{title}</p>
                    <p>{location}</p>
                </div>
                <div className='w-full md:h-[60vh]'>
                    <img src={image} className='object-cover w-full h-full rounded-2xl' alt="" />
                </div>
            </div>
        </div>
    );
};

export default RoomInfo;