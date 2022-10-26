import { useContext, useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { DataContext } from "../../store/context"
import "./charpage.scss"
import Alliance from "../../assets/4614381.jpg"
import Horde from "../../assets/5271737.jpg"
import axios from "axios"
import { useGetApi } from "../../hooks/useGetApi"
import Loading from "../../pages/Loading/Loading"
import { NavLink } from "react-router-dom"
import Equipment from "../../components/Equipment/Equipment"
import Profession from "../../components/Profession/Profession"

const CharPage = () => {
  
    const ctx = useContext(DataContext)
    const [loadingImg, setIsLoadingImg] = useState()
    const getImg = async (src,type) => {
     await document.getElementById(type)?.setAttribute("src",Loading)
      const options = {
        method: 'GET',
        url:'https://6356c3960ff1726fd5c76b13--bnet-api.netlify.app/.netlify/functions/server/data',
        params:{
          src:src,
          region:ctx.region
        }
      }
     
     
     axios.request(options).then(res=> document.getElementById(type).setAttribute("src", res.data.data))
  
      
    } 
  
    
 const {data:equip, isLoading:equipLoading} = useGetApi('equipment', ctx.realm,ctx.name,ctx.region)
 const {data:player, isLoading:playerLoading} = useGetApi('appearance', ctx.realm,ctx.name,ctx.region)
 const {data:media, isLoading} = useGetApi('character-media', ctx.realm,ctx.name,ctx.region)
 const {data:professions} = useGetApi('professions', ctx.realm,ctx.name,ctx.region)
//  const {data:ach, isLoading:achLoading} = useGetApi('achievements', ctx.realm,ctx.name,ctx.region)
 const {data:stats, isLoading:statsLoading} = useGetApi('statistics', ctx.realm,ctx.name,ctx.region)


 useEffect(()=>{
  equip?.equipped_items.map(item => getImg(item.item.id, item.slot.type))
  setTimeout(() => {
    document.querySelector(".charpage").style.opacity=1
  }, 1000);
 },[equip,player])
 
 console.log(equip)
    const color = {
      RARE:'#0070dd',
      HEIRLOOM:'#00ccff',
      COMMON:'white',
      UNCOMMON:"#1eff00",
      EPIC:"#a335ee",
      LEGENDARY:"#ff8000"
    }

      if(isLoading || playerLoading || equipLoading || loadingImg){
          return(
              <Loading/>
          )
      }

    return (
      <div className="charpage">
        <Sidebar />
        <section className="section1">
          <div
            style={player?.faction.name ==='Horde'?{ backgroundImage: `url(${Horde})` }:{ backgroundImage: `url(${Alliance})` }}
            className="charpagebg"
          />
          <h1 className="charid">{player?.character.name}</h1>
        </section>
        <section id='equipment' className="eqipments__section">
          <div className="charpagebg3" style={{backgroundImage:`url(${media?.assets[2].value})`}} />
          
          <div className="equipment">
          
           {equip?.equipped_items.map((item) => 
           
                 <Equipment spells={item.spells} stats={item.stats} level={item.level.value} id={item.slot.type} name={item.name} color={color[item.quality.type]}/>
           
            
              )}
              </div>
              {/* <div className="stats">
                <h1>Primary Stats</h1>
                <h1>{stats?.strength.base &&"Strength : " + stats?.strength.base}</h1>
                <h1>{stats?.agility.base && "Agility : " + stats?.agility.base}</h1>
                <h1>{stats?.stamina.base &&"Stamina : " + stats?.stamina.base}</h1>
                <h1>{stats?.intellect.base && "Intellect : " + stats?.intellect.base}</h1>
              </div> */}
              </section>
              <section id='professions'>
              <div className="charpagebg3" />
              
              <div className="professions">
                <div className="professions__primary">
                  <h1>Primary Professions</h1>
                  {professions?.primaries?.map(name => <Profession data={name}/>)}
                 {/* {professions?.primaries?.map(name => <div key={name.profession.name} className="profession"><h1>{name.profession.name }</h1>{name.tiers.map(x=><h1>{x.tier.name + " : " + x.skill_points +"/"+ x.max_skill_points}</h1>)}</div>)} */}
                </div>
                {/* <div className="professions_ach">
                  <h1>Achievement Point:</h1>
                  <h1>{ach?.total_points}</h1>
                </div> */}
                <div className="professions__secondary">
                <h1>Secondary Professions</h1>

                {professions?.secondaries?.map(name => <Profession data={name}></Profession>)}

                </div>

              </div>
        </section>
        <section className="section2">
          <div className="charpagebg2" />
          <div className="section2__charimg">
            <img id='item' src={media?.assets[3].value}></img>
          </div>
        </section>
        
      </div>
    );


}


export default CharPage;