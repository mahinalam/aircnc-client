export const updateStatus = async (id, status) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/rooms/status/${id}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }
    )
    const data = await response.json()
    return data
  };


  //get host bookings by email
  export const getHostBookings = async email => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings/host/${email}`
    )
    const bookings = await response.json()
    return bookings
  }