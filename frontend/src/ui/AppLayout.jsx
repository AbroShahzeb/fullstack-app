import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout({ children }) {
  return (
    <main className="w-full min-h-screen flex-col flex gap-8 md:gap-16 items-center justify-between">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default AppLayout;
