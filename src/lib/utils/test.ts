// @ts-ignore
import getRandomFruitsName from "random-fruits-name";

const testLangs = ["en", "es", "ja", "pt", "pl", "fr", "de", "cs"]
const imageCollectionID = 1853603

export const generateTestSongs = (num: number, setter: (data: any) => void) => {
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
  setter(data)
}