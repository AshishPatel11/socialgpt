// @project
import SvgIcon from "@/components/SvgIcon";

/***************************  DEFAULT - NAVBAR  ***************************/

const linkProps = { target: "_blank", rel: "noopener noreferrer" };
export const navbar = {
    secondaryBtn: {
        children: (
            <SvgIcon
                name="tabler-brand-github"
                color="primary.main"
                size={18}
            />
        ),
        href: "https://github.com/AshishPatel11/socialgpt",
        ...linkProps,
        sx: { minWidth: 40, width: 40, height: 40, p: 0 },
    },
    primaryBtn: {
        children: "Get Started",
        href: "/chat",
        ...linkProps,
    },
};
