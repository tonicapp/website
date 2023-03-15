import { Grid, Header, Title, Flex, Button, Text, ActionIcon, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import Sun from "@material-symbols/svg-400/outlined/light_mode.svg"
import Moon from "@material-symbols/svg-400/outlined/dark_mode.svg"
import { useRouter } from "next/router";

export default function MainHeader() {
  const router = useRouter()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return(
    <Header height={50} className="shadow-lg">
      <Grid className="mt-auto">
        <Grid.Col span={6}>
          <Flex className="cursor-pointer ml-5 space-x-1" justify="start" align="center" onClick={() => router.push("/")}>
            <Image src="/logo.png" alt="Tonic Logo" width={35} height={35}/>
            <Title order={5}>Tonic</Title>
          </Flex>
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex align="center" justify="end" className="mr-5 space-x-3">
            <Button
              size="xs"
              variant="gradient" 
              radius={50} 
              gradient={{ from: '#3D39ED', to: '#0073FC' }} 
              onClick={() => router.push("/app")}>
                Launch App
            </Button>
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