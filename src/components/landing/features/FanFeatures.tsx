import { Card, Flex, Grid, Title, Text } from "@mantine/core";
import Image from "next/image";

export default function FanFeatures() {
  return (
    <Flex direction="column" align="center" className="space-y-32">
      <Card radius="xl" withBorder shadow="lg" maw={800}>
        <Grid>
          <Grid.Col span={5} className="flex justify-end">
            <Image width={500} height={500} src="/headphones.png" alt="headphones" className="h-full w-full"/>
          </Grid.Col>
          <Grid.Col span={7} className="space-y-5 pl-12 pt-12">
            <Title className="text-4xl">Support your creators</Title>
            <Text>
              Cut out the middle man and support your favorite artists 
              directly by buying their songs, albums, playlists, and merch.
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
      <Card radius="xl" withBorder shadow="lg" maw={800}>
        <Grid>
          <Grid.Col span={7} className="space-y-5 pl-12 pt-12">
            <Title className="text-4xl">Earn amazing rewards</Title>
            <Text>
              Unlock exclusive rewards for supporting your favorite 
              artists - limited merch, discounts, pre-sales, livestreams, 
              and more! Show your love and gain access to perks.
            </Text>
          </Grid.Col>
          <Grid.Col span={5} className="flex justify-end">
            <Image width={500} height={500} src="/rewards.png" alt="headphones" className="h-full w-full"/>
          </Grid.Col>
        </Grid>
      </Card>
    </Flex>
  )
}