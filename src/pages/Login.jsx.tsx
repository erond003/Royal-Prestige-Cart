import { useState } from "react";

export default function Login() {

  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://script.google.com/macros/s/AKfycbwOiqrkvaSyT7VYjzCTXXKPupq5s53ZvKT9vcbDt-GbVI443ryMZVokWtOdEYE1KfSe/exec";

  const handleLogin = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "login",
          userCode: userCode
        })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // Guardar sesión
      localStorage.setItem("user", JSON.stringify(data));

      alert("Login exitoso");

      console.log("USER:", data);

    } catch (err) {
      setError("Error de conexión con el servidor");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Login Royal Prestige</h2>

      <input
        type="text"
        placeholder="Código de vendedor"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Cargando..." : "Ingresar"}
      </button>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

    </div>
  );
}