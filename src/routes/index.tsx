import { createFileRoute } from "@tanstack/react-router";
import { BeeSite, beeSiteHead } from "@/components/BeeSite";

export const Route = createFileRoute("/")({
  head: beeSiteHead,
  component: BeeSite,
});
