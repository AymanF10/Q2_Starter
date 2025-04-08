import wallet from "../cluster1/wallet/Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("7E21neTvFFzZAdGwd3VWd8TWDiGVJWiq1qhbyvumvoC6")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority: signer
         };

        let data: DataV2Args = {
            name: "Ayman",
            symbol: "a10",
            uri: "https://aa.net",
            sellerFeeBasisPoints: 10,
            creators: null,
            collection: null,
            uses: null,
            
        };

         let args: CreateMetadataAccountV3InstructionArgs = {
          data,
          isMutable: true,
          collectionDetails: null,
         }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
               ...args,
           }
         )

         let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

//3zfPnWyr2VaT7hoPpdso3yzdBnjxnASb89ntodYCQg2UZqjeZ8ZZdmHsVAqi66Qd6qkT7AjWxw3MqRN9rA92vt4M