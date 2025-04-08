import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../cluster1/wallet/Turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
       const mint = await createMint(connection, keypair, keypair.publicKey, null, 6);
       console.log(`Mint address: ${mint}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

 //Mint address: 7E21neTvFFzZAdGwd3VWd8TWDiGVJWiq1qhbyvumvoC6