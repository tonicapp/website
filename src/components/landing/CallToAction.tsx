import { Title, Button, Flex } from "@mantine/core"
import { useRouter } from "next/router"

export default function CallToAction() {
  const router = useRouter()
  return (
    <Flex align="center" direction="column" className="pt-10">
      
      <Title className='text-center text-7xl'>Tonic</Title>
      <Title order={4} fw={400} className='text-center' italic>The artist-first platform revolutionizing fan engagement.</Title>
      <div className="mt-8">
        <Button
          size="lg"
          variant="gradient" 
          radius={50} 
          gradient={{ from: '#3D39ED', to: '#0073FC' }} 
          onClick={() => router.push("/app")}>
            Launch App
        </Button>
      </div>
    </Flex>
  )
}