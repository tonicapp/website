import { Title } from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'

export default function Landing() {
  return (
    <>
      <Head>
        <title>Tonic</title>
        <meta name="description" content="Tonic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Image src="/logo.png" alt="main logo" width={500} height={500}/>
        <Title order={1}>Tonic</Title>
      </main>
    </>
  )
}
