import { redirect } from "next/navigation";

export default function NewServiceRedirectPage() {
  redirect("/admin/services?action=create");
}

