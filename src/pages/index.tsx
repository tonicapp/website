import Head from 'next/head'
import Hero from 'src/components/landing/Hero'
import Features from 'src/components/landing/Features'
import LandingLayout from 'src/layouts/LandingLayout'

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
        <LandingLayout>
            <Hero />
            <Features />
        </LandingLayout>
      </main>
    </>
  )
}
