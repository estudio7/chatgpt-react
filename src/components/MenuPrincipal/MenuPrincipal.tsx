import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { StyledLink } from "./styles";

const MenuPrincipal: React.FC = () => {
  const router = useRouter();

  const links = [
    { href: "/chat", label: "Chat" },
    { href: "/colleges", label: "Colleges" },
    { href: "/myplan", label: "My Plan" },
    { href: "/question-of-the-day", label: "Question of the Day" },
  ];

  return (
    <Box display="flex" justifyContent="center" marginTop={5}>
      {links.map((link) => (
        <StyledLink key={link.href} href={link.href}>
          {link.label}
        </StyledLink>
      ))}
    </Box>
  );
};

export default MenuPrincipal;
