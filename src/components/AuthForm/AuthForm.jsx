import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";
import { supabase } from "../../supabse/client";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "", code: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || (!isLogin && (!form.name || !form.code))) {
      setError("Fill all required fields");
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;

        await supabase.from("businesses").insert({
          user_email: form.email,
          business_name: form.name,
          business_code: form.code,
        });

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("business_code", form.code);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <>
          <div className={styles.formGroup}>
            <label>Business Name</label>
            <input
              name="name"
              placeholder="Business Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>6-digit Business Code</label>
            <input
              name="code"
              placeholder="Business Code"
              value={form.code}
              onChange={handleChange}
              required
              maxLength={6}
            />
          </div>
        </>
      )}

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p className={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}
