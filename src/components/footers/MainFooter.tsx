import { Footer, Grid, Flex, Title, Text, Group, ActionIcon, TextInput, Button } from "@mantine/core";
import Image from "next/image";
import { IconBrandDiscord, IconBrandYoutube, IconBrandTwitter, IconBrandInstagram, IconBrandGithub, IconBrandTelegram } from "@tabler/icons-react";

const icons = [
  <IconBrandYoutube key="YouTube" className="h-4 w-4"/>, 
  <IconBrandTelegram key="Twitter" className="h-4 w-4"/>, 
  <IconBrandGithub key="Github" className="h-4 w-4"/>, 
  <IconBrandTwitter key="Twitter" className="h-4 w-4"/>, 
  <IconBrandInstagram key="Instagram" className="h-4 w-4"/>, 
  <IconBrandDiscord key="Discord" className="h-4 w-4"/>
]

export default function MainFooter() {
  return (
    <Footer height={200} fixed={false}>
      <Grid className="h-full">
        <Grid.Col className="pl-20 pt-10 space-y-3" span={4}>
          <Flex align="center" className="space-x-1">
            <Image src="/logo.png" alt="Tonic Logo" width={30} height={30}/>
            <div>
              <Title order={5}>Tonic</Title>
              <Text color="dimmed" size="xs">Tonic is very cool</Text>
            </div>
          </Flex>
          <Group spacing="sm">
            { icons.map((icon) => {
              return (
                <>
                  <ActionIcon radius="xl" size="sm" variant="filled">
                    { icon }
                  </ActionIcon>
                </>
              )
            })}
          </Group>
          <Text size="xs">© Tonic 2023. All rights reserved.</Text>
        </Grid.Col>
        <Grid.Col span={4}>

        </Grid.Col>
        <Grid.Col span={4} className="pr-20 pt-10 space-y-3">
          <div>
            <Title order={6}>Stay in the loop</Title>
            <Text color="dimmed" size="xs">Stay up to date with everything Tonic</Text>
          </div>
          <Flex className="space-x-2">
            <TextInput placeholder="Your Email" radius="xl" />
            <Button color="gray" variant="outline" radius="xl">Sign Up</Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </Footer>
  )
}