import { useEffect } from "react";

const TITLE = "Bee Home Creators | Residential Plots in Trichy";
const DESCRIPTION =
  "Bee Home Creators offers DTCP-approved residential plots in Trichy, including Kungumam Nagar and Vasantham Avenue. Explore layouts, real site views and plot availability.";

export const beeSiteHead = () => ({
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
});

export function BeeSite() {
  // The site bundle mounts itself into #root, so it must load after hydration.
  useEffect(() => {
    if (document.querySelector("script[data-bee-site]")) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/assets/index-C_2_1hmy.js";
    script.setAttribute("data-bee-site", "true");
    document.body.appendChild(script);
  }, []);

  return <div id="root" suppressHydrationWarning />;
}
