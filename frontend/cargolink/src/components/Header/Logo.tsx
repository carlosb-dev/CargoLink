import logo from "../../assets/logo.png";

function Logo() {
  return (
    <div className="w-12 h-12 p-2 mr-5 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
      <img src={logo} alt="logo" />
    </div>
  );
}

export default Logo;
