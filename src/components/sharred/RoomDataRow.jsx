import { format } from 'date-fns'
import DeleteModal from './Modal/DeleteModal'
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import UpdateRoomModal from './Modal/UpdateRoomModal';

const RoomDataRow = ({ room, refetch }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [isEditModalOpen,setIsEditModalOpen] = useState(false)

    const modalHandler = id => {
        axiosSecure.delete(`/rooms/host/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch()
                    toast.success("Room Deleted")
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    const closeModal = () => {
        setIsOpen(false)
    };

    const closeUpdateRoomModal = () => {
        setIsEditModalOpen(false)
    }

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src={room?.image}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div>
                    <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>{room?.title}</p>
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{room?.location}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${room?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(room?.from), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(room?.to), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </span>
                <DeleteModal
                isOpen={isOpen}
                modalHandler={modalHandler}
                closeModal={closeModal}
                id={room._id}
            ></DeleteModal>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span onClick={() => setIsEditModalOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Update</span>
                </span>
                <UpdateRoomModal
                isOpen={isEditModalOpen}
                closeUpdateRoomModal={closeUpdateRoomModal}
                refetch={refetch}
                id={room._id}
                room={room}

                ></UpdateRoomModal>
            </td>
          
        </tr>
    )
}

export default RoomDataRow