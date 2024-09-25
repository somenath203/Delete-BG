import { SparklesCore } from '@/components/ui/sparkles';


const SparkleHeaderComponent = ({ heading }) => {
  return (
    <div className="w-full bg-black flex flex-col items-center overflow-hidden rounded-md">
      
      <h1 className="text-2xl lg:text-4xl font-bold uppercase tracking-widest text-center text-white relative z-20">
        { heading }
      </h1>

      <div className="w-[40rem] h-10 relative">

        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-violet-700 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-violet-700 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      
      </div>
    
    </div>
  );
};


export default SparkleHeaderComponent;