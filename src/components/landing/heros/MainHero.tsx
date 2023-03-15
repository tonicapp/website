import { Flex, Grid, Title, Card, Text, Button } from '@mantine/core';
import { useRouter } from "next/router"
import RightArrow from "@material-symbols/svg-400/outlined/arrow_right_alt.svg"

export default function MainHero() {
  const router = useRouter()
  return (
    <Flex className='w-full justify-center flex-col'>
      <Title className='text-center text-8xl'>Tonic</Title>
      <Title order={4} fw={400} className='text-center' italic>The artist-first platform revolutionizing fan engagement.</Title>

      <Grid className='mt-16'>
        <Grid.Col span={6}>
          <Card className='mx-20' withBorder shadow="xl" mih={200} radius="lg">
            <Title className='text-3xl'>
              {`I'm a fan`}
            </Title>
            <Text className='mt-5' color="dimmed" size="sm">
              {`Support your favorite artists directly by buying their songs, albums, playlists, and merch. Best of all, get NFTs of songs on purchase. Go above and beyond with artist subscriptions.`}
            </Text>
            <Button variant='gradient' gradient={{ from: '#3D39ED', to: '#0073FC' }} size="sm" radius={50} rightIcon={<RightArrow className="h-5 w-5 fill-white" />} className="mt-12" onClick={() => router.push('/fans')}>
              Learn More
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card className='mx-20' mih={200} withBorder shadow="xl" radius="lg">
            <Title className='text-3xl'>
              {`I'm an artist`}
            </Title>
            <Text className='mt-5' color="dimmed" size="sm">
              Become the next big thing without dealing with the BS. Say goodbye to ridiculous commissions and welcome in new revenue sources, all while engaging your fans on the same platform.
            </Text>
            <Button variant='gradient' gradient={{ from: '#3D39ED', to: '#0073FC' }} size="sm" radius={50} rightIcon={<RightArrow className="h-5 w-5 fill-white" />} className="mt-12" onClick={() => router.push('/artists')}>
              Learn More
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Flex>
  );
}