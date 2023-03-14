import { Button, Menu, Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Wallet from '@material-symbols/svg-400/outlined/wallet-fill.svg';
import Avatar from '@material-symbols/svg-400/outlined/account_circle.svg';
import Logout from '@material-symbols/svg-400/outlined/logout.svg'
import Switch from '@material-symbols/svg-400/outlined/compare_arrows.svg'
import '@solana/wallet-adapter-react-ui/styles.css'
import { useRouter } from "next/router";


export default function WalletButton() {
  const { disconnect,  publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter()
  
  const disconnectFromWallet = async () => {
    await disconnect()
  }

  // Display the connection modal
  const newWallet = () => {
    setVisible(true);
  };

  if (!publicKey) {
    return(
      <Button 
        variant="gradient" 
        radius={50} 
        size="xs" 
        gradient={{ from: '#3D39ED', to: '#0073FC' }} 
        leftIcon={<Wallet className="h-5 w-5 fill-white" />} 
        onClick={newWallet}>
          Add Wallet
      </Button>
    )
  }

  return(
    <Menu trigger="hover" transition="skew-down" transitionDuration={300}>
      <Menu.Target>
        <Button 
          variant="gradient" 
          radius={50} 
          size="xs" 
          gradient={{ from: '#3D39ED', to: '#0073FC' }} 
          leftIcon={<Avatar className="h-5 w-5 fill-white" />} 
          onClick={() => router.push(`/app/user/${publicKey?.toString()}`)}>
            {<Text size="sm">{publicKey?.toString().substring(0, 4) + "..."}</Text>}
        </Button>
      </Menu.Target>
      {publicKey ? <Menu.Dropdown>
        <Menu.Item
          icon={<Switch className="h-4 w-4"/>}
          onClick={() => {
            newWallet()
          }}
        >
          <Text size="sm" color="dimmed">Switch Wallet</Text>
        </Menu.Item>
        <Menu.Item
          icon={<Logout className="h-4 w-4 fill-red-500"/>}
          onClick={disconnectFromWallet}
        >
          <Text size="sm" color="red">Disconnect Wallet</Text>
        </Menu.Item>
      </Menu.Dropdown> : null}
    </Menu>
  )
}