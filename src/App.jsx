import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useDisconnect,
} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const desconnect = useDisconnect();
  console.log("👋 Address:", address);

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop(
    "0xdCD1FbAe8C1eD2AEA3F12E89c99ccb21189c57ed"
  );
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false);

  console.log(hasClaimedNFT);

  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      );
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Bem vindo à DAOansão</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Conecta sua wallet aí
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪Página de membros da mansão</h1>
        <p>Parabeéns por ser um membro</p>
        {/* <button onClick={desconnect} className="btn-hero">
          Desconectar
        </button> */}
      </div>
    );
  }

  // Render mint nft screen.
  return (
    <div className="mint-nft">
      <h1>Minta a sua NFT de mebro aí (DE GRATIS TIO)</h1>
      <button disabled={isClaiming} onClick={mintNft}>
        {isClaiming ? "Mintando..." : "Mint sua NFT (FREE)"}
      </button>
    </div>
  );
};

export default App;
