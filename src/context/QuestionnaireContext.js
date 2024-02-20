import React, { createContext, useEffect, useState } from "react";

const QuestionnaireContext = createContext(undefined);

const QuestionnaireContextProvider = (props) => {
  const [QREIndex, setQREIndex] = useState(0);
  const [TSKIndex, setTSKIndex] = useState(0);
  // Household
  const [householdQRE, setHouseholdQRE] = useState({
    title: 'Household',
    locked: false,
    completed: false,
    tasks: [
      {
        title: 'House',
        locked: false,
        completed: false,
        qa: [
          {
            question: 'What best describes your household?',
            options: [
              'Rural', 'Urban', 'Suburban'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'What is your current housing situation?',
            options: [
              'Farm-house or countryside house', 'Urban-house without garden', 'Urban-house with garden', 'Apartment without garden', 'Apartment with garden'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'People',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'How long has the family lived in the residence?',
            options: [],
            optiontype: 'number',
            unit: 'months',
            answer: '',
          },
          {
            question: 'How many people live in your household (including children)?',
            options: [],
            optiontype: 'number',
            unit: 'people',
            answer: '',
          },
          {
            question: 'How many languages are spoken in your household?',
            options: [],
            optiontype: 'number',
            unit: 'language (s)',
            answer: '',
          },
          {
            question: 'Is there a smoker in the household?',
            options: ['Yes', 'No'],
            optiontype: 'single',
            unit: '',
            answer: '',
          }
        ]
      },
      {
        title: 'Pets',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Do you have pets in your household?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Hygiene & Cleanliness',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'With which frequency is your house vaccumed?',
            options: [
              'Less than once in 2 weeks', 'Once each 2 weeks', 'Once a week', 'Twice a week', 'More than twice a week'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'How often (number of times per month) are your floors washed with detergent?',
            options: [
              'Less than once in 2 weeks', 'Once each 2 weeks', 'Once a week', 'Twice a week', 'More than twice a week'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Are the cleaning products used in your house scented (with perfume)?',
            options: [
              'Scented', 'Unscented', 'Mixed'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'How often have your sheets been changed in your home in the last 3 months?',
            options: [],
            optiontype: 'number',
            unit: 'times',
            answer: ''
          },
          {
            question: 'Did you observe, in the past 2 months, any indications of moisture damage in your household?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Are the personal hygiene products strongly/artificially scented?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Outdoors',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'How often do you spend time in nature (camping, summer/winter cabin), generally? How many weeks do you spend there yearly? (answer none if not applicable)',
            options: [
              '> 5 weeks', '4-5 weeks', '2-3 weeks', '1 week or less', 'None'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Over the last 3 months, how many hours (in total) did you stay in the countryside and interacted with farm animals (such as hores, chicken, cattle)?',
            options: [],
            optiontype: 'number',
            unit: 'hours',
            answer: ''
          }
        ]
      },
      {
        title: 'Heat',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'What is the heating system type in use in the house/apartment?',
            options: [
              'Electrical', 'Air to Water Heat Pump', 'Geothermal Heat Pump', 'Air Source Heat Pump ASHP', 'Solar panels', 'Other'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Do you have an active fireplace in the household (a fireplace used from time to time)?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      }
    ]
  });
  // Family Health
  const [familyHealthQRE, setFamilyHealthQRE] = useState({
    title: 'Family Health',
    locked: true,
    started: false,
    completed: false,
    tabs: [
      {
        title: 'General',
        locked: false,
        started: false,
        completed: false,
        tasks: [
          {
            title: 'General questions',
            locked: false,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              },
              {
                question: 'Lorem 2?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          }
        ]
      },
      {
        title: 'Mother',
        locked: true,
        started: false,
        completed: false,
        tasks: [
          {
            title: 'Mother health',
            locked: false,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Pregnancy',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Mental health',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          }
        ]
      },
      {
        title: 'Partner',
        locked: true,
        started: false,
        completed: false,
        tasks: [
          {
            title: 'Partner health',
            locked: false,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Mental health',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          }
        ]
      }
    ]
  });
  // Baby Health
  const [babyHealthQRE, setBabyHealthQRE] = useState({
    title: 'Baby Health',
    locked: true,
    started: false,
    completed: false,
    tasks: [
      {
        title: 'General questions',
        locked: false,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: `Child's health`,
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Sleep',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Gut health',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Crying',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      }
    ]
  });
  // Parents Diet
  const [parentsDietQRE, setParentsDietQRE] = useState({
    title: 'Parents diet',
    locked: true,
    started: false,
    completed: false,
    tabs: [
      {
        title: 'Mother',
        locked: false,
        started: false,
        completed: false,
        tasks: [
          {
            title: 'Daily meals',
            locked: false,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Fibers',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Fast food & sweets',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Carbohydrates & sugar',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Beverages',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Dairies',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Meat & animal products',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          }
        ]
      },
      {
        title: 'Partner',
        locked: true,
        started: false,
        completed: false,
        tasks: [
          {
            title: 'Daily meals',
            locked: false,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Fibers',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Fast food & sweets',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Carbohydrates & sugar',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Beverages',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Dairies',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          },
          {
            title: 'Meat & animal products',
            locked: true,
            completed: false,
            qa: [
              {
                question: 'Lorem 1?',
                options: [
                  'Yes', 'No'
                ],
                optiontype: 'single',
                unit: '',
                answer: ''
              }
            ]
          }
        ]
      },
    ],
  });
  // Baby Diet
  const [babyDietQRE, setBabyDietQRE] = useState({
    title: 'Baby diet',
    locked: true,
    started: false,
    completed: false,
    tasks: [
      {
        title: 'General diet',
        locked: false,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Daily meals',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Daily suplements',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Fibers',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Fast food & sweets',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Carbohydrates & sugar',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Beverages',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Dairies',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      },
      {
        title: 'Meat & animal products',
        locked: true,
        completed: false,
        qa: [
          {
            question: 'Lorem 1?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          },
          {
            question: 'Lorem 2?',
            options: [
              'Yes', 'No'
            ],
            optiontype: 'single',
            unit: '',
            answer: ''
          }
        ]
      }
    ]
  });
  // flow state variables
  const [currentQRE, setCurrentQRE] = useState({
    data: null,
    QRE: '',
    hasTab: false,
    TabIndex: 0,
    TaskIndex: 0
  });
  // const [task, setTask] = useState(undefined);

  // flow update

  const updateQRE = (completedTask) => {
    console.log('<><>', completedTask);
    // setTask(completedTask);
    let _currentQRE = {...currentQRE};
    if (_currentQRE.hasTab) {
      _currentQRE.data.tabs[currentQRE.TabIndex].tasks[currentQRE.TaskIndex] = completedTask;
    } else {
      _currentQRE.data.tasks[currentQRE.TaskIndex] = completedTask;
    }
    switch(currentQRE.QRE) {
      case 'Household' :
        let _householdQRE = {...householdQRE};
        if (currentQRE.TaskIndex < householdQRE.tasks.length - 1) {
          _currentQRE.TaskIndex += 1;
          _householdQRE.tasks[currentQRE.TaskIndex + 1].locked = false;
        } else {
          _currentQRE.TaskIndex = 0;
          _currentQRE.TabIndex = 0;
          _currentQRE.hasTab = false;
          // 
          _householdQRE.locked = false;
          _householdQRE.completed = true;
          setFamilyHealthQRE({...familyHealthQRE, locked: false});
        }
        _householdQRE.tasks[currentQRE.TaskIndex] = completedTask;
        setHouseholdQRE(_householdQRE);
        break;

      case 'Family Health' :
        let _familyHealthQRE = {...familyHealthQRE};
        if (currentQRE.TaskIndex < familyHealthQRE.tabs[currentQRE.TabIndex].tasks.length - 1) {
          _currentQRE.TaskIndex += 1;
          _familyHealthQRE.tabs[currentQRE.TabIndex].tasks[currentQRE.TaskIndex + 1].locked = false;
        } else {
          _currentQRE.TaskIndex = 0;
          _familyHealthQRE.tabs[currentQRE.TabIndex].completed = true;
          if (currentQRE.TabIndex < familyHealthQRE.tabs.length - 1) {
            _currentQRE.TabIndex += 1;
            _familyHealthQRE.tabs[currentQRE.TabIndex + 1].locked = false;
          } else {
            _currentQRE.TabIndex = 0;
            _familyHealthQRE.completed = true;
            setBabyHealthQRE({...babyHealthQRE, locked: false});
          }
        }
        _familyHealthQRE.tabs[currentQRE.TabIndex].tasks[currentQRE.TaskIndex] = completedTask;
        setFamilyHealthQRE(_familyHealthQRE);
        break;

      case 'Baby Health' :
        let _babyHealthQRE = {...babyHealthQRE};
        if (currentQRE.TaskIndex < babyHealthQRE.tasks.length - 1) {
          _currentQRE.TaskIndex += 1;
          _babyHealthQRE.tasks[currentQRE.TaskIndex + 1].locked = false;
        } else {
          _currentQRE.TaskIndex = 0;
          _currentQRE.TabIndex = 0;
          _currentQRE.hasTab = false;
          // 
          _babyHealthQRE.locked = false;
          _babyHealthQRE.completed = true;
          setBabyDietQRE({...babyDietQRE, locked: false});
          // setParentsDietQRE({...parentsDietQRE, locked: false});
        }
        _babyHealthQRE.tasks[currentQRE.TaskIndex] = completedTask;
        setBabyHealthQRE(_babyHealthQRE);
        break;

      case 'Baby diet' :
        let _babyDietQRE = {...babyDietQRE};
        if (currentQRE.TaskIndex < babyDietQRE.tasks.length - 1) {
          _currentQRE.TaskIndex += 1;
          _babyDietQRE.tasks[currentQRE.TaskIndex + 1].locked = false;
        } else {
          _currentQRE.TaskIndex = 0;
          _currentQRE.TabIndex = 0;
          _currentQRE.hasTab = false;
          // 
          _babyDietQRE.locked = false;
          _babyDietQRE.completed = true;
          setBabyDietQRE({...babyDietQRE, locked: false});
        }
        _babyDietQRE.tasks[currentQRE.TaskIndex] = completedTask;
        setBabyDietQRE(_babyDietQRE);
        break;

      case 'Parents diet' :
        let _parentsDietQRE = {...parentsDietQRE};
        if (currentQRE.TaskIndex < parentsDietQRE.tabs[currentQRE.TabIndex].tasks.length - 1) {
          _currentQRE.TaskIndex += 1;
          _parentsDietQRE.tabs[currentQRE.TabIndex].tasks[currentQRE.TaskIndex + 1].locked = false;
        } else {
          _currentQRE.TaskIndex = 0;
          _parentsDietQRE.tabs[currentQRE.TabIndex].completed = true;
          if (currentQRE.TabIndex < parentsDietQRE.tabs.length - 1) {
            _currentQRE.TabIndex += 1;
            _parentsDietQRE.tabs[currentQRE.TabIndex + 1].locked = false;
          } else {
            _currentQRE.TabIndex = 0;
            _parentsDietQRE.completed = true;
          }
        }
        _parentsDietQRE.tabs[currentQRE.TabIndex].tasks[currentQRE.TaskIndex] = completedTask;
        setParentsDietQRE(_parentsDietQRE);
        break;
    }
    setCurrentQRE(_currentQRE);
  }


  const providerValue = {
    // questionnaire, setQuestionnaire, 
    QREIndex, setQREIndex, 
    TSKIndex, setTSKIndex,
    // 
    householdQRE, setHouseholdQRE,
    familyHealthQRE, setFamilyHealthQRE,
    babyHealthQRE, setBabyHealthQRE,
    parentsDietQRE, setParentsDietQRE,
    babyDietQRE, setBabyDietQRE,
    // 
    currentQRE, setCurrentQRE,
    // task, setTask,
    updateQRE
  }

  return (
    <QuestionnaireContext.Provider value={providerValue}>
      {props.children}
    </QuestionnaireContext.Provider>
  )
}

export {
  QuestionnaireContext, QuestionnaireContextProvider
}
