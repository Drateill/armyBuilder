import './App.css';
import Axios from 'axios'
import React, {useState, useEffect} from "react";
import MODEL from "./Components/model.js"
import WEAPON from "./Components/weapon.js"
import model from './Components/model.js';


function App() {

  const [weaponsList, setweaponsList] = useState([])
  const [weaponSelected, setweaponSelected]=useState("Select a weapon")
  const [modelSelected, setmodelSelected]=useState("Select a model")
  const [modelsList, setmodelsList] = useState([])
  const [list, setlist] = useState([])
  const [Cost, setCost]= useState(0)


  useEffect(()=>{
    Axios.get('http://192.168.0.186:3001/get/weapons').then((response)=>{
      setweaponsList(response.data)
    })
  }, [])
  useEffect(()=>{
    Axios.get('http://192.168.0.186:3001/get/models').then((response)=>{
      setmodelsList(response.data)
    })
  }, [])

  const handleSelectWeapon = (e) => {
    setweaponSelected(e.target.value)
  }

  const handleSelectModel = (e) => {
    setmodelSelected(e.target.value)
  }
  const addToList = ()=>{
    setlist(list => [...list, modelSelected])
    setCost(Cost + modelsList.filter(item => item.Model ===modelSelected )[0].Point)
    console.log(Cost)
  }
  var i = 0;
  if(weaponsList.length===0){
    return (
      <div>Loading ... Please wait</div>
    )
  }
  return (
    <div className="App">
      <select name="weapons" value={weaponSelected} onChange={handleSelectWeapon}>
        <option value="Select a weapon">--Select a weapon--</option>
      {
        weaponsList.map((weapon)=>{  
          i++;
          return(
          <option value={weapon.Weapon} key={weapon.Weapon+i}>{weapon.Weapon}</option>          
          )
        })
      }  
      </select>

<WEAPON 
weapon = {weaponSelected} 
weaponsList={weaponsList}> 
</WEAPON>

<select name="model" value={modelSelected} onChange={handleSelectModel}>
        <option value="Select a weapon">--Select a Model--</option>
      {
        modelsList.map((model)=>{  
          i++;
          return(
          <option value={model.Model} key={model.Model+i}>{model.Model}</option>          
          )
        })
      }  
</select>

<button onClick={addToList}>Add to list</button>
<div>
  Total Cost : {Cost}
      {
        list.length !==0 ? 
        list.map((obj)=>{
          return(
            <div>{obj}</div>
          )
        })
        :
        ""
      }
      </div>
</div>
  );
}

export default App;
