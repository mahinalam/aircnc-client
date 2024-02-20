import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import EmptyState from '../../../components/sharred/EmptyState'
import TableRow from '../MyBookings/TableRow'
import Loader from '../../../components/sharred/Loader'

const ManageBookings = () => {
    const [axiosSecure] = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)
    //   const [bookings, setBookings] = useState([])
    //   const { user } = useContext(AuthContext)
    //   const fetchBookings = () => {
    //     getHostBookings(user?.email).then(data => {
    //       setBookings(data)
    //     })
    //   }
    //   useEffect(() => {
    //     fetchBookings()
    //   }, [user])
    const { data: bookings = [], isLoading: bookingsLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/bookings/host/${user?.email}`)
            return res.data;

        }
    })

    return (
        <>
 {!bookingsLoading ? <>           {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
                <div className='container mx-auto px-4 sm:px-8'>
                    <div className='py-8'>
                        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                <table className='min-w-full leading-normal'>
                                    <thead>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Location
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                From
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                To
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings &&
                                            bookings.map(booking => (
                                                <TableRow
                                                    key={booking._id}
                                                    booking={booking}
                                                    refetch={refetch}
                                                />
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyState
                    message='No booking data available!'
                    address='/'
                    label='Go Back!'
                />
            )}</> : <><Loader></Loader></>}
        </>
    )
}

export default ManageBookings