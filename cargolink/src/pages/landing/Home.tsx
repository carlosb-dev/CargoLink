import { useState } from "react";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import {
  getStoredUserFromCookie,
  type EmpresaData,
} from "../../utils/cookies";
import { HOME_EMPRESA_NAV_ITEMS } from "../../data/navLinks";

function Home() {
  const [open, setOpen] = useState(false);
  const [currentUser] = useState<EmpresaData | null>(() =>
      getStoredUserFromCookie()
    );

  const isLoggedIn = currentUser?.idEmpresa !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      
      <Header
        open={open}
        setOpen={setOpen}
        mostrarAuth={true}
        mostrarNav={ isLoggedIn }
        items={HOME_EMPRESA_NAV_ITEMS}
      />

      <DropdownMenu
        open={open}
        mostrarAuth={true}
        mostrarNav={true}
      />

      <main className="flex-1 flex items-center justify-center">
        <Hero />
      </main>

      <Footer/>
    </div>
  );
}

export default Home;
