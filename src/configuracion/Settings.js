import { DropdownMenu, Input,IconButton,ComboBox,Checkbox,_calcBounds} from "blocksin-system";
import React,{useState,useEffect} from "react";
import {CircleIcon, SquareIcon, SliderIcon} from "sebikostudio-icons";
import { Canvas, Circle, Rect, Group, IText, Triangle, ActiveSelection } from "fabric";
function Settings ({canvas}){

    const [selectedObject, setSelectedObject] = useState(null);
    const [width,setWidth] = useState("");
    const [height,setHeight] = useState("");
    const [diameter,setDiameter] = useState("");
    const [color,setColor] = useState("");
    
    

    const [textSize,setTextSize] = useState("");

    const [textFont,setTextFont] = useState("");

    const [textContent,setTextContent] = useState("");
    
    const [textAlign,setTextAlign] = useState("");
    const [isBold, setIsBold] = useState("");
    const [textUnderLine,setTextUnderline] = useState("");
    const [textItalic,setTextItalic] = useState("");

    const [rx, setRx] = useState(0); // suavidad de borde
    const [strokeColor, setStrokeColor] = useState("");
    const [fillColor, setFillColor] = useState("");

    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const [imageSrc, setImageSrc] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [isCircular, setIsCircular] = useState(false);
    const [pictureBorderColor, setPictureBorderColor] = useState("");
    const [pictureBorderWidth, setPictureBorderWidth] = useState("");

    const [checkboxLabel, setCheckboxLabel] = useState("");
    const [checkboxFontSize, setCheckboxFontSize] = useState(16);
    const [checkboxColor, setCheckboxColor] = useState("#000000");
    const [checkboxBorderColor, setCheckboxBorderColor] = useState("#000000");
    const [checkboxBorderWidth, setCheckboxBorderWidth] = useState(1);

    const [hyperlinkUrl, setHyperlinkUrl] = useState("");

useEffect(() => {
  const panel = document.querySelector(".Settings");
  if (!panel || !canvas) return;

  const stop = (e) => {
    e.stopPropagation();
  };

  panel.addEventListener("mousedown", stop);
  panel.addEventListener("pointerdown", stop);

  return () => {
    panel.removeEventListener("mousedown", stop);
    panel.removeEventListener("pointerdown", stop);
  };
}, [canvas]);

    useEffect (()=>{
        if(!canvas)return;
        canvas.on("selection:created",(event)=>{
            handleObjectSelection(event.selected[0]);
        });

        canvas.on("selection:updated",(event)=>{
            handleObjectSelection(event.selected[0]);
        });
        // canvas.on("selection:updated",(event)=>{
        //     setSelectedObject(null);
        //     clearSettings();
        // });
        canvas.on("selection:modified",(event)=>{
            handleObjectSelection(event.target);
        });
        canvas.on("selection:scaling",(event)=>{
            handleObjectSelection(event.target);
        });

    },[canvas])

    const handleObjectSelection= (object)=>{
        if(!object) return;
        setSelectedObject(object);

        if(object.type === "rect"){
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter("");
        }else if (object.type === "circle"){
            setDiameter(Math.round(object.radius* 2* object.scaleX));
            setColor(object.fill);
            setWidth("");
            setHeight("");
        }
        else if (object.type === "i-text"){
            setTextSize(object.fontSize);
            setColor(object.fill);
            console.log(object.fontFamily);
            setTextFont(object.fontFamily);
            setTextAlign(object.textAlign);
            console.log(object.fontWeight);
            console.log(object.underline);
            if(object.fontWeight === "bold") {
                setIsBold(true);
            }else setIsBold(false);
            if(object.fontStyle === "normal") {
                setTextItalic(false);
            }else setTextItalic(true);

            setTextUnderline(object.underline);
        }
        else if (object.type === "group" && object.id?.startsWith("textbox-")) {
            const textObject = object._objects.find(obj => obj.type === "i-text");
            const rect = object._objects.find(obj => obj.type === "rect");
            const text = object._objects.find(obj => obj.type === "i-text");
            
            if (textObject) {
                console.log(textObject);
                setTextContent(textObject.text);
                setTextSize(text.fontSize);
                setTextFont(text.fontFamily);
                setColor(text.fill);
                setWidth(rect.width);
                setHeight(rect.height);
                setRx(rect.rx || 0);
                setStrokeColor(rect.stroke);
                setFillColor(rect.fill);
            }
        }
        else if (object.type === "group" && object.id?.startsWith("button-")) {
            const rect = object._objects.find(obj => obj.type === "rect");
            const text = object._objects.find(obj => obj.type === "i-text");

            if (rect && text) {
                setTextContent(text.text);
                setTextSize(text.fontSize);
                setTextFont(text.fontFamily);
                setColor(text.fill);
                setWidth(rect.width);
                setHeight(rect.height);
                setRx(rect.rx || 0);
                setStrokeColor(rect.stroke);
                setFillColor(rect.fill);
            }

            setSelectedObject(object);
        }
        else if (object.type === "group" && object.id?.startsWith("combobox-")) {
            const rect = object._objects.find(obj => obj.type === "rect");
            const text = object._objects.find(obj => obj.type === "i-text");

            if (rect && text) {
                setTextContent(text.text);
                setTextSize(text.fontSize);
                setTextFont(text.fontFamily);
                setColor(text.fill);
                setWidth(rect.width);
                setHeight(rect.height);
                setRx(rect.rx || 0);
                setStrokeColor(rect.stroke);
                setFillColor(rect.fill);
            }

            setSelectedObject(object);
        }
        else if (object.type === "group" && object.id?.startsWith("datepicker-")) {
            const dateText = object._objects.find(obj => obj.type === "i-text" && obj.text?.includes("/"));
            setTextContent(dateText?.text || "");

            // Extraemos fechas mínimas/máximas desde propiedades personalizadas
            setMinDate(object.minDate || "");
            setMaxDate(object.maxDate || "");
            
            setSelectedObject(object);
        }
        // else if (object.type === "group" && object.id?.startsWith("picturebox-")) {
        //     setImageSrc(object.imageSrc || "");
        //     setImageAlt(object.imageAlt || "");
        //     setIsCircular(object.isCircular || false);
        //     setPictureBorderColor(object.pictureBorderColor || "");
        //     setPictureBorderWidth(object.pictureBorderWidth || 0);

        //     setSelectedObject(object);
        // }
        else if (object.type === "group" && object.id?.startsWith("checkbox-")) {
            const label = object._objects.find(obj => obj.type === "i-text" && obj.text !== "✔️");
            const box = object._objects.find(obj => obj.type === "rect");

            if (label && box) {
                setCheckboxLabel(label.text);
                setCheckboxFontSize(label.fontSize);
                setCheckboxColor(label.fill);
                setCheckboxBorderColor(box.stroke);
                setCheckboxBorderWidth(box.strokeWidth);
            }

            setSelectedObject(object);
        }else if (object.type === "i-text" && object.id?.startsWith("hyperlink-")) {
          
          setHyperlinkUrl(object.href || "https://");
          setTextSize(object.fontSize);
          setColor(object.fill);
          setTextFont(object.fontFamily);
          setTextUnderline(object.underline);
          setTextAlign(object.textAlign);
          setSelectedObject(object);
        }

    }

const handleHyperlinkUrlChange = (e) => {
  const value = e.target.value;
  setHyperlinkUrl(value);
  if (selectedObject?.id?.startsWith("hyperlink-")) {
    selectedObject.href = value;
    canvas.renderAll();
  }
};


const handleMinDateChange = (e) => {
    const value = e.target.value;
    setMinDate(value);

    if (selectedObject?.id?.startsWith("datepicker-")) {
        selectedObject.minDate = value;
        canvas.renderAll();
    }
};

const handleMaxDateChange = (e) => {
    const value = e.target.value;
    setMaxDate(value);

    if (selectedObject?.id?.startsWith("datepicker-")) {
        selectedObject.maxDate = value;
        canvas.renderAll();
    }
};

const handleRxChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRx(value);

    if (selectedObject?.type === "group" && (selectedObject.id?.startsWith("button-") || selectedObject.id?.startsWith("textbox-") || selectedObject.id?.startsWith("combobox-"))) {
        const rect = selectedObject._objects.find(obj => obj.type === "rect");
        if (rect) {
            rect.set({ rx: value, ry: value });
            canvas.renderAll();
        }
    }
};

const handleFillColorChange = (e) => {
    const value = e.target.value;
    setFillColor(value);

    if (selectedObject?.type === "group" &&  (selectedObject.id?.startsWith("button-") || selectedObject.id?.startsWith("textbox-")|| selectedObject.id?.startsWith("combobox-"))) {
        const rect = selectedObject._objects.find(obj => obj.type === "rect");
        if (rect) {
            rect.set({ fill: value });
            canvas.renderAll();
        }
    }
};

const handleStrokeColorChange = (e) => {
    const value = e.target.value;
    setStrokeColor(value);

    if (selectedObject?.type === "group" &&  (selectedObject.id?.startsWith("button-") || selectedObject.id?.startsWith("textbox-")|| selectedObject.id?.startsWith("combobox-"))) {
        const rect = selectedObject._objects.find(obj => obj.type === "rect");
        if (rect) {
            rect.set({ stroke: value });
            canvas.renderAll();
        }
    }
};

const handleButtonTextChange = (e) => {
    const value = e.target.value;
    setTextContent(value);

    if (selectedObject?.type === "group" && (selectedObject.id?.startsWith("button-") || selectedObject.id?.startsWith("combobox-"))) {
        const text = selectedObject._objects.find(obj => obj.type === "i-text");
        if (text) {
            text.set({ text: value });
            canvas.renderAll();
        }
    }
};

const handleButtonTextColorChange = (e) => {
    console.log(e)
    const value = e.target.value;
    setColor(value);

    if (selectedObject?.type === "group" && (selectedObject.id?.startsWith("button-") || selectedObject.id?.startsWith("textbox-")|| selectedObject.id?.startsWith("combobox-"))) {
        const text = selectedObject._objects.find(obj => obj.type === "i-text");
        if (text) {
            text.set({ fill: value });
            canvas.renderAll();
        }
    }
};
const handleImageSrcChange = (e) => {
    const value = e.target.value;
    setImageSrc(value);

    if (selectedObject?.id?.startsWith("picturebox-")) {
        selectedObject.imageSrc = value;
        canvas.renderAll();
    }
};

const handleImageAltChange = (e) => {
    const value = e.target.value;
    setImageAlt(value);

    if (selectedObject?.id?.startsWith("picturebox-")) {
        selectedObject.imageAlt = value;
        canvas.renderAll();
    }
};
const handleCircularToggle = (checked) => {
  setIsCircular(checked);

  if (!selectedObject || !selectedObject.id?.startsWith("picturebox-")) return;

  const oldGroup = selectedObject;
  const objects = [...oldGroup._objects];
  const oldFrame = objects[0];

  const width = oldFrame.width || (oldFrame.radius * 2);
  const height = oldFrame.height || (oldFrame.radius * 2);
  const size = Math.min(width, height);

  const commonProps = {
    fill: oldFrame.fill,
    stroke: oldFrame.stroke,
    strokeWidth: oldFrame.strokeWidth,
    originX: 'left',
    originY: 'top',
    left: 0,
    top: 0,
  };

  let newFrame;
  if (checked) {
    newFrame = new Circle({
      ...commonProps,
      radius: size / 2,
    });
  } else {
    newFrame = new Rect({
      ...commonProps,
      width: size,
      height: size,
      rx: 6,
      ry: 6,
    });
  }

  // Crear nuevo ícono siempre al centro
  const icon = new IText('🖼️', {
    fontSize: 36,
    fill: '#aaa',
    originX: 'center',
    originY: 'center',
    left: (newFrame.radius != null) ? newFrame.radius : newFrame.width / 2,
    top: (newFrame.radius != null) ? newFrame.radius : newFrame.height / 2,
    selectable: false,
    evented: false,
  });

  // Crear nuevo grupo
  const newGroup = new Group(
    [newFrame, icon],
    {
      left: oldGroup.left,
      top: oldGroup.top,
      id: oldGroup.id,
      selectable: true,
      hasControls: true,
      isCircular: checked,
      imageSrc: oldGroup.imageSrc,
      imageAlt: oldGroup.imageAlt,
      pictureBorderColor: newFrame.stroke,
      pictureBorderWidth: newFrame.strokeWidth,
    }
  );

  // Reemplazar en canvas
  canvas.remove(oldGroup);
  canvas.add(newGroup);
  canvas.setActiveObject(newGroup);
  setSelectedObject(newGroup); // para que siga funcionando el panel de settings
  canvas.requestRenderAll();
};


const handlePictureBorderColorChange = (e) => {
  const value = e.target.value;
  setPictureBorderColor(value);

  if (selectedObject?.id?.startsWith("picturebox-")) {
    selectedObject.pictureBorderColor = value;

    const fondo = selectedObject._objects[0];
    if (fondo) {
      fondo.set({ stroke: value });
      canvas.renderAll();
    }
  }
};

const handlePictureBorderWidthChange = (e) => {
  const value = parseInt(e.target.value, 10);
  setPictureBorderWidth(value);

  if (selectedObject?.id?.startsWith("picturebox-")) {
    selectedObject.pictureBorderWidth = value;

    const fondo = selectedObject._objects[0];
    if (fondo) {
      fondo.set({ strokeWidth: value });
      canvas.renderAll();
    }
  }
};


    const clearSettings = ()=>{
        setWidth("");
        setHeight("");
        setDiameter("");
        setColor("");
    }

    const handleWidthChange =(e)=>{
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value,10);

        setWidth(intValue);


        if(selectedObject && selectedObject.type === "rect" && intValue >= 0){
            selectedObject.set({width:intValue / selectedObject.scaleX});
            canvas.renderAll();
        }
    };

    const handleHeightChange =(e)=>{
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value,10);

        setHeight(intValue);


        if(selectedObject && selectedObject.type === "rect" && intValue >= 0){
            selectedObject.set({height:intValue / selectedObject.scaleY});
            canvas.renderAll();
        }
    };

    const handleDiamaterChange =(e)=>{
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value,10);

        setDiameter(intValue);


        if(selectedObject && selectedObject.type === "circle" && intValue >= 0){
            selectedObject.set({radius:intValue/2 / selectedObject.scaleX});
            canvas.renderAll();
        }
    };

    const handleNegritaChange = (e) => {
        
        const value = e;
        setIsBold(value);

        if(selectedObject && selectedObject.type === "i-text"){
            selectedObject.set({fontWeight: value ? "bold" : "normal"});
            canvas.renderAll();
        }
    };

    const handleSubrayadoChange = (e) => {
        const value = e;
        setTextUnderline(value);

        if (selectedObject && selectedObject.type === "i-text") {
            selectedObject.set({ underline: value ? true : false });
            canvas.renderAll();
        }
    };

    const handleCursivaChange = (e) => {
        const value = e;
        setTextItalic(value);

        if (selectedObject && selectedObject.type === "i-text") {
            selectedObject.set({ fontStyle: value ? "italic" : "normal" });
            canvas.renderAll();
        }
    };


    const handleColorChange =(e)=>{
        // const value = e.target.value.replace(/,/g,"");
        // const intValue = parseInt(value,10);

        // setColor(intValue);


        // if(selectedObject){
        //     selectedObject.set({fill:value});
        //     canvas.renderAll();
        // }

        const value = e.target.value;
        setColor(value);
      
        if (selectedObject) {
          selectedObject.set({ fill: value });
          canvas.renderAll();
        }
    };

    const handleTextSizeChange =(e)=>{
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value,10);

        setTextSize(intValue);


        if(selectedObject && selectedObject.type === "i-text" && intValue >= 0){
            selectedObject.set({fontSize:value});
            canvas.renderAll();
        }
    };

    const handleTextContentChange = (e) => {
        const value = e.target.value;
        setTextContent(value);
    
        if (selectedObject) {
            if (selectedObject.type === "i-text") {
                selectedObject.set({ text: value });
            } else if (selectedObject.type === "group" && selectedObject.id?.startsWith("textbox-")) {
                const textObject = selectedObject._objects.find(obj => obj.type === "i-text");
                if (textObject) {
                    textObject.set({ text: value });
                }
            }
            canvas.renderAll();
        }
    };

const handleTextFontChange = (e) => {
  const value = e.target.value;
  setTextFont(value);

  if (selectedObject && selectedObject.type === "i-text") {
    selectedObject.set({ fontFamily: value });
    canvas.renderAll();
  }
};


    const handleTextAlignChange =(e)=>{
        // console.log(e.target.value);
        const value = e.target.value;

        if (!e) return;
        setTextAlign(value);


        if(selectedObject && selectedObject.type === "i-text" ){
            selectedObject.set({textAlign:value});
            canvas.renderAll();
        }
    };


const handleCheckboxLabelChange = (e) => {
  const value = e.target.value;
  setCheckboxLabel(value);

  if (selectedObject?.id?.startsWith("checkbox-")) {
    const label = selectedObject._objects.find(obj => obj.type === "i-text" && obj.text !== "✔️");
    if (label) {
      label.set({ text: value });
      canvas.renderAll();
    }
  }
};

const handleCheckboxFontSizeChange = (e) => {
  const value = parseInt(e.target.value, 10);
  setCheckboxFontSize(value);

  if (selectedObject?.id?.startsWith("checkbox-")) {
    const label = selectedObject._objects.find(obj => obj.type === "i-text" && obj.text !== "✔️");
    if (label) {
      label.set({ fontSize: value });
      canvas.renderAll();
    }
  }
};

const handleCheckboxColorChange = (e) => {
  const value = e.target.value;
  setCheckboxColor(value);

  if (selectedObject?.id?.startsWith("checkbox-")) {
    const label = selectedObject._objects.find(obj => obj.type === "i-text" && obj.text !== "✔️");
    if (label) {
      label.set({ fill: value });
      canvas.renderAll();
    }
  }
};

const handleCheckboxBorderColorChange = (e) => {
  const value = e.target.value;
  setCheckboxBorderColor(value);

  if (selectedObject?.id?.startsWith("checkbox-")) {
    const box = selectedObject._objects.find(obj => obj.type === "rect");
    if (box) {
      box.set({ stroke: value });
      canvas.renderAll();
    }
  }
};

const handleCheckboxBorderWidthChange = (e) => {
  const value = parseInt(e.target.value, 10);
  setCheckboxBorderWidth(value);

  if (selectedObject?.id?.startsWith("checkbox-")) {
    const box = selectedObject._objects.find(obj => obj.type === "rect");
    if (box) {
      box.set({ strokeWidth: value });
      canvas.renderAll();
    }
  }
};


const textOptions = [
  { label: "Arial", value: "Arial" },
  { label: "Open Sans", value: "Open Sans" },
];

const rebuildTableGroup = (group, numRows, numCols, cellWidth, cellHeight) => {
  const newCells = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const rect = new Rect({
        left: col * cellWidth,
        top: row * cellHeight,
        width: cellWidth,
        height: cellHeight,
        fill: row === 0 ? "#2C3E50" : row % 2 === 0 ? "#ECF0F1" : "#BDC3C7",
        stroke: "#000",
        strokeWidth: 1,
      });
      newCells.push(rect);
    }
  }

  const newGroup = new Group(newCells, {
    left: group.left,
    top: group.top,
    selectable: true,
    hasControls: true,
    id: group.id,
  });

  // Copy custom props
  newGroup.numRows = numRows;
  newGroup.numCols = numCols;
  newGroup.cellWidth = cellWidth;
  newGroup.cellHeight = cellHeight;

  return newGroup;
};

const handleAddRow = () => {
  if (selectedObject?.id?.startsWith("table-")) {
    const { numRows, numCols, cellWidth, cellHeight } = selectedObject;
    const newGroup = rebuildTableGroup(selectedObject, numRows + 1, numCols, cellWidth, cellHeight);
    canvas.remove(selectedObject);
    canvas.add(newGroup);
    canvas.setActiveObject(newGroup);
    setSelectedObject(newGroup);
    canvas.requestRenderAll();
  }
};

const handleRemoveRow = () => {
  if (selectedObject?.id?.startsWith("table-") && selectedObject.numRows > 1) {
    const { numRows, numCols, cellWidth, cellHeight } = selectedObject;
    const newGroup = rebuildTableGroup(selectedObject, numRows - 1, numCols, cellWidth, cellHeight);
    canvas.remove(selectedObject);
    canvas.add(newGroup);
    canvas.setActiveObject(newGroup);
    setSelectedObject(newGroup);
    canvas.requestRenderAll();
  }
};

const handleAddColumn = () => {
  if (selectedObject?.id?.startsWith("table-")) {
    const { numRows, numCols, cellWidth, cellHeight } = selectedObject;
    const newGroup = rebuildTableGroup(selectedObject, numRows, numCols + 1, cellWidth, cellHeight);
    canvas.remove(selectedObject);
    canvas.add(newGroup);
    canvas.setActiveObject(newGroup);
    setSelectedObject(newGroup);
    canvas.requestRenderAll();
  }
};

const handleRemoveColumn = () => {
  if (selectedObject?.id?.startsWith("table-") && selectedObject.numCols > 1) {
    const { numRows, numCols, cellWidth, cellHeight } = selectedObject;
    const newGroup = rebuildTableGroup(selectedObject, numRows, numCols - 1, cellWidth, cellHeight);
    canvas.remove(selectedObject);
    canvas.add(newGroup);
    canvas.setActiveObject(newGroup);
    setSelectedObject(newGroup);
    canvas.requestRenderAll();
  }
};


    return (
       <div className="Settings darkmode" >
        {selectedObject?.type === "rect" && (
        <>
            <Input label="Width" value={width} onChange={handleWidthChange} fluid />
            <Input label="Height" value={height} onChange={handleHeightChange} fluid />
            <Input label="Color" value={color} onChange={handleColorChange} type="color" fluid />
        </>
        )}

{selectedObject?.type === "circle" && (
  <>
    <Input label="Diameter" value={diameter} onChange={handleDiamaterChange} fluid />
    <Input label="Color" value={color} onChange={handleColorChange} type="color" fluid />
  </>
)}

{selectedObject?.type === "i-text" && selectedObject?.id?.startsWith("text-") && (
  <>
    <Input label="Tamaño de texto" value={textSize} onChange={handleTextSizeChange} fluid />
    <Input label="Color" value={color} onChange={handleColorChange} type="color" fluid />
<select value={textFont} onChange={handleTextFontChange} style={{ width: "100%", padding: "5px", marginBottom: "10px" }}>
  <option value="" disabled>Seleccionar fuente</option>
  <option value="Arial">Arial</option>
  <option value="Open Sans">Open Sans</option>
</select>
    <select value={textAlign} onChange={handleTextAlignChange} style={{ width: "100%", padding: "5px" }}>
      <option value="left">Izquierda</option>
      <option value="center">Centro</option>
      <option value="right">Derecha</option>
    </select>
    <div className="checkbox-group">
      <Checkbox label="Subrayado" checked={textUnderLine} onChange={handleSubrayadoChange}>Subrayado</Checkbox>
      <Checkbox label="Negrita" checked={isBold} onChange={handleNegritaChange}>Negrita</Checkbox>
      <Checkbox label="Cursiva" checked={textItalic} onChange={handleCursivaChange}>Cursiva</Checkbox>
    </div>
  </>
  
)}
{selectedObject?.type === "group" && selectedObject.id?.startsWith("textbox-") && (
  <>
    <Input label="Texto" value={textContent} onChange={handleTextContentChange} fluid />
    <Input label="Color texto" value={color} onChange={handleButtonTextColorChange} type="color" fluid />
    <Input label="Color fondo" value={fillColor} onChange={handleFillColorChange} type="color" fluid />
    <Input label="Color borde" value={strokeColor} onChange={handleStrokeColorChange} type="color" fluid />
    <Input label="Radio borde" value={rx} onChange={handleRxChange} type="number" fluid min={0} max={20} step={1} />
  </>
)}

{selectedObject?.id?.startsWith("button-") && (
  <>
    <Input label="Texto" value={textContent} onChange={handleButtonTextChange} fluid />
    <Input label="Color texto" value={color} onChange={handleButtonTextColorChange} type="color" fluid />
    <Input label="Color fondo" value={fillColor} onChange={handleFillColorChange} type="color" fluid />
    <Input label="Color borde" value={strokeColor} onChange={handleStrokeColorChange} type="color" fluid />
    <Input label="Radio borde" value={rx} onChange={handleRxChange} type="number" fluid min={0} max={20} step={1} />
  </>
)}

{selectedObject?.id?.startsWith("combobox-") && (
  <>
    <Input label="Texto" value={textContent} onChange={handleButtonTextChange} fluid />
    <Input label="Color texto" value={color} onChange={handleButtonTextColorChange} type="color" fluid />
    <Input label="Color fondo" value={fillColor} onChange={handleFillColorChange} type="color" fluid />
    <Input label="Color borde" value={strokeColor} onChange={handleStrokeColorChange} type="color" fluid />
    <Input label="Radio borde" value={rx} onChange={handleRxChange} type="number" fluid min={0} max={20} step={1} />
  </>
)}
    {selectedObject && selectedObject.id?.startsWith("datepicker-") && (
  <>
    <Input 
      label="Fecha mínima"
      value={minDate}
      fluid
      type="date"
      onChange={handleMinDateChange}
    />
    <Input 
      label="Fecha máxima"
      value={maxDate}
      fluid
      type="date"
      onChange={handleMaxDateChange}
    />
  </>
)}
{selectedObject && selectedObject.id?.startsWith("picturebox-") && (
  <>
    <Input 
      label="URL de imagen"
      value={imageSrc}
      fluid
      onChange={handleImageSrcChange}
      placeholder="https://..."
    />
    <Input 
      label="Texto alternativo"
      value={imageAlt}
      fluid
      onChange={handleImageAltChange}
      placeholder="Descripción de la imagen"
    />
    <Input
    label="Color de borde"
    value={pictureBorderColor}
    type="color"
    fluid
    onChange={handlePictureBorderColorChange}
    />
    <Input
    label="Grosor de borde"
    value={pictureBorderWidth}
    type="number"
    min={0}
    max={10}
    step={1}
    fluid
    onChange={handlePictureBorderWidthChange}
    />
    <Checkbox
    label="Borde circular"
    checked={isCircular}
    onChange={handleCircularToggle}
    >
    Borde circular
    </Checkbox>
  </>
)}

{selectedObject?.id?.startsWith("checkbox-") && (
  <>
    <Input
      label="Texto del checkbox"
      value={checkboxLabel}
      fluid
      onChange={handleCheckboxLabelChange}
    />
    <Input
      label="Tamaño del texto"
      type="number"
      min={8}
      max={48}
      value={checkboxFontSize}
      fluid
      onChange={handleCheckboxFontSizeChange}
    />
    <Input
      label="Color del texto"
      type="color"
      value={checkboxColor}
      fluid
      onChange={handleCheckboxColorChange}
    />
    {/* <Input
      label="Color del borde"
      type="color"
      value={checkboxBorderColor}
      fluid
      onChange={handleCheckboxBorderColorChange}
    />
    <Input
      label="Grosor del borde"
      type="number"
      min={0}
      max={10}
      value={checkboxBorderWidth}
      fluid
      onChange={handleCheckboxBorderWidthChange}
    /> */}
  </>
)}
{selectedObject?.id?.startsWith("hyperlink-") && (
  <>
      <Input label="Tamaño de texto" value={textSize} onChange={handleTextSizeChange} fluid />
    <Input label="Color" value={color} onChange={handleColorChange} type="color" fluid />
<select value={textFont} onChange={handleTextFontChange} style={{ width: "100%", padding: "5px", marginBottom: "10px" }}>
  <option value="" disabled>Seleccionar fuente</option>
  <option value="Arial">Arial</option>
  <option value="Open Sans">Open Sans</option>
</select>
    <select value={textAlign} onChange={handleTextAlignChange} style={{ width: "100%", padding: "5px" }}>
      <option value="left">Izquierda</option>
      <option value="center">Centro</option>
      <option value="right">Derecha</option>
    </select>
    <div className="checkbox-group">
      <Checkbox label="Subrayado" checked={textUnderLine} onChange={handleSubrayadoChange}>Subrayado</Checkbox>
      <Checkbox label="Negrita" checked={isBold} onChange={handleNegritaChange}>Negrita</Checkbox>
      <Checkbox label="Cursiva" checked={textItalic} onChange={handleCursivaChange}>Cursiva</Checkbox>
    </div>
  
    <Input
      label="URL"
      value={hyperlinkUrl}
      fluid
      onChange={handleHyperlinkUrlChange}
      placeholder="https://..."
    />
  </>
)}
{selectedObject?.id?.startsWith("table-") && (
  <>
    <button color="white" onClick={handleAddRow}>➕ Agregar fila</button>
    <button onClick={handleRemoveRow}>➖ Quitar fila</button>
    <button onClick={handleAddColumn}>➕ Agregar columna</button>
    <button onClick={handleRemoveColumn}>➖ Quitar columna</button>
  </>
)}
  </div>
    );
}

export default Settings;