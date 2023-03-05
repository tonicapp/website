import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import "../styles/globals.css"
import UploadSongPage from './UploadSongPage';

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const testWalletPubKey = '4ewoeiKsWM4CaNMR1okdJSZpBdET8ZUn7riHtgee9Mb6';  // Devnet testing Phantom wallet
  const apk = 'Et1ctkaVX9wADf6xqjBTxsUBMKzJcfUYMPo3riFod5zk';  // Dummy wallet

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/testcandymachine', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ 'testWalletPubkey': testWalletPubKey, 'artistPubKey': apk}),
  //     });
  //     const walletInfo = await response.json();
  //     console.log("wallet info:", walletInfo);
  //   };
  //   fetchData();
  // }, []);

  return (
    <ColorSchemeProvider colorScheme={ colorScheme } toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Inter, sans-serif' }} withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
        <UploadSongPage />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
