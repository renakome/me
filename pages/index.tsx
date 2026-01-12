import React from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import ProjectList, { Project } from "../components/ProjectList";
import { fetchFeaturedFromReadme, parseFeaturedSection } from "../lib/parseReadme";
import { useI18n } from "../src/i18n";

/*
  Home page:
  - Gets initial project list at build time (fetchFeaturedFromReadme)
  - Provides a client-side Refresh button that fetches the raw README and parses it directly.
  This client parsing enables dynamic updates on GitHub Pages (static export).
*/
type Props = {
  initialProjects: Project[];
  readmeRawUrl: string;
};

export default function Home({ initialProjects, readmeRawUrl }: Props) {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [loading, setLoading] = React.useState(false);
  const { t } = useI18n();

  const refresh = async () => {
    try {
      setLoading(true);
      const res = await fetch(readmeRawUrl);
      const text = await res.text();
      // Parse directly in the client to keep site fully static-compatible
      const data = parseFeaturedSection(text);
      setProjects(data);
    } catch (err) {
      console.error("Failed to refresh projects:", err);
      // Optionally show a user-visible error (translation available)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <div>
          <Typography variant="h4">{t("title")}</Typography>
          <Typography color="textSecondary">{t("subtitle")}</Typography>
        </div>
        <div>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={refresh} disabled={loading}>
            {loading ? t("updating") : t("update")}
          </Button>
        </div>
      </Box>

      <Typography variant="h5" mb={2}>
        {t("projects")}
      </Typography>

      <ProjectList projects={projects} />
    </>
  );
}

export async function getStaticProps() {
  // Use the raw README URL you provided as default
  const readmeRawUrl =
    process.env.README_RAW_URL ||
    "https://raw.githubusercontent.com/renakome/renakome/refs/heads/main/README.md";

  const initialProjects = await fetchFeaturedFromReadme(readmeRawUrl);

  return {
    props: {
      initialProjects,
      readmeRawUrl,
    },
    // NOTE: no revalidate — site will be exported static for GitHub Pages
  };
}
