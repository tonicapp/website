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
    <Header height={50} fixed className="shadow-lg">
      <Grid className="mt-auto">
        <Grid.Col span={4}>
          <Flex className="cursor-pointer ml-5 space-x-1" align="center" onClick={() => router.push("/")}>
            <Image src="/logo.png" alt="Tonic Logo" width={35} height={35}/>
            <Title order={5}>Tonic</Title>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4} className="flex items-center justify-center space-x-2">
          <Button color="gray" variant="subtle">
            <Text size={10} onClick={() => router.push("/artists")}>{`I'm an Artist`}</Text>
          </Button>
          <Button color="gray" variant="subtle">
            <Text size={10} onClick={() => router.push("/fans")}>{`I'm a Fan`}</Text>
          </Button>
        </Grid.Col>
        <Grid.Col span={4}>
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