import { Grid, Title, Text, Flex, Card } from "@mantine/core";

const features = [
  {
    name: "Cool Feature",
    description: "This is a cool feature for many cool reasons. I shall go into the cool reasons here to talk about how cool this feature is. Isn't this feature so cool?"
  },
  {
    name: "Cool Feature",
    description: "This is a cool feature for many cool reasons. I shall go into the cool reasons here to talk about how cool this feature is. Isn't this feature so cool?"
  },
  {
    name: "Cool Feature",
    description: "This is a cool feature for many cool reasons. I shall go into the cool reasons here to talk about how cool this feature is. Isn't this feature so cool?"
  },
  {
    name: "Cool Feature",
    description: "This is a cool feature for many cool reasons. I shall go into the cool reasons here to talk about how cool this feature is. Isn't this feature so cool?"
  },
]

const extraInfo = [
  {
    name: "Extra Info",
    description: "Super cool information that the user needs to know. Explained in a super cool way that makes it really cool for the user to understand how super cool the information being explained is"
  },
  {
    name: "Extra Info",
    description: "Super cool information that the user needs to know. Explained in a super cool way that makes it really cool for the user to understand how super cool the information being explained is"
  },
  {
    name: "Extra Info",
    description: "Super cool information that the user needs to know. Explained in a super cool way that makes it really cool for the user to understand how super cool the information being explained is"
  },
]

export default function MainFeatures() {
  return (
    <div className="px-20">
      <Title className="text-5xl">Why Tonic?</Title>
      <Grid className="mt-20 space-y-5">
        {
          features.map((feature) => {
            return (
              <>
                <Grid.Col span={7}>
                  <Title>{ feature.name }</Title>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Flex justify="end">
                    <Text color="dimmed">{ feature.description }</Text>
                  </Flex>
                </Grid.Col>
              </>
            )
          })
        }
      </Grid>
      <Grid className="mt-20">
        { extraInfo.map((info) => {
          return (
            <>
              <Grid.Col span={4}>
                <Card mih={300} withBorder shadow="xl" radius="lg">
                  <Title className='text-3xl'>
                    {info.name}
                  </Title>
                  <Text className='mt-5' color="dimmed" size="sm">
                    {info.description}
                  </Text>
                </Card>
              </Grid.Col>
            </>
          )}
        )}
      </Grid>
    </div>
  )
}