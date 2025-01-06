"use client";

// @mui
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

// @project
import branding from "@/branding.json";
import { Typography } from "@mui/material";

/***************************  LOGO - MAIN  ***************************/

export default function LogoMain() {
    const theme = useTheme();
    const logoMainPath = branding.logo.main;

    return logoMainPath ? (
        <CardMedia
            src={logoMainPath}
            component="img"
            alt="logo"
            sx={{ width: { xs: 112, lg: 140 } }}
            loading="lazy"
        />
    ) : (
        <Box sx={{ width: { xs: 112, lg: 140 }, height: { xs: 22, lg: 26 } }}>
            <Typography variant="h3" sx={{ color: "#004B73", fontWeight: 900 }}>
                SocialGPT
            </Typography>
        </Box>
    );
}
