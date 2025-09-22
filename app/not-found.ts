import { redirect } from "next/navigation";

export default function NotFound() {
  redirect(`/?id=-404`);
  return null;
}
