import Nav from "../nav";
import Footer from "../footer";
import { useRouter } from "next/router";

export default ({ children }) => {
  const router = useRouter();
  let nftNumber = router.query.nft;
  if (nftNumber !== undefined) {
    nftNumber = parseInt(nftNumber);
  }
  return (
    <div className="bg-slate-900 text-zinc-200">
      <head>
        <title>Crypto Chitahs{nftNumber ? ` #${nftNumber}` : ""}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content="en_US" />
        <meta name="theme-color" content="#0F172A" />
        <meta
          name="description"
          content="A place to collect wild crypto chitahs"
        />
        <meta name="keywords" />
        <meta name="author" content="Sandeep Chahal" />
        <meta name="google" content="notranslate" />
        {/* open graph */}
        <meta
          property="og:title"
          content={`Crypto Chitahs${nftNumber ? " #" + nftNumber : ""}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://crypto-chitahs.vercel.app/${nftNumber || ""}`}
        />
        {!nftNumber ? (
          <meta
            property="og:image"
            content="https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/QmcZ5QkP38GRJjYYBPtJQoJ7MZXM7aENjQocn7k26qC13M&w=600&h=600&output=gif&n=-1"
          />
        ) : (
          <meta
            property="og:image"
            content={`https://images.weserv.nl/?url=https://cloudflare-ipfs.com/ipfs/Qmf1ppzDanbYTEKL8WE1vLSJL4yKGWejAsr6g8Fnb6WkKL/${nftNumber}.png&w=400&h=400&output=webp`}
          />
        )}
        <meta
          property="og:description"
          content="A place to collect wild crypto chitahs"
        />
      </head>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
