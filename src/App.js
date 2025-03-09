import logo from './logo.svg';
// import './App.css';
import { Canvas, Circle, Rect, Group, IText } from "fabric";
import React, {useEffect, useRef,useState} from "react";
import "./styles.scss"
import {Button, IconButton} from "blocksin-system";
import ReactDOM from "react-dom/client";
import {CircleIcon, SquareIcon, TableIcon, TextIcon} from "sebikostudio-icons";
import Settings from "./Settings"
import CanvasSettings from './CanvasSettings';
import {handleObjectMoving,ClearGuideLines} from "./snappingHelpers";

function CanvasApp() {

  const canvasRef = useRef(null);
  const [canvas,setCanvas] = useState(null);
  const [guidelines,setGuideLines] = useState([]);

  useEffect(()=>{
    if(canvasRef.current){
      const initCanvas = new Canvas(canvasRef.current,{
        width: 500,
        height: 500,
      });

      initCanvas.backgroundColor = "#fff"
      initCanvas.renderAll();
      
      setCanvas(initCanvas);

      initCanvas.on("object:moving", (event)=>
        handleObjectMoving(initCanvas,event.target,guidelines,setGuideLines)  
      );


      initCanvas.on("object:modified", (event)=>
        ClearGuideLines(initCanvas,guidelines,setGuideLines)
      );

      return ()=>{
        initCanvas.dispose();
      }

    }
  },[])

  const addRectangle = () =>{
    if(canvas){
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "#D84D42"
      });
      canvas.add(rect);
    }
  }

  const addCircle = () =>{
    if(canvas){
      const circle = new Circle({
        top: 150,
        left: 150,
        radius:50,
        fill: "#D84D42",
        objectId: "hola"
      });
      canvas.add(circle);
    }
  }

  const addTable = () =>{
    if(canvas){
      // console.log(canvas.getObjects());
      const rows = 5;
      const cols = 3;
      const cellWidth = 80;
      const cellHeight = 25;
      const startX = 50;
      const startY = 50;
      
      let tableCells = [];
      
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < cols; colIndex++) {
          const rect = new Rect({
            left: colIndex * cellWidth,
            top: rowIndex * cellHeight,
            width: cellWidth,
            height: cellHeight,
            fill: rowIndex === 0 ? "#2C3E50" : rowIndex % 2 === 0 ? "#ECF0F1" : "#BDC3C7",
            stroke: "#000",
            strokeWidth: 1,
          });
          tableCells.push(rect);
        }
      }
      
      const tableGroup = new Group(tableCells, {
        left: startX,
        top: startY,
        selectable: true,
        hasControls: true,
      });
      
      canvas.add(tableGroup);
      canvas.renderAll();
    }
  }

  const showlog = () =>{
    if(canvas){
      console.log(canvas.getObjects());
    }
  }

  const addText = () =>{
    if(canvas){
      const text = new IText('Hola, Fabric.js!', {
        // left: 100,          // Posición en X
        // top: 100,           // Posición en Y
        // fontSize: 40,       // Tamaño de la fuente
        // fontFamily: 'Arial', // Familia de fuente
        // fontWeight: 'bold', // Peso de la fuente ('normal', 'bold', '100'-'900')
        // fontStyle: 'italic', // Estilo de la fuente ('normal', 'italic', 'oblique')
        // underline: true,    // Subrayado (true o false)
        // overline: false,    // Línea sobre el texto
        // linethrough: false, // Tachado
        // textAlign: 'center', // Alineación ('left', 'center', 'right', 'justify')
        // fill: '#ff0000',    // Color del texto
        // stroke: '#000000',  // Color del borde del texto
        // strokeWidth: 2,     // Grosor del borde del texto
        // backgroundColor: 'yellow', // Color de fondo del texto
        // textBackgroundColor: 'lightblue', // Color de fondo específico para el texto
        // opacity: 0.9,       // Opacidad (0 - 1)
        // angle: 15,          // Rotación del texto
        // shadow: '2px 2px 5px rgba(0,0,0,0.5)', // Sombra del texto
        // charSpacing: 200,   // Espaciado entre caracteres
        // lineHeight: 1.5,    // Altura de línea (para varias líneas de texto)
        // selectable: true,   // Si el usuario puede seleccionarlo o no
        // evented: true,      // Si el objeto responde a eventos
        // visible: true,      // Si el objeto es visible
        // skewX: 10,          // Inclinación horizontal
        // skewY: 5,           // Inclinación vertical
        // editable: true,     // Si el usuario puede editar el texto
        left: 100,             // Posición en X
        top: 100,              // Posición en Y
        fontSize: 24,          // Tamaño de la fuente (↕A 24)
        fontFamily: 'Open Sans', // Fuente (Open Sans)
        fontWeight: 'normal',  // Peso (Bold si activado)
        fontStyle: 'normal',   // Estilo (Italic si activado)
        underline: false,      // Subrayado (si activado)
        charSpacing: 2,        // Espaciado entre caracteres (A̅ 2)
        textAlign: 'left',     // Alineación de texto (izquierda activada)
        fill: '#000000',       // Color del texto
        opacity: 1,            // Opacidad (100)
        lineHeight: 1,         // Espaciado entre líneas
      });
      canvas.add(text);
    }
  }

  return   (
    <div className="App">
      <div className="Toolbar darkmode">
      <IconButton onClick={addRectangle} variant= "ghost" size = "medium">
        <SquareIcon />
      </IconButton>
      <IconButton onClick={addCircle} variant= "ghost" size = "medium">
        <CircleIcon />
      </IconButton>
      <IconButton onClick={addTable} variant= "ghost" size = "medium">
        <TableIcon />
      </IconButton>

      <IconButton onClick={addText} variant= "ghost" size = "medium">
        <TextIcon />
      </IconButton>
      </div>

      <canvas id="canvas" ref = {canvasRef}></canvas>
      <div className="SettingsWrapper">
        <Settings canvas={canvas} />
        <CanvasSettings canvas={canvas} />
        {/* <CroppingSettings canvas={canvas} refreshKey={refreshKey} />
        <LayersList canvas={canvas} /> */}
      </div>
    </div>
  ); 
}

export default CanvasApp;
