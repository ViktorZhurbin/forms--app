import type { MetaFunction } from "@remix-run/node";
import { Welcome } from "~/components/Welcome/Welcome";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";

export const meta: MetaFunction = () => {
  return [
    { title: "Forms | Home" },
  ];
};

export default function Index() {
  return (
    <div>
      <Welcome />
      <ColorSchemeToggle />
    </div>
  );
}
