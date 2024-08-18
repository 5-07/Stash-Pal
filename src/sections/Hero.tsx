import starsBg from "@/assets/stars.png";
import Link from "next/link";

export const Hero = () => {
  return (
    <section
      className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      style={{
        backgroundImage: `url(${starsBg.src})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-violet-200 to-pink-200 "></div>
      
      {/* start planet 
      <div className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"></div>
      {/* end planet */}

      {/* start ring 1 
      <div className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-2 w-2  left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-2 w-2  left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-5 w-5  left-full border border-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full"></div> 
        </div> 
      </div>
      {/* end ring 1 */}
      
      <div className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"></div>
      
      <div className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-5 w-5  left-full border opacity-20 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"></div>
        <div className="h-2 w-2 bg-white/20 rounded-full"></div> 
      </div>
      {/* end rings */}
      
      {/* start overlapping comps */}
      <div className="container relative mt-16 ">
        <div className="justify-items-center">
          <h1 className="text-8xl md:text-[168px] md:leading-none font-semibold text-center tracking-tighter text-gray-900 dark:text-white">
            <span className="text-8xl md:text-[168px] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r to-violet-950 from-violet-500 text-center">Stash</span>Pal
          </h1>
        </div>
        <p className="text-lg md:text-xl text-black/50 mt-5 text-center max-w-xl mx-auto">
        Revolutionize your kitchen experience: easily keep track of pantry items, uncover creative recipes, and simplify meal planning all in one place.
        </p>
        <div className="flex flex-wrap justify-center mt-5 gap-6">

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-70"></div>
            <div className="relative z-10 p-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <div className="bg-white dark:bg-gray-900 p-2 rounded-lg text-center shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                <Link href="/pantry" className="inline-block text-sm md:text-base font-bold text-gray-900 dark:text-white px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-300 transition duration-200">
                  Get Started Now 
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* end overlapping comps */}
    </section>
  );
};
