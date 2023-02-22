import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";



function App() {
  
  const [nfts, setNfts] = useState<any>(null)
  const getNFTs = async () => {

    console.log("Finding NFTs");
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const keypair = Keypair.generate();
  
    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(keypair));
  
    const owner = new PublicKey("3kQG4UgztyTF9MnJwcKaCPFv5FD64Vk13YzxUrtWgrZn");
    const allNFTs = await metaplex.nfts().findAllByOwner({ owner: owner });
  
    console.log(allNFTs);
    setNfts(allNFTs)

  };

  useEffect(() => {
    getNFTs()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          List of NFTs:
        </p>

        <div>
          { `${nfts}` }
        </div>
        
      </header>
    </div>
  );
}

export default App;
