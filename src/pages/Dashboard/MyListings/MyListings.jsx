import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import RoomDataRow from '../../../components/sharred/RoomDataRow';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import EmptyState from '../../../components/sharred/EmptyState';
import Loader from '../../../components/sharred/Loader';


const MyListings = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: rooms = [], refetch, isLoading: roomLoading } = useQuery({
        queryKey: ['rooms', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/rooms/host/${user?.email}`)
            return res.data
        }
    });


    return (
    <>
  {!roomLoading ? <>  {rooms && Array.isArray(rooms) && rooms.length > 0 ? <>    <div>
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
                            Delete
                        </th>
                        <th
                            scope='col'
                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                            Update
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => <RoomDataRow
                        key={room._id}
                        room={room}
                        refetch={refetch}
                    />)}
                  
                </tbody>
           
            </table>
          
        </div></> : <><EmptyState
        message="No Room data available!"
        label="Add Room"
        address='/dashboard/add-room'
        ></EmptyState>
        </>}</> : <><Loader></Loader></>}
    </>
    );
};

export default MyListings;