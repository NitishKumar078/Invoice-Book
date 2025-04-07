"use client";
import { useState, ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  LayoutDashboard,
  FilePlus2,
  List,
  Cuboid,
  UserRoundPlus,
  UserRoundCog,
} from "lucide-react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { User } from "@/DataModels/DataModels";
import { AddUserDialogBox } from "./DialogBox";

interface SidebarDemoProps {
  children: ReactNode;
}

const SidebarDemo = ({ children }: SidebarDemoProps) => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Invoice",
      href: "/invoice",
      icon: (
        <FilePlus2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Invoice List",
      href: "/listInvoices",
      icon: (
        <List className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Item List",
      href: "/listItems",
      icon: (
        <Cuboid className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Customer List",
      href: "/listcustomers",
      icon: (
        <UserRoundPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  // const [addUserDialogBox, setUserDialogBox] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 fixed border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2 cu">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {!open ? (
            <UserRoundCog className="text-neutral-700 cursor-pointer dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
          ) : (
            <div
              className="inline-flex items-center gap-3 "
              // onClick={() => setUserDialogBox(true)}
            >
              <UserRoundCog className="text-neutral-700  cursor-pointer dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black cursor-pointer dark:text-white whitespace-pre inline"
              >
                Settings
              </motion.span>
            </div>
          )}
        </SidebarBody>
      </Sidebar>
      <Dashboard children={children} />

      {/* {addUserDialogBox && (
        <AddUserDialogBox
          dialogOpen={addUserDialogBox}
          setDialogOpen={setUserDialogBox}
        />
      )} */}
    </div>
  );
};

export const Logo = () => {
  const user = useSelector((state: { user: User }) => state.user);
  return (
    <NavLink
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {user.company}
      </motion.span>
    </NavLink>
  );
};

export const LogoIcon = () => {
  return (
    <NavLink
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </NavLink>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: SidebarDemoProps) => {
  return (
    <div className="flex flex-1 ">
      <div className="md:p-5 block overflow-auto rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 gap-2  w-full ">
        {children}
      </div>
    </div>
  );
};

export default SidebarDemo;
