import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export type Project = {
  name: string;
  url: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return <Typography>Nenhum projeto encontrado na seção featured do README.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {projects.map((p) => (
        <Grid item xs={12} sm={6} key={p.url}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                <Link href={p.url} target="_blank" rel="noopener noreferrer" underline="hover">
                  {p.name} <OpenInNewIcon fontSize="small" style={{ verticalAlign: "middle", marginLeft: 8 }} />
                </Link>
              </Typography>
              <Typography color="textSecondary" variant="caption">
                {p.url}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
