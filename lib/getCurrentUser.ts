import { cookies } from "next/headers";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${apiUrl}/auth/me`, {
    credentials: "include",
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
