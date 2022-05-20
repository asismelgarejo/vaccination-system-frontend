import React from "react";
import { TabsetterProvider } from "./contexts/Tabsetter.context";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <TabsetterProvider>
        <Home />
      </TabsetterProvider>
    </div>
  );
}

export default App;
