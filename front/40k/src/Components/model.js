import React from 'react'

const model = (model) => {
    var fig = model.model
    return (
        <div id={fig.Model}>
            {fig.Model}
            <br></br>
            Stats : 
            <br></br>
            M: {fig.Movement} inches WS : {fig.WS} BS : {fig.BS} S : {fig.S} T : {fig.T} W: {fig.W} A : {fig.A} LD : {fig.LD} SV : {fig.SV} Power : {fig.Power} Point : {fig.Point} Type : {fig.Type}
        </div>
    )
}

export default model
