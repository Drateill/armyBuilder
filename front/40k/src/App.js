import './App.css';
import Axios from 'axios'
import React, { useState, useEffect } from "react";
import MODEL from "./Components/model.js"
import HEADER from './Components/Header.js'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapsible from 'react-collapsible';
import Navbar from './Components/Navbar';

const _ = require('lodash');


function App() {

  const [weaponsList, setweaponsList] = useState([])
  const [modelsList, setmodelsList] = useState([])
  const [typeSelected, settypeSelected] = useState([])
  const [list, setlist] = useState([])
  const [Cost, setCost] = useState(0)
  const [Power, setPower] = useState(0)
  const [j, setj] = useState(1)


  

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

  const addToList = (model) => {
    if (model !== "") {
      setlist(list => [...list,
      {
        model: model,
        id: j
      }])
      setj(j + 1)
      setCost(Cost + modelsList.filter(item => item.Model === model)[0].Point)
      setPower(Power + modelsList.filter(item => item.Model === model)[0].Power)
    }
  }

  const removeFromList = (id, model) => {
    const newList = list.filter((item) => item.id !== id)
    setlist(newList)
    setCost(Cost - modelsList.filter(item => item.Model === model)[0].Point)
    setPower(Power - modelsList.filter(item => item.Model === model)[0].Power)

  }

  const handletypeSelected = (e) => {
    settypeSelected(e.target.value)
  }
  const clear = ()=>{
    setlist([])
    setCost(0)
    setPower(0)
  }

  var grouped = _(modelsList).groupBy('Type').map((model, type) => ({ type: type, model: _.map(model, 'Model') })).value();

  //==============Loading=================
  if (weaponsList.length === 0) {
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
    </div>
  );
}

export default App;
