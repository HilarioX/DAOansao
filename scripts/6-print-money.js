import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x15990D76bb88b080b44A338cDf05aD3e8B1F6e3D");

(async () => {
  try {
    const amount = 1_000_000;
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();

    // Print out how many of our token's are out there now!
    console.log(
      "✅ agora tem ",
      totalSupply.displayValue,
      " $MOOLO em circulação"
    );
  } catch (error) {
    console.error("Falhou em imprimir dinheiro", error);
  }
})();
