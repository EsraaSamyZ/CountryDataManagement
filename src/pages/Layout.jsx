import Navbar from "../components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main
        dir="rtl"
        className="lg:space-y-6 sm:space-y-3 w-10/12 m-auto my-10"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
