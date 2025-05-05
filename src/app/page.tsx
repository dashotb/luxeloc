import About from "@/components/home/About";
import Cars from "@/components/home/Cars";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <main className="max-w-screen overflow-hidden">
      <Hero/>
      <About/>
      <Services/>
      <Cars/>
    </main>
  );
}
