import React, { createContext, useState } from "react";

const AppContext = createContext(undefined);

const AppContextProvider = (props) => {
  const [appProgress, setAppProgress] = useState()

  const providerValue = {

  }

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  )
}

export {
  AppContext, AppContextProvider
}
