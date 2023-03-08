import { Title, Button, Flex } from "@mantine/core"
import { useRouter } from "next/router"

export default function CallToAction() {
  const router = useRouter()
  return (
    <Flex align="center" direction="column">
      <Title order={4} fw={400} className='text-center' italic>Impressive</Title>
      <Title className='text-center text-7xl'>Catch Phrase</Title>
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