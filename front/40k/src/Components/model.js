import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';


const model = (props) => {
    var fig = props.model
    var imgSrc ='assets/Logo/'+fig.Type+'.png'
    var addToList= props.addToList
    return (
        <div >
            <img src={imgSrc} className="logoType" alt={fig.Model}></img>
            {fig.Model} | Power : {fig.Power} Point : {fig.Point}
            <IconButton onClick={()=>addToList(fig.Model)}  className="modelAdd">
            <AddIcon />
            </IconButton>
        </div>
    )
}

export default model
