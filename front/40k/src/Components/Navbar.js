import React,{useEffect} from 'react';
import './navbar.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const Navbar=(props) => {
    const list= props.list
    const cost = props.cost
    const removeFromList=props.removeFromList
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
    
        <nav className="navigation">
          <div className ="model"> 
          Cost : {cost}
          </div>
                {list.map((item)=>{
                    return(
                        <div className="model" key={item.id}>{item.model} Nombre dans la liste : {list.filter(obj=>obj.model === item).length}
                        <IconButton onClick={() => removeFromList(item.id, item.model)}>
                            <DeleteIcon />
                        </IconButton>
                        </div>
                    )
                })}
        </nav>
        
    </header>
  )
};
export default Navbar;