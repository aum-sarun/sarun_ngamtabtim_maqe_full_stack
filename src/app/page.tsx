import CSS_Styling from "@/components/CSS-Styling";
// import Bot from "@/components/MAQE-Bot";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col items-center justify-items-center gap-5">
        <h1 className="text-4xl font-black">MAQE Homework Challenge</h1>
        <h1 className="text-4xl font-black underline">Fullstack Engineer</h1>
        <h1 className="text-2xl font-semibold underline">Sarun Ngamtabtim</h1>
      </div>
      <div className="w-full block h-fit">
        <h1 className="text-xl font-semibold">Quest 1: CSS Styling</h1>
        <CSS_Styling />
      </div>
      <div className="w-full block h-fit">
        <h1 className="text-xl font-semibold">2. MAQE Homework Challenge - MAQE Bot</h1>
        {/* <Bot /> */}
      </div>
    </div>



  );
}
