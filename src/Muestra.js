

import React, {useEffect, useRef,useState} from "react";
function Muestra() {
    
return   (

    <div style={{
        position: "relative",
        width: "1000px",
        height: "800px",
        border: "1px solid black",
        backgroundColor: "white",
    }}>
        
            <div style={{
                position: "absolute",
                top: "567px",
                left: "871px",
                width: "100px",
                height: "60px",
                backgroundColor: "#D84D42",
                border: "1px solid null",
                transform: "scale(1, 1)"
            }}></div>
        

      <table
        style={{
          position: "absolute",
          top: "647px",
          left: "734px",
          width: "241px",
          height: "126px",
          borderCollapse: "collapse",
          border: "1px solid black",
          backgroundColor: "#f9f9f9",
          transform: "scale(1, 1)"
        }}
      >
        <tbody>
        
          <tr>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R1C1</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R1C2</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R1C3</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R1C4</td>
            
          </tr>
        
          <tr>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R2C1</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R2C2</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R2C3</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R2C4</td>
            
          </tr>
        
          <tr>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R3C1</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R3C2</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R3C3</td>
            
              <td style={{ border: "1px solid black", padding: "10px" }}>R3C4</td>
            
          </tr>
        
        </tbody>
      </table>
    

  <span
    style={{
      position: "absolute",
      top: "606px",
      left: "714px",
      fontSize: "24px",
    //   fontWeight: normal,
      fontFamily: "Open Sans, sans-serif",
    //   fontStyle: "normal",
      textDecoration: "none",
      textAlign: "left",
      lineHeight: "1",
      color: "#000000",
      backgroundColor: "transparent",
      transform: "scale(1, 1)",
      opacity: 1,
      stroke: "null",
      strokeWidth: 1,
      WebkitTextStroke: "1px null"
    }}
  >
    Hola, Fabric.js!
  </span>

    </div>

  ); 
}

export default Muestra;
