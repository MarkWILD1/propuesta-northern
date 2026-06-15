"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/lib/auth";
import {
  deletePhoto,
  deleteSection,
  updateLandingPage,
  upsertPhoto,
  upsertSection,
} from "@/lib/content";

async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return session;
}

export async function loginAdmin(
  _previousState: { error?: string },
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return { error: "Email or password is incorrect." };
    }

    throw error;
  }

  return {};
}

export async function logoutAdmin() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function saveLandingPage(formData: FormData) {
  await requireAdmin();
  await updateLandingPage(formData);
}

export async function saveSection(formData: FormData) {
  await requireAdmin();
  await upsertSection(formData);
}

export async function removeSection(formData: FormData) {
  await requireAdmin();
  await deleteSection(formData);
}

export async function savePhoto(formData: FormData) {
  await requireAdmin();
  await upsertPhoto(formData);
}

export async function removePhoto(formData: FormData) {
  await requireAdmin();
  await deletePhoto(formData);
}
