import { Flex, Title, Text, Button } from "@mantine/core";
import { useRouter } from "next/router";

export default function ArtistHero() {
  const router = useRouter()
  return(
    <Flex direction="column" align="center" className="space-y-5 pt-20">
      <Title className='text-7xl'>{`I'm an Artist`}</Title>
      <div className="max-w-xl">
        <Text className="text-center" color="dimmed">Cool text about why it is cool to be a an Artist and how Tonic makes it easy to make music without having to deal with other stuff.</Text>
      </div>
      <Button
          size="lg"
          variant="gradient" 
          radius={50} 
          gradient={{ from: '#3D39ED', to: '#0073FC' }} 
          onClick={() => router.push("/app")}>
            Get Started
        </Button>
    </Flex>
  )
}