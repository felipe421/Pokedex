import { PaperProvider } from "react-native-paper";
import Routes from "./routes/Routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}