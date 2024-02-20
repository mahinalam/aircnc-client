import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Dashboard/Sidebar/Sidebar'
import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import Loader from '../components/sharred/Loader'


const DashboardLayout = () => {
  const { loading } = useContext(AuthContext)
  return (
    <>
  <div className='relative min-h-screen md:flex'>
        <Sidebar />
        <div className='flex-1  md:ml-64'>
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout