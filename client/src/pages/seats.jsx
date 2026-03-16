import { useState } from "react"

const asientos= [ 
    {tipo: "Premium", precio: "510", filas: [{fila: "E", cantidad: "10"}]},
    {tipo: "Executive", precio: "290", filas: [
        { fila: "D", cantidad: "20"},
        {fila: "C", cantidad: "20"},
        {fila: "B", cantidad: "20"}]},
    {tipo: "Normal", precio: "150", filas: [{fila: "A", cantidad: "20"}]}
]


const Seats = () => {
  const [selectedSeat, setSelectedSeat] = useState([])

  const handleSeatClick = (seat) => {
  }

  return (
    <div>
        <h1>Premium $510</h1>

        <h1>Executive $290</h1>

        <h1>Normal $150</h1>
    </div>
  )

}

export default Seats