type PublishedSong = {
    candyMachineAddr: string;
    dbFilename: string;
    collectionNftMintAddress: string;
    price: number;
    tonicCut: number;
};

const PlaceHolderCall: React.FC = () => {
    async function getPublishedSongs(userPubKey: string): Promise<PublishedSong[]> {
        const response = await fetch(`/publishedSongs/${userPubKey}`);
        const publishedSongs = await response.json();

        if (publishedSongs.length() > 0) {
            const metadata = await getNftMetadata(publishedSongs[0].collectionNftMintAddress);
            // Do stuff with metadata
        }
        return publishedSongs;
    }

    async function getNftMetadata(collectionNftMintAddress: string) {
        await fetch(`/getNftMetaDataByMint`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                collectionNftMintAddress: collectionNftMintAddress,
            })
        }).then(response => response.json())
        .then(response => { 
            console.log(`Name: ${response.data.name}`);
            console.log(`Image: ${response.data.image}`);
            return response;
        });
    }

    return (
        <div>

        </div>
    );
};

export default PlaceHolderCall;