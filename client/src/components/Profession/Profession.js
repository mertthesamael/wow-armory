import "./profession.scss"



const Profession = (props) => {
    console.log(props.data)
    return(
        <div className="profession">
            <div className="profession__name">
                <h1>{props.data.profession.name}</h1>
            </div>
            <div className="profession__detail">
                {props?.data.tiers &&props?.data.tiers.map(x=>
                    <div>
                    <h1>{x.tier.name + " " + x.skill_points + " " + x.max_skill_points}</h1>
                    <div className="pgbar" style={{width:(x.skill_points/x.max_skill_points)*100+'%', backgroundColor:'red', height:'2rem'}}></div>
                    </div>  
                
                )}
            </div>

        </div>
    )

}


export default Profession