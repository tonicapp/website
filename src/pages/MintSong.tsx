import React from "react";
import { PublicKey, Transaction } from '@solana/web3.js';
import { keypairIdentity, Metaplex, toBigNumber, token } from '@metaplex-foundation/js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const MintSong: React.FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    async function mintSong(e: React.MouseEvent) {
        e.preventDefault();
        if (!publicKey) return;  // Avoid VS Code issues

        // Get these two from DB
        const candyMachineAddr = '591fQwhccNuMRyWttUfzXVMdGyj6Ufxpcj6zb8ernsng';
        const tonicCut = 0.1;  // Number in %
        const artistPubKeyStr = 'Et1ctkaVX9wADf6xqjBTxsUBMKzJcfUYMPo3riFod5zk';
        const songPrice = 0.9;  // 0.9 USDC

        // ADD CHECK FOR PRICE AND CALL THE WALLET TO CHECK IF THEY HAVE ENOUGH TO PAY

        console.log(`Fetching semi transaction for CM: ${candyMachineAddr}`);

        // Fetch transaction from backend by sending connected wallet as 'account'
        fetch('http://localhost:3333/api/mintsong', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                accountPubKeyStr: publicKey.toString(),
                candyMachineAddress: candyMachineAddr,
                tonicCut: tonicCut,
                artistPubKeyStr: artistPubKeyStr,
                songPrice: songPrice,
            })
        }).then(response => response.json())
        .then(async response => {
          const mintTransaction = Transaction.from(Buffer.from(response.transactionMint, 'base64'));
          const paymentTransaction = Transaction.from(Buffer.from(response.transactionPayment, 'base64'));
            try {
                await sendTransaction(paymentTransaction, connection);
                console.log('Payment transaction complete')
                await sendTransaction(mintTransaction, connection);
                if (response.deleteCandyMachine) {
                    fetch('http://localhost:3333/api/deleteCandyMachine', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            candyMachineAddress: candyMachineAddr,
                        })
                    });
                }
                alert('Purchase complete!');
            } catch (error) {
                console.error(error);
                alert(`Error sending transaction: ${error}`);
            }
        })
        .catch(error => {
          console.error(error);
        });
    }

    return (
        <div>
            <button disabled={!publicKey} onClick={mintSong}>Mint Song</button>
        </div>
    );
};

export default MintSong;