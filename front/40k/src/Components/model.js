import React from 'react'


const model = (props) => {
    var fig = props.model
    var addToList= props.addToList
    return (
        <div >
            {fig.Model}
            <br></br>
            Stats : 
            <br></br>
            M: {fig.Movement} inches WS : {fig.WS} BS : {fig.BS} S : {fig.S} T : {fig.T} W: {fig.W} A : {fig.A} LD : {fig.LD} SV : {fig.SV} Power : {fig.Power} Point : {fig.Point} Type : {fig.Type}
            <br></br>
            <button onClick={()=>addToList(fig.Model)}  className="modelAdd">Add to list</button>
        </div>
    )
}

export default model
