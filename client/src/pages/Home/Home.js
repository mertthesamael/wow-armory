
import { useContext } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { DataContext } from "../../store/context";
import "./home.scss"



const Home = (props) => {
    const navigate = useNavigate();
    const ctx = useContext(DataContext)
 

    const formHandler = (e) => {
      e.preventDefault()
      ctx.onSetName(e.target.name.value.toLowerCase())
      ctx.onSetRealm(e.target.realm.value.toLowerCase().replaceAll(" ","-"))
      navigate("/character")
    }
    const changeRegionUs = () => {
    
      return ctx.onSetRegion("us")

    }
    const changeRegionEu = () => {
    
      return ctx.onSetRegion("eu")

    }
 
    return(
        <div className="home">
          <div className="homebg"/>
          <div className="right">
            <div className="regionselect">
              <div style={ctx.region==='eu'?{backgroundColor:'white', color:'black'}:{}} onClick={changeRegionEu} className="region">EU</div>
              <div style={ctx.region==='us'?{backgroundColor:'white', color:'black'}:{}} onClick={changeRegionUs}className="region">US</div>
            </div>
            <div className="right__form">

              <form autocomplete="off" onSubmit={formHandler}>
              <input placeholder="Character Name" name='name'></input>

              <input placeholder="Realm" name="realm"></input>
              <input value='Search' type='submit'></input>
            </form>
            </div>

          </div>
           
        </div>
    )

}


export default Home;