import CSS_Styling from "@/components/questions/CSS-Styling";
import Bot from "@/components/questions/MAQE-Bot";
import TemplateStyling from "@/components/questions/Template-Styling";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col items-center justify-items-center gap-5">
        <h1 className="text-4xl font-black">MAQE Homework Challenge</h1>
        <h1 className="text-4xl font-black underline">Fullstack Engineer (3 Challenges)</h1>
        <h1 className="text-2xl font-semibold underline">Sarun Ngamtabtim</h1>
      </div>
      <div className="w-full block h-fit">
        <h1 className="text-xl font-semibold">Challenge 1: CSS Styling</h1>
        <CSS_Styling />
      </div>
      <div className="w-full flex flex-col h-fit gap-5">
        <h1 className="text-xl font-semibold">Challenge 2: MAQE Bot</h1>
        <Bot />
      </div>
      <div className="w-full flex flex-col h-fit gap-5">
        <h1 className="text-xl font-semibold">Challenge 3: Template and Styling <span className="text-sm font-light text-red-950">(Responsive)</span></h1>
        <TemplateStyling />
      </div>
    </div>



  );
}
