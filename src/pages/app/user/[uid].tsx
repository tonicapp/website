import { Image } from '@mantine/core'
import { useRouter } from "next/router";
import AppLayout from "src/layouts/AppLayout";

export default function User() {
  const router = useRouter()
  const { uid } = router.query

  return (
    <AppLayout>
      <Image src={`https://source.unsplash.com/random/1920x400?background`} radius="xl" className=" rounded-lg" alt="background-image"/>
      <div> 
        <img src={`https://source.unsplash.com/random/400x400?profile-picture`} className={`relative w-1/6 rounded-full -mt-44 ml-20 border-solid border-white border-8`} alt="background-image"/>
        
      </div>
      
    </AppLayout>
  )
}