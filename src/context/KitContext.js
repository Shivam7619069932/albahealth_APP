import React, { createContext, useState } from "react";

const KitContext = createContext(undefined);

const KitContextProvider = (props) => {
  const [activatedKit, setActivatedKit] = useState(false);
  const [kitQRE, setKitQRE] = useState({
    title: 'Kit questionnaire',
    locked: false,
    completed: false,
    qa: [
      {
        question: 'Kit questionnaire - sample question 1?',
        options: [],
        optiontype: 'number',
        unit: 'times a day',
        answer: ''
      },
      {
        question: 'Kit questionnaire - sample question 2?',
        options: [],
        optiontype: 'number',
        unit: 'times a day',
        answer: ''
      },
      {
        question: 'Kit questionnaire - sample question 3?',
        options: [
          'Probiotics', 'Multivitamins', 'Multiminerals', 'Omega 3', 'None'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      }
    ]
  });

  const providerValue = {
    activatedKit, setActivatedKit,
    kitQRE, setKitQRE
  }

  return (
    <KitContext.Provider value={providerValue}>
      {props.children}
    </KitContext.Provider>
  )
}

export {
  KitContext, KitContextProvider
}
