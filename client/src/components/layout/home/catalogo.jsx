const Catalogo = () => {
  const peliculas = [
    {
      id: 1,
      title: "Pelicula 1",
      description: "Descripción de la película 1",
      image: "/pelicula1.jpg",
    },
    {
      id: 2,
      title: "Pelicula 2",
      description: "Descripción de la película 2",
      image: "/pelicula2.jpg",
    },
    {
      id: 3,
      title: "Pelicula 3",
      description: "Descripción de la película 3",
      image: "/pelicula3.jpg",
    },
  ];

return (
  <div className="bg-[#56c737] p-5 flex justify-center box-border">
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
              className="bg-[#30a0c2] rounded-xl p-4.5 min-h-80 flex flex-col justify-between text-center relative overflow-hidden border-2 border-[#741a90] shadow-[0 10px 30px rgba(0, 0, 0, 0.35)] transition-all duration-200 w-60 mt-2 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-0 10px 30px rgba(0, 0, 0, 0.35)"
            >
              <img
                className="w-full h-37.5 object-cover rounded-lg mb-3"
                src={imagen}
                alt={title}
              />

              <h3 className="font-extrabold capitalize my-2 text-[1.05rem] text-[rgb(255,57,248)]">
                {title}
              </h3>

              <p className="inline-block my-8 mb-3 font-black text-[0.95rem] px-2.5 py-2 rounded-lg bg-[#d3ce34] text-[rgb(53,218,255)]">
                {descripcion}
              </p>

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
