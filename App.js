import { NativeBaseProvider } from 'native-base';
import Home from './screens/Home';

export default function App() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}
