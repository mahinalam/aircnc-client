

import axios from "axios"

//get all rooms
export const getRooms = async () => {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`)
    console.log(data)
    return data.data
};


//get host rooms

export const getHostRooms = async (email) => {
    // const data = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/host?email=${email}`)
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/host/${email}`)
    console.log(email)
    return data.data
};


// update a room
export const updateRoom = async (roomData, id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
      body: JSON.stringify(roomData),
    })
  
    const data = await response.json()
    return data
  }
