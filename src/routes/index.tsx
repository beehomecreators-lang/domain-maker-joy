import { createFileRoute } from "@tanstack/react-router";

const TITLE = "Bee Home Creators | Residential Plots in Trichy";
const DESCRIPTION =
  "Bee Home Creators offers DTCP-approved residential plots in Trichy, including Kungumam Nagar and Vasantham Avenue. Explore layouts, real site views and plot availability.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#173c31" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: "/assets/index-Byz_ySLO.css" }],
    scripts: [{ src: "/assets/index-C_2_1hmy.js", type: "module" }],
  }),
  component: Index,
});

function Index() {
  return <div id="root" />;
}
