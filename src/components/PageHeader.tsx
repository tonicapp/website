import { Grid, Header, Title, Flex, Button } from "@mantine/core";
import Image from "next/image";

import Wallet from '@material-symbols/svg-400/outlined/wallet-fill.svg';

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
          <Button variant="gradient" radius={50} size="sm" gradient={{ from: '#3D39ED', to: '#0073FC' }} leftIcon={<Wallet className="h-5 w-5 fill-white" />}>Connect Wallet</Button>
        </Flex>
      </Grid.Col>
    </Grid>
  </Header>
 ) 
}