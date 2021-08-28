import React,{useEffect} from 'react';
import './navbar.css';


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
        <nav className="navigation">
            <button onClick={() => clear()}>Clear list</button>
                {list.map((item)=>{
                    return(
                        <div key={item.id}>{item.model} <button onClick={() => removeFromList(item.id, item.model)}> Remove </button></div>
                    )
                })}
        </nav>
        
    </header>
  )
};
export default Navbar;