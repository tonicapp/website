import { Image, Flex, Title, Text, Button, useMantineColorScheme, Grid } from '@mantine/core'
import SongCard from '../../../components/app/song/SongCard'
import { useRouter } from "next/router";
import Add from "@material-symbols/svg-400/outlined/add.svg"
import AppLayout from "src/layouts/AppLayout";

// @ts-ignore
import getRandomFruitsName from 'random-fruits-name'
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import UploadSongModal from 'src/components/app/song/UploadSongModal';

import { generateTestSongs } from 'src/lib/utils/test';

export default function User() {
  const router = useRouter()
  const { uid } = router.query
  const [user, setUser] = useState()
  const [songsOwned, setSongsOwned] = useState<number>()
  const [songsUploaded, setSongsUploaded] = useState<number>()
  const [testOwned, setTestOwned] = useState<any[]>([])
  const [testUploaded, setTestUploaded] = useState<any[]>([])
  const [opened, {open, close}] = useDisclosure()

  const { colorScheme } = useMantineColorScheme()

  useEffect(() => {
    const owned = Math.round(Math.random() * 100)
    const uploaded = Math.round(Math.random() * 100)
    setUser(getRandomFruitsName())
    setSongsOwned(owned)
    setSongsUploaded(uploaded)
    generateTestSongs(owned, setTestOwned)
    generateTestSongs(uploaded, setTestUploaded)
  }, []) 
  

  return (
    <AppLayout>
      <UploadSongModal opened={opened} close={close} />
      <Image src={`https://source.unsplash.com/random/1920x400?background`} radius="xl" className=" rounded-lg" alt="background-image"/>
      <Flex className='space-x-10'> 
        <img src={`https://source.unsplash.com/random/400x400?profile-picture`} className={`relative w-1/6 h-1/6 rounded-full -mt-24 ml-20 border-solid ${colorScheme == "dark" ? `border-[#1A1B1E]`: "border-white"} border-8`} alt="background-image"/>
        <div className='mt-3'>
          <Title>{ user }</Title>
          <Text color="muted" size="sm">{ uid }</Text>
          <Text color="muted" size="sm">{`@${user}`}</Text>
        </div>
        <div className='mt-3'>
         <Title>{ songsOwned }</Title>
         <Text color="muted" size="sm">Songs Owned</Text>
        </div>
        <div className='mt-3'>
         <Title>{ songsUploaded }</Title>
         <Text color="muted" size="sm">Songs Uploaded</Text>
        </div>
        <Button
          variant="gradient" 
          radius={50} 
          size="xs" 
          gradient={{ from: '#3D39ED', to: '#0073FC' }} 
          rightIcon={<Add className="h-5 w-5 fill-white"/>}
          className='mt-8'
          onClick={open}>
            Upload Song
        </Button>
      </Flex>
      <div className='mt-10 space-y-5'>
        <Title>Owned Songs</Title>
        <Flex className='space-x-3 overflow-scroll'>
          {testOwned ? testOwned.map((test: any) => {
              return (
                <>
                  <SongCard 
                    name={ test.songName }
                    artist={ test.artist }
                    price={ {value: 0.00, currency: "NIC"} } 
                    cover={ test.cover } 
                  />
                </>
              )
            })
          : null}
        </Flex>
      </div>
      <div className='mt-10 space-y-5'>
        <Title>Uploaded Songs</Title>
        <Flex className='space-x-3 overflow-scroll'>
          {testUploaded ? testUploaded.map((test: any) => {
              return (
                <>
                  <SongCard 
                    name={ test.songName }
                    artist={ test.artist }
                    price={ {value: 0.00, currency: "NIC"} } 
                    cover={ test.cover } 
                  />
                </>

              )
            })
          : null}
        </Flex>
      </div>
      
      
    </AppLayout>
  )
}