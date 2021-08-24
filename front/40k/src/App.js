import './App.css';
import Axios from 'axios'
import React, {useState, useEffect} from "react";
// import MODEL from "./Components/model.js"
import WEAPON from "./Components/weapon.js"
import HEADER from './Components/Header.js'
// import weapon from './Components/weapon.js';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function App() {

  const [weaponsList, setweaponsList] = useState([])
  const [weaponSelected, setweaponSelected]=useState("")
  const [modelSelected, setmodelSelected]=useState("")
  const [modelsList, setmodelsList] = useState([])
  const [list, setlist] = useState([])
  const [Cost, setCost]= useState(0)
  const [j, setj]= useState(1)



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
    if (modelSelected !==""){
      setlist(list => [...list,
      {model:modelSelected,
      id:j}])
      setj(j+1)
    setCost(Cost + modelsList.filter(item => item.Model ===modelSelected )[0].Point)
    }
    
  }

  const removeFromList = (id, model) =>{
    const newList = list.filter((item)=> item.id !== id)
    setlist(newList)
    setCost(Cost - modelsList.filter(item => item.Model ===model )[0].Point)
  }
  var i = 0;
  var n = 0;

  if(weaponsList.length===0){
    return (
      <div>Loading ... Please wait</div>
    )
  }
  return (
    <div className="App">
      <HEADER></HEADER>
      {/* <select name="weapons" value={weaponSelected} onChange={handleSelectWeapon} className="weaponSelect">
        <option value="Select a weapon">--Select a weapon--</option>
      {
        weaponsList.map((weapon)=>{  
          i++;
          return(
          <option value={weapon.Weapon} key={weapon.Weapon+i}>{weapon.Weapon}</option>          
          )
        })
      }  
      </select> */}
      <FormControl className={useStyles.formControl}>
        <InputLabel id="demo-simple-select-label">Weapon</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={weaponSelected}
          onChange={handleSelectWeapon}
        >
          {
            weaponsList.map((weapon)=>{
              return (
                <MenuItem key={weapon.Weapon} value={weapon.Weapon}>{weapon.Weapon}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
<WEAPON 
weapon = {weaponSelected} 
weaponsList={weaponsList}> 
</WEAPON>

<select name="model" value={modelSelected} onChange={handleSelectModel} className="modelSelect">
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

{
  modelSelected !== "Select a model" ? <button onClick={addToList} className="modelAdd">Add to list</button>:""
}
<div>
  Total Cost : {Cost}
      {
        list.length !==0 ? 
        list.map((obj)=>{
          n++
          return(
            <div value={n} key={obj+n}>{obj.model} <button key={obj+n} value={n} data={obj} onClick={()=>removeFromList(obj.id, obj.model)}>X</button></div>
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
