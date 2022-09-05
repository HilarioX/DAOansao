import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const tokenAddress = await sdk.deployer.deployToken({
      name: "DAOansão Governance Token",
      symbol: "SMO",
      primary_sale_recipient: AddressZero,
    });
    console.log(
      "✅ modulo de token desenvolvido com sucesso, no endereço:",
      tokenAddress
    );
  } catch (error) {
    console.error("Falha no desenvolvimento da token", error);
  }
})();
