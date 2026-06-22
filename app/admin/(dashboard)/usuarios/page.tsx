import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  CreateUserForm,
  DeleteUserForm,
  EditUserForm,
} from "@/components/admin/user-forms";

export const dynamic = "force-dynamic";

export default async function AdminUsuariosPage() {
  const [users, session] = await Promise.all([
    prisma.adminUser.findMany({
      select: { id: true, name: true, email: true, passwordPlain: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    auth(),
  ]);

  const currentUserId = session?.user?.id;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Usuarios</p>
        <h1 className="display">Administradores del sistema.</h1>
        <p className="muted">
          Crea y gestiona los usuarios que pueden ingresar al panel de administración.
        </p>
      </header>

      <CreateUserForm />

      <section className="admin-grid" aria-label="Usuarios registrados">
        {users.map((user) => (
          <article key={user.id} className="admin-card stack">
            <EditUserForm user={user} />
            <DeleteUserForm id={user.id} isCurrentUser={user.id === currentUserId} />
          </article>
        ))}
      </section>
    </div>
  );
}
