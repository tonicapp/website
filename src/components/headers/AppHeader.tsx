import { Grid, Header, Title, Flex, Button, ActionIcon, useMantineColorScheme, Box } from "@mantine/core";
import Image from "next/image";
import Sun from "@material-symbols/svg-400/outlined/light_mode.svg"
import Moon from "@material-symbols/svg-400/outlined/dark_mode.svg"
import { useRouter } from "next/router";
import WalletButton from "../app/wallet/WalletButton";
import LoginButton from "../app/auth/LoginButton";
import { useWallet } from "@solana/wallet-adapter-react";

export default function AppHeader() {
  const router = useRouter()
  const { publicKey } = useWallet()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return(
    <Header height={50} fixed className="shadow-lg">
      <Grid className="mt-auto">
        <Grid.Col span={4}>
          <Flex className="cursor-pointer ml-5 space-x-1" align="center" onClick={() => router.push("/app")}>
            <Image src="/logo.png" alt="Tonic Logo" width={35} height={35}/>
            <Title order={5}>Tonic</Title>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4} className="flex items-center justify-center space-x-2">
          <Button color="gray" variant="subtle">Explore</Button>
          <Button color="gray" variant="subtle">Top Charts</Button>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" justify="end" className="mr-5 space-x-3">
            <LoginButton />
            <ActionIcon
              size="md"
              variant="subtle"
              color={dark ? 'yellow' : 'indigo'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Sun className="h-5 w-5 fill-[#FAB005]" /> : <Moon className="h-5 w-5 fill-[#4C6EF5]" />}
            </ActionIcon>
          </Flex>
        </Grid.Col>
      </Grid>
    </Header>
  ) 
}