import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';


const model = (props) => {
    var fig = props.model
    var imgSrc ='assets/Logo/'+fig.Type+'.png'
    var addToList= props.addToList
    return (
        <div >
            <img src={imgSrc} className="logoType"></img>
            {fig.Model} | Power : {fig.Power} Point : {fig.Point}
            <IconButton onClick={()=>addToList(fig.Model)}  className="modelAdd">
            <AddIcon />
            </IconButton>
            <br></br>
            M: {fig.Movement} inches WS : {fig.WS} BS : {fig.BS} S : {fig.S} T : {fig.T} W: {fig.W} A : {fig.A} LD : {fig.LD} SV : {fig.SV} 
        </div>
    )
}

export default model
