import "../styles/globals.css"

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Web3Provider } from "src/providers/Web3Provider"
import Amplify, { API } from 'aws-amplify';

export default function App({ Component, pageProps }: AppProps) {

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Web3Provider>
      <ColorSchemeProvider colorScheme={ colorScheme } toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme, fontFamily: 'Inter, sans-serif' }} withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </Web3Provider>
  )
}
