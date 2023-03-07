import { Button, Menu, Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Wallet from '@material-symbols/svg-400/outlined/wallet-fill.svg';
import Logout from '@material-symbols/svg-400/outlined/logout.svg'
import Switch from '@material-symbols/svg-400/outlined/compare_arrows.svg'
import '@solana/wallet-adapter-react-ui/styles.css'


export default function WalletButton() {
  const { disconnect, disconnecting, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const clipboard = useClipboard({ timeout: 500 });
  
  const disconnectFromWallet = async () => {
    await disconnect()
  }

  // Display the connection modal
  const newWallet = () => {
    setVisible(true);
  };

  return(
    <Menu trigger="hover" transition="skew-down" transitionDuration={300}>
      <Menu.Target>
        <Tooltip
          label="Copied!"
          color="teal"
          withArrow
          hidden={!clipboard.copied}
          position="left"
        >
          <Button 
            variant="gradient" 
            radius={50} 
            size="sm" 
            gradient={{ from: '#3D39ED', to: '#0073FC' }} 
            leftIcon={<Wallet className="h-5 w-5 fill-white" />} 
            onClick={ publicKey ? () => clipboard.copy(publicKey.toString()) : newWallet}>
              { publicKey ? <Text size="sm">{publicKey?.toString().substring(0, 4) + "..."}</Text>: "Add Wallet" }
          </Button>
        </Tooltip>
        
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