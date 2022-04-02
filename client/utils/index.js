import detectEthereumProvider from "@metamask/detect-provider";

export const getProvider = async () => {
  return await detectEthereumProvider();
};

export const getSampleNfts = (n = 0) => {
  return Array(8)
    .fill(0)
    .map((_, i) => ({
      name: `Crypto Chitahs #${i + n + 1}`,
      image: `https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${
        i + n + 1
      }.png`,
      to: "0x9d05ded3dd8782d0c1b69e19787c6868fafe39b8",
      price: "1.25",
    }));
};
