import { Flex, Title, Text, Button } from "@mantine/core";
import { useRouter } from "next/router";

export default function FanHero() {
  const router = useRouter()
  return(
    <Flex direction="column" align="center" className="space-y-5 pt-20">
      <Title className='text-7xl'>{`I'm a Fan`}</Title>
      <div className="max-w-xl">
        <Text className="text-center" color="dimmed">Cool text about why it is cool to be a fan and how Tonic makes it easy to support your favorite artists in a very cool way.</Text>
      </div>
      <Button
          size="lg"
          variant="gradient" 
          radius={50} 
          gradient={{ from: '#3D39ED', to: '#0073FC' }} 
          onClick={() => router.push("/app")}>
            Launch App
        </Button>
    </Flex>
  )
}