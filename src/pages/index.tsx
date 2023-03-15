import Head from 'next/head'
import MainHero from 'src/components/landing/heros/MainHero'
import MainFeatures from 'src/components/landing/features/MainFeatures'
import LandingLayout from 'src/layouts/LandingLayout'
import CallToAction from 'src/components/landing/CallToAction'

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
            <MainHero />
        </LandingLayout>
      </main>
    </>
  )
}
