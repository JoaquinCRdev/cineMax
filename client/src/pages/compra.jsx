import { useSelector } from "react-redux";

const Compra = () => {
  const { selectedSeats } = useSelector((state) => state.seat);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#632224]">
      <div className="bg-[#dcc474] shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h1 className="text-2xl font-bold mb-4 text-center">
          Recibo de compra
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              maxLength={30}
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#b19a4d]"
            />
          </div>

          {/* Tarjeta */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Número de tarjeta
            </label>
            <input
              type="text"
              pattern="\d{0,16}$"
              maxLength={16}
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#b19a4d]"
            />
          </div>

          {/* Fecha y CVV en fila */}
          <div className="flex gap-4">
            
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">
                Vencimiento
              </label>
              <input
                type="month"
                required
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#b19a4d]"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                pattern="\d{3}"
                maxLength={3}
                required
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#b19a4d]"
              />
            </div>

          </div>

          {/* Botón */}
          <button
            type="submit"
            onClick={() => alert("tu compra se ha comprado")}
            className="mt-4 bg-[#4C191B] text-white py-2 rounded-lg font-semibold hover:bg-[#240c0d] transition"
          >
            Confirmar compra
          </button>

        </form>
      </div>
    </div>
  );
};

export default Compra;