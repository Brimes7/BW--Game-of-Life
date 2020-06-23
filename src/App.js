import React, { useRef, useEffect, useState } from 'react';
import './App.css';


function App() {
    const canvasi = useRef()
    const currentBlock = useRef()
    const running = useRef()

    const [blocky, setBlocky] = useState([])
    const [blockyii, setBlockyii] = useState([])
    const [rows, setRows] = useState(25)
    const [columns, setColumns] = useState(25)
    const [generation, setGeneration] = useState(0)
    const [gameSpeed, setGameSpeed] = useState(0)

    const drawBox = (blocks)=>{
        const context = canvasi.current.getContext("2d")

        for(let i = 0; i < rows; i ++){

            for (let z = 0; z < columns; z ++){
                if (blocks[i][z].alive){
                    context.fillStyle="white"
                }
                else{
                    context.fillStyle="blue"
                }
                context.fillRect(i*10, z*10, 10, 10);
            }
        }

    }
    useEffect(()=> {
        //creating our array of elements - PLACEHOLDERS
        for(let i = 0; i < rows; i ++){
            blocky.push([])
            blockyii.push([])
            //context.fillRect(i*10, 20, 10, 10);
            for (let z = 0; z < columns; z ++){
                const blocking = {alive: false}
                blocky[i].push(blocking)
                blockyii[i].push({...blocking})
            }
        }
        drawBox(blockyii)
        currentBlock.current="1"
        setBlocky(blocky)
        setBlockyii(blockyii)
    },[rows, columns])

    const clicki = (either)=> {
        debugger;
        if(running.current){
            return
        }
    let x = Math.floor((either.clientX-either.currentTarget.offsetLeft)/10);
    let y = Math.floor((either.clientY-either.currentTarget.offsetTop)/10);

    blocky[x][y].alive=!blocky[x][y].alive
        console.log(blocky)
        drawBox(blocky);
    }

    const gameOfLife = ()=> {
        let gameBlock = blocky
        let nextBlock = blockyii
        if(currentBlock.current==="2"){
            gameBlock = blockyii;
            nextBlock = blocky;
        }
        for(let i = 0; i < rows; i ++){
            for(let z = 0; z < columns; z ++){
                let liveBlocks = 0;
                for(let j = (i-1); j < (i + 2); j ++){
                    for(let k = (z-1); k < (z + 2); k ++){
                        if(j === i && k === z){
                            continue;
                        }
                        try{
                        if(gameBlock[j][k] && gameBlock[j][k].alive){
                            liveBlocks ++;
                        }}catch(e){

                        }
                    }
                }
                if (gameBlock[i][z].alive){
                   if(liveBlocks <2 || liveBlocks > 3){
                       nextBlock[i][z].alive = false
                   }
                   else{
                       nextBlock[i][z].alive = true
                   }
                }
                else{
                    if(liveBlocks === 3){
                        nextBlock[i][z].alive = true
                    }
                    else{
                        nextBlock[i][z].alive = false
                    }
                }
            }
        }
        drawBox(nextBlock)
        if(currentBlock.current === "2"){
            currentBlock.current = "1";
        }
        else{
            currentBlock.current = "2";
        }
        if(running.current){
            window.setTimeout(()=> {
                requestAnimationFrame(gameOfLife)
            }, gameSpeed)
        }
        setGeneration((generation)=> {
            return generation +1;
        })
    }
    const changeBoard = (e)=> {
        if(running.current){
            return
        }
        if(e.target.name==="rows"){
            setRows(e.target.value)
        }
        else{
            setColumns(e.target.value)
        }
    }
    const startGame = ()=> {
        running.current = true;
        requestAnimationFrame(gameOfLife)
    }
    const stopGame = ()=> {
        running.current = false;
    }
    const clearBoard = ()=> {
        running.current = false;
        for(let i = 0; i < rows; i ++){
            for(let z = 0; z < rows; z ++){
                blocky[i][z].alive = false
                blockyii[i][z].alive = false
            }
        }
        drawBox(blocky)
        setGeneration(0)
    }
    const randomizeBoard = ()=> {
        for(let i = 0; i < rows; i ++){
            for(let z = 0; z < rows; z ++){
                if (Math.random() < .4){
                    blocky[i][z].alive = true;
                }
                else{
                    blocky[i][z].alive = false;
                }
            }
        }
        drawBox(blocky)
        currentBlock.current = "1"
    }
    const speed = (e)=> {
        debugger
        setGameSpeed(e.target.value)
    }

  return (
    <div className="bigContainer">
      <header className="App-header">
          Welcome to Trouble's Game of Life!
          <div className="insideAppHeader">

              <label className="label">
                Rows:
                <input name={"rows"} value={rows} onChange={changeBoard}/>
              </label>

              <label className="label">
                  Columns:
                  <input name={"col"} value={columns} onChange={changeBoard}/>
              </label>

          </div>
          <div className={"Row"}>
          <label className="label">
              Game Speed:
          </label>
                <select className="speeds" value={gameSpeed} onChange={speed}>
                  <option value={1000}>Slow</option>
                  <option value={400} >Normal</option>
                  <option value={0} >Fast</option>
                </select>
            </div>
          <div className="headerButtons">
              {/*//Will need to add styling  to this later*/}
              <button onClick={randomizeBoard}>Randomize Board</button>
              <button onClick={startGame}>Start</button>
              <button onClick={stopGame}>Stop</button>
              <button onClick={clearBoard}>Clear Board</button>
          </div>
          Generation: {generation}
        <canvas onClick={clicki} ref={canvasi} width={(columns * 10) + "px"} height={(rows * 10) +"px"}/>
      </header>
    </div>
  );
}

export default App;
