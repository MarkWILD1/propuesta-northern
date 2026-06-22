"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  createAdminUser,
  deleteAdminUser,
  updateAdminUser,
} from "@/app/admin/actions";

type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  passwordPlain: string | null;
};

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PasswordInput({
  id,
  name,
  required,
  minLength,
  autoComplete,
  defaultValue,
  placeholder,
}: {
  id: string;
  name: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        <EyeIcon open={visible} />
      </button>
    </div>
  );
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button className="button" type="submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </button>
  );
}

export function CreateUserForm() {
  const [state, formAction] = useActionState(createAdminUser, {});

  return (
    <form action={formAction} className="form-card form-grid">
      <h3>Nuevo usuario</h3>
      <div className="field">
        <label htmlFor="user-name-new">Nombre (opcional)</label>
        <input id="user-name-new" name="name" autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="user-email-new">Email</label>
        <input
          id="user-email-new"
          name="email"
          type="email"
          required
          autoComplete="off"
        />
      </div>
      <div className="field">
        <label htmlFor="user-password-new">Contraseña (mínimo 8 caracteres)</label>
        <PasswordInput
          id="user-password-new"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      <SubmitButton label="Crear usuario" pendingLabel="Creando..." />
    </form>
  );
}

export function EditUserForm({ user }: { user: AdminUser }) {
  const [state, formAction] = useActionState(updateAdminUser, {});

  return (
    <form action={formAction} className="form-card form-grid">
      <h3>Editar usuario</h3>
      <input type="hidden" name="id" value={user.id} />
      <div className="field">
        <label htmlFor={`user-name-${user.id}`}>Nombre</label>
        <input
          id={`user-name-${user.id}`}
          name="name"
          defaultValue={user.name ?? ""}
          autoComplete="off"
        />
      </div>
      <div className="field">
        <label>Email</label>
        <input value={user.email} disabled readOnly />
      </div>
      <div className="field">
        <label htmlFor={`user-password-${user.id}`}>Contraseña</label>
        <PasswordInput
          id={`user-password-${user.id}`}
          name="password"
          minLength={8}
          autoComplete="new-password"
          defaultValue={user.passwordPlain ?? ""}
          placeholder={
            user.passwordPlain ? undefined : "Sin registro — ingresá una nueva contraseña"
          }
        />
        <small className="muted">
          {user.passwordPlain
            ? "Visible para administradores. Editá el campo para cambiarla."
            : "Este usuario fue creado antes del registro de contraseñas. Guardá una nueva para verla aquí."}
        </small>
      </div>
      {state.error ? <p className="form-error">{state.error}</p> : null}
      <SubmitButton label="Guardar cambios" pendingLabel="Guardando..." />
    </form>
  );
}

export function DeleteUserForm({
  id,
  isCurrentUser,
}: {
  id: string;
  isCurrentUser: boolean;
}) {
  return (
    <form action={deleteAdminUser}>
      <input type="hidden" name="id" value={id} />
      <button
        className="button danger"
        type="submit"
        disabled={isCurrentUser}
        title={isCurrentUser ? "No puedes eliminar tu propio usuario" : undefined}
      >
        Eliminar usuario
      </button>
    </form>
  );
}
