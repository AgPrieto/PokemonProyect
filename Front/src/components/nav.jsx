import React from 'react'
import styles from "./nav.module.css"
import {Link} from "react-router-dom";
import SearchBar from './SearchBar.jsx';
import pokemonTitle from "../assets/pokemonTitle.png";
import favHeart from "../assets/favHeart.png";
import pencilCreate from "../assets/pencilCreate.png";
import exit from "../assets/exit.png";

const Nav = () => {
  return (
    <div className={styles.navContent}>

 <Link  to= "/home">
 <img src={pokemonTitle} alt="Pokemon" className={styles.pokemonTitle} />
 </Link>
 
 <SearchBar/>


 <Link  to= "/favorites">
 <button className={styles.navButton}><img src={favHeart} alt="heart" className={styles.favHeart} /> Favorites</button>
 </Link>

 <Link  to= "/create">
 <button className={styles.navButton}><img src={pencilCreate} alt="Pokemon" className={styles.pencilCreate} /> Create</button>
 </Link>

 <Link  to= "/">  
 <button className={styles.navButton}><img src={exit} alt="exit" className={styles.exit} /> Exit</button>
 </Link>
     </div>
  )
}

export default Nav