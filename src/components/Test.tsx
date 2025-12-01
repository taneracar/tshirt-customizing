import Image from "next/image";


export default function Test() {
  return (
    <div className="w-screen h-screen flex relative">
        <div className="w-1/2 h-full bg-white"></div>
        <div className="w-1/2 h-full bg-black"></div>
        <Image src="/images/peakpx.jpg" width={1920} height={1080} alt="bgImage1" className="w-full h-full object-contain absolute top-0"/>
         <Image src="/images/background_tshirt.png" width={1920} height={1080} alt="bgImage1" className="w-[120px] h-[150px] object-contain absolute top-0 left-0"/>
        </div>
  )
}