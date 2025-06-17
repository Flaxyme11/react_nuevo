import { useMemo } from 'react';

const procesadorTexto = (canvas,fileType,fileName) => {
  // Lógica para procesar el string (puedes personalizar esto)

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  switch (fileType) {
    case "jsx":
        // const canvasWidth = canvas.width;
        // const canvasHeight = canvas.height;
      return `
      import React from 'react'

function ${fileName}() {
  return (
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
      );
    }

export default ${fileName};
      `;
  
    case "svelte":
      // const canvasWidth = canvas.width;
      // const canvasHeight = canvas.height;
      // Aquí puedes definir una lógica diferente para Svelte si lo necesitas.
      return  `

<script>
  </script>
  
  <style>
	
  </style>
  

  <div style="
      position: relative;
      width: ${canvasWidth}px;
      height: ${canvasHeight}px;
      border: 1px solid black;
      background-color: white;"
  >
      ${canvas.getObjects()
          ?.map((obj) => generateTextCodeSvelte(obj))
          .join("\n")}
  </div>
  `;
    default:
      return "// Unsupported fileType";
  }
};

const generateTextCodeSvelte = (obj) => {

  // Console.

  const objectType = obj.id?.split("-")[0]; // Extract object type from id

  console.log(obj.id?.split("-")[0]);

  switch (objectType) {
    case "nyancat":
      console.log("Processing nyanCatForm");
      break;
    case "text":
      console.log("Processing  text");
      return `
      <span
        style="
          position: absolute;
          top: ${obj.top}px;
          left: ${obj.left}px;
          font-size: ${obj.fontSize}px;
          font-family: ${obj.fontFamily};
          font-weight: ${obj.fontWeight || 'normal'};  /* Negrita */
          font-style: ${obj.fontStyle || 'normal'};   /* Cursiva */
          text-decoration: ${obj.underline ? 'underline' : 'none'};
          text-align: ${obj.textAlign};
          line-height: ${obj.lineHeight};
          color: ${obj.fill};
          background-color: ${obj.backgroundColor || 'transparent'};
          transform: rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY});
          transform-origin: top left;
          opacity: ${obj.opacity};
          -webkit-text-stroke: ${obj.strokeWidth}px ${obj.stroke};
        "
      >
        ${obj.textLines.map((line, index) => 
          index < obj.textLines.length - 1 ? line + '<br />' : line
        ).join('')}
      </span>
    `;      
    case "table":
      console.log("Processing tabla");
        const rowsS = obj.numRows || 5;
        const colsS = obj.numCols || 3;
        const cellWS = obj.cellWidth || 80;
        const cellHS = obj.cellHeight || 25;

        return `
          <table
            style="
              position: absolute;
              top: ${obj.top}px;
              left: ${obj.left}px;
              width: ${cellWS * colsS}px;
              height: ${cellHS * rowsS}px;
              border-collapse: collapse;
              border: 1px solid black;
              background-color: #f9f9f9;
              transform: rotate(${obj.angle || 0}deg);
              transform-origin: top left;
            "
          >
            <tbody>
              ${[...Array(rowsS)].map((_, rowIndex) => `
                <tr>
                  ${[...Array(colsS)].map((_, colIndex) => `
                    <td style="border: 1px solid black; padding: 5px; width: ${cellWS}px; height: ${cellHS}px;">
                      R${rowIndex + 1}C${colIndex + 1}
                    </td>
                  `).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        `;
      break;
      case "rect":
          return  `
          <div
            style="
              position: absolute;
              top: ${obj.top}px;
              left: ${obj.left}px;
              width: ${obj.width * obj.scaleX}px;
              height: ${obj.height * obj.scaleY}px;
              background-color: ${obj.fill};
              border: ${obj.strokeWidth}px solid ${obj.stroke || '#000'};
              transform: rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY});
              transform-origin: top left;
            "
          ></div>
        `;
      case "circle":
          console.log("Processing circle");
          return `
                <div
                  style="
                    position: absolute;
                    top: ${obj.top}px;
                    left: ${obj.left}px;
                    width: ${obj.radius * 2 * obj.scaleX}px;
                    height: ${obj.radius * 2 * obj.scaleY}px;
                    background-color: ${obj.fill};
                    border-radius: 50%;
                    border: ${obj.strokeWidth}px solid ${obj.stroke || '#000'};
                    transform: rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY});
                    transform-origin: top left;
                  "
                ></div>
              `;
      case "textbox":
        console.log("Processing textbox");

        const textChild = obj._objects?.find(child => child.type === "i-text");
        const rect2 = obj._objects?.find(child => child.type === "rect");
        const text2 = obj._objects?.find(child => child.type === "i-text");

        if (!textChild) return "";
        const rx2 = rect2.rx || 0;
        const stroke2 = rect2.stroke || "#000";
        const strokeWidth2 = rect2.strokeWidth || 1;
        const fill2 = rect2.fill || "#fff";

        return  `
        <input
          type="text"
          placeholder="${textChild.text}"
          style="
            position: absolute;
            top: ${obj.top}px;
            left: ${obj.left}px;
            width:  ${obj.width * obj.scaleX}px;
            height: ${obj.height * obj.scaleY}px;
            background-color: ${fill2};
            border: ${strokeWidth2}px solid ${stroke2};
            border-radius: ${rx2}px;
            padding: 5px;
            font-size: ${textChild.fontSize}px;
            font-family: ${textChild.fontFamily}, sans-serif;
            color: ${textChild.fill};
            line-height: ${textChild.lineHeight || 1.2};
            transform: rotate(${obj.angle || 0}deg) ;
            transform-origin: top left;
          "
        />`

        //`
        //     <div
        //       style="
        //         position: absolute;
        //         top: ${obj.top}px;
        //         left: ${obj.left}px;
        //         width: ${obj.width * obj.scaleX}px;
        //         height: ${obj.height * obj.scaleY}px;
        //         background-color: #fff;
        //         border: 1px solid #000;
        //         border-radius: 4px;
        //         padding: 5px;
        //         font-size: ${textChild.fontSize}px;
        //         font-family: ${textChild.fontFamily}, sans-serif;
        //         color: ${textChild.fill};
        //         transform: rotate(${obj.angle || 0}deg);
        //         transform-origin: top left ;
        //         overflow: hidden;
        //       "
        //     >
        //       ${textChild.text}
        //     </div>
        //   `


          
        //   <div style={{
        //     position: "absolute",
        //     top: "${obj.top}px",
        //     left: "${obj.left}px",
        //     width: "${obj.width * obj.scaleX}px",
        //     height: "${obj.height * obj.scaleY}px",
        //     backgroundColor: "#fff",
        //     border: "1px solid #000",
        //     borderRadius: "4px",
        //     padding: "5px",
        //     fontSize: "${textChild.fontSize}px",
        //     fontFamily: "${textChild.fontFamily}, sans-serif",
        //     color: "${textChild.fill}",
        //         // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
        //         transform: "rotate(${obj.angle || 0}deg) ",
        //     transformOrigin: "top left",
        //     overflow: "hidden"
        //   }}>
        //     ${textChild.text}
        //   </div>
        // `;
      case "button":
        console.log("Processing button");

        const buttonTextObj = obj._objects?.find(child => child.type === "i-text");
        const rect = obj._objects?.find(child => child.type === "rect");
        const text = obj._objects?.find(child => child.type === "i-text");

        const rx = rect?.rx || 0;
        const stroke = rect?.stroke || "#000";
        const strokeWidth = rect?.strokeWidth || 1;
        const fill = rect?.fill || "#ADADAD";
        const textColor = text?.fill || "#000";
        const textValue = text?.text || "Click Me";

        if (!buttonTextObj) return "";

        return  `
        <button
          style="
            position: absolute;
            top: ${obj.top}px;
            left: ${obj.left}px;
            width: ${obj.width * obj.scaleX}px;
            height: ${obj.height * obj.scaleY}px;
            background-color: ${fill};
            color: ${textColor};
            font-size: ${buttonTextObj.fontSize}px;
            font-family: ${buttonTextObj.fontFamily || 'sans-serif'};
            border: ${strokeWidth}px solid ${stroke};
            border-radius: ${rx}px;
            cursor: pointer;
            transform: rotate(${obj.angle || 0}deg);
            transform-origin: top left;
          "
          on:click={() => console.log('Botón presionado')}
        >
          ${buttonTextObj.text}
        </button>
      `;
        case "combobox":
          const rect3 = obj._objects?.find(o => o.type === "rect");
          const text3 = obj._objects?.find(o => o.type === "i-text");

          if (!rect3 || !text3) return "";

          const rx3 = rect3.rx || 0;
          const stroke3 = rect3.stroke || "#000";
          const strokeWidth3 = rect3.strokeWidth || 1;
          const fill3 = rect3.fill || "#fff";

          const textValue3 = text3.text || "Seleccionar...";
          const fontSize3 = text3.fontSize || 16;
          const fontFamily3 = text3.fontFamily || "sans-serif";
          const textColor3 = text3.fill || "#333";

          const comboTextObj = obj._objects?.find(child => child.type === "i-text");
        
          return `
          <select
            style="
              position: absolute;
              top: ${obj.top}px;
              left: ${obj.left}px;
              width: ${obj.width * obj.scaleX}px;
              height: ${obj.height * obj.scaleY}px;
              background-color: ${fill3};
              color: ${textColor3};
              font-size: ${fontSize3}px;
              font-family: ${fontFamily3};
              border: ${strokeWidth3}px solid ${stroke3};
              border-radius: ${rx3}px;
              padding-left: 10px;
              transform: rotate(${obj.angle || 0}deg);
              transform-origin: top left;
            "
          >
            <option value = "" disabled >${comboTextObj.text}</option>
          </select>
        `;
        case "datepicker":
          console.log("Processing datepicker");
        
          const dateTextObj = obj._objects?.find(child => child.type === "i-text" && child.text?.includes("/"));
          const defaultDate = dateTextObj?.text || "dd/mm/yyyy";
        
          return `
                <input
                  type="date"
                  placeholder="${defaultDate}"
                  min="${obj.minDate || ''}"
                  max="${obj.maxDate || ''}"
                  style="
                    position: absolute;
                    top: ${obj.top}px;
                    left: ${obj.left}px;
                    width: ${obj.width * obj.scaleX}px;
                    height: ${obj.height * obj.scaleY}px;
                    background-color: #fff;
                    color: #333;
                    font-size: ${dateTextObj.fontSize}px;
                    font-family: ${dateTextObj.fontFamily};
                    border: 1px solid #000;
                    border-radius: 4px;
                    padding-left: 10px;
                    transform: rotate(${obj.angle || 0}deg) ;
                    transform-origin: top left;
                  "
                  on:click={() => console.log('Abrir datepicker')}
                />
              `;
        case "picturebox":
          console.log("Processing picturebox");
          console.log(obj.isCircular);
        
          return  `
          <img
            src="${obj.imageSrc || ''}"
            alt="${obj.imageAlt || 'PictureBox'}"
            style="
              border: ${obj.pictureBorderWidth || 2}px solid ${obj.pictureBorderColor || ''};
              border-radius: ${obj.isCircular ? '50%' : '0'};
              position: absolute;
              top: ${obj.top}px;
              left: ${obj.left}px;
              width: ${obj.width * obj.scaleX}px;
              height: ${obj.height * obj.scaleY}px;
              background-color: transparent;
              object-fit: cover;
              transform: rotate(${obj.angle || 0}deg) ;
              transform-origin: top left;
            "
          />
        `;
        case "checkbox":
          console.log("Processing checkbox");
        
          // const labelObj = obj._objects?.find(child => child.type === "i-text" && child.text !== "✔️");
          // const labelText = labelObj?.text || "Opción";
        
          
          const labelS = obj._objects?.find(child => child.type === "i-text" && child.text !== "✔️");
          const boxS = obj._objects?.find(child => child.type === "rect");

          if (!labelS || !boxS) return "";
          return `
                <label
                  style="
                    position: absolute;
                    top: ${obj.top}px;
                    left: ${obj.left}px;
                    font-size: ${labelS.fontSize}px;
                    font-family: ${labelS.fontFamily};
                    color: ${labelS.fill};
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transform: rotate(${obj.angle || 0}deg) ;
                    transform-origin: top let;
                  "
                >
                    <input
                      type="checkbox"
                      style="
                        width: ${boxS.width}px;
                        height: ${boxS.height}px;
                        border: ${boxS.strokeWidth}px solid ${boxS.stroke};
                        // appearance: none;
                        background-color: white;
                        cursor: pointer;
                      "
                    />
                  ${labelS.text}
                </label>
              `; 
        case "hyperlink":
          console.log("Processing hyperlink");
        
          return `
                <a
                  href="${obj.href || 'https://'}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    position: absolute;
                    top: ${obj.top}px;
                    left: ${obj.left}px;
                    font-size: ${obj.fontSize}px;
                    font-family: ${obj.fontFamily};
                    color: ${obj.fill};
                    text-decoration: ${obj.underline ? 'underline' : 'none'};
                    font-weight: ${obj.fontWeight || 'normal'};  /* Negrita */
                    font-style: ${obj.fontStyle || 'normal'};   /* Cursiva */
                    text-align: ${obj.textAlign || 'left'}; 
                    line-height: ${obj.lineHeight};
                    opacity: ${obj.opacity};
                    transform: rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY});
                    transform-origin: top left;
                  "
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
        fontWeight: ${obj.fontWeight},
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


const generateTextCodeReact = (obj) => {

    // Console.

    const objectType = obj.id?.split("-")[0]; // Extract object type from id

    console.log(obj.id?.split("-")[0]);

    switch (objectType) {
      case "text":
        console.log("Processing  text");
        break;
      case "table":
        const rows = obj.numRows || 5;
        const cols = obj.numCols || 3;
        const cellW = obj.cellWidth || 80;
        const cellH = obj.cellHeight || 25;

        return `
          <table
            style={{
              position: "absolute",
              top: "${obj.top}px",
              left: "${obj.left}px",
              width: "${cellW * cols}px",
              height: "${cellH * rows}px",
              borderCollapse: "collapse",
              border: "1px solid black",
              backgroundColor: "#f9f9f9",
              transform: "rotate(${obj.angle || 0}deg)",
              transformOrigin: "top left"
            }}
          >
            <tbody>
              ${[...Array(rows)].map((_, rowIndex) => `
                <tr>
                  ${[...Array(cols)].map((_, colIndex) => `
                    <td style={{
                      border: "1px solid black",
                      padding: "5px",
                      width: "${cellW}px",
                      height: "${cellH}px"
                    }}>
                      R${rowIndex + 1}C${colIndex + 1}
                    </td>
                  `).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        `;
        break;
        case "rect":
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
        case "textbox":
          console.log("Processing textbox");

          const textChild = obj._objects?.find(child => child.type === "i-text");

          const textChildTop = textChild.top || 0;
          const rect2 = obj._objects?.find(child => child.type === "rect");
          const text2 = obj._objects?.find(child => child.type === "i-text");

          console.log("rect2");

          if (!rect2 || !text2) return "";

          const rx2 = rect2.rx || 0;
          const stroke2 = rect2.stroke || "#000";
          const strokeWidth2 = rect2.strokeWidth || 1;
          const fill2 = rect2.fill || "#fff";

          const textValue2 = text2.text;
          const fontSize2 = text2.fontSize || 16;
          const fontFamily2 = text2.fontFamily || "sans-serif";
          const textColor2 = text2.fill || "#333";

          if (!textChild) return "";
          // return `
          //   <textarea
          //     style={{
          //       position: "absolute",
          //       top: "${obj.top}px",
          //       left: "${obj.left}px",
          //       width: "${obj.width}px",
          //       height: "${obj.height}px",
          //       fontSize: "${textChild.fontSize}px",
          //       fontFamily: "${textChild.fontFamily}, sans-serif",
          //       textAlign: "${obj.textAlign}",
          //       lineHeight: "${obj.lineHeight}",
          //       color: "${textChild.fill}",
          //       backgroundColor: "${obj.backgroundColor || "transparent"}",
          //       transform: "rotate(${obj.angle || 0}deg) ",
          //       opacity: ${obj.opacity},
          //       transformOrigin: "top left",
          //       overflow: "hidden"
          //     }}
          //   >${textChild.text}</textarea>
          // `;

          return `
              <input
                type="text"
                placeholder={\`${textChild.text}\`}
                style={{
                  position: "absolute",
                  top: "${obj.top }px",
                  left: "${obj.left }px",
                  width: "${obj.width * obj.scaleX }px",
                  height: "${obj.height * obj.scaleY }px",
                   backgroundColor: "${fill2}",
                   border: "${strokeWidth2}px solid ${stroke2}",
                  borderRadius: "${rx2}px",
                  padding: "5px",
                  fontSize: "${textChild.fontSize}px",
                  fontFamily: "${textChild.fontFamily}, sans-serif",
                  color: "${textChild.fill}",
                  lineHeight: ${textChild.lineHeight || 1.2} ,
                  transform: "rotate(${obj.angle || 0}deg) ",
                  transformOrigin: "top left"
                }}
              />
          `;
        case "button":
          console.log("Processing button");

          const buttonTextObj = obj._objects?.find(child => child.type === "i-text");
          const rect = obj._objects?.find(child => child.type === "rect");
          const text = obj._objects?.find(child => child.type === "i-text");

          const rx = rect?.rx || 0;
          const stroke = rect?.stroke || "#000";
          const strokeWidth = rect?.strokeWidth || 1;
          const fill = rect?.fill || "#ADADAD";
          const textColor = text?.fill || "#000";
          const textValue = text?.text || "Click Me";

          if (!buttonTextObj) return "";

          return `
            <button
              style={{
                position: "absolute",
                top: "${obj.top}px",
                left: "${obj.left}px",
                width: "${obj.width * obj.scaleX}px",
                height: "${obj.height * obj.scaleY}px",
                // backgroundColor: "${obj._objects[0]?.fill || "#ADADAD"}",
                 backgroundColor: "${fill}",
                  color: "${textColor}",
                // color: "${buttonTextObj.fill}",
                fontSize: "${buttonTextObj.fontSize}px",
                fontFamily: "${buttonTextObj.fontFamily || "sans-serif"}",
                // border: "2px solid ${obj._objects[0]?.stroke || "#ffffff"}",
                border: "${strokeWidth}px solid ${stroke}",
                borderRadius: "${rx}px",
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

            const rect3 = obj._objects?.find(o => o.type === "rect" );
            // const rect3 = obj._objects?.find(o => o.type === "rect" && o.left === 0);
            const text3 = obj._objects?.find(o => o.type === "i-text");

            console.log(rect3);
            console.log(text3);
            

            if (!rect3 || !text3) return "";

            const rx3 = rect3.rx || 0;
            const stroke3 = rect3.stroke || "#000";
            const strokeWidth3 = rect3.strokeWidth || 1;
            const fill3 = rect3.fill || "#fff";

            const textValue3 = text3.text || "Seleccionar...";
            const fontSize3 = text3.fontSize || 16;
            const fontFamily3 = text3.fontFamily || "sans-serif";
            const textColor3 = text3.fill || "#333";
          
            return `
              <select
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  width: "${obj.width * obj.scaleX}px",
                  height: "${obj.height * obj.scaleY}px",
                   backgroundColor: "${fill3}",
                  color: "${textColor3}",
                  fontSize: "${fontSize3}px",
                  fontFamily: "${fontFamily3}",
                   border: "${strokeWidth3}px solid ${stroke3}",
                  borderRadius: "${rx3}px",
                  paddingLeft: "10px",
                  // transform: "rotate(${obj.angle || 0}deg) scale(${obj.scaleX}, ${obj.scaleY})",
                  transform: "rotate(${obj.angle || 0}deg) ",
                  transformOrigin: "top left"
                }}
              >
                <option value="" disabled>
                  ${comboTextObj?.text}
                </option>
              </select>
            `;
          case "datepicker":
            console.log("Processing datepicker");
          
            const dateTextObj = obj._objects?.find(child => child.type === "i-text" && child.text?.includes("/"));
            const defaultDate = dateTextObj?.text || "dd/mm/yyyy";
            const modo = obj.modo;

            console.log(modo);
          
            return `
              <input
                type="date"
                defaultValue=""
                placeholder="${defaultDate}"
                min="${obj.minDate || ''}"
                max="${obj.maxDate || ''}"
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
                src="${obj.imageSrc || ''}"
                alt="${obj.imageAlt || 'PictureBox'}"
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  width: "${obj.width * obj.scaleX}px",
                  height: "${obj.height * obj.scaleY}px",
                  backgroundColor: "transparent",
                  border: "${obj.pictureBorderWidth || 2}px solid ${obj.pictureBorderColor || ''}",
                  borderRadius: "${obj.isCircular ? '50%' : ''}",
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
            const boxObj = obj._objects?.find(child => child.type === "rect");

            if (!labelObj || !boxObj) return "";
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
                      <input
                        type="checkbox"
                        style={{
                          width: "${boxObj.width}px",
                          height: "${boxObj.height}px",
                          border: "${boxObj.strokeWidth}px solid ${boxObj.stroke}",
                          // appearance: "none",
                          backgroundColor: "white",
                          cursor: "pointer"
                        }}
                      />
                ${labelObj.text}
              </label>
            `;   
          case "hyperlink":
            console.log("Processing hyperlink");
          
            return `
              <a
                href="${obj.href || 'https://'}"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute",
                  top: "${obj.top}px",
                  left: "${obj.left}px",
                  fontSize: "${obj.fontSize}px",
                            fontFamily: "${obj.fontFamily}",
                  fontStyle: "${obj.fontStyle}",
                  textDecoration: "${obj.underline ? "underline" : "none"}",
                  textAlign: "${obj.textAlign}",
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
           fontWeight: "${obj.fontWeight}",
          fontFamily: "${obj.fontFamily}",
           fontStyle: "${obj.fontStyle}",
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
        ${obj.textLines.map((line, index) => 
          index < obj.textLines.length - 1 ? line + '<br />' : line
        ).join('')}
      </span>
    `;
  };

  
export default procesadorTexto;