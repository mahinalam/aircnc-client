import { format } from 'date-fns'
import DeleteModal from '../../../components/sharred/Modal/DeleteModal'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { updateStatus } from '../../../api/bookings'

const TableRow = ({ booking, refetch }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [axiosSecure] = useAxiosSecure()


    const modalHandler = id => {
        axiosSecure.delete(`/bookings/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    updateStatus(booking?.roomId, false)
                    .then(res => {
                  if(res.modifiedCount > 0){
                    refetch()
                    toast.success("Booking Canceled")
                  }
                      
                       
                       
                    })
                    .catch(err => console.log(err))
                  
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    const closeModal = () => {
        setIsOpen(false)
    }



    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src={booking?.image}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div>
                    <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>{booking?.title}</p>
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{booking?.location}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(booking?.from), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(booking?.to), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Cancel</span>
                </span>
            </td>
            <DeleteModal
                isOpen={isOpen}
                modalHandler={modalHandler}
                id={booking?._id}
                closeModal={closeModal}
            ></DeleteModal>
        </tr>
    )
}

export default TableRow