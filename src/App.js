import React from "react";
import Layout from "./Layout";
import AppRoutes from "./AppRoutes";
import Snakegame from "./components/NotFound/Snakegame";

function App() {
  return (
    <div>
      <Layout>
        <AppRoutes/>
        {/* <Snakegame/> */}
      </Layout>
    </div>
  );
}

export default App;
