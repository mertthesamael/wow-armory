import "./equipment.scss"


const Equipment = (props) => {
console.log(props.color)

    return(
    <div style={{boxShadow: `0 0 10px 1px ${props.color}`, color:props.color}} className="equipmentitem">
        <div className="equipmentitem__tooltip"></div>
            <div className="equipmentitem__img">
                <img id={props.id} src={props.src}/>
            </div>
            <div className="equipmentitem__name">
                <h2>{props.name}</h2>
            </div>

        </div>
    )

}

export default Equipment;