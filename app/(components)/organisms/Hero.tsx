import Image from "next/image";
export const Hero = () => {

  return (
    <div
      className="relative overflow-hidden container rounded-sm bg-slate-200 h-80 flex items-center justify-center gap-15 w-full"
      id="hero"
    >
      <Image 
        src={'https://picsum.photos/1920/1080'}
        fill
        alt="Hero Image"
        className="object-cover aspect-video"
      />

    </div>
  );
};
