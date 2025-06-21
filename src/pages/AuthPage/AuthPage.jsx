import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./AuthForm.module.scss";

export default function AuthPage() {
  return (
    <main className={styles.authPage}>
      <h2>Login or Register</h2>
      <AuthForm />
    </main>
  );
}
