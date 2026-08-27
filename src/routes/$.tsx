import { createFileRoute } from "@tanstack/react-router";
import { BeeSite, beeSiteHead } from "@/components/BeeSite";

// The site bundle handles its own client-side paths (e.g. /project/:id),
// so every unmatched path renders the same app shell.
export const Route = createFileRoute("/$")({
  head: beeSiteHead,
  component: BeeSite,
});
