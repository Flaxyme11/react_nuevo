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
            transformOrigin: "center center"
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

export default procesadorTexto;