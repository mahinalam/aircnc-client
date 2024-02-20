import React, { useState } from 'react';

const RoomReservation = ({ roomData }) => {
    

    return (
        <div>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                        <div>
                            Hosted by {roomData?.host?.name}
                        </div>
                        <img src={roomData?.image} height={30} width={30} alt="image" className='rounded-full' />
                    </div>
                    <div className='text-neutral-500 font-light flex flex-row items-center gap-4'>
                        <div>{roomData.guests} Guests</div>
                        <div>{roomData.bedrooms} Bedrooms</div>
                        <div>{roomData.bathrooms} Bathrooms</div>
                    </div>
                </div>
                <hr />
                <div className='text-lg font-light text-neutral-500'>
                    {roomData.description}
                </div>
                <hr />
            </div>
        </div>
    );
};

export default RoomReservation;