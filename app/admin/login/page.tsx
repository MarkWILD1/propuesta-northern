import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main className="login-page">
      <section>
        <img
          className="login-brand-logo"
          src="/logo-northern.png"
          alt="Northern School"
          width={1024}
          height={705}
        />
        <p className="eyebrow">Northern School Admin</p>
        <h1 className="display">Ingresar al panel.</h1>
        <p className="muted">
          Usa el usuario administrador creado con el seed para editar la landing,
          secciones y fotos publicadas desde Drive.
        </p>
      </section>
      <LoginForm />
    </main>
  );
}
