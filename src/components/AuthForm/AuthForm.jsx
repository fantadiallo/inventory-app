import { useEffect, useState } from "react";
import { supabase } from "../../supabse/client";
import styles from "./AuthForm.module.scss";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || (mode === "register" && !businessName)) {
      return setError("Please fill in all fields.");
    }

    if (mode === "register") {
      if (adminCode.length !== 6) {
        return setError("Admin code must be 6 digits.");
      }

      const { data: business, error: businessError } = await supabase
        .from("businesses")
        .insert([{ name: businessName, admin_code: adminCode }])
        .select()
        .single();

      if (businessError) return setError(businessError.message);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            business_id: business.id,
            is_admin: true,
          },
        },
      });

      if (signUpError) return setError(signUpError.message);
      alert("Registered! Please check your email to confirm.");
    } else {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) return setError(loginError.message);

      const user = data.user;
      const { business_id } = user.user_metadata;
      if (!business_id) return setError("No business assigned.");

      const { data: business } = await supabase
        .from("businesses")
        .select("admin_code")
        .eq("id", business_id)
        .single();

      const is_admin = adminCode === business.admin_code;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("is_admin", is_admin);
      localStorage.setItem("business_id", business_id);
      alert("Logged in!");
    }
  }

  return (
    <section className={styles.authContainer}>
      <div className={styles.toggle}>
        <button
          className={mode === "login" ? styles.active : ""}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={mode === "register" ? styles.active : ""}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <input
              type="text"
              placeholder="6-digit Admin Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              maxLength={6}
            />
          </>
        )}

        {mode === "login" && (
          <input
            type="text"
            placeholder="6-digit Admin Code (if admin)"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            maxLength={6}
          />
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>
    </section>
  );
}
