// @mui
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { SECTION_PATH } from "@/path";

export const hero = {
    chip: {
        label: (
            <>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Social
                </Typography>
                <Chip
                    label={
                        <Typography
                            variant="caption"
                            sx={{ color: "primary.main" }}
                        >
                            GPT
                        </Typography>
                    }
                    sx={{
                        height: 24,
                        bgcolor: "primary.lighter",
                        mr: -1,
                        ml: 0.75,
                        "& .MuiChip-label": { px: 1.25 },
                    }}
                    icon={
                        <CardMedia
                            component="img"
                            image="/assets/images/shared/gemini.svg"
                            sx={{ width: 16, height: 16 }}
                            alt="celebration"
                            loading="lazy"
                        />
                    }
                />
            </>
        ),
    },
    headLine: "Enhance Your Social Media Impact",
    captionLine:
        "Leverage AI-powered insights to amplify your reach and elevate your strategy.",
    primaryBtn: { children: "Get Started", href: "/chat" },
    // videoSrc: "https://d2elhhoq00m1pj.cloudfront.net/saasable-intro.mp4",
    videoThumbnail: "/assets/videos/thumbnails/intro-thumbnail.png",
    listData: [
        { image: "/assets/images/shared/langflow.svg", title: "Langflow" },
        { image: "/assets/images/shared/datastax.svg", title: "Datastax" },
        { image: "/assets/images/shared/astradb.svg", title: "AstraDB" },
        { image: "/assets/images/shared/next-js.svg", title: "Next.js" },
        {
            image: "/assets/images/shared/material-ui.svg",
            title: "Material UI",
        },
        { image: "/assets/images/shared/javascript.svg", title: "JavaScript" },
    ],
};
