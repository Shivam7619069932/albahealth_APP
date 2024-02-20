import React, { createContext, useState } from "react";

const RootContext = createContext(undefined);

const RootContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [toast, showToast] = useState('');

  const providerValue = {
    loading, setLoading, showError, setShowError, toast, showToast
  }

  return (
    <RootContext.Provider value={providerValue}>
      {props.children}
    </RootContext.Provider>
  )
}

export {
  RootContext, RootContextProvider
}
