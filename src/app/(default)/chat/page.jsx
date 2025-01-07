import {
    Box,
    Typography,
    TextField,
    IconButton,
    Card,
    Grid,
    Button,
    Container,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";

export default function ChatPage() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Hi there, <span style={{ color: "#9c27b0" }}>User</span>
                </Typography>
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ color: "#673ab7" }}
                >
                    What would like to know?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Use one of the most common prompts below or use your own to
                    begin
                </Typography>
            </Box>

            {/* Quick Prompts Grid */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {[
                    {
                        icon: <PersonOutlineIcon />,
                        text: "Write a to-do list for a personal project or task",
                    },
                    {
                        icon: <EmailIcon />,
                        text: "Generate an email to reply to a job offer",
                    },
                    {
                        icon: <ArticleIcon />,
                        text: "Summarise this article or text for me in one paragraph",
                    },
                    {
                        icon: <CodeIcon />,
                        text: "How does AI work in a technical capacity",
                    },
                ].map((prompt, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                p: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                "&:hover": { bgcolor: "action.hover" },
                            }}
                        >
                            {prompt.icon}
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{ mt: 1 }}
                            >
                                {prompt.text}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Refresh Prompts Button */}
            <Button startIcon={<RefreshIcon />} sx={{ mb: 4 }} color="inherit">
                Refresh Prompts
            </Button>

            {/* Chat Input Section */}
            <Box sx={{ position: "relative" }}>
                <TextField
                    fullWidth
                    placeholder="Ask whatever you want..."
                    variant="outlined"
                    multiline
                    minRows={2}
                    sx={{ pr: 8 }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <IconButton size="small">
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton size="small">
                        <ImageIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{
                            bgcolor: "#673ab7",
                            color: "white",
                            "&:hover": { bgcolor: "#563099" },
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
}
