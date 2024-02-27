# The First Farcaster Frame on Aptos to Mint NFTs

This is a Farcaster Frame that allows your Farcaster users to mint an NFT on the Aptos Blockchain directly to their Aptos wallet. All you need to do is like the cast and re-cast it, and then copy paste your Aptos wallet address and click on Mint to mint the NFT. The NFT will then be delivered to your wallet address in a few seconds.

## Create and Deploy an NFT Collection on Aptos using [Crossmint](http://crossmint.com/?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster)

> The collection that I created and deployed is on Production, i.e., Aptos Mainnet. However, it is recommended that you familiarize yourself with this on Staging first before migrating (Testnet/Devnet) to Production (Mainnet). Click to proceed to Crossmint's [Staging Console](https://staging.crossmint.com/console/overview?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster). Click to proceed to Crossmint's [Production Console](https://crossmint.com/console/overview?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster)

1. Create a [Developer Account](https://staging.crossmint.com/console/overview?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster) on Crossmint.
2. Click on Developers -> Click on "**API Keys**"
3. Click on "**Create new key**" under Server-side keys.
4. Enable the following scopes under "**Minting API**" and then click on "**Create server key**"
   - nfts.create - Mint NFTs
   - nfts.read - Read NFTs
   - collections.create - Create collection
   - collections.read - Read collections
5. Use this API key (secret) and use Crossmint's **Create Collection API** to create a new NFT Collection on Aptos. Refer to the [docs here](https://docs.crossmint.com/minting/guides/create-collections?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster). Set the `chain` as `aptos` and format the metadata with the preferred details for your NFT Collection on Aptos.
6. Now, you will be using Crossmint's **Mint API** to create and mint an NFT on Aptos (within the created NFT Collection). Refer to the [docs here](https://docs.crossmint.com/api-reference/minting/nfts/mint-nft?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster). Set the `chain` as `aptos` and format the metadata with the preferred details for the NFT on Aptos. You can also refer to the sample code below:
   ```JS
   const options = {
   method: "POST",
   headers: {
     "X-API-KEY":
     "<Your-API-Key-Here>",
     "Content-Type": "application/json",
    },
    body: '{"metadata":{"description":"First NFT on Aptos","image":"https://wallpapercave.com/wp/wp9637250.jpg","name":"Aptos NFT"},"recipient":"aptos:0x0f076d7dfd190f07081667451d7a9e7a3f2f542cf9175623b703e3c48c6d437c"}',
   };
   fetch(
   "https://staging.crossmint.com/api/2022-06-09/collections/YOUR_COLLECTION_ID/nfts", //replace `staging` with `www` on Production. Replace YOUR_COLLECTION_ID with your deployed NFT Collection's Id. 
   options
   )
   .then((response) => response.json())
   .then((response) => console.log(response))
   .catch((err) => console.error(err));
   ```
7. Refer to this detailed step-by-step guide on [How to Create and Mint NFTs on Aptos](https://blog.crossmint.com/how-to-create-and-mint-nfts-on-aptos/?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster) to further clarification.

## Create a Next App - Create and Configure the Farcaster Frame

Refer to the repository's src for the code that lets you create an NFT Minting Farcaster Frame on Aptos.

## Configure the ENV variables
- `NEXT_PUBLIC_URL` - The URL of your deployed Next app
- `CROSSMINT_ENV` - The Crossmint environment that you are using to deploy the NFT Collection. If it is on Production or Mainnet, use `www`. If it is on Staging or Testnet, use `staging`.
- `NEYNAR_API_KEY` - The Neynar API Key that you will be using to check whether a user has liked your cast and recasted it or not, before proceeding with the mint. 
- `WARPCAST_HASH` - The Hash of the cast for which you want to check whether it has been liked and recasted. Refer to the **Neynar Docs** [here](https://docs.neynar.com/reference/cast).
- `CROSSMINT_API_KEY` - The Crossmint API Key that you created using Crossmint Console. You will be using this key to create an NFT Collection and mint an NFT on Aptos.
- `CROSSMINT_COLLECTION_ID` - The Collection Id of the NFT Collection you deployed on Aptos. You can obtain this from the Crossmint Console after you created a collection on Aptos using the API,

## Built using

- [Next.js](https://nextjs.org/)
- [Crossmint](http://crossmint.com/?utm_source=rohit&utm_medium=github&utm_campaign=aptos-farcaster)
- [Neynar](https://neynar.com/)
- [Onchainkit](https://onchainkit.xyz/)

Special thanks to [@avneesh0612](https://github.com/avneesh0612) for helping with the Neynar and Onchainkit integration. 
