import React,{useEffect} from 'react';
import './navbar.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const Navbar=(props) => {
    const list= props.list
    const removeFromList=props.removeFromList
    const clear = props.clear
  const [scrolled,setScrolled]=React.useState(false);

  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 0 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })

  let x=['navbar'];
  if(scrolled){
    x.push('scrolled');
  }
  return (
    <header className={x.join(" ")}>  
    <button onClick={() => clear()}>Clear list</button> 
        <nav className="navigation">
                {list.map((item)=>{
                    return(
                        <div className="model" key={item.id}>{item.model} 
                        <IconButton onClick={() => removeFromList(item.id, item.model)}>
                            <DeleteIcon />
                        </IconButton>
                        {/* <button onClick={() => removeFromList(item.id, item.model)}> Remove </button> */}
                        </div>
                    )
                })}
        </nav>
        
    </header>
  )
};
export default Navbar;