import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSelector, useDispatch } from "react-redux"
import { setSeats } from "../redux/slices/seatSlice"
import { useNavigate } from "react-router-dom"
import { enqueueSnackbar } from "notistack"

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
  const ocupados = ["E1", "E2", "D1", "C1", "B1", "A1"] //modificar con BD

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedSeats } = useSelector((state) => state.seat);

  const handleSeatClick = (seat) => {
    if (ocupados.includes(seat)) return;
    if (selectedSeat.includes(seat)) {
    setSelectedSeat(selectedSeat.filter(s => s !== seat))} 
    else {
    setSelectedSeat([...selectedSeat, seat])}
   }


    const loginMutation = useMutation({
        mutationFn: (reqData) => {
            console.log("Datos enviados a la función de mutación:", reqData);
        },
        onSuccess: (data) => {
            const { selectedSeats } = data;
            const { location, prize } = data;
            dispatch(setSeats(selectedSeats));
            navigate("/payment");
        },
        onError: (error) => {
            enqueueSnackbar("Error al procesar la compra. Por favor, inténtalo de nuevo.", { variant: "error" });
        }
    });

   const handleSubmit = () => {
    navigate("/compra", { state: { selectedSeats } });
   }

   return (
    <div className="bg-[#632224] flex flex-col items-center gap-16 pt-4 w-full">

      {asientos.map((section) => (

        <div key={section.tipo} className="bg-[#74605d] flex flex-col items-center gap-6 rounded-lg p-5">

          <h1>{section.tipo} ${section.precio}</h1>

          {section.filas.map((fila) => (

            <div key={fila.fila}  className="bg-[#74605d] flex items-center gap-4">

              <span>{fila.fila}</span>

              {Array.from({length: fila.cantidad}, (_, i) => {

                const seatId = `${fila.fila}${i+1}`

                return (
                  <button
                    key={seatId}
                    disabled={ocupados.includes(seatId)}
                    onClick={() => handleSeatClick(seatId)}
                    className={` w-10 h-8 border rounded ${ocupados.includes(seatId) ? 'opacity-50 cursor-not-allowed bg-[#808180]' : 'cursor-pointer'} ${selectedSeat.includes(seatId) ? 'bg-[#77631f]' : 'bg-[#D4AF37]'}`}
                  >
                    {i+1}
                  </button>
                )

              })}

            </div>

          ))}

        </div>

      ))}

      <img src="/pantalla2.png" alt="pantalla de cine" />

      {selectedSeat.length > 0 && (

        <div className="bg-[#3a1314] text-white p-4 rounded-lg flex flex-col items-center gap-3 mb-6">
            <p>
            Cantidad:{selectedSeat.length}
            </p>

            <button
            className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-300"
            onClick={() => handleSubmit()}
            >
            Comprar
            </button>
        </div>
        )}
    </div>
  )
}

export default Seats