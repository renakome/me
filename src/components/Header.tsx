import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useI18n } from "../i18n";
import Link from "next/link";

/*
  Header component:
  - Shows site name and subtitle
  - Provides language selector and theme toggle button
*/
type Props = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

export default function Header({ mode, toggleMode }: Props) {
  const { lang, setLang, t } = useI18n();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6">Renako</Typography>
              <Typography variant="caption" color="text.secondary">
                {t("subtitle")}
              </Typography>
            </a>
          </Link>
        </Box>

        <Select
          value={lang}
          size="small"
          onChange={(e) => setLang(e.target.value as "pt" | "en")}
          sx={{ mr: 1, minWidth: 96 }}
          variant="standard"
        >
          <MenuItem value="pt">PT</MenuItem>
          <MenuItem value="en">EN</MenuItem>
        </Select>

        <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit" aria-label="toggle theme">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
