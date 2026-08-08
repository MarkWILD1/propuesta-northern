"use server";

import {
  submitStaffApplication as submitStaffApplicationImpl,
  type StaffApplicationSubmitState,
} from "@/lib/content";

export async function submitStaffApplication(
  previousState: StaffApplicationSubmitState,
  formData: FormData,
): Promise<StaffApplicationSubmitState> {
  return submitStaffApplicationImpl(previousState, formData);
}
