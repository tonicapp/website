import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const keypair = Keypair.generate();

  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(keypair));

  const owner = new PublicKey("4ZfZ5o21vFZfpqz42gwXxQ2YP18Xz2NCnVyxS6r1TNSL");
  const allNFTs = await metaplex.nfts().findAllByOwner({ owner: owner });

  console.log(allNFTs);
})();