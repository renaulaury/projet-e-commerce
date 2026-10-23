import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router";
import "./AuthForm.css";

// règles du form (zod) : vérif avant envoi
const schema = z.object({
  email: z.string().trim().email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

// Page de connexion
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // appelée seulement si le form est valide
  function onSubmit(data) {
    console.log("Connexion", data.email);
  }

  return (
    <main className="container auth">
      <h1 className="auth__title">Connexion</h1>

      {/* noValidate : aff error via zod */}
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="auth__field">
          <label htmlFor="email">Email</label>
          {/* input en rouge si error */}
          {/* ... = spread, contient all infos du champ */}
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          {errors.email && <p className="auth__error">{errors.email.message}</p>}
        </div>

        <div className="auth__field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password")}
          />
          {errors.password && <p className="auth__error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="auth__button">
          Se connecter
        </button>
      </form>

      {/* pas de compte -> go inscription */}
      <p className="auth__switch">
        Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
      </p>
    </main>
  );
}

export default LoginPage;
