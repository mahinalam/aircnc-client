import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RoomCart from './RoomCart';
import Container from '../../../components/sharred/Container';
import { Link, useSearchParams } from 'react-router-dom';
import { getRooms } from '../../../api/rooms';
import Loader from '../../../components/sharred/Loader';
import Heading from '../../../components/sharred/Heading';
const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [params, setParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const category = params.get('category')
    console.log(category);
    console.log(rooms);

    // axios('rooms.json')
    //     .then(res => {

    //         if (category) {
    //             const filtered = res.data.filter(room => room.category === category)
    //             setRooms(filtered)
    //         }
    //         else {
    //             setRooms(res.data)
    //         }
    //     })

    useEffect(() => {
        setLoading(true)
        getRooms()

            .then(data => {
                console.log(data)
                if (category) {
                    const filtered = data.filter(room => room.category === category)
                    console.log(filtered);
                    setRooms(filtered)
                }

                else {
                    setRooms(data)
                }

                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)

            })


    }, [category])

    return (
        <>
            {loading ? <><Loader></Loader></> : <>   <Container>
                {rooms.length > 0 ? <>    <div className='grid xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 pt-12 grid-cols-1'>
                    {rooms.map((room, index) => <Link key={index} to={`/room/${room._id}`}><RoomCart  room={room}></RoomCart></Link>)}
                </div></> : <><Heading title="No Rooms Available In This Category!" subtitle="Please Select Other Categories." center={true}></Heading></>}
            </Container></>}
        </>
    );
};

export default Rooms;