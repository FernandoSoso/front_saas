import Card from "./Card.tsx"

const Cards = () =>{

    
    return(
       <div className="flex justify-around">
            <Card tipo={1}/>
            <Card tipo={2}/>
            <Card tipo={3}/>
       </div>
    )
}

export default Cards
