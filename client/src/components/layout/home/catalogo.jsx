import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Catalogo = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/movie", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Error al obtener películas");
        }

        const data = await res.json();
        setPeliculas(data.data || []);
      } catch (error) {
        console.error(error);
        setPeliculas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  const handleTicketer = () => {
    navigate("/seats");
  }

  return (
    <div className="bg-[#632224] p-5 flex justify-center box-border">
      <div className="flex flex-wrap gap-5 justify-center items-start w-full max-w-300 p-2 mx-auto box-border">
        {loading ? (
          <p>Cargando películas...</p>
        ) : peliculas.length === 0 ? (
          <p>No hay peliculas disponibles</p>
        ) : (
          peliculas.map((pelicula, index) => {
            const keyId = pelicula._id ?? pelicula.id ?? index;
            const title = pelicula.title ?? "---";
            const imagen = pelicula.posterUrl ?? "/cine.jpg";

            return (
              <div
                key={keyId}
                className="bg-[#D4AF37] rounded-xl p-4.5 min-h-80 flex flex-col justify-between text-center relative overflow-hidden border-2 border-[#756224] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-200 w-60 mt-2 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <img
                  className="w-full h-37.5 object-cover rounded-lg mb-3"
                  src={imagen}
                  alt={title}
                />

                <h3 className="font-extrabold capitalize my-2 text-[1.05rem] text-[rgb(37,33,37)]">
                  {title}
                </h3>

                <button onClick={()=> handleTicketer()} className="inline-block my-8 mb-3 font-black text-[0.95rem] px-2.5 py-2 rounded-lg bg-[#4C191B] text-[rgb(156,155,155)] cursor-pointer hover:bg-[#270c0d] transition-colors duration-200">
                  Conseguir Tickets
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Catalogo;