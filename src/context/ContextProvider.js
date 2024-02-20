import { RootContextProvider } from "./RootContext";
import { AxiosContextProvider } from "./AxiosContext";
import { AuthContextProvider } from "./AuthContext";
import { AppContextProvider } from "./AppContext";
import { ProfileContextProvider } from "./ProfileContext";
import { TaskContextProvider } from "./TaskContext"; 
import { QuestionnaireContextProvider } from "./QuestionnaireContext"; 
import { KitContextProvider } from "./KitContext";
import { LogContextProvider } from "./LogContext";

const ContextProvider = (props) => {
  return (
    <RootContextProvider>
      <AuthContextProvider>
        <AxiosContextProvider>
          <AppContextProvider>
            <ProfileContextProvider>
              <TaskContextProvider>
                <QuestionnaireContextProvider>
                  <KitContextProvider>
                    <LogContextProvider>
                      {props.children}
                    </LogContextProvider>
                  </KitContextProvider>
                </QuestionnaireContextProvider>
              </TaskContextProvider>
            </ProfileContextProvider>
          </AppContextProvider>
        </AxiosContextProvider>
      </AuthContextProvider>
    </RootContextProvider>
  )
}

export default ContextProvider;
