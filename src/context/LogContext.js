import React, { createContext, useState } from "react";

const LogContext = createContext(undefined);

const LogContextProvider = (props) => {
  const [poopPic, setPoopPic] = useState(null);
  const [cryRecord, setCryRecord] = useState({
    completed: false,
    sound: null,
    guessMsg: ''
  });
  const [dailyQRE, setDailyQRE] = useState({
    title: 'Daily questionnaire',
    locked: false,
    completed: false,
    qa: [
      {
        question: 'How frequently is your baby being breastfed daily? (answer zero if not applicable)',
        options: [],
        optiontype: 'number',
        unit: 'times a day',
        answer: ''
      },
      {
        question: 'How frequently is your baby being formula-fed daily? (answer zero if not applicable)',
        options: [],
        optiontype: 'number',
        unit: 'times a day',
        answer: ''
      },
      {
        question: 'Which supplementation did your baby/child receive today? (answer none if not applicable)',
        options: [
          'Probiotics', 'Multivitamins', 'Multiminerals', 'Omega 3', 'None'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      },
      {
        question: 'If your baby/child received probiotic, which probiotic did he/she receive? (answer none if not applicable)',
        options: [
          'Bifibaby Plus', 'BioGaia Protectis Baby Drops', 'BioGaia Protectis Baby Drops with Vitamin D', 'Colic Calm Probiotic', 'DanActive Actimel'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      },
      {
        question: 'Did your child eat any candy today?',
        options: [
          'Yes', 'No'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      },
      {
        question: 'Did you introduce one of the following items to your child´s diet today?',
        options: [
          'Nuts', 'Dairy products', 'Any type of animal-based protein (cow, pork, lamb, game, fish, chicken, eggs)'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      },
      {
        question: `What is the main macronutrient in your child's breakfast?`,
        options: [
          'Carbs', 'Fat', 'Protein'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      },
      {
        question: `What is the main macronutrient in your child's lunch?`,
        options: [
          'Carbs', 'Fat', 'Protein'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      },
      {
        question: `What is the main macronutrient in your child's dinner?`,
        options: [
          'Carbs', 'Fat', 'Protein'
        ],
        optiontype: 'single',
        unit: '',
        answer: ''
      }
    ]
  });
  const [submitEnd, setSubmitEnd] = useState(false);
  const [time, setTime] = useState(0); // 1day as seconds | 60 * 60 * 24

  const [logs, setLogs] = useState([
    {
      completed: false,
      submitted: false,
      poopPic: null,
      cryRecord: {
        completed: false,
        sound: null,
        guessMsg: ''
      },
      dailyQRE: {
        title: 'Daily questionnaire',
        locked: false,
        completed: false,
        qa: [
          {
            question: 'How frequently is your baby being breastfed daily? (answer zero if not applicable)',
            options: [],
            optiontype: 'number',
            unit: 'times a day',
            answer: ''
          },
          {
            question: 'How frequently is your baby being formula-fed daily? (answer zero if not applicable)',
            options: [],
            optiontype: 'number',
            unit: 'times a day',
            answer: ''
          },
          {
            question: 'Which supplementation did your baby/child receive today? (answer none if not applicable)',
            options: [
              'Probiotics', 'Multivitamins', 'Multiminerals', 'Omega 3', 'None'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'If your baby/child received probiotic, which probiotic did he/she receive? (answer none if not applicable)',
            options: [
              'Bifibaby Plus', 'BioGaia Protectis Baby Drops', 'BioGaia Protectis Baby Drops with Vitamin D', 'Colic Calm Probiotic', 'DanActive Actimel'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Did your child eat any candy today?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Did you introduce one of the following items to your child´s diet today?',
            options: [
              'Nuts', 'Dairy products', 'Any type of animal-based protein (cow, pork, lamb, game, fish, chicken, eggs)'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's breakfast?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's lunch?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's dinner?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      }
    },
    {
      completed: false,
      submitted: false,
      poopPic: null,
      cryRecord: {
        completed: false,
        sound: null,
        guessMsg: ''
      },
      dailyQRE: {
        title: 'Daily questionnaire',
        locked: false,
        completed: false,
        qa: [
          {
            question: 'How frequently is your baby being breastfed daily? (answer zero if not applicable)',
            options: [],
            optiontype: 'number',
            unit: 'times a day',
            answer: ''
          },
          {
            question: 'How frequently is your baby being formula-fed daily? (answer zero if not applicable)',
            options: [],
            optiontype: 'number',
            unit: 'times a day',
            answer: ''
          },
          {
            question: 'Which supplementation did your baby/child receive today? (answer none if not applicable)',
            options: [
              'Probiotics', 'Multivitamins', 'Multiminerals', 'Omega 3', 'None'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'If your baby/child received probiotic, which probiotic did he/she receive? (answer none if not applicable)',
            options: [
              'Bifibaby Plus', 'BioGaia Protectis Baby Drops', 'BioGaia Protectis Baby Drops with Vitamin D', 'Colic Calm Probiotic', 'DanActive Actimel'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Did your child eat any candy today?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Did you introduce one of the following items to your child´s diet today?',
            options: [
              'Nuts', 'Dairy products', 'Any type of animal-based protein (cow, pork, lamb, game, fish, chicken, eggs)'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's breakfast?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's lunch?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's dinner?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      }
    },
    {
      completed: false,
      submitted: false,
      poopPic: null,
      cryRecord: {
        completed: false,
        sound: null,
        guessMsg: ''
      },
      dailyQRE: {
        title: 'Daily questionnaire',
        locked: false,
        completed: false,
        qa: [
          {
            question: 'How frequently is your baby being breastfed daily? (answer zero if not applicable)',
            options: [],
            optiontype: 'number',
            unit: 'times a day',
            answer: ''
          },
          {
            question: 'How frequently is your baby being formula-fed daily? (answer zero if not applicable)',
            options: [],
            optiontype: 'number',
            unit: 'times a day',
            answer: ''
          },
          {
            question: 'Which supplementation did your baby/child receive today? (answer none if not applicable)',
            options: [
              'Probiotics', 'Multivitamins', 'Multiminerals', 'Omega 3', 'None'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'If your baby/child received probiotic, which probiotic did he/she receive? (answer none if not applicable)',
            options: [
              'Bifibaby Plus', 'BioGaia Protectis Baby Drops', 'BioGaia Protectis Baby Drops with Vitamin D', 'Colic Calm Probiotic', 'DanActive Actimel'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Did your child eat any candy today?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Did you introduce one of the following items to your child´s diet today?',
            options: [
              'Nuts', 'Dairy products', 'Any type of animal-based protein (cow, pork, lamb, game, fish, chicken, eggs)'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's breakfast?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's lunch?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: `What is the main macronutrient in your child's dinner?`,
            options: [
              'Carbs', 'Fat', 'Protein'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      }
    }
  ]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const providerValue = {
    poopPic, setPoopPic,
    cryRecord, setCryRecord,
    dailyQRE, setDailyQRE,
    submitEnd, setSubmitEnd,
    time, setTime,
    logs, setLogs,
    currentLogIndex, setCurrentLogIndex
  }

  return (
    <LogContext.Provider value={providerValue}>
      {props.children}
    </LogContext.Provider>
  )
}

export {
  LogContext, LogContextProvider
}
