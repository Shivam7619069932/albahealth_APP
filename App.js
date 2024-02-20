import { StatusBar } from 'expo-status-bar';
import { ContextProvider } from './src/context';
import RootStackNavigator from './src/navigation/RootStackNavigator';

export default function App() {
  return (
    <ContextProvider>
      <StatusBar style="auto" />
      <RootStackNavigator />
    </ContextProvider>
  );
}
