import React, { useContext, useState } from 'react';
import DatePicker from './Calender';
import Button from '../../components/sharred/Button';
import { AuthContext } from '../../providers/AuthProvider';
import { formatDistance } from 'date-fns';
import BookingModal from '../../components/sharred/Modal/BookingModal';

const RoomBookings = ({ roomData }) => {
    console.log(roomData)
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState({
        startDate: new Date(roomData?.from),
        endDate: new Date(roomData?.to),
        key: 'selection',
    });

        //price calculation
    const totalPrice = parseFloat(formatDistance(new Date(roomData.to), new Date(roomData.from)).split(' ')[0] * roomData.price);

    const [bookingInfo, setBookingInfo] = useState({
        guest: { name: user.displayName, email: user.email, image: user.photoURL },
        host: roomData.host.email,
        location: roomData.location,
        price: totalPrice,
        to: value.endDate,
        from: value.startDate,
        title: roomData.title,
        roomId: roomData._id,
        image: roomData.image,
      })



    const handleSelect = ranges => {
        setValue({ ...value })
    };

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className='bg-white rounded-xl order-first md:order-last border-[1px] border-neutral-200 overflow-hidden px-10'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>$ {roomData.price}</div>
                <div className='font-light text-neutral-600'>night</div>
            </div>
            <hr />
            <div className='flex justify-center '>
                <DatePicker handleSelect={handleSelect} value={value} />
            </div>

            <hr />
            <div className='p-4'>
                <Button
                    onClick={() => setIsOpen(true)}
                    disabled={roomData?.host?.email === user?.email || roomData?.booked}
                    label='Reserve'
                />
            </div>
            <hr />
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>

            <BookingModal
          bookingInfo={bookingInfo}
          isOpen={isOpen}
          closeModal={closeModal}
        />
        </div>
    );
};

export default RoomBookings;