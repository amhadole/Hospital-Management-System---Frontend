import { Avatar, Divider } from '@mantine/core'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector((state: any)=> state.user)
  return (
    <div className='p-10'>
      <div className='flex gap-5 items-center'>
        <Avatar variant="filled" src="/doctorAvatar.jpg" alt="it's me" size={150}/>
        <div className='flex flex-col gap-3'>
            <div className='text-3xl font-medium text-neutral-900'>{user.name}</div>
            <div className='text-xl text-neutral-700'>{user.email}</div>
        </div>
      </div>
      <Divider my='xl'/>
      <div>
        
      </div>
    </div>
  )
}

export default Profile
