import './App.css';
import Axios from 'axios'
import React, { useState, useEffect } from "react";
import MODEL from "./Components/model.js"
import HEADER from './Components/Header.js'
import Navbar from './Components/Navbar';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const _ = require('lodash');


function App() {

  const [weaponsList, setweaponsList] = useState([])
  const [modelsList, setmodelsList] = useState([])
  const [typeSelected, settypeSelected] = useState([])
  const [counter, setcounter] = useState([])
  const [list, setlist] = useState([])
  const [Cost, setCost] = useState(0)
  const [Power, setPower] = useState(0)
  const [j, setj] = useState(0)
  


  const DataSet = [
    {
        columns: [
            {title: "Figurines", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels           
            {title: "Nombres", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}} // width in pixels           
        ],
        data: counter.map((data) => [
            {value: data.model, style: {font: {sz: "14"}}},
            {value: data.occurrence, style: {font: {sz: "14"}}},

        ])
    }
]

  //Récupération des données d'armes

  useEffect(() => {
    Axios.get('http://192.168.0.186:3001/get/weapons').then((response) => {
      setweaponsList(response.data)
    })
  }, [])
  //Récupération des données de figurines
  useEffect(() => {
    Axios.get('http://192.168.0.186:3001/get/models').then((response) => {
      setmodelsList(response.data)
    })
  }, [])

    const  findOcc= (arr, key)=>{
    let arr2 = [];
    arr.forEach((x)=>{
         
      // Checking if there is any object in arr2
      // which contains the key value
       if(arr2.some((val)=>{ return val[key] === x[key] })){
           
         // If yes! then increase the occurrence by 1
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["occurrence"]++
             setcounter(arr2)
           }
        })
           
       }else{
         // If not! Then create a new object initialize 
         // it with the present iteration key's value and 
         // set the occurrence to 1
         let a = {}
         a[key] = x[key]
         a["occurrence"] = 1
         arr2.push(a);
        setcounter(arr2)
        }
    })
      console.log(counter)
      console.log(list)
      setcounter(arr2)
  }

  const addToList = (model) => {
    if (model !== "") {
      setlist(list => [...list,
      {
        model: model,
        id: j
      }])
     
      setCost(Cost + modelsList.filter(item => item.Model === model)[0].Point);
      setPower(Power + modelsList.filter(item => item.Model === model)[0].Power);
      findOcc(list, 'model')
    } 
    setj(j + 1)
  }

  const removeFromList = (id, model) => {
    const newList = list.filter((item) => item.id !== id)
    setlist(newList)
    setCost(Cost - modelsList.filter(item => item.Model === model)[0].Point)
    setPower(Power - modelsList.filter(item => item.Model === model)[0].Power)
    findOcc(list, "model")

  }

  const exportList = (model)=>{

  }
  const handleModal= ()=>{
    if(document.getElementById("resume").style.display !== "flex"){
      document.getElementById("resume").style.display = "flex"
    } else {
      document.getElementById("resume").style.display = "none"
    }
    findOcc(list,'model')
  }
  const handletypeSelected = (e) => {
    settypeSelected(e.target.value)
  }
  const clear = ()=>{
    setlist([])
    setCost(0)
    setPower(0)
    setcounter([])
  }

  var grouped = _(modelsList).groupBy('Type').map((model, type) => ({ type: type, model: _.map(model, 'Model') })).value();

  //==============Loading=================
  if (modelsList.length === 0) {
    return (
      <div>Loading ... Please wait</div>
    )
  }
  // =====================================
  return (
    <div className="App">
      <HEADER></HEADER>
      {/*========== Selecteur de type========== */}
      <select onChange={handletypeSelected} className="selectType">
        <option value="">---Select a type---</option>

        {
          grouped.map((item) => {
            return (
              <option value={item.type} key={item.type}>{item.type}</option>
            )
          })
        }
      </select>
      {/* ===================================== */}
      <button onClick={handleModal} >Resume</button>
      <button onClick={exportList} >Export</button>
      <button onClick={clear}>Clear list</button> 


      {/* Affichage des figurines par rapport au type selectionné */}

      {/*==========================================================*/}
      <div className="Container">

        <div className="listModel">

          {
            modelsList.filter(obj => obj.Type === typeSelected).map((model) => {
              return (
                <MODEL
                  model={model}
                  key={model.Model}
                  addToList={addToList}
                />
              )
            })
          }
        </div>

        {/* Affichage temporaire de la composition de l'armée */}       
          <div className="navBar">
          <Navbar
            list={list}
            removeFromList={removeFromList}
            clear={clear}
            />
            </div>
        {/* ============================================= */}
      </div> 

      <div className="resume" id="resume">
     <button onClick={()=>findOcc(list, "model")}> Refresh</button>
     <ExcelFile 
      filename="army" 
      element={<button type="button">Export Data</button>}>
     <ExcelSheet dataSet={DataSet} name="armyList"/>
     </ExcelFile>
      {
        counter.map((item)=>{
          return(
            <div className="counter" key={item.model}>
              {item.model} apparait {item.occurrence} fois dans la liste
            </div>
          )
        })
      }
      <button onClick={handleModal}>Close </button>
      </div>
    </div>
  );
}

export default App;
