import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Elite Standard Limited",
  description: "Administrative control center for Elite Standard Limited engineering equipment and projects.",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
