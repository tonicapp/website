import "../styles/globals.css"

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import "../styles/globals.css"
import { getFirebaseApp } from "src/lib/firebase/useFirebase"


export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    getFirebaseApp()

  return (
    <ColorSchemeProvider colorScheme={ colorScheme } toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Inter, sans-serif' }} withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
