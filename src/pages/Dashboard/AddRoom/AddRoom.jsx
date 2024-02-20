import React, { useContext, useState } from 'react';
import AddRoomForm from './AddRoomForm';
import { imageUpload } from '../../../api/utilities';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddRoom = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [axiosSecure] = useAxiosSecure()
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const location = event.target.location.value
        const title = event.target.title.value
        const from = dates.startDate
        const to = dates.endDate
        const price = event.target.price.value
        const guests = event.target.total_guest.value
        const bedrooms = event.target.bedrooms.value
        const bathrooms = event.target.bathrooms.value
        const description = event.target.description.value
        const category = event.target.category.value
        const image = event.target.image.files[0]

        setUploadButtonText("Uploading...")
        imageUpload(image)
            .then(data => {
                console.log(data)
                const roomData = {
                    location,
                    title,
                    from,
                    to,
                    price: parseFloat(price),
                    guests,
                    bedrooms,
                    bathrooms,
                    description,
                    image: data.data.display_url,
                    host: {
                        name: user?.displayName,
                        image: user?.photoURL,
                        email: user?.email,
                    },
                    category,
              
                }

                if (data.success) {
                    axiosSecure.post(`/rooms`, roomData)
                        .then(res => {
                      if(res.data.insertedId){
                        setLoading(false)
                        toast.success("Reservation Successfull!")
                        navigate('/')
                      }
                        })
                        .catch(err => {
                            console.log(err);
                            toast.error(err.message)
                        })
                }

            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
      

    }

    const handleDates = ranges => {
        setDates(ranges.selection)
    };


    const handleImageChange = image => {
        setUploadButtonText(image.name)
    }



    return (
        <div>
            <AddRoomForm
                handleDates={handleDates}
                loading={loading}
                handleSubmit={handleSubmit}
                uploadButtonText={uploadButtonText}
                dates={dates}
                handleImageChange={handleImageChange}
                setUploadButtonText={setUploadButtonText}

            ></AddRoomForm>
        </div>
    );
};

export default AddRoom;