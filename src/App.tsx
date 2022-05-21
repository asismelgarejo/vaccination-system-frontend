import React from "react";
import { CitizenProvider } from "./contexts/Citizen.context";
import { TabsetterProvider } from "./contexts/Tabsetter.context";
import { UserLoggedProvider } from "./contexts/UserLogged.context";
import { Home } from "./pages/Home";

function App() {

  return (
    <div className="App">
      <CitizenProvider>
        <UserLoggedProvider>
          <TabsetterProvider>
            <Home />
          </TabsetterProvider>
        </UserLoggedProvider>
      </CitizenProvider>
    </div>
  );
}

export default App;
