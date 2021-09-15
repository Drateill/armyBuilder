import {motion} from "framer-motion"
import Backdrop from "../backdrop"
import ReactExport from 'react-data-export';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const dropIn= {
    hidden:{
        y:"-100vh",
        opacity:0,
    },
    visible:{
        y:"0",
        opacity:1,
        transition:{
            duration:0.1,
            type:"spring",
            damping:25,
            stiffness:500,
        }

    },
    exit:{
        y:"100vh",
        opacity:0,

    },
};

const Modal = ({handleClose, list, DataSet}) =>{

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
            onClick={(e)=>e.stopPropagation()}
            className="modal kabalyte-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
    <ExcelFile 
      filename="army" 
      element={<button type="button">Export Data</button>}>
     <ExcelSheet dataSet={DataSet} name="armyList"/>
    </ExcelFile>
{
    list.map((model)=>{
        return (
            <h5>{model.model} apparait {model.occurrence} fois dans la liste</h5>
        )
    })
}
                <button onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    )

}

export default Modal