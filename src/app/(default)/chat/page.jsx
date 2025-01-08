"use client";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Card,
    Grid,
    Button,
    Container,
    Paper,
    Stack,
    Avatar,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import { ArrowCircleRight, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Lottie from "react-lottie";
import * as animationData from "./typing.json";
import Markdown from "react-markdown";
export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSendMessage = async () => {
        setIsError(false);
        try {
            if (input.trim() !== "") {
                const userInput = input.trim();
                setMessages([
                    ...messages,
                    {
                        sender: "user",
                        text: userInput,
                        timestamp: new Date(),
                        id: Date.now(),
                    },
                ]);
                setInput("");
                setIsLoading(true);
                // await new Promise((resolve) => setTimeout(resolve, 2000));
                // const result = "message from bot";
                const response = await fetch("/api/chat", {
                    method: "POST",
                    body: JSON.stringify({ inputValue: userInput }),
                });
                const { result } = await response.json();
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        sender: "bot",
                        text: result,
                        timestamp: new Date(),
                        id: Date.now(),
                    },
                ]);

                setIsLoading(false);
                setInput("");
            }
        } catch (error) {
            console.log({ error });
            setIsLoading(false);
            setIsError(true);
        }
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box
            sx={{
                bgcolor: "#f5f5f5",
                pt: 3,
                pb: { lg: 10, xs: 15 },
            }}
        >
            <Container maxWidth="lg">
                {!messages.length ? (
                    <>
                        {/* Header Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h3"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "2rem", md: "2.5rem" },
                                    background:
                                        "linear-gradient(to right, #006397 10%, #002D31)",
                                    backgroundClip: "text",
                                    "-webkit-background-clip": "text",
                                    "-webkit-text-fill-color": "transparent",
                                    width: "fit-content",
                                }}
                            >
                                Hey There,
                            </Typography>
                            <Typography
                                variant="h4"
                                component="h2"
                                gutterBottom
                                sx={{
                                    background:
                                        "linear-gradient(to right, #006397 10%, #002D31)",
                                    backgroundClip: "text",
                                    "-webkit-background-clip": "text",
                                    "-webkit-text-fill-color": "transparent",
                                    width: "fit-content",
                                    fontWeight: 600,
                                    fontSize: { xs: "1.5rem", md: "2rem" },
                                }}
                            >
                                What would you like to know?
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontSize: "1.1rem",
                                    width: { xs: "50%", md: "30%" },
                                }}
                            >
                                Use one of the most common prompts below or use
                                your own to begin
                            </Typography>
                        </Box>

                        {/* Quick Prompts Grid */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {[
                                {
                                    icon: (
                                        <PersonOutlineIcon
                                            sx={{
                                                fontSize: 28,
                                                color: "primary.main",
                                            }}
                                        />
                                    ),
                                    text: "What are the average likes for each post type?",
                                },
                                {
                                    icon: (
                                        <EmailIcon
                                            sx={{
                                                fontSize: 28,
                                                color: "primary.main",
                                            }}
                                        />
                                    ),
                                    text: "What is the average number of comments received by carousel posts?",
                                },
                                {
                                    icon: (
                                        <ArticleIcon
                                            sx={{
                                                fontSize: 28,
                                                color: "primary.main",
                                            }}
                                        />
                                    ),
                                    text: "Which post type shows the highest average number of likes?",
                                },
                                {
                                    icon: (
                                        <CodeIcon
                                            sx={{
                                                fontSize: 28,
                                                color: "primary.main",
                                            }}
                                        />
                                    ),
                                    text: "How do carousel posts perform in terms of shares compared to other post types?",
                                },
                            ].map((prompt, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Paper
                                        elevation={0}
                                        onClick={() => {
                                            setInput(prompt.text);
                                        }}
                                        sx={{
                                            p: 3,
                                            height: "100%",
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                            cursor: "pointer",
                                            borderRadius: 2,
                                            border: "1px solid #e0e0e0",
                                            transition: "all 0.2s ease-in-out",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow:
                                                    "0 4px 12px rgba(0,0,0,0.1)",
                                                borderColor: "#7C3AED",
                                            },
                                        }}
                                    >
                                        {prompt.icon}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                                color: "#333",
                                            }}
                                        >
                                            {prompt.text}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Stack
                            spacing={2}
                            sx={{
                                mb: 10,
                                mt: 4,
                            }}
                        >
                            {messages.map((message) => (
                                <Stack
                                    key={message.id}
                                    direction="row"
                                    spacing={2}
                                    justifyContent={
                                        message.sender === "user"
                                            ? "flex-end"
                                            : "flex-start"
                                    }
                                >
                                    {message.sender === "bot" && (
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                            }}
                                        >
                                            <Image
                                                src={
                                                    "/assets/images/shared/chatbot.png"
                                                }
                                                alt="Bot"
                                                width={40}
                                                height={40}
                                            />
                                        </Avatar>
                                    )}

                                    <Stack
                                        sx={{
                                            maxWidth: "70%",
                                            minWidth: "100px",
                                        }}
                                    >
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                px: 2,
                                                py: 1,
                                                bgcolor:
                                                    message.sender === "user"
                                                        ? "#004B73"
                                                        : "white",
                                                color:
                                                    message.sender === "user"
                                                        ? "white"
                                                        : "inherit",
                                                borderRadius: 5,
                                                border:
                                                    message.sender === "user"
                                                        ? "none"
                                                        : "1px solid #e0e0e0",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    wordBreak: "break-word",
                                                    "& *": {
                                                        margin: 0,
                                                        lineHeight: "normal",
                                                    },
                                                }}
                                                variant="body1"
                                            >
                                                <Markdown>
                                                    {message.text}
                                                </Markdown>
                                            </Typography>
                                        </Paper>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 0.5,
                                                color: "text.secondary",
                                                alignSelf:
                                                    message.sender === "user"
                                                        ? "flex-end"
                                                        : "flex-start",
                                            }}
                                        >
                                            {dayjs(message.timestamp).format(
                                                "hh:mm A"
                                            )}
                                        </Typography>
                                    </Stack>

                                    {message.sender === "user" && (
                                        <Avatar
                                            sx={{
                                                bgcolor: "#AEAEAE",
                                                width: 40,
                                                height: 40,
                                            }}
                                        >
                                            <PersonOutlineIcon />
                                        </Avatar>
                                    )}
                                </Stack>
                            ))}
                            <Stack
                                width={"fit-content"}
                                justifyContent="flex-start"
                                direction="row"
                                alignItems="center"
                            >
                                {isLoading && (
                                    <>
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                            }}
                                        >
                                            <Image
                                                src={
                                                    "/assets/images/shared/chatbot.png"
                                                }
                                                alt="Bot"
                                                width={40}
                                                height={40}
                                            />
                                        </Avatar>
                                        <Lottie
                                            options={defaultOptions}
                                            height={100}
                                            width={100}
                                        />
                                    </>
                                )}
                            </Stack>
                        </Stack>
                    </>
                )}

                {/* Chat Input Section */}
                <Paper
                    elevation={0}
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 3,
                        bgcolor: "white",
                        borderTop: "1px solid #e0e0e0",
                    }}
                >
                    <Container maxWidth="lg">
                        <Box sx={{ position: "relative" }}>
                            <TextField
                                fullWidth
                                placeholder="Ask whatever you want..."
                                variant="outlined"
                                multiline
                                minRows={2}
                                maxRows={5}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        bgcolor: "#f8f8f8",
                                        "&:hover fieldset": {
                                            borderColor: "#7C3AED",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#7C3AED",
                                        },
                                    },
                                }}
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
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSendMessage}
                                    sx={{
                                        borderRadius: 2,
                                        px: 0,
                                        // height: "24px",
                                        // maxWidth: "24px",
                                    }}
                                >
                                    <ArrowForward />
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Paper>
            </Container>
        </Box>
    );
}
