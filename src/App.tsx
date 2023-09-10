import React, { useRef } from "react";
import { CitizenProvider } from "./contexts/Citizen.context";
import { SteppersetterProvider } from "./contexts/Steppersetter.context";
import { TabsetterProvider } from "./contexts/Tabsetter.context";
import { UserLoggedProvider } from "./contexts/UserLogged.context";
import { Home } from "./pages/Home";

function App() {
  const ref = useRef();
  return (
    <div className="App">
      <button onClick={()=> ref.current && ref.current.method1()}>REALZIAR ACCION</button>
      <CitizenProvider>
        <UserLoggedProvider>
          <TabsetterProvider>
            <SteppersetterProvider>
              <Home ref={ref}/>
            </SteppersetterProvider>
          </TabsetterProvider>
        </UserLoggedProvider>
      </CitizenProvider>
    </div>
  );
}

export default App;
