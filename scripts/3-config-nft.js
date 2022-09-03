import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(
  "0xdCD1FbAe8C1eD2AEA3F12E89c99ccb21189c57ed"
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Smoolo Pass NFT",
        description: "This NFT will give you access to DAOansão",
        image: readFileSync("scripts/assets/smoolo.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
