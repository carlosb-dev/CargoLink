import { useState } from "react";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      
      <Header
        open={open}
        setOpen={setOpen}
        mostrarAuth={true}
      />

      <DropdownMenu
        open={open}
        mostrarAuth={true}
        mostrarNav={true}
      />

      <main className="flex-1 flex items-center justify-center">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
