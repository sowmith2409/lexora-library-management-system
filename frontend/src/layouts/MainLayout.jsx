import Sidebar from "../layouts/Sidebar";

function MainLayout({ children }) {

  return (

    <div
      className="
        min-h-screen
        bg-[#f8f8f7]
      "
    >

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN CONTENT */}

      <main
        className="
          ml-[320px]
          p-10
          min-h-screen
        "
      >

        {children}

      </main>

    </div>

  );

}

export default MainLayout;