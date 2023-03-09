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

  // const mintNFT = async (candyMachineAddressStr: string) => {
  //   let metaplex = null;
  //   fetch("http://localhost:3333/api/getmetaplexobject", {
  //     method: "GET",
  //     body: null,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch metaplex object");
  //       }
  //       metaplex = response.json;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //   });
  //   if (!metaplex) return;
  //   const candyMachineAddress = new PublicKey(candyMachineAddressStr); 
  //   const candyMachine = await metaplex.candyMachines().findByAddress({ address: candyMachineAddress });

  //   const { nft } = await metaplex.candyMachines().mint(
  //     {
  //       candyMachine,
  //       authority,  // Collection Update Authority. Having this as a Keypair is causing an error but idk why?
  //       owner: buyer.publicKey,
  //       guards: {
  //         thirdPartySigner: {
  //           signer: authority,
  //         },
  //       }
  //     },
  //     {
  //       payer: buyer,  // Do I have access to a user's full wallet through the front end? How else would I do this?
  //     },
  //   );
  // }

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
