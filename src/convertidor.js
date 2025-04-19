import { Canvas, Circle, Rect, Group, IText } from "fabric";
import React, {useEffect, useRef,useState} from "react";
import "./styles.scss"
import {Button, IconButton} from "blocksin-system";
import ReactDOM from "react-dom/client";
import {ActivityLogIcon, ButtonIcon, CircleIcon, DownloadIcon, EnvelopeClosedIcon, LightningBoltIcon, SquareIcon, TableIcon, TextIcon} from "sebikostudio-icons";
import Settings from "./Settings"
import CanvasSettings from './CanvasSettings';
import {handleObjectMoving,ClearGuideLines} from "./snappingHelpers";
import { v4 as uuidv4 } from "uuid";
import LayersList from './LayerList';
import procesadorTexto from "./procesadorTexto";

function Convertidor({canvas}){
  const [fileType, setFileType] = useState("jsx");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateFile = () => {
    // if (canvas) {
    //   const objects = JSON.stringify(canvas.getObjects(), null, 2);
    //   const blob = new Blob([objects], { type: "text/plain" });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `canvas_objects.${fileType}`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(url);
    // }

    // const hierarchy = buildHierarchy(canvas.getObjects());
    // console.log(hierarchy);
    // return;

    if(canvas){
        console.log(canvas.getObjects());

        // const generatedCode = canvas.getObjects()
        // ?.map((obj) => generateTextCode(obj))
        // .join("\n");


        const generatedCode =  procesadorTexto(canvas,fileType);

    //     const canvasWidth = canvas.width;
    //     const canvasHeight = canvas.height;

    //     const generatedCode = `
    //     <div style={{
    //         position: "relative",
    //         width: "${canvasWidth}px",
    //         height: "${canvasHeight}px",
    //         border: "1px solid black",
    //         backgroundColor: "white",
    //     }}>
    //         ${canvas.getObjects()
    //             ?.map((obj) => generateTextCode(obj))
    //             .join("\n")}
    //     </div>
    // `;

        console.log(fileType);

        const objects = generatedCode;
        const blob = new Blob([objects], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // a.download = `canvas_objects.${fileType}`;
        const extension = fileType === "jsx" ? "jsx" : fileType === "svelte" ? "svelte" : "txt";
        a.download = `canvas_objects.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }


    
  };


  const generateTextCode = (obj) => {

    // Console.

    const objectType = obj.id?.split("-")[0]; // Extract object type from id

    console.log(obj.id?.split("-")[0]);

    switch (objectType) {
      case "nyancat":
        console.log("Processing nyanCatForm");
        break;
      case "text":
        console.log("Processing  text");
        break;
      case "table":
        console.log("Processing tabla");
        return `
          <table
            style={{
              position: "absolute",
              top: "${obj.top}px",
              left: "${obj.left}px",
              width: "${obj.width*obj.scaleX}px",
              height: "${obj.height*obj.scaleY}px",
              borderCollapse: "collapse",
              border: "1px solid black",
              backgroundColor: "#f9f9f9",
            //   transform: "scale(${obj.scaleX}, ${obj.scaleY})"
            }}
          >
            <tbody>
            ${[...Array(3)].map((_, rowIndex) => `
              <tr>
                ${[...Array(4)].map((_, colIndex) => `
                  <td style={{ border: "1px solid black", padding: "10px" }}>R${rowIndex + 1}C${colIndex + 1}</td>
                `).join('')}
              </tr>
            `).join('')}
            </tbody>
          </table>
        `;
        break;
        case "rect":
            console.log("Processing rectangle");
            return `
                <div style={{
                    position: "absolute",
                    top: "${obj.top}px",
                    left: "${obj.left}px",
                    width: "${obj.width}px",
                    height: "${obj.height}px",
                    backgroundColor: "${obj.fill}",
                    border: "${obj.strokeWidth}px solid ${obj.stroke}",
                    transform: "scale(${obj.scaleX}, ${obj.scaleY})"
                }}></div>
            `;
        case "circle":
            console.log("Processing circle");
            return `
                <div style={{
                    position: "absolute",
                    top: "${obj.top - obj.radius}px",
                    left: "${obj.left - obj.radius}px",
                    width: "${obj.radius * 2}px",
                    height: "${obj.radius * 2}px",
                    backgroundColor: "${obj.fill}",
                    borderRadius: "50%",
                    border: "${obj.strokeWidth}px solid ${obj.stroke}",
                    transform: "scale(${obj.scaleX}, ${obj.scaleY})"
                }}></div>
            `;
      case "combobox":
        console.log("Processing dropdown");
        return `
        <select style={{ position: "absolute", top: "${obj.top}px", left: "${obj.left}px", width: "${obj.width}px",
              height: "${obj.height}px",transform: "scale(${obj.scaleX}, ${obj.scaleY})" }}>
        </select>
      `;
        break;
      default:
        console.log("Processing default ");
    }
  

    // if (shape?.type !== "i-text") return ""; // Filtra solo los textos
    if (objectType!== "text") return ""; // Filtra solo los textos
  
    return `
      <span
        style={{
          position: "absolute",
          top: "${obj.top}px",
          left: "${obj.left}px",
          fontSize: "${obj.fontSize}px",
        //   fontWeight: ${obj.fontWeight},
          fontFamily: "${obj.fontFamily}, sans-serif",
        //   fontStyle: "${obj.fontStyle}",
          textDecoration: "${obj.underline ? "underline" : "none"}",
          textAlign: "${obj.textAlign}",
          lineHeight: "${obj.lineHeight}",
          color: "${obj.fill}",
          backgroundColor: "${obj.backgroundColor || "transparent"}",
          transform: "scale(${obj.scaleX}, ${obj.scaleY})",
          opacity: ${obj.opacity},
          stroke: "${obj.stroke}",
          strokeWidth: ${obj.strokeWidth},
          WebkitTextStroke: "${obj.strokeWidth}px ${obj.stroke}"
        }}
      >
        ${obj.text}
      </span>
    `;
  };



    return(        
    <div className='GenerarCodigo darkmode'>
            <Button fluid variant="solid"  onClick={() => setIsModalOpen(true)} fontFamily="Arial">
                <EnvelopeClosedIcon /> Generar Codigo 
              </Button>
              {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative animate-fade-in">
                <div className='nombre_desc'>Elige el Framework </div>
                <select
                  className="p-2 border rounded w-full mt-2"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  {/* <option value="json">JSON</option>
                  <option value="js">JavaScript</option>
                  <option value="xml">XML</option>
                  <option value="html">HTML</option> */}
                  <option value="jsx">React</option>
                  <option value="svelte">Svelte</option>
                  
                </select>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cerrar</Button>
                  <Button variant="solid" onClick={generateFile} className="ml-2">Descargar</Button>
                </div>
              </div>
            </div>
          )}
            </div>
            );

}

export default Convertidor