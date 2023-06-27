import React from 'react'
import DeleteAccount from './DeleteAccount'
import ImageUpload from './ImageUpload'
import ProfileInfo from './ProfileInfo'
import UpdatePassword from './UpdatePassword'

export default function Settings() {
  return (
    <div className='mt-[90px] h-[calc(100vh-3.5rem)] flex flex-col gap-y-5'>
        <ImageUpload/>
        <ProfileInfo/>
        <UpdatePassword/>
        <DeleteAccount/>
    </div>
  )
}
