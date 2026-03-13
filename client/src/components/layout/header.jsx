const Header = () => {
  const user = null;

  return (
    <>
      <header className="flex items-center p-4 bg-[#4C191B] border-b border-[#270c0d]">
        <div className="flex items-center gap-4">
          <a className="linklogo" href="/inicio">
            <img
              className="h-16 object-cover rounded-[20px]"
              src="/logo.jpg"
              alt="Logo"
            />
          </a>

          <p className="text-xl font-bold">
            Hola {user ? user.nombre : "Invitado"}
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
