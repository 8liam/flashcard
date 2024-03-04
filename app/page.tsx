import Image from "next/image";
import Navbar from "./components/navbar";
import Onboarding from "./components/pages/onboarding";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Onboarding />
    </>

  );
}
