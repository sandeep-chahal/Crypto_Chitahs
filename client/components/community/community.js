import React from "react";

const Community = () => {
  return (
    <section className="px-40 py-16">
      <h2 className="text-center mb-8">
        <span className="block text-3xl">Join Our</span>
        <span className="block text-4xl font-black">Community</span>
      </h2>
      <p className="w-1/2 mx-auto text-center font-medium">
        Come join the Crypto Chitahs Discord community! We're a friendly and
        helpful bunch, and we're always happy to chat about all things crypto.
        Whether you're a beginner or a seasoned pro, we're sure you'll find
        something of interest here. So what are you waiting for? Come on in and
        join the fun!
      </p>
      <button className="flex items-center bg-slate-100 text-slate-800 px-3 py-1 rounded-md mx-auto my-8 hover:invert active:translate-y-2 transition-all">
        <img src="/discord.svg" width={35} height={35} />
        <span className="ml-2 font-black">Launch Discord</span>
      </button>
    </section>
  );
};

export default Community;
