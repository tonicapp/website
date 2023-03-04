import { Grid, Header, Title, Flex, Text, Button } from "@mantine/core";
import Image from "next/image";

export default function PageHeader() {
 return(
  <Header height={50} fixed className="shadow-lg">
    <Grid className="mt-auto">
      <Grid.Col span={4}>
        <Flex align="center" className="ml-5">
          <Image src="/logo.png" alt="Tonic Logo" width={35} height={35}/>
          <Title order={5}>Tonic</Title>
        </Flex>
      </Grid.Col>
      <Grid.Col span={4} className="flex items-center justify-center space-x-2">
        <Button color="gray" variant="subtle">Explore</Button>
        <Button color="gray" variant="subtle">Top Charts</Button>
      </Grid.Col>
      <Grid.Col span={4}>
        <Flex align="center" justify="end" className="mr-5 space-x-2">
          <Button variant="subtle" color="gray" radius={50} size="sm">Log in</Button>
          <Button variant="gradient" radius={50} size="sm" gradient={{ from: '#3D39ED', to: '#0073FC' }}>Sign Up</Button>
        </Flex>
      </Grid.Col>
    </Grid>
  </Header>
 ) 
}