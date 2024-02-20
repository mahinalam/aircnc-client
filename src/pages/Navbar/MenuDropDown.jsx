import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { becomeHost } from '../../api/users';
import HostModal from '../../components/sharred/Modal/HostRequestModal';
import HostRequestModal from '../../components/sharred/Modal/HostRequestModal';
import toast from 'react-hot-toast';

const MenuDropDown = () => {
    const { user, logOut, role,setRole } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    }, [])

    const modalHandler = (email) => {
        console.log(email)
        becomeHost(email, 'host')
            .then(data => {
                setRole('host')
                if (data.modifiedCount > 0) {
                    toast.success("You are Host Now! Post Room")
                }
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='relative '>
            <div className='flex flex-row items-center gap-3'>
                {/* {!role && <button disabled={!user} onClick={() => setIsModalOpen(true)} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer '>
                    AirCNC your home
                </button>} */}

                <div className='hidden md:block text-sm font-semibold'>
                    {!role && <button disabled={!user} onClick={() => setIsModalOpen(true)} className='disabled:cursor-not-allowed rounded-full hover:bg-neutral-100 transition cursor-pointer '>
                        AirCNC your home
                    </button>}
                </div>
                <div
                    onClick={toggleOpen}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {/* <Link
                            to='/'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                            Home
                        </Link> */}
                        {user ?

                            <>
                                <Link
                                    to='/dashboard/my-bookings'
                                    className='px-4  py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Dashboard
                                </Link>
                                <div
                                    onClick={logOut}
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                >
                                    Logout
                                </div>
                            </>
                            :
                            <>
                                <Link
                                    to='/login'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/signup'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Sign Up
                                </Link>
                            </>
                        }
                    </div>
                </div>
            )}
            <HostRequestModal modalHandler={modalHandler} email={user?.email} isOpen={isModalOpen} closeModal={closeModal}></HostRequestModal>
        </div>
    );
};

export default MenuDropDown;