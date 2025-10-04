"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Info from "@/components/Info";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { ThreeDCardDemo } from "@/components/Card";
import Chat from "@/components/Chat";

const Home = () => {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={[
          { name: "Card", link: "#card" },
          { name: "Chat", link: "#chat" },
          { name: "Info", link: "#info" },
          { name: "Contact", link: "#contact" },
        ]} />
        <Hero />
        <div id="card"><ThreeDCardDemo /></div>
        <div id="chat"><Chat /></div>
        <div id="info"><Info /></div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;