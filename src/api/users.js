import axios from "axios";

//get all users
//  getAllUsers = () => {

// };




//become host
export const becomeHost = async (email, data) => {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${email}`, { data });
    //    const data = res.data;
    console.log(res.data);
    return res.data
}