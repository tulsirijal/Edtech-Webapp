import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
export default function Dashboard() {
    const {loading:authLoading} = useSelector(state=>state.auth);
    const {loading:profileLoading} = useSelector(state=>state.profile);
    if(authLoading || profileLoading){
        return <div className='mt-20'>loading...</div>
    }
  return (
    <div className='min-h-[calc(100vh-3.5rem)] relative flex z-10'>
        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] w-full overflow-auto flex items-center justify-center'>
            <div className='mx-auto w-11/12 max-w-[900px]'>
                <Outlet/>
            </div>
        </div> 
    </div>
  )
}
