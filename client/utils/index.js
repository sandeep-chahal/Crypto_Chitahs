import detectEthereumProvider from "@metamask/detect-provider";

export const getProvider = async () => {
  return await detectEthereumProvider();
};

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
