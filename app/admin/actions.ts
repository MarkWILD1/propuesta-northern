"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  deleteActivityTab,
  deleteAnnouncementBar,
  deleteCarouselSlide,
  deleteContentPage,
  deleteInstagramPost,
  deleteInstitutionalProject,
  deleteLocation,
  deleteMultidisciplinaryTeam,
  deleteNavLink,
  deleteNewsItem,
  deleteFinalShow,
  deletePhysicalEducation,
  deletePhoto,
  deleteProgramLevel,
  deleteSection,
  deleteStaffApplicationField,
  deleteStaffApplicationSubmission,
  deleteStatItem,
  deleteTeamVideo,
  deleteWorkshop,
  updateFinalShow,
  updateFooter,
  updateInstitutionalProject,
  updateLandingHero,
  updateLandingPage,
  updateActivitiesKicker,
  updateLandingTitle,
  updateMultidisciplinaryTeam,
  updatePhysicalEducation,
  updateStaffApplicationSection,
  upsertActivityTab,
  upsertAnnouncementBar,
  upsertCarouselSlide,
  upsertContentPage,
  upsertInstagramPost,
  upsertLocation,
  upsertNavLink,
  upsertNewsItem,
  upsertPhoto,
  upsertProgramLevel,
  upsertSection,
  upsertStaffApplicationField,
  upsertStatItem,
  upsertTeamVideo,
  upsertWorkshop,
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

export async function saveLandingHero(formData: FormData) {
  await requireAdmin();
  await updateLandingHero(formData);
}

export async function saveLandingTitles(formData: FormData) {
  await requireAdmin();
  await updateLandingTitle(formData);
}

export async function saveActivitiesKicker(formData: FormData) {
  await requireAdmin();
  await updateActivitiesKicker(formData);
}

export async function saveFooter(formData: FormData) {
  await requireAdmin();
  await updateFooter(formData);
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

export async function saveWorkshop(formData: FormData) {
  await requireAdmin();
  await upsertWorkshop(formData);
}

export async function removeWorkshop(formData: FormData) {
  await requireAdmin();
  await deleteWorkshop(formData);
}

export async function saveCarouselSlide(formData: FormData) {
  await requireAdmin();
  await upsertCarouselSlide(formData);
}

export async function removeCarouselSlide(formData: FormData) {
  await requireAdmin();
  await deleteCarouselSlide(formData);
}

export async function saveNavLink(formData: FormData) {
  await requireAdmin();
  await upsertNavLink(formData);
}

export async function removeNavLink(formData: FormData) {
  await requireAdmin();
  await deleteNavLink(formData);
}

export async function saveAnnouncementBar(formData: FormData) {
  await requireAdmin();
  await upsertAnnouncementBar(formData);
}

export async function removeAnnouncementBar(formData: FormData) {
  await requireAdmin();
  await deleteAnnouncementBar(formData);
}

export async function saveContentPage(formData: FormData) {
  await requireAdmin();
  await upsertContentPage(formData);
}

export async function removeContentPage(formData: FormData) {
  await requireAdmin();
  await deleteContentPage(formData);
}

export async function saveProgramLevel(formData: FormData) {
  await requireAdmin();
  await upsertProgramLevel(formData);
}

export async function removeProgramLevel(formData: FormData) {
  await requireAdmin();
  await deleteProgramLevel(formData);
}

export async function saveStatItem(formData: FormData) {
  await requireAdmin();
  await upsertStatItem(formData);
}

export async function removeStatItem(formData: FormData) {
  await requireAdmin();
  await deleteStatItem(formData);
}

export async function saveActivityTab(formData: FormData) {
  await requireAdmin();
  await upsertActivityTab(formData);
}

export async function removeActivityTab(formData: FormData) {
  await requireAdmin();
  await deleteActivityTab(formData);
}

export async function saveNewsItem(formData: FormData) {
  await requireAdmin();
  await upsertNewsItem(formData);
}

export async function removeNewsItem(formData: FormData) {
  await requireAdmin();
  await deleteNewsItem(formData);
}

export async function saveInstagramPost(formData: FormData) {
  await requireAdmin();
  await upsertInstagramPost(formData);
}

export async function removeInstagramPost(formData: FormData) {
  await requireAdmin();
  await deleteInstagramPost(formData);
}

export async function saveLocation(formData: FormData) {
  await requireAdmin();
  await upsertLocation(formData);
}

export async function removeLocation(formData: FormData) {
  await requireAdmin();
  await deleteLocation(formData);
}

export async function savePhysicalEducation(formData: FormData) {
  await requireAdmin();
  await updatePhysicalEducation(formData);
}

export async function removePhysicalEducation(formData: FormData) {
  await requireAdmin();
  await deletePhysicalEducation(formData);
}

export async function saveMultidisciplinaryTeam(formData: FormData) {
  await requireAdmin();
  await updateMultidisciplinaryTeam(formData);
}

export async function removeMultidisciplinaryTeam(formData: FormData) {
  await requireAdmin();
  await deleteMultidisciplinaryTeam(formData);
}

export async function saveTeamVideo(formData: FormData) {
  await requireAdmin();
  await upsertTeamVideo(formData);
}

export async function removeTeamVideo(formData: FormData) {
  await requireAdmin();
  await deleteTeamVideo(formData);
}

export async function saveInstitutionalProject(formData: FormData) {
  await requireAdmin();
  await updateInstitutionalProject(formData);
}

export async function removeInstitutionalProject(formData: FormData) {
  await requireAdmin();
  await deleteInstitutionalProject(formData);
}

export async function saveFinalShow(formData: FormData) {
  await requireAdmin();
  await updateFinalShow(formData);
}

export async function removeFinalShow(formData: FormData) {
  await requireAdmin();
  await deleteFinalShow(formData);
}

export async function saveStaffApplicationSection(formData: FormData) {
  await requireAdmin();
  await updateStaffApplicationSection(formData);
}

export async function saveStaffApplicationField(formData: FormData) {
  await requireAdmin();
  await upsertStaffApplicationField(formData);
}

export async function removeStaffApplicationField(formData: FormData) {
  await requireAdmin();
  await deleteStaffApplicationField(formData);
}

export async function removeStaffApplicationSubmission(formData: FormData) {
  await requireAdmin();
  await deleteStaffApplicationSubmission(formData);
}

export async function createAdminUser(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();

  const name = (formData.get("name") as string | null)?.trim() || null;
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();
  const password = (formData.get("password") as string) ?? "";

  if (!email) return { error: "El email es requerido." };
  if (password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." };

  try {
    const passwordHash = await hash(password, 12);
    await prisma.adminUser.create({
      data: { email, name, passwordHash, passwordPlain: password },
    });
  } catch (e) {
    if ((e as { code?: string })?.code === "P2002") {
      return { error: "Ya existe un usuario con ese email." };
    }
    throw e;
  }

  revalidatePath("/admin/usuarios");
  return {};
}

export async function updateAdminUser(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin();

  const id = (formData.get("id") as string) ?? "";
  const name = (formData.get("name") as string | null)?.trim() || null;
  const password = (formData.get("password") as string | null)?.trim();

  const data: {
    name: string | null;
    passwordHash?: string;
    passwordPlain?: string;
  } = { name };

  if (password) {
    if (password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." };
    data.passwordHash = await hash(password, 12);
    data.passwordPlain = password;
  }

  await prisma.adminUser.update({ where: { id }, data });
  revalidatePath("/admin/usuarios");
  return {};
}

export async function deleteAdminUser(formData: FormData) {
  const session = await requireAdmin();

  const id = (formData.get("id") as string) ?? "";

  if (id === session.user?.id) {
    throw new Error("No puedes eliminar tu propio usuario.");
  }

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
}
