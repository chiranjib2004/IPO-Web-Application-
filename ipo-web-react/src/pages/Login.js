import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  // Auto-redirect logged in users
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate(redirectPath, { replace: true });
    }
  }, [redirectPath, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      navigate(redirectPath, { replace: true }); // 👈 This sends user back to `/add`
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mt-5">Admin Login</h3>
      <a href="/" className="btn btn-link">← Back to IPOs</a>
      <form onSubmit={handleLogin}>
        <input name="username" className="form-control mb-3" placeholder="Username" required />
        <input type="password" name="password" className="form-control mb-3" placeholder="Password" required />
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
