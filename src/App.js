import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
    const canvasi = useRef()

    useEffect(()=> {
        /**
         * @type {HTMLCanvasElement} canvasi.current
         */
        const context = canvasi.current.getContext("2d")

        for(let i = 0; i < 25; i ++){
            //context.fillRect(i*10, 20, 10, 10);
            for (let z = 0; z < 25; z ++){
                context.fillRect(i*10, z*10, 10, 10);
            }
        }
    })
  return (
    <div className="App">
      <header className="App-header">

        <canvas ref={canvasi} width={"300px"} height={"450px"}/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
