import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';


const model = (props) => {
    var fig = props.model
    var addToList= props.addToList
    return (
        <div >
            {fig.Model}
            <IconButton size="small" variant="contained" onClick={()=>addToList(fig.Model)}  className="modelAdd">
            <AddIcon />
            </IconButton>
            <br></br>
            Stats : 
            <br></br>
            M: {fig.Movement} inches WS : {fig.WS} BS : {fig.BS} S : {fig.S} T : {fig.T} W: {fig.W} A : {fig.A} LD : {fig.LD} SV : {fig.SV} Power : {fig.Power} Point : {fig.Point} Type : {fig.Type}
        </div>
    )
}

export default model
