import './App.css';
import Axios from 'axios'
import React, {useState, useEffect} from "react";
import MODEL from "./Components/model.js"
import WEAPON from "./Components/weapon.js"


function App() {

  const [weaponsList, setweaponsList] = useState([])
  const [weaponSelected, setweaponSelected]=useState("")
  const [modelsList, setmodelsList] = useState([])


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

  var i = 0;
  if(weaponsList.length===0){
    return (
      <div>Loading ... Please wait</div>
    )
  }
  return (
    <div className="App">
      <select name="weapons" value="Select a weapon" onChange={handleSelectWeapon}>
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
      {modelsList.map((model)=> {
        return (
        <MODEL model={model} key={model.Model}></MODEL>
        )
      })}

    </div>
  );
}

export default App;
