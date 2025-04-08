import wallet from "../cluster1/wallet/Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://turbine-solanad-4cde.devnet.rpcpool.com/168dd64f-ce5e-4e19-a836-f6482ad6b396');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = " https://devnet.irys.xyz/4JjT5TCRQ8fH4XWthqRxrDDpDASTNebhqMftDRSXdt1r"; //URL of the image created in nft_image
        const metadata = {
        name: "Jeff's NFT",
        symbol: "Thankyou",
        description: "Token_of_appreciation",
        image,
        attributes: [
            {trait_type: '?', value: '?'}
           ],
        properties: {
        files: [
                {
                       type: "image/jpg",
                        uri: image
                  },
                ]
            },
             creators: []
         };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

