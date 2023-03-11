import "../styles/globals.css"

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import "../styles/globals.css"
import UploadSongPage from './UploadSongPage';
import { Web3Provider } from "src/providers/Web3Provider"
import { getFirebaseApp } from "src/lib/firebase/useFirebase"


export default function App({ Component, pageProps }: AppProps) {
  // init firebase
  getFirebaseApp()

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  // Tests the creation of a Candy Machine
  const createCMTest = async () => {
    fetch("http://localhost:3333/api/testcandymachine", {
      method: "POST",
      body: null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate Candy Machine");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Tests a created Candy Machine
  const checkCMTest = async () => {
    fetch("http://localhost:3333/api/testLoadCM", {
      method: "POST",
      body: null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to check Candy Machine");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <ColorSchemeProvider colorScheme={ colorScheme } toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Inter, sans-serif' }} withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
        <UploadSongPage />
        <button  onClick={createCMTest}>Create CM Test</button>
        <button  onClick={checkCMTest}>Check CM Test</button>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
