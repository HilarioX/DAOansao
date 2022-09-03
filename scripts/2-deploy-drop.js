import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "DAOansão membership",
      description: "A DAO for people who want to get into mansão do tempo.",
      image: readFileSync("scripts/assets/smoolo.jpg"),
      primary_sale_recipient: AddressZero,
    });

    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    const metadata = await editionDrop.metadata.get();

    console.log(
      "✅ Contrato editionDrop desenvolvido com sucesso no endereço: ",
      editionDropAddress
    );
    console.log("✅ metadados do editionDrop :", metadata);
  } catch (error) {
    console.log("desenvolvimento falho do contrato editionDrop", error);
  }
})();
