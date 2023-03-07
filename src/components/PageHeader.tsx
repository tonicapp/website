import { Grid, Header, Title, Flex, Button } from "@mantine/core";
import Image from "next/image";
import WalletButton from "./wallet/WalletButton";

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
        <Flex align="center" justify="end" className="mr-5">
          <WalletButton />
        </Flex>
      </Grid.Col>
    </Grid>
  </Header>
 ) 
}