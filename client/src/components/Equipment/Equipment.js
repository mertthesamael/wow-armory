import "./equipment.scss"


const Equipment = (props) => {
    return(
    <div style={{boxShadow: `0 0 10px 1px ${props.color}`, color:props.color}} className={props.spells?"equipmentitem__desc":"equipmentitem"}>

        <div className="equipmentitem__header">

            <div className="equipmentitem__img">
                <img style={{border:'1px solid '+props.color}} id={props.id} src={props.src}/>
            </div>
            <div className="equipmentitem__name">
                <h2>{props.name}</h2>
                <p>{props.level}</p>
            </div>
        </div>
            <div className={"equipmentitem__stats"}>
                {props?.stats && props?.stats.map(stat => <p className="item__stats" style={{color:`rgba(${stat.display.color.r},${stat.display.color.g},${stat.display.color.b},${stat.display.color.a})`}}>+ {stat.value} {stat.type.name} </p>)}
                {props.spells && props.spells.map(spell => <p className="item__spell">{spell.description}</p>)}
            </div>
            
            
        </div>
    )

}

export default Equipment;