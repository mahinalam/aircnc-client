import React from 'react';
import img from '../../assets/avatar.jpg';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';


const Avatar = () => {
    const {user} = useContext(AuthContext)
    return (
        <img src={user ? user?.photoURL : img} alt="" referrerPolicy='no-referrer' className=' rounded-full' height={30} width={30} />
    )
}



export default Avatar;