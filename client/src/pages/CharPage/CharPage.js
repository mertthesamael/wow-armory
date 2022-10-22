import { useContext, useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useGetProfile } from "../../hooks/useGetProfile"
import { DataContext } from "../../store/context"
import "./charpage.scss"
import Alliance from "../../assets/4614381.jpg"
import Horde from "../../assets/5271737.jpg"
import axios from "axios"

const CharPage = () => {
    const ctx = useContext(DataContext)
    const {data:player, isLoading:playerLoading} = useGetProfile(ctx.token,ctx.name,ctx.region,ctx.realm,'appearance')
    const {data:equip, isLoading:itemsLoading} = useGetProfile(ctx.token,ctx.name,ctx.region,ctx.realm,'equipment')
    const {data:media, isLoading} = useGetProfile(ctx.token,ctx.name,ctx.region,ctx.realm,'character-media')
    const {data:professions, isLoading:professionsLoading} = useGetProfile(ctx.token,ctx.name,ctx.region,ctx.realm,'professions')
    const {data:statics, isLoading:staticsLoading} = useGetProfile(ctx.token,ctx.name,ctx.region,ctx.realm,'statistics')
    const {data:ach, isLoading:achLoading} = useGetProfile(ctx.token,ctx.name,ctx.region,ctx.realm,'achievements')
  console.log(equip)
    const getImg = async (src,type) => {
      console.log(type, src)
     return await axios(`https://eu.api.blizzard.com/data/wow/media/item/${src}?namespace=static-${ctx.region}`+'&access_token='+ctx.token).then(res => document.getElementById(type).setAttribute("src",res?.data?.assets[0].value)).then(res=> console.log(res))
      
    } 
  
    console.log(equip)
 
   
   
   
    
  
    const color = {
      RARE:'blue',
      HEIRLOOM:'yellow',
      COMMON:'white',
      UNCOMMON:"green",
      EPIC:"purple",
      LEGENDARY:"orange"
    }

      if(isLoading || playerLoading || itemsLoading){
          return(
              <h1>Loading</h1>
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
        <section className="section3">
          <div className="charpagebg3" />
          <div className="equipment">
            <h1>Equipment</h1>
            {equip?.equipped_items.map((item) => (
              <>
               
              <h1
                style={
                  color[item.quality.type] && {
                    color: color[item.quality.type],
                  }
                }
                >
                {item.slot.name + " : " + item.name}
              </h1>
               
                <img id={item.slot.type} src={getImg(item.media.id,item.slot.type)}/>
                </>
            ))}
          </div>
        </section>
        <section>
              <div className="charpagebg3" style={{backgroundImage:`url(${media?.assets[2].value})`}}/>

              <div className="professions">
                <div className="professions__primary">
                  <h1>Primary Professions</h1>
                 {professions?.primaries?.map(name => <div className="profession"><h1>{name.profession.name }</h1>{name.tiers.map(x=><h1>{x.tier.name + " : " + x.skill_points +"/"+ x.max_skill_points}</h1>)}</div>)}
                </div>
                <div className="professions_ach">
                  <h1>Achievement Point:</h1>
                  <h1>{ach?.total_points}</h1>
                </div>
                <div className="professions__secondary">
                <h1>Secondary Professions</h1>

                {professions?.secondaries?.map(name => <div className="profession"><h1>{name.profession.name + ":" + (name.skill_points?name.skill_points:"") }</h1>{name.tiers?.map(x=><h1>{x.tier.name + " : " + x.skill_points +"/"+ x.max_skill_points}</h1>)}</div>)}

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