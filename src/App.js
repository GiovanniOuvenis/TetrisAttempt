import logo from './logo.svg';
import './App.css';
import { Table } from "./Layout/Table";
import { ZeroDegz} from "./Pieces/zPiece/ZeroDegz";
import {Zninety} from "./Pieces/zPiece/Zninety";
import { Outer} from "./Layout/Outer"
import { HalfCross } from './Pieces/HalfCross/HalfCross';
import { BarFlat } from "./Pieces/Bar/BarFlat";
import { Welcome } from './Layout/Welcome';
import { TetrisProvider } from "./TetrisContext";
import { Pause } from "./Layout/Pause";
/*import { Block } from "./Pieces/Block"

import { HalfCross, HalfCrossInverted, HalfCrossNinety, HalfCrossTwoSeventy  } from "./Pieces/HalfCross/HalfCross";

import { Piece } from "./Components/Piece"; */

function App() {

  
  return (
    
    <> 
        <Pause></Pause>
        <Welcome></Welcome>
        <Outer> </Outer>     
        </>
    
  );
}

export default App;
