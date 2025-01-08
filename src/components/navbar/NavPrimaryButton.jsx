import PropTypes from "prop-types";
// @next
import NextLink from "next/link";

// @mui
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";

/***************************  NAVBAR - PRIMARY BUTTON  ***************************/

export default function NavPrimaryButton({ sx, children, href, ...rest }) {
    const router = useRouter();

    return (
        <Button
            variant="contained"
            size="small"
            sx={sx}
            {...rest}
            rel="noopener noreferrer"
            aria-label="nav-primary-btn"
            onClick={() => router.push(href)}
        >
            {children || "Primary Button"}
        </Button>
    );
}

NavPrimaryButton.propTypes = {
    sx: PropTypes.any,
    children: PropTypes.any,
    rest: PropTypes.any,
};
