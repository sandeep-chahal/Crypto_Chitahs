import { ethers, BigNumber } from "ethers";
import MarketPlaceArtifact from "../artifacts/contracts/MarketPlace.sol/MarketPlace.json";
import NFTArtifact from "../artifacts/contracts/CryptoChitahs.sol/CryptoChitahs.json";

export const getSampleNfts = (n = 0, t = 8) => {
  return Array(t)
    .fill(0)
    .map((_, i) => ({
      name: `Crypto Chitahs #${i + n + 1}`,
      image: `https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${
        i + n + 1
      }.png`,
      nftNumber: i + n + 1,
      from: "0x6805ded3dd8782d0c1b69e19787c6868fafe341f5",
      to: "0x9d05ded3dd8782d0c1b69e19787c6868fafe39b8",
      price: "1.25",
    }));
};
export const importDb = async (db) => {
  const res = await fetch("/metadata-minimized.json");
  const { mapping, data } = await res.json();

  const parsedData = data.map((attrs, i) => {
    const temp = { key: i + 1 };
    for (let i = 0; i < attrs.length; i = i + 2) {
      temp[mapping[attrs[i]]] = mapping[attrs[i + 1]];
    }
    return temp;
  });

  return parsedData;
};

export const shortenAddress = (address) =>
  address.slice(0, 3) + "..." + address.slice(39);

export const parseServerSideProps = (props) => {
  return props.map((prop) => ({
    ...prop,
    tokenId: BigNumber.from(prop.tokenId),
    tx: {
      ...prop.tx,
      gasPrice: BigNumber.from(prop.tx.gasPrice),
      maxPriorityFeePerGas: BigNumber.from(prop.tx.maxPriorityFeePerGas),
      maxFeePerGas: BigNumber.from(prop.tx.maxFeePerGas),
      gasLimit: BigNumber.from(prop.tx.gasLimit),
      value: BigNumber.from(prop.tx.value),
    },
  }));
};

export const getServerSideWeb3 = () => {
  // JSON RPC PRovider
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  const nftContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_NFT_ADDRESS,
    NFTArtifact.abi,
    provider
  );
  const marketPlaceContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
    MarketPlaceArtifact.abi,
    provider
  );
  return {
    provider,
    nftContract,
    marketPlaceContract,
  };
};

export const getFilters = () => {
  return {
    PROPERTY: ["SPECIAL"],
    Background: [
      "1",
      "2",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "16",
      "17",
      "18",
      "19",
      "indianred",
      "pastel orange",
      "slate",
      "bisque",
      "goldenrod",
      "taupe",
      "emerald",
      "aqua",
      "lavender",
      "lemon",
      "plum",
      "khaki",
      "pale blue",
    ],
    Fur: [
      "pink base w beer",
      "pastel blue w coffee",
      "fire fur w coffee",
      "purple base w beer",
      "reg base w beer",
      "purple fur holding nothing",
      "rainbow fur holding nothing",
      "camo fur holding nothing",
      "pink fur holding nothing",
      "pastel blue fur holding nothing",
      "fire fur holding nothing",
      "galaxy fur holding nothing",
      "galaxy base w coffee",
      "pink base w coffee",
      "rainbow base w coffee",
      "reg base w coffee",
      "pastel bluebase w beer",
      "camo w beer",
      "fire fur w bourbon",
      "white base w beer",
      "pink base w wine",
      "pink base w cigar",
      "camo w coffee",
      "camo fur base w cigar",
      "galaxy fur w beer",
      "black base w beer",
      "reg base w cigar",
      "rainbow base w beer",
      "reg fur holding nothing",
      "fire fur w beer",
      "purple base w coffee",
      "galaxy fur w wine",
      "purple base w bourbon",
      "purple base w cigar",
      "camo fur base w wine",
      "purple base w wine",
      "pink base w bourbon",
      "rainbow base w wine",
      "fire fur base w wine",
      "galaxy fur w cigar",
      "camo fur w bourbon",
      "galaxy fur w bourbon",
      "fire fur w cigar",
      "reg base w bourbon",
      "rainbow base w cigar",
      "pastel blue base w wine",
      "pastel blue base w bourbon",
      "pastel blue base w cigar",
      "rainbow base w bourbon",
    ],
    Apparel: [
      "none",
      "blue  puffy vest",
      "grey tshirt",
      "White Become Legendary",
      "white puffy coat",
      "black tshirt",
      "Pink Coalition Crew",
      "camo coat",
      "Black Save The Cheetahs",
      "White Coalition Crew",
      "Black Coalition Crew",
      "Black Know Yourself",
      "snowboard coats",
      "Black Become Legendary",
      "Pink Know Yourself",
      "Pink Save The Cheetahs",
      "Pink Become Legendary",
      "white puffy vest",
      "black puffy vest",
      "black tee",
      "king",
      "black  puffy coat",
      "White Save The Cheetahs",
      "white Save The Cheetahs",
      "White Know Yourself",
      "grey t",
      "white Know Yourself",
    ],
    Eyes: [
      "determined yellow",
      "determined green",
      "squinting yellow",
      "determined blue",
      "squinted black",
      "bitcoin eyes",
      "squinting",
      "normal",
      "normal yellow",
      "eth eyes",
      "determined black dark brow",
      "normal blue",
      "normal green",
      "spinning eyes",
      "glowing",
      "blue laser eyes",
      "squinting green",
      "zombie eyes",
      "squinting blue",
      "laser eyes",
    ],
    Mouth: [
      "Open",
      "Snarling",
      "mouth 2",
      "pink mouth",
      "Regular",
      "Tongue",
      "mobster",
      "Cigar mouth",
    ],
    Accessories: ["none", "silver chain", "gold chain", "microphone"],
    Glasses: ["none ", "nerd", "rayban looking glasses", "glasses"],
    Headgear: [
      "none",
      "backward hat green",
      "vr headset",
      "backward hat red",
      "crown",
      "backward hat black",
      "headphone",
      "backward hat blue",
      "trucker hat",
      "red king crown",
    ],
  };
};
