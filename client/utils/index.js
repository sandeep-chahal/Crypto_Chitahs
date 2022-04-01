import detectEthereumProvider from "@metamask/detect-provider";

export const getProvider = async () => {
  return await detectEthereumProvider();
};
