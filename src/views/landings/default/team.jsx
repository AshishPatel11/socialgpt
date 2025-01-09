// @mui
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  styled,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// @project
import ContainerWrapper from "@/components/ContainerWrapper";

const teamMembers = [
  {
    name: "Mridul Sehgal",
    role: "Fullstack Developer",
    image: "assets/images/team/mridul.png",
    badge: "Captain",
  },
  {
    name: "Ashish Patel",
    role: "Fullstack Developer",
    image: "assets/images/team/ashish.jpg",
  },
  {
    name: "Shikha Patel",
    role: "Fullstack Developer",
    image: "assets/images/team/sheekha.png",
  },
  {
    name: "Bhuvan GNK",
    role: "AI Developer",
    image: "assets/images/team/bhuvan.jpg",
  },
];

const StyledBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 40,
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: alpha(theme.palette.primary.main, 0.9),
  color: theme.palette.common.white,
  padding: "8px 16px",
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: theme.shadows[2],
}));

const TeamMemberCard = ({ member }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      borderRadius: 4,
      overflow: "visible",
      boxShadow: 2,
      "&:hover": {
        boxShadow: 6,
        transform: "translateY(-4px)",
        transition: "all 0.3s",
      },
    }}
  >
    <Box sx={{ position: "relative", pt: "100%", overflow: "hidden" }}>
      <CardMedia
        component="img"
        image={member.image}
        alt={member.name}
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "16px 16px 0 0",
          backgroundColor: "grey.100",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Box>
    <CardContent sx={{ flexGrow: 1, textAlign: "center", py: 3 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        {member.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {member.role}
      </Typography>
    </CardContent>
  </Card>
);

export default function Team() {
  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Meet Our Dynamic Team
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Innovation and success are driven by a diverse team of dedicated
            professionals.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <TeamMemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
