import json

def create_nft_json(songname: str, genre: str, artist: str, release_date: str, mp3_uri: str, image_uri: str):
    """
    Creates an json to be used as an nft.
    """
    json_data = json.dumps({
        "name": songname,
        "symbol": "TONICSONG",
        "description": f"{songname} by {artist}",
        "seller_fee_basis_points": 1000,
        "external_url": "https://tonicmusic.tech",
        "attributes": [
            {
                "trait_type": "Genre",
                "value": genre
            },
            {
                "trait_type": "Artist",
                "value": artist
            },
            {
                "trait_type": "Posting Date",
                "value": release_date
            }
        ],
        "animation_url": mp3_uri,
        "image": image_uri,
        "properties": {
            "files": [
                {
                    "type": "audio/mp3",
                    "uri": mp3_uri
                },
                {
                    "type": "image/png",
                    "uri": image_uri
                }
            ],
            "category": "audio"
        }
    }, indent=4)

    return json_data
