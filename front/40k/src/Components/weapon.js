import React from 'react'

const weapon = (weapon) => {
    var weaponsList = weapon.weaponsList
    var selected=weapon.weapon
    if (selected === "Select a weapon"){
        return (
            <div></div>
        )
    } else {

        return (
        <div id="weapon" className="weapon">
        <li>Range : {selected.length>0?weaponsList.filter(item => item.Weapon ===selected )[0].Range:"None"}</li>
        <li>Strength : {selected.length>0? weaponsList.filter(item => item.Weapon ===selected )[0].S: "None"}</li>
        <li>Damage : {selected.length>0? weaponsList.filter(item => item.Weapon ===selected )[0].D: "None"}</li>
        <li>AP : {selected.length>0? weaponsList.filter(item => item.Weapon ===selected )[0].AP: "None"}</li>
        <li>Ability : {selected.length>0? weaponsList.filter(item => item.Weapon ===selected )[0].Abilities: "None"}</li>
      </div>
    )
    }

}

export default weapon
