import { useContext, useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { DataContext } from "../../store/context"
import "./charpage.scss"
import Alliance from "../../assets/4614381.jpg"
import Horde from "../../assets/5271737.jpg"
import axios from "axios"
import { useGetApi } from "../../hooks/useGetApi"
import Loading from "../../assets/loading-svgrepo-com.svg"
import { NavLink } from "react-router-dom"
import Equipment from "../../components/Equipment/Equipment"

const CharPage = () => {
  
    const ctx = useContext(DataContext)
    const getImg = async (src,type) => {
     await document.getElementById(type)?.setAttribute("src",Loading)
      const options = {
        method: 'GET',
        url:'http://localhost:5000/data',
        params:{
          src:src,
          region:ctx.region
        }
      }
     
     await axios.request(options).then(res=> document.getElementById(type).setAttribute("src", res.data.data))
  
      
    } 
  
    
 const {data:equip, isLoading:equipLoading} = useGetApi('equipment', ctx.realm,ctx.name,ctx.region)
 const {data:player, isLoading:playerLoading} = useGetApi('appearance', ctx.realm,ctx.name,ctx.region)
 const {data:media, isLoading} = useGetApi('character-media', ctx.realm,ctx.name,ctx.region)
 const {data:professions} = useGetApi('professions', ctx.realm,ctx.name,ctx.region)
//  const {data:ach, isLoading:achLoading} = useGetApi('achievements', ctx.realm,ctx.name,ctx.region)
 const {data:stats, isLoading:statsLoading} = useGetApi('statistics', ctx.realm,ctx.name,ctx.region)


 useEffect(()=>{
  equip?.equipped_items.map(item => getImg(item.item.id, item.slot.type))
  
 },[equip])
 
 console.log(equip)
    const color = {
      RARE:'blue',
      HEIRLOOM:'yellow',
      COMMON:'white',
      UNCOMMON:"green",
      EPIC:"purple",
      LEGENDARY:"orange"
    }

      if(isLoading || playerLoading || equipLoading){
          return(
              <h1>Loading</h1>
          )
      }

    return (
      <div className="charpage">
        <NavLink to='/' className="goback">HOME</NavLink>
        <Sidebar />
        <section className="section1">
          <div
            style={player?.faction.name ==='Horde'?{ backgroundImage: `url(${Horde})` }:{ backgroundImage: `url(${Alliance})` }}
            className="charpagebg"
          />
          <h1 className="charid">{player?.character.name}</h1>
        </section>
        <section className="eqipments__section">
          <div className="charpagebg3" style={{backgroundImage:`url(${media?.assets[2].value})`}} />
          
          <div className="equipment">
            {equip?.equipped_items.map((item) => 
           
           <div className="items" key={item.name}>
                 <Equipment id={item.slot.type} name={item.name} color={color[item.quality.type]}/>
              
              </div>
            
              )}
              </div>
              </section>
              <section>
              <div className="charpagebg3" />
              
              <div className="professions">
                <div className="professions__primary">
                  <h1>Primary Professions</h1>
                 {professions?.primaries?.map(name => <div key={name.profession.name} className="profession"><h1>{name.profession.name }</h1>{name.tiers.map(x=><h1>{x.tier.name + " : " + x.skill_points +"/"+ x.max_skill_points}</h1>)}</div>)}
                </div>
                {/* <div className="professions_ach">
                  <h1>Achievement Point:</h1>
                  <h1>{ach?.total_points}</h1>
                </div> */}
                <div className="professions__secondary">
                <h1>Secondary Professions</h1>

                {professions?.secondaries?.map(name => <div key={name.profession.name} className="profession"><h1>{name.profession.name + ":" + (name.skill_points?name.skill_points:"") }</h1>{name.tiers?.map(x=><h1>{x.tier.name + " : " + x.skill_points +"/"+ x.max_skill_points}</h1>)}</div>)}

                </div>

              </div>
        </section>
        <section className="section2">
          <div className="charpagebg2" />
          <div className="charpage__charimage">
            <img id='item' src={media?.assets[3].value}></img>
          </div>
        </section>
        
      </div>
    );


}


export default CharPage;