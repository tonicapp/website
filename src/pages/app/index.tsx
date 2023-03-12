import SongCard from "src/components/app/SongCard"
import AppLayout from "src/layouts/AppLayout"
import { Grid } from "@mantine/core"

// @ts-ignore
import getRandomFruitsName from "random-fruits-name";
import { useEffect, useState } from "react";

const testLangs = ["en", "es", "ja", "pt", "pl", "fr", "de", "cs"]
const imageCollectionID = 1853603

export default function MainApp() {
  const [testData, setTestData] = useState<any[]>([])

  const generateTestData = (num: number) => {
    let data = []

    for (let i = 0; i < num; i++) {
      data.push(
        {
          songName: getRandomFruitsName(testLangs[Math.random() * testLangs.length], { maxWords: 1 }),
          artist: getRandomFruitsName(testLangs[Math.random() * testLangs.length], { maxWords: 2 }),
          cover: ""
        }
      )
    }

    for (let i=0; i < num; i++) {
      data[i].cover = `https://source.unsplash.com/collection/${imageCollectionID}/?sig=${i}`
    }
    setTestData(data)
  }

  useEffect(() => {
    generateTestData(100)
  }, [])

  return(
    <AppLayout>
      <Grid>
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
