import { useDisclosure } from "@mantine/hooks"
import { Button } from '@mantine/core'
import Right from '@material-symbols/svg-400/outlined/chevron_right.svg';
import LoginModal from "./LoginModal";

export default function LoginButton() {
  const [opened, {open, close}] = useDisclosure(false)

  return (
    <>
      <LoginModal opened={opened} close={close}/>
      <Button 
        variant="gradient" 
        radius={50} 
        size="xs" 
        gradient={{ from: '#3D39ED', to: '#0073FC' }} 
        rightIcon={<Right className="h-5 w-5 fill-white" />} 
        onClick={open}>
          Log In
      </Button>
    </>
    
  )
}