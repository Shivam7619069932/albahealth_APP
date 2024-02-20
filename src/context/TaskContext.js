import React, { createContext, useState } from "react";

const TaskContext = createContext(undefined);

const TaskContextProvider = (props) => {
  const [activatedKit, setActivatedKit] = useState(false);
  const [reportAvailable, setReportAvailable] = useState(false);

  const providerValue = {
    activatedKit, setActivatedKit,
    reportAvailable, setReportAvailable
  }

  return (
    <TaskContext.Provider value={providerValue}>
      {props.children}
    </TaskContext.Provider>
  )
}

export {
  TaskContext, TaskContextProvider
}
