import { Button } from "@mantine/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Wallet from '@material-symbols/svg-400/outlined/wallet-fill.svg';
import '@solana/wallet-adapter-react-ui/styles.css'

export default function WalletButton() {
  const { wallet, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  // Display the connection modal
  const onRequestConnectWallet = () => {
    setVisible(true);
  };

  return(
    <>
      <Button variant="gradient" radius={50} size="sm" gradient={{ from: '#3D39ED', to: '#0073FC' }} leftIcon={<Wallet className="h-5 w-5 fill-white" />} onClick={wallet ? () => {} : onRequestConnectWallet}>{ wallet ? publicKey?.toBase58() : "Connect Wallet"}</Button>
    </>
  )
}