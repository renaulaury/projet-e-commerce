import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import "../LoginPage/AuthForm.css";

// règles du form inscription (nom, email, mdp + confirm)
const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "2 caractères minimum")
      .max(50, "50 caractères maximum"),
    email: z.string().trim().email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "8 caractères minimum")
      .regex(/[a-z]/, "Au moins une minuscule")
      .regex(/[A-Z]/, "Au moins une majuscule")
      .regex(/[0-9]/, "Au moins un chiffre")
      .regex(/[^a-zA-Z0-9]/, "Au moins un caractère spécial"),
    confirmPassword: z.string(),
  })
  // les deux mdp doivent être identiques
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// Page d'inscription
function RegisterPage() {
  // login : save user dans le context (Header aff "Salut nom")
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // form valide -> user connecté + retour accueil
  function onSubmit(data) {
    login(data);
    navigate("/");
  }

  return (
    <main className="container auth">
      <h1 className="auth__title">S'inscrire</h1>

      <form className="auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="auth__field">
          <label htmlFor="name">Nom</label>
          {/* ... = spread, contient all infos du champ */}
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name")}
          />
          {errors.name && <p className="auth__error">{errors.name.message}</p>}
        </div>

        <div className="auth__field">
          <label htmlFor="email">Email</label>
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
          <p id="password-hint" className="auth__hint">
            (8 caractères min: au moins 1 maj, 1 min, 1 chiffre et 1 caractère spécial)
          </p>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="password-hint"
            {...register("password")}
          />
          
          {errors.password && <p className="auth__error">{errors.password.message}</p>}
        </div>

        <div className="auth__field">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="auth__error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="auth__button">
          Créer mon compte
        </button>
      </form>

      <p className="auth__switch">
        Déjà un compte ? <Link to="/connexion">Connexion</Link>
      </p>
    </main>
  );
}

export default RegisterPage;
