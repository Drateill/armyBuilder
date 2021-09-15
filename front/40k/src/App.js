import './App.css';
import Axios from 'axios'
import React, { useState, useEffect } from "react";
import MODEL from "./Components/model.js"
import HEADER from './Components/Header.js'
import Navbar from './Components/Navbar';
import ReactExport from 'react-data-export';
import {motion, AnimatePresence} from "framer-motion"
import Modal from './Components/modal'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const _ = require('lodash');


function App() {

  const [modelsList, setmodelsList] = useState([])
  const [typeSelected, settypeSelected] = useState([])
  const [counter, setcounter] = useState([])
  const [list, setlist] = useState([])
  const [Cost, setCost] = useState(0)
  const [Power, setPower] = useState(0)
  const [j, setj] = useState(0)
  const [modalOpen, setmodalOpen] = useState(false)




  const close = ()=>{
    findOcc(list,'model')
    setmodalOpen(false)
  } 
  const open = ()=> {
    findOcc(list,'model')
    setmodalOpen(true)
  }


  const DataSet = [
    {
        columns: [
            {title: "Figurines", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels           
            {title: "Nombres", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels    
            {title: "Cout", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels        


               
        ],
        data: counter.map((data) => [
            {value: data.model, style: {font: {sz: "14"}}},
            {value: data.occurrence, style: {font: {sz: "14"}}},
            {value: modelsList.filter(item => item.Model === data.model)[0].Point*data.occurrence, style: {font: {sz: "14"}}},
        ])
    }
]

  //Récupération des données de figurines
  useEffect(() => {
    Axios.get('http://192.168.0.186:3001/get/models').then((response) => {
      setmodelsList(response.data)
    })
  }, [])
 
  // Calcul de chaque occurence d'un même objet dans la liste
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
      setcounter(arr2)
  }
// Ajout de la figurine a la liste
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
    console.log(modelsList.filter(item => item.Model === model)[0].Point);
  }
//Retire l'objet de la liste
  const removeFromList = (id, model) => {
    const newList = list.filter((item) => item.id !== id)
    setlist(newList)
    setCost(Cost - modelsList.filter(item => item.Model === model)[0].Point)
    setPower(Power - modelsList.filter(item => item.Model === model)[0].Power)
}

  //Affiche|Cache le resumé de la liste
  const handleModal= ()=>{
    if(document.getElementById("resume").style.display !== "flex"){
      document.getElementById("resume").style.display = "flex"
    } else {
      document.getElementById("resume").style.display = "none"
    }
    findOcc(list,'model')
  }
  //Choix du type de figurine a afficher
  const handletypeSelected = (e) => {
    settypeSelected(e.target.value)
  }

  //Vide la liste
  const clear = ()=>{
    setlist([])
    setCost(0)
    setPower(0)
    setcounter([])
  }
  //Recupere les différents "type" d'objet
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
            cost={Cost}
            />
            </div>
        {/* ============================================= */}
        <motion.button
      whileHover={{scale:1.1}}
      whileTap={{scale:0.9}}
      className="save-button"
      onClick={()=>(modalOpen? close(): open())}
      >
        Sum up
      </motion.button>
      <AnimatePresence 
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={()=>null}
      >
{modalOpen && <Modal modalOpen={modalOpen} handleClose={close} list={counter} DataSet={DataSet}/>}
      </AnimatePresence>
      </div> 

    </div>
    
  );
}

export default App;
