import { Link, useLocation, useNavigate } from 'react-router-dom'

import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import axios from 'axios'

const Login = () => {
    const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = (data) => {
        setLoading(true)
        setEmail(data.email)
        signIn(data.email, data.password)
            .then(result => {
                if (result.user) {
                    setLoading(false)
                    toast.success("Login Successfull!")
                    navigate(from, { replace: true })
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
                toast.error("Couldn't Find any Account!")

            })
    }

    const handleGoogleSignIn = () => {
        setLoading(true)
        signInWithGoogle()
            .then(result => {
                if (result.user) {
                    const email = result.user.email
                    axios.put(`${import.meta.env.VITE_API_URL}/users/${email}`, { email })
                        .then(res => {
                            setLoading(false)
                            toast.success("Login Successfull")
                            navigate(from, { replace: true })
                        })
                        .catch(err => {
                            setLoading(false)
                        })


                }
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })
    }

    const handleResetPassword = () => {
        const resetEmail = email
        console.log(resetEmail);
        resetPassword(resetEmail)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input {...register("email")}
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                {...register("password")}
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-rose-500 w-full rounded-md py-3 text-center text-white'
                        >
                            {loading ? <TbFidgetSpinner size={20} className='animate-spin mx-auto' /> : 'Continue'}
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login