import { useState } from "react";
import { Group, Code, rem } from "@mantine/core";
import { IconSettings, IconSwitchHorizontal, IconLogout, IconBuildingStore, IconCategory, IconUser, IconCopy } from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import classes from "./sidebar.module.css";
import { useRouter } from "next/router";

const data = [
  { link: "/", label: "User", icon: IconBuildingStore },
  { link: "/doa", label: "Data Doa", icon: IconCategory },
  { link: "#", label: "Other Settings", icon: IconSettings },
];

export function Sidebar() {
  const router = useRouter();
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push({ pathname: "/login" });
  }
  
  const [active, setActive] = useState("User");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => handleLogout(event)}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        {/* <a href="https://github.com/Geusan31/mantine_ugm.git" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconCopy className={classes.linkIcon} stroke={1.5} />
          <span>Clone from Geusan31</span>
        </a> */}
      </div>
    </nav>
  );
}