import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Workshops } from "@/components/Workshops";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Workshops />
      <Contact />
    </div>
  );
};

export default Index;
