import React from "react";
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useElvisContext } from "./Context";

function App() {
  const { loading } = useElvisContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Please wait....</h1>
      </div>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
