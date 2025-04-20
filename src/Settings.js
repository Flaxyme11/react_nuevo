import { DropdownMenu, Input,IconButton,ComboBox} from "blocksin-system";
import React,{useState,useEffect} from "react";
import {CircleIcon, SquareIcon, SliderIcon} from "sebikostudio-icons";
function Settings ({canvas}){

    const [selectedObject, setSelectedObject] = useState(null);
    const [width,setWidth] = useState("");
    const [height,setHeight] = useState("");
    const [diameter,setDiameter] = useState("");
    const [color,setColor] = useState("");
    
    

    const [textSize,setTextSize] = useState("");

    const [textFont,setTextFont] = useState("");

    const [textContent,setTextContent] = useState("");

    useEffect (()=>{
        if(!canvas)return;
        canvas.on("selection:created",(event)=>{
            handleObjectSelection(event.selected[0]);
        });

        canvas.on("selection:updated",(event)=>{
            handleObjectSelection(event.selected[0]);
        });
        canvas.on("selection:updated",(event)=>{
            setSelectedObject(null);
            clearSettings();
        });
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
        }
        else if (object.type === "group" && object.id?.startsWith("textbox-")) {
            const textObject = object._objects.find(obj => obj.type === "i-text");
            if (textObject) {
                setTextContent(textObject.text);
                setTextSize(textObject.fontSize);
                setTextFont(textObject.fontFamily);
                setColor(textObject.fill);
            }
        }
    }

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


    const handleColorChange =(e)=>{
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value,10);

        setColor(intValue);


        if(selectedObject){
            selectedObject.set({fill:value});
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

    const handleTextFontChange =(e)=>{
        // console.log(e.target.value);
        const value = e.label;

        if (!e) return;
        setTextFont(value);


        if(selectedObject && selectedObject.type === "i-text" ){
            selectedObject.set({fontFamily:value});
            canvas.renderAll();
        }
    };
    const textOptions = [
        { label: "Arial", value: "1"},
        { label: "Open Sans", value: "2"},
        // { label: "Bob Smith", value: "3" },
      ];



    return (
        <div className="Settings darkmode">
            {selectedObject && selectedObject.type === "rect" && (
                <>
                <Input 
                 fluid
                 label="Width"
                 value = {width}
                 onChange={handleWidthChange}
                />
                <Input 
                 label = "Height"
                 value={height}
                 fluid 
                 onChange={handleHeightChange}
                />

                <Input 
                 label = "Color"
                 value={color}
                 fluid 
                 type="color"
                 onChange={handleColorChange}
                />
                </>
            )}

            {selectedObject && selectedObject.type === "circle" && (
                <>
                <Input 
                 fluid
                 label="Diameter"
                 value = {diameter}
                 onChange={handleDiamaterChange}
                />
                <Input 
                 label = "Color"
                 value={color}
                 fluid 
                 type="color"
                 onChange={handleColorChange}
                />
                </>
            )}

            {selectedObject && selectedObject.type === "i-text" && (
                <>
                <Input 
                 fluid
                 label="Size"
                 value = {textSize}
                 onChange={handleTextSizeChange}
                />
                <Input 
                 label = "Color"
                 value={color}
                 fluid 
                 type="color"
                 onChange={handleColorChange}
                />
                    <ComboBox
                    options={textOptions}
                    value={textFont}
                    onChange={handleTextFontChange}
                    placeholder={textFont}
                    isMulti={false}
                    fluid
                    />
                </>
            )}
            {selectedObject && 
  (selectedObject.type === "i-text" || (selectedObject.type === "group" && selectedObject.id?.startsWith("textbox-"))) && (
    <>
      <Input 
        fluid
        label="Texto"
        value={textContent}
        onChange={handleTextContentChange}
      />
      {/* <Input 
        fluid
        label="Tamaño"
        value={textSize}
        onChange={handleTextSizeChange}
      />
      <Input 
        label="Color"
        value={color}
        fluid
        type="color"
        onChange={handleColorChange}
      />
      <ComboBox
        options={textOptions}
        value={textFont}
        onChange={handleTextFontChange}
        placeholder={textFont}
        isMulti={false}
        fluid
      /> */}
    </>
)}
        </div>
    );
}

export default Settings;