/*
  Utilities to fetch and parse the README featured section.

  - fetchFeaturedFromReadme: used during build (getStaticProps) to get initial projects
  - parseFeaturedSection: exported so the client can parse raw README content directly
*/
export type Project = {
  name: string;
  url: string;
};

const START_MARKER = "<!-- START_FEATURED -->";
const END_MARKER = "<!-- END_FEATURED -->";

export async function fetchFeaturedFromReadme(rawUrl: string): Promise<Project[]> {
  try {
    const res = await fetch(rawUrl);
    if (!res.ok) return [];
    const text = await res.text();
    return parseFeaturedSection(text);
  } catch (err) {
    console.error("fetchFeaturedFromReadme error:", err);
    return [];
  }
}

export function parseFeaturedSection(readmeText: string): Project[] {
  const start = readmeText.indexOf(START_MARKER);
  const end = readmeText.indexOf(END_MARKER, start >= 0 ? start : 0);
  if (start === -1 || end === -1) return [];

  const section = readmeText.substring(start + START_MARKER.length, end);
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

  const projects: Project[] = [];
  let match;
  while ((match = linkRegex.exec(section)) !== null) {
    const name = match[1].trim();
    const url = match[2].trim();
    projects.push({ name, url });
  }
  return projects;
}
