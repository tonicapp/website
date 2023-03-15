import { Card, Flex, Grid, Title, Text } from "@mantine/core";
import Image from "next/image";

export default function ArtistFeatures() {
  return (
    <Flex direction="column" align="center" className="space-y-32">
      <Card radius="xl" withBorder shadow="lg" maw={800}>
        <Grid>
          <Grid.Col span={7} className="space-y-5 pl-12 pt-12">
            <Title className="text-4xl">Sell without distributors</Title>
            <Text>
              Take charge of your music career by selling without distributors, labels, or fees. Reward your fans.
            </Text>
          </Grid.Col>
          <Grid.Col span={5} className="flex justify-end">
            <Image width={500} height={500} src="/vinyl.png" alt="vinyl" className="h-full w-full"/>
          </Grid.Col>
        </Grid>
      </Card>
      <Card radius="xl" withBorder shadow="lg" maw={800}>
        <Grid>
          <Grid.Col span={5} className="flex justify-end">
            <Image width={500} height={500} src="/usdc.png" alt="rewards" className="h-full w-full"/>
          </Grid.Col>
          <Grid.Col span={7} className="space-y-5 pl-12 pt-12">
            <Title className="text-4xl">Unlock a new revenue stream</Title>
            <Text>
              Expand your business and unlock untapped potential! You can effortlessly seize a brand new revenue stream and achieve new levels of growth.
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
      <Card radius="xl" withBorder shadow="lg" maw={800}>
        <Grid>
          <Grid.Col span={7} className="space-y-5 pl-12 pt-12">
            <Title className="text-4xl">Connect With Fans</Title>
            <Text>
              Interact with fans directly on Tonic without the need to use a third party social media platform. Build you fanbase and grow your community alongside your biggest supports.
            </Text>
          </Grid.Col>
          <Grid.Col span={5} className="flex justify-end">
            <Image width={500} height={500} src="/rewards.png" alt="rewards" className="h-full w-full"/>
          </Grid.Col>
        </Grid>
      </Card>
    </Flex>
  )
}