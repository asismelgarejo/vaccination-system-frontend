import React from "react";
import { TabsetterProvider } from "./contexts/Tabsetter.context";
import { UserLoggedProvider } from "./contexts/UserLogged.context";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <UserLoggedProvider>
        <TabsetterProvider>
          <Home />
        </TabsetterProvider>
      </UserLoggedProvider>
    </div>
  );
}

export default App;
