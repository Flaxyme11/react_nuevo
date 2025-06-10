
// import './App.css';
import { Canvas, Circle, Rect, Group, IText, Triangle, ActiveSelection } from "fabric";
import React, {useEffect, useRef,useState} from "react";
import "./styles.scss"
import {Button, IconButton} from "blocksin-system";
import ReactDOM from "react-dom/client";
import {ActivityLogIcon, ButtonIcon, CalendarIcon, CheckboxIcon, ChevronDownIcon, CircleIcon, Cross1Icon, Cross2Icon, DownloadIcon, EnvelopeClosedIcon, ImageIcon, Input2Icon, LightningBoltIcon, Link2Icon, ReaderIcon, SquareIcon, TableIcon, TextIcon, TrashIcon} from "sebikostudio-icons";
import Settings from "./configuracion/Settings"
import CanvasSettings from './configuracion/CanvasSettings';
import {handleObjectMoving,ClearGuideLines} from "./snappingHelpers";
import { v4 as uuidv4 } from "uuid";
import LayersList from './LayerList';
import Convertidor from './procesadorCodigo/convertidor';
import Muestra from './Muestra';

function CanvasApp() {

  const canvasRef = useRef(null);
  const [canvas,setCanvas] = useState(null);
  const [guidelines,setGuideLines] = useState([]);

  const copiedObjectRef = useRef(null);
  const copiedObjectsRef = useRef([]);

  useEffect(()=>{
    if(canvasRef.current){
      const initCanvas = new Canvas(canvasRef.current,{
        width: 500,
        height: 500,
      });

      initCanvas.backgroundColor = "#fff"
      initCanvas.renderAll();
      
      setCanvas(initCanvas);


      initCanvas.on("object:scaling",(event)=> handleObjectScaling(initCanvas,event.target));

      initCanvas.on("object:moving", (event)=>
        handleObjectMoving(initCanvas,event.target,guidelines,setGuideLines)  
      );


      initCanvas.on("object:modified", (event)=>
        ClearGuideLines(initCanvas,guidelines,setGuideLines)
      );

      initCanvas.on("object:scaled",(event)=> handleObjectScaled(initCanvas,event.target));
      

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
        fill: "#D84D42",
        id: `rect-${uuidv4()}`,
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
        // objectId: "hola"
        id: `circle-${uuidv4()}`,
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
        id: `table-${uuidv4()}`,
      });
      
      canvas.add(tableGroup);
      canvas.renderAll();
    }
  }

  const addTextBox = () => {
    if (canvas) {
      const width = 200;
      const height = 30;
      const posX = 100;
      const posY = 200;
  
      const background = new Rect({
        width,
        height,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 1,
        rx: 4,
        ry: 4,
        originX: 'left',
        originY: 'top'
      });
  
      const text = new IText('Escribe algo...', {
        width: width - 10,
        left: 5,
        top: 5,
        fontSize: 16,
        fill: '#333',
        originX: 'left',
        originY: 'top',
        editable: true
      });
  
      const textBoxGroup = new Group([background, text], {
        left: posX,
        top: posY,
        selectable: true,
        hasControls: true,
        id: `textbox-${uuidv4()}`
      });
  
      canvas.add(textBoxGroup);
      canvas.renderAll();
    }
  };

  const addComboBox = () => {
    if (canvas) {
      const width = 200;
      const height = 30;
      const arrowWidth = 30;
      const posX = 100;
      const posY = 300;
  
      // Fondo del ComboBox
      const boxRect = new Rect({
        width,
        height,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 1,
        rx: 4,
        ry: 4,
        originX: 'left',
        originY: 'top'
      });
  
      // Texto seleccionado
      const selectedText = new IText('Seleccionar...', {
        left: 10,
        top: height / 2,
        fontSize: 16,
        fill: '#333',
        originX: 'left',
        originY: 'center',
        selectable: false,
        evented: false
      });
  
      // Botón con la flecha
      const arrowButton = new Rect({
        left: width - arrowWidth,
        top: 0,
        width: arrowWidth,
        height: height,
        fill: '#ddd',
        stroke: '#000',
        strokeWidth: 1,
        originX: 'left',
        originY: 'top',
        selectable: false,
        evented: false
      });
  
      const arrow = new Triangle({
        left: width - arrowWidth / 2,
        top: height / 2,
        width: 10,
        height: 6,
        fill: '#000',
        originX: 'center',
        originY: 'center',
        angle: 180,
        selectable: false,
        evented: false
      });
  
      const comboBoxGroup = new Group(
        [boxRect, selectedText, arrowButton, arrow],
        {
          left: posX,
          top: posY,
          selectable: true,
          hasControls: true,
          id: `combobox-${uuidv4()}`,
          lockScalingFlip: true
        }
      );
  
      canvas.add(comboBoxGroup);
      canvas.renderAll();
    }
  };

  const addButton = () => {
    if (canvas) {
      const width = 120;
      const height = 40;
      const posX = 100;
      const posY = 400;
  
      const buttonBackground = new Rect({
        width,
        height,
        fill: '#ADADAD',
        stroke: '#ffffff',
        strokeWidth: 2,
        rx: 6,
        ry: 6,
        originX: 'left',
        originY: 'top'
      });
  
      const buttonText = new IText('Click Me', {
        fontSize: 18,
        fill: '#000000',
        originX: 'center',
        originY: 'center',
        left: width / 2,
        top: height / 2,
        selectable: false,
        evented: false
      });
  
      const buttonGroup = new Group([buttonBackground, buttonText], {
        left: posX,
        top: posY,
        selectable: true,
        hasControls: true,
        id: `button-${uuidv4()}`
      });
  
      // Evento de clic
      buttonGroup.on('mousedown', () => {
        console.log('Botón presionado');
        // Aquí puedes ejecutar tu lógica personalizada
      });
  
      canvas.add(buttonGroup);
      canvas.renderAll();
    }
  };

  const addDatePicker = () => {
    if (canvas) {
      const width = 200;
      const height = 30;
      const iconWidth = 30;
      const posX = 100;
      const posY = 500;
  
      // Contenedor
      const boxRect = new Rect({
        width,
        height,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 1,
        rx: 4,
        ry: 4,
        originX: 'left',
        originY: 'top'
      });
  
      // Texto por defecto
      const dateText = new IText('dd/mm/yyyy', {
        left: 10,
        top: height / 2,
        fontSize: 16,
        fill: '#333',
        originX: 'left',
        originY: 'center',
        selectable: false,
        evented: false
      });
  
      // Botón (lado derecho)
      const iconButton = new Rect({
        left: width - iconWidth,
        top: 0,
        width: iconWidth,
        height: height,
        fill: '#ddd',
        stroke: '#000',
        strokeWidth: 1,
        originX: 'left',
        originY: 'top',
        selectable: false,
        evented: false
      });
  
      // Ícono de calendario (simple simulación)
      const calendarIcon = new IText('📅', {
        fontSize: 18,
        left: width - iconWidth / 2,
        top: height / 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false
      });
  
      const datePickerGroup = new Group(
        [boxRect, dateText, iconButton, calendarIcon],
        {
          left: posX,
          top: posY,
          selectable: true,
          hasControls: true,
          id: `datepicker-${uuidv4()}`,
          modo:"dd/mm/yyyy"
        }
      );
  
      // Evento de clic (solo log por ahora)
      datePickerGroup.on('mousedown', () => {
        console.log('Abrir datepicker');
        // Aquí podrías agregar el calendario si se desea expandir
      });
  
      canvas.add(datePickerGroup);
      canvas.renderAll();
    }
  };

  const addPictureBox = () => {
    if (canvas) {
      const width = 150;
      const height = 120;
      const posX = 100;
      const posY = 600;
  
      // Contorno del PictureBox
      const frame = new Rect({
        width,
        height,
        fill: '#f8f8f8',
        stroke: '#bbb',
        strokeWidth: 2,
        rx: 6,
        ry: 6,
        originX: 'left',
        originY: 'top'
      });
  
      // Icono de placeholder (puedes usar '🖼️', '📷' o un SVG personalizado)
      const placeholderIcon = new IText('🖼️', {
        fontSize: 36,
        fill: '#aaa',
        left: width / 2,
        top: height / 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false
      });
  
      const pictureBoxGroup = new Group([frame, placeholderIcon], {
        left: posX,
        top: posY,
        selectable: true,
        hasControls: true,
        id: `picturebox-${uuidv4()}`
      });
  
      // Evento para "subir" imagen (solo log por ahora)
      pictureBoxGroup.on('mousedown', () => {
        console.log('Abrir selector de imagen');
        // Aquí puedes implementar carga de imagen usando <input type="file"> o similar
      });
  
      canvas.add(pictureBoxGroup);
      canvas.renderAll();
    }
  };

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
        textAlign: 'center', // Alineación ('left', 'center', 'right', 'justify')
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
        id: `text-${uuidv4()}`,
      });
      canvas.add(text);
    }
  }

  const handleObjectScaling = (canvas,obj) => {
    
    // const obj = event.target;
    
    if(canvas){
      // console.log(obj)
      // if (obj){
      //   console.log(obj)
      //   // if(!canvas)return;
      
      //   // Normalizar la escala aplicando scaleX y scaleY a width y height
      //   obj.set({
      //     width: obj.width * obj.scaleX,
      //     height: obj.height * obj.scaleY,
      //     scaleX: 1, // Reseteamos para evitar distorsiones al exportar
      //     scaleY: 1,
      //   });
      
      //   canvas.renderAll();
      // }

      if (obj.type === "circle") {
        // Adjust radius based on scaleX (Fabric.js circles scale proportionally)
        obj.set({
          radius: obj.radius * obj.scaleX, // Apply scaleX to radius
          scaleX: 1, // Reset scaleX
          scaleY: 1, // Reset scaleY
        });
      } 
      else if (obj.type === "group") {
        // const scaleX = obj.scaleX;
        // const scaleY = obj.scaleY;
    
        // // Get the original objects (table cells)
        // const originalCells = obj.getObjects();
    
        // // Ungroup the table
        // // obj._restoreObjectsState();
        // canvas.remove(obj);
    
        // // Create a new array for scaled cells
        // let newTableCells = [];
    
        // originalCells.forEach((cell) => {
        //   const scaledCell = new Rect({
        //     left: cell.left * scaleX,
        //     top: cell.top * scaleY,
        //     width: cell.width * scaleX,
        //     height: cell.height * scaleY,
        //     fill: cell.fill,
        //     stroke: cell.stroke,
        //     strokeWidth: cell.strokeWidth,
        //   });
        //   newTableCells.push(scaledCell);
        // });
    
        // // Create a new group with updated scaled objects
        // const newTableGroup = new Group(newTableCells, {
        //   left: obj.left,
        //   top: obj.top,
        //   selectable: true,
        //   hasControls: true,
        //   id: obj.id,
        // });
    
        // // Reset scale to prevent double scaling
        // newTableGroup.scaleX = 1;
        // newTableGroup.scaleY = 1;
    
        // // Add the new scaled table to the canvas
        // canvas.add(newTableGroup);
        // canvas.setActiveObject(newTableGroup);



        obj.setCoords();
        canvas.renderAll();
      }
      else {
        // Handle rectangles or other objects
        obj.set({
          width: obj.width * obj.scaleX,
          height: obj.height * obj.scaleY,
          scaleX: 1,
          scaleY: 1,
        });
      }
    }


  };


  const handleObjectScaled = (canvas,event) => {
    const obj = event.target;
    if (!obj) return;
  

    //QUE RE RENDERIZE NO POR GRUPO SINO POR TIPO DE FIGURA
    if (obj.type === "group") {
      // Store the final scale values
      const scaleX = obj.scaleX;
      const scaleY = obj.scaleY;
  
      // Get the original objects (table cells)
      const originalCells = obj.getObjects();
  
      // Ungroup the table
      obj._restoreObjectsState();
      canvas.remove(obj);
  
      // Create a new array for scaled cells
      let newTableCells = [];
  
      originalCells.forEach((cell) => {
        const scaledCell = new Rect({
          left: cell.left * scaleX,
          top: cell.top * scaleY,
          width: cell.width * scaleX,
          height: cell.height * scaleY,
          fill: cell.fill,
          stroke: cell.stroke,
          strokeWidth: cell.strokeWidth,
        });
        newTableCells.push(scaledCell);
      });
  
      // Create a new group with updated scaled objects
      const newTableGroup = new Group(newTableCells, {
        left: obj.left,
        top: obj.top,
        selectable: true,
        hasControls: true,
        id: obj.id,
      });
  
      // Reset scale to prevent double scaling
      newTableGroup.scaleX = 1;
      newTableGroup.scaleY = 1;
  
      // Add the new scaled table to the canvas
      canvas.add(newTableGroup);
      canvas.setActiveObject(newTableGroup);
      
    }
  
    canvas.renderAll();
  };
  
  const addCheckbox = () => {
    if (canvas) {
      const size = 20;
      const labelText = 'Aceptar términos';
      const posX = 100;
      const posY = 750;
  
      // Cuadro del checkbox
      const box = new Rect({
        width: size,
        height: size,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 1,
        originX: 'left',
        originY: 'top'
      });
  
      // Check interno (oculto por defecto)
      const check = new IText('✔️', {
        fontSize: 16,
        left: size / 2,
        top: size / 2,
        originX: 'center',
        originY: 'center',
        visible: false,
        selectable: false,
        evented: false
      });
  
      // Etiqueta al lado del checkbox
      const label = new IText(labelText, {
        fontSize: 16,
        left: size + 10,
        top: size / 2,
        originX: 'left',
        originY: 'center',
        selectable: false,
        evented: false
      });
  
      // Agrupamos el checkbox
      const checkboxGroup = new Group([box, check, label], {
        left: posX,
        top: posY,
        selectable: true,
        id: `checkbox-${uuidv4()}`,
        checked: false
      });
  
      // // Manejo de clic: alterna visibilidad del check
      // checkboxGroup.on('mousedown', function () {
      //   const isChecked = checkboxGroup.checked;
      //   check.set('visible', !isChecked);
      //   checkboxGroup.checked = !isChecked;
      //   canvas.requestRenderAll();
      //   console.log(`Checkbox ${checkboxGroup.checked ? 'marcado' : 'desmarcado'}`);
      // });
  
      canvas.add(checkboxGroup);
      canvas.renderAll();
    }
  };
  
  const addHyperlink = () => {
    if (canvas) {
      const url = 'https://www.google.com/?hl=es';
      const label = 'Enlace';
      const posX = 100;
      const posY = 800;
  
      const linkText = new IText(label, {
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
        underline: true,    // Subrayado (true o false)
        id: `hyperlink-${uuidv4()}`
      });
  
      canvas.add(linkText);
      canvas.renderAll();
    }
  };



const deleteSelectedObject = () => {
  if (!canvas) return;
  // let activeObjects = canvas.getActiveObjects();
  // if (activeObjects.length) {
  //   activeObjects.forEach(function (object) {
  //     canvas.remove(object);
  //   });
  // }
  // else {
      
  // }
  // canvas.requestRenderAll();

  const activeObjects = canvas.getActiveObjects();

  if (activeObjects.length) {
    activeObjects.forEach(object => {
      canvas.remove(object);
    });

    // 🔥 Esto quita visualmente la selección del canvas
    canvas.discardActiveObject();
  }

  canvas.requestRenderAll();
};
const clearCanvas = () => {
  if (canvas) {
    canvas.getObjects().forEach(obj => canvas.remove(obj));
    canvas.clear(); // Borra todo, incl. background, así que restaura si quieres fondo blanco
    canvas.backgroundColor = "#fff";
    canvas.requestRenderAll();
  }
};

useEffect(() => {
  const handleKeyDown = async (e) => {
    if (!canvas) return;


    if (e.key === "Delete") {
      deleteSelectedObject();
    }
    if (e.ctrlKey && e.key === 'c') {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const copied = [];
    
        if (activeObject.type === 'activeSelection') {
          for (const obj of activeObject.getObjects()) {
            const clone = await obj.clone();
            // Guarda también el ID original como referencia
            clone._originalId = obj.id || null;
            copied.push(clone);
          }
        } else {
          const clone = await activeObject.clone();
          clone._originalId = activeObject.id || null;
          copied.push(clone);
        }
    
        copiedObjectsRef.current = copied;
      }
    }
    // Pegar (Ctrl + V)
    if (e.ctrlKey && e.key === 'v') {
      if (copiedObjectsRef.current.length > 0) {
        const pasted = [];
    
        for (const obj of copiedObjectsRef.current) {
          const clone = await obj.clone();
    
          // Extraer el ID original guardado (si existe)
          const originalId = obj._originalId || obj.id || `object-${uuidv4()}`;
          const prefix = originalId.split('-')[0] || 'object';
    
          clone.set({
            left: (obj.left || 0) + 20,
            top: (obj.top || 0) + 20,
            id: `${prefix}-${uuidv4()}`,
          });
    
          canvas.add(clone);
          pasted.push(clone);
        }
    
        // Seleccionar lo que se pegó
        if (pasted.length > 1) {
          const selection = new ActiveSelection(pasted, { canvas });
          canvas.setActiveObject(selection);
        } else {
          canvas.setActiveObject(pasted[0]);
        }
    
        canvas.requestRenderAll();
      }
    }
  };


  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [canvas]);

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
      <IconButton onClick={addTextBox} variant= "ghost" size = "medium">
        <Input2Icon />
      </IconButton>
      <IconButton onClick={addButton} variant= "ghost" size = "medium">
        <ButtonIcon />
      </IconButton>
      <IconButton onClick={addComboBox} variant= "ghost" size = "medium">
        <ChevronDownIcon />
      </IconButton>
      <IconButton onClick={addDatePicker} variant= "ghost" size = "medium">
        <CalendarIcon />
      </IconButton>
      <IconButton onClick={addPictureBox} variant= "ghost" size = "medium">
        <ImageIcon />
      </IconButton>
      <IconButton onClick={addCheckbox} variant= "ghost" size = "medium">
        <CheckboxIcon />
      </IconButton>
      <IconButton onClick={addHyperlink} variant= "ghost" size = "medium">
        <Link2Icon />
      </IconButton>



      <IconButton onClick={addText} variant= "ghost" size = "medium">
        <TextIcon />
      </IconButton>

      <IconButton onClick={showlog} variant= "ghost" size = "medium">
        <ActivityLogIcon />
      </IconButton>
      </div>

      <div className="ConfigBar darkmode">
      <IconButton onClick={deleteSelectedObject} variant= "ghost" size = "medium">
        <Cross1Icon />
      </IconButton>
      <IconButton onClick={clearCanvas} variant= "ghost" size = "medium">
        <TrashIcon />
      </IconButton>
      </div>


      <canvas id="canvas" ref = {canvasRef}></canvas>
      <div className="SettingsWrapper">
        <Settings canvas={canvas} />
        <CanvasSettings canvas={canvas} />
        {/* <CroppingSettings canvas={canvas} refreshKey={refreshKey} /> */}
        <LayersList canvas={canvas} />

        <Convertidor canvas={canvas}></Convertidor>
      </div>

    </div>
  // <Muestra></Muestra>
    
  ); 
}

export default CanvasApp;
