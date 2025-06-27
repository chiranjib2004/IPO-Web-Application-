function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    alert("Logged out!");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        <img
  src="https://img.icons8.com/ios-filled/50/line-chart.png"
  alt="Logo"
  width="30"
  className="me-2"
/>

          IPO Web App
        </a>
        <div>
          {isLoggedIn && <span className="me-3">👤 Admin</span>}
          {isLoggedIn && (
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
