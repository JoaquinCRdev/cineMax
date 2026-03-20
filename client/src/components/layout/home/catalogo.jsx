import { useNavigate } from "react-router-dom";


const Catalogo = () => {
  const navigate = useNavigate();
  const peliculas = [
    {
      id: 1,
      title: "Pelicula 1",
      image: "/logo.jpg",
    },
    {
      id: 2,
      title: "Pelicula 2",
      image: "/logo.jpg",
    },
    {
      id: 3,
      title: "Pelicula 3",
      image: "/logo.jpg",
    },
  ];


  const handleGetTickets = (peliculaId) => {
    navigate("/seats", { state: { peliculaId } });
  };

return (
  <div className="bg-[#632224] p-5 flex justify-center box-border">
    <div className="flex flex-wrap gap-5 justify-center items-start w-full max-w-300 p-2 mx-auto box-border">
      
      {peliculas.length === 0 ? (
        <p>No hay peliculas disponibles</p>
      ) : (
        peliculas.map((pelicula, index) => {
          const keyId = pelicula.id ?? index;
          const title = pelicula.title ?? "---";
          const descripcion = pelicula.description ?? "---";
          const imagen = pelicula.image ?? "/cine.jpg";

          return (
            <div
              key={keyId}
              className="bg-[#D4AF37] rounded-xl p-4.5 min-h-80 flex flex-col justify-between text-center relative overflow-hidden border-2 border-[#756224] shadow-[0 10px 30px rgba(0, 0, 0, 0.35)] transition-all duration-200 w-60 mt-2 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-0 10px 30px rgba(0, 0, 0, 0.35)"
            >
              <img
                className="w-full h-37.5 object-cover rounded-lg mb-3"
                src={imagen}
                alt={title}
              />

              <h3 className="font-extrabold capitalize my-2 text-[1.05rem] text-[rgb(37,33,37)]">
                {title}
              </h3>

              <button onClick={() => handleGetTickets(pelicula.id)} className="inline-block my-8 mb-3 font-black text-[0.95rem] px-2.5 py-2 rounded-lg bg-[#4C191B] text-[rgb(156,155,155)] cursor-pointer hover:bg-[#270c0d] transition-colors duration-200">
                Conseguir Tickets
              </button>

              {/* link a la pagina de asientos */}
            </div>
          );
        })
      )}

    </div>
  </div>
);
};

export default Catalogo;
