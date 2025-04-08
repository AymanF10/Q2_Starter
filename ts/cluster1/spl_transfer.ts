import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../cluster1/wallet/Turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("7E21neTvFFzZAdGwd3VWd8TWDiGVJWiq1qhbyvumvoC6");

// Recipient address
const to = new PublicKey("BNzha7X7125GTXcWF9gMgdint6UFLev2MXXr8qqzaGRs"); // recievers wallet address

(async () => {
    try {
        const fromwallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        const towallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to, 
        );
        const signature = await transfer (
            connection,
            keypair,
            fromwallet.address,
            towallet.address,
            keypair,
            1,
        );
        console.log(`Transaction signature: ${signature}`);

        
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

//Transaction signature: 4jG93rpxdpCHofkLFGa4GvcnnfepVHAyZbh7HyHWvwRi32DwhSiPkN6L5CcPgsru7zH2ps2eqKFKnHEnCjsKwecT