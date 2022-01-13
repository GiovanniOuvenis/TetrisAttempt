import React from "react";
import Block from "./Pieces/Block/Block";
import BarFlat from "./Pieces/Bar/BarFlat";
import HalfCross from "./Pieces/HalfCross/HalfCross";
import  ZetaPiece  from "./Pieces/zPiece/ZeroDegz";
import  Sigma  from "./Pieces/sigma/Sigma"; 
import  HalfRectangleLeft  from "./Pieces/Halfrectangle/HalfRectangleLeft";
import  HalfRectangleRight  from "./Pieces/Halfrectangle/HalfRectangleRight";

const Pieces = [
    {
        name: "Block",
        comp: <Block></Block>,
        position : [5,6,15,16],
        backColor : "",
        borderColor: ""
    },
    {
        name: "Bar",
        comp: <BarFlat></BarFlat>,
        position : [4,5,6,7],
        backColor : "",
        borderColor: ""
    },
    {
        name: "halfcross",
        comp: <HalfCross></HalfCross>,
        position : [5,14,15,16],
        backColor : "",
        borderColor: ""
    },
    {
        name: "zeta",
        comp: <ZetaPiece></ZetaPiece>,
        position : [5,6,16,17],
        backColor : "",
        borderColor: ""
    },
    {
        name: "sigma",
        comp: <Sigma></Sigma>,
        position: [5,6,14,15],
        backColor : "",
        borderColor: ""
    },
    {
        name: "halfRectangleLeft",
        comp: <HalfRectangleLeft></HalfRectangleLeft>,
        position: [5,6,15,25],
        backColor : "",
        borderColor: ""
    },
    {
        name: "halfRectangleRight",
        comp: <HalfRectangleRight></HalfRectangleRight>,
        position: [5,6,16,26],
        backColor : "",
        borderColor: ""
    }

]


export {Pieces}