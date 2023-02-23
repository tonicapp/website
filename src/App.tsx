import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";


function App() {
  
  const axios = require("axios");
  const wallet =  "DcTmx4VLcf5euAB17nynax7g55xuB3XKBDyz1pudMcjW"
  const [first_nft, setNFT] = useState<any>(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "qn_fetchNFTs",
    params: {
      wallet: wallet,
      omitFields: ["provenance", "traits"],
      page: 1,
      perPage: 10,
    },
  };
  axios
    .post("mainnet-beta", data, config) // placeholder, use quicknode to test
    .then(function (response: any) {
      console.log(response.data);
      setNFT(response.data.result.assets[0].name);
      // handle success
      console.log(response.data);
    })
    .catch((err: any) => {
      // handle error
      console.log(err);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Wallet:
        </p>
        <div>
        { `${wallet}` }
        </div>

        <p>
          List of NFTs:
        </p>

        <div>
        { `${first_nft}` }
        </div>
        
      </header>
    </div>
  );
}

export default App;
