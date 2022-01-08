import logo from './logo.svg';
import './App.css';
import { Outer} from "./Layout/Outer"
import { Welcome } from './Layout/Welcome';
import { Pause } from "./Layout/Pause";





function App() {

  
  return (
    
    <> 
        <Pause></Pause>
        <Outer> </Outer>     
        <Welcome></Welcome>
        </>
    
  );
}

export default App;
