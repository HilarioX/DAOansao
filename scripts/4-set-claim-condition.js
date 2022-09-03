import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop(
  "0xdCD1FbAe8C1eD2AEA3F12E89c99ccb21189c57ed"
);

(async () => {
  try {
    const claimConditions = [
      {
        startTime: new Date(),
        maxQuantity: 16_000,
        price: 0,
        quantityLimitPerTransaction: 1,
        waitInSeconds: MaxUint256,
      },
    ];

    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("✅ Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();
