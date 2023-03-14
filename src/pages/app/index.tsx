import SongCard from "src/components/app/song/SongCard"
import AppLayout from "src/layouts/AppLayout"
import { Grid } from "@mantine/core"
import { useEffect, useState } from "react";
import { generateTestSongs } from "src/lib/utils/test";

export default function MainApp() {
  const [testData, setTestData] = useState<any[]>([])

  useEffect(() => {
    generateTestSongs(100, setTestData)
  }, [])

  return(
    <AppLayout>
      <Grid columns={10}>
        {testData ? testData.map((test: any) => {
          return (
            <Grid.Col key={test.songName} span={2}>
              <SongCard 
                name={ test.songName }
                artist={ test.artist }
                price={ {value: 0.00, currency: "NIC"} } 
                cover={ test.cover } 
              />
            </Grid.Col>
          )
        })
        : null}
      </Grid>
      
    </AppLayout>
  )
}
