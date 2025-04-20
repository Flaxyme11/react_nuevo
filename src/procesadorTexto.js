import { useMemo } from 'react';

const procesadorTexto = (canvas,fileType) => {
  // Lógica para procesar el string (puedes personalizar esto)

  switch (fileType) {
    case "jsx":
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
      return `
          <div style={{
              position: "relative",
              width: "${canvasWidth}px",
              height: "${canvasHeight}px",
              border: "1px solid black",
              backgroundColor: "white",
          }}>
              ${canvas.getObjects()
                  ?.map((obj) => generateTextCodeReact(obj))
                  .join("\n")}
          </div>
      `;
  
    case "svelte":
      // Aquí puedes definir una lógica diferente para Svelte si lo necesitas.
      return "// Svelte support is not implemented yet.";
    default:
      return "// Unsupported fileType";
  }
};


const generateTextCodeReact = (obj) => {

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
             transform: "rotate(${obj.angle}deg)",
            transformOrigin: "top left"
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
                    // top: "${obj.top - obj.radius}px",
                    // left: "${obj.left - obj.radius}px",
                    top: "${obj.top}px",
                    left: "${obj.left}px",
                    width: "${obj.radius * 2}px",
                    height: "${obj.radius * 2}px",
                    backgroundColor: "${obj.fill}",
                    borderRadius: "50%",
                    border: "${obj.strokeWidth}px solid ${obj.stroke}",
                    transform: "scale(${obj.scaleX}, ${obj.scaleY})"
                }}></div>
            `;
      // case "combobox":
      //   console.log("Processing dropdown");
      //   return `
      //   <select style={{ position: "absolute", top: "${obj.top}px", left: "${obj.left}px", width: "${obj.width}px",
      //         height: "${obj.height}px",transform: "scale(${obj.scaleX}, ${obj.scaleY})" }}>
      //   </select>
      // `;
      //   break;
        // case "textbox":
        //   console.log("Processing textbox");
        //   return `
        //     <textarea
        //       style={{
        //         position: "absolute",
        //         top: "${obj.top}px",
        //         left: "${obj.left}px",
        //         width: "${obj.width}px",
        //         height: "${obj.height}px",
        //         fontSize: "${obj.fontSize}px",
        //         fontFamily: "${obj.fontFamily}, sans-serif",
        //         textAlign: "${obj.textAlign}",
        //         lineHeight: "${obj.lineHeight}",
        //         color: "${obj.fill}",
        //         backgroundColor: "${obj.backgroundColor || "transparent"}",
        //         transform: "scale(${obj.scaleX}, ${obj.scaleY})",
        //         opacity: ${obj.opacity},
        //         border: "${obj.strokeWidth}px solid ${obj.stroke}",
        //         resize: "none",
        //         overflow: "hidden"
        //       }}
        //       readOnly
        //     >${obj.text}</textarea>
        //   `;
        case "textbox":
          console.log("Processing textbox");

          const textChild = obj._objects?.find(child => child.type === "i-text");

          if (!textChild) return "";

          return `
            <div style={{
              position: "absolute",
              top: "${obj.top}px",
              left: "${obj.left}px",
              width: "${obj.width * obj.scaleX}px",
              height: "${obj.height * obj.scaleY}px",
              backgroundColor: "#fff",
              border: "1px solid #000",
              borderRadius: "4px",
              padding: "5px",
              fontSize: "${textChild.fontSize}px",
              fontFamily: "${textChild.fontFamily}, sans-serif",
              color: "${textChild.fill}",
                  // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  transform: "rotate(${obj.angle || 0}deg) ",
              transformOrigin: "top left",
              overflow: "hidden"
            }}>
              ${textChild.text}
            </div>
          `;
        case "button":
          console.log("Processing button");

          const buttonTextObj = obj._objects?.find(child => child.type === "i-text");

          if (!buttonTextObj) return "";

          return `
            <button
              style={{
                position: "absolute",
                top: "${obj.top}px",
                left: "${obj.left}px",
                width: "${obj.width * obj.scaleX}px",
                height: "${obj.height * obj.scaleY}px",
                backgroundColor: "${obj._objects[0]?.fill || "#ADADAD"}",
                color: "${buttonTextObj.fill}",
                fontSize: "${buttonTextObj.fontSize}px",
                fontFamily: "${buttonTextObj.fontFamily || "sans-serif"}",
                border: "2px solid ${obj._objects[0]?.stroke || "#ffffff"}",
                borderRadius: "6px",
                cursor: "pointer",
                  // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  transform: "rotate(${obj.angle || 0}deg) ",
                transformOrigin: "top left"
              }}
              onClick={() => console.log("Botón presionado")}
            >
              ${buttonTextObj.text}
            </button>
          `;
          case "combobox":
            console.log("Processing dropdown");
          
            const comboTextObj = obj._objects?.find(child => child.type === "i-text");
          
            return `
              <select
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  width: "${obj.width * obj.scaleX}px",
                  height: "${obj.height * obj.scaleY}px",
                  backgroundColor: "#fff",
                  color: "${comboTextObj?.fill || '#333'}",
                  fontSize: "${comboTextObj?.fontSize || 16}px",
                  fontFamily: "${comboTextObj?.fontFamily || 'sans-serif'}",
                  border: "1px solid #000",
                  borderRadius: "4px",
                  paddingLeft: "10px",
                  // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  transform: "rotate(${obj.angle || 0}deg) ",
                  transformOrigin: "top left"
                }}
              >
                <option>${comboTextObj?.text || "Seleccionar..."}</option>
              </select>
            `;
          case "datepicker":
            console.log("Processing datepicker");
          
            const dateTextObj = obj._objects?.find(child => child.type === "i-text" && child.text?.includes("/"));
            const defaultDate = dateTextObj?.text || "dd/mm/yyyy";
          
            return `
              <input
                type="date"
                defaultValue=""
                placeholder="${defaultDate}"
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  width: "${obj.width * obj.scaleX}px",
                  height: "${obj.height * obj.scaleY}px",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "${dateTextObj?.fontSize || 16}px",
                  fontFamily: "${dateTextObj?.fontFamily || 'sans-serif'}",
                  border: "1px solid #000",
                  borderRadius: "4px",
                  paddingLeft: "10px",
                  // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  transform: "rotate(${obj.angle || 0}deg) ",
                  transformOrigin: "top left"
                }}
                onClick={() => console.log("Abrir datepicker")}
              />
            `;
          case "picturebox":
            console.log("Processing picturebox");
          
            return `
              <img
                src=""
                alt="PictureBox"
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  width: "${obj.width * obj.scaleX}px",
                  height: "${obj.height * obj.scaleY}px",
                  backgroundColor: "#f8f8f8",
                  border: "2px solid #bbb",
                  borderRadius: "6px",
                  objectFit: "cover",
                  // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  transform: "rotate(${obj.angle || 0}deg) ",
                  transformOrigin: "top left"
                }}
              />
            `;
          case "checkbox":
            console.log("Processing checkbox");
          
            const labelObj = obj._objects?.find(child => child.type === "i-text" && child.text !== "✔️");
            const labelText = labelObj?.text || "Opción";
          
            return `
              <label
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  fontSize: "${labelObj?.fontSize || 16}px",
                  fontFamily: "${labelObj?.fontFamily || 'sans-serif'}",
                  color: "${labelObj?.fill || '#000'}",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  //transform: "rotate(${obj.angle || 0}deg) ",
                  transformOrigin: "top left"
                }}
              >
                <input type="checkbox" style={{ width: "20px", height: "20px" }} />
                {labelText}
              </label>
            `;   
          case "hyperlink":
            console.log("Processing hyperlink");
          
            return `
              <a
                href="local8080"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  fontSize: "${obj.fontSize}px",
                  fontFamily: "${obj.fontFamily || 'sans-serif'}",
                  color: "${obj.fill || '#000'}",
                  textDecoration: "underline",
                  lineHeight: "${obj.lineHeight || 1}",
                  opacity: ${obj.opacity || 1},
                  // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  transform: "rotate(${obj.angle || 0}deg) ",
                  transformOrigin: "top left"
                }}
              >
                ${obj.text}
              </a>
            `;            
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

export default procesadorTexto;