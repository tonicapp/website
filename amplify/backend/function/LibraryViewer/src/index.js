import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, Metadata, Nft } from "@metaplex-foundation/js";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const walletPubKey = event.pathParameters.address
    const connection = new Connection("https://quiet-muddy-meme.solana-mainnet.discover.quiknode.pro/beec717c55f2af294810049f0ef8fe46afd7eb6b/");
    const keypair = Keypair.generate();

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(keypair));
  
    const owner = new PublicKey(walletPubKey);
    const allNFTs = await metaplex.nfts().findAllByOwner({ owner: owner });
  
    if (!allNFTs.length) {
      return await Promise.resolve(allNFTs);;
    }
  
    const len = allNFTs.length;
    let tonicNFTs = [];
    for(let i = 1; i < len; i++) {
        if(allNFTs[i].json.symbol == "TSONG") {
          tonicNFTs.push(allNFTs[i]);
        }
    }
  
    const result = await Promise.resolve(allNFTs);

    return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(result),
    };
};
