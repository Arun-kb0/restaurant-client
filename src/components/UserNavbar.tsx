import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
} from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";


const LINKS = [
  {
    icon: AiFillHome,
    title: "Home",
    href: "/",
  },
  {
    icon: IoIosAddCircle,
    title: "Add",
    href: "/create",
  },
];

function NavList() {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ icon: Icon, title, href }) => (
        <li key={title} className="flex justify-center items-center ">
          <Typography
            as="a"
            href={href}
            type="small"
            className="flex items-center gap-x-2 p-1 text-white hover:text-white"
          >
            <Icon className="h-6 w-6" />
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

export default function UserNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
      <Navbar className="sticky bg-black shadow-lg border-gray-500 top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center text-white">
          <Typography
            as="a"
            href="#"
            type="small"
            className="ml-2 mr-2 block py-1 font-semibold"
          >
            Restaurants app
          </Typography>
          <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-surface/25 lg:block dark:border-surface" />
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto grid lg:hidden"
          >
            {openNav ? (
              <FaXmark className="h-4 w-4" />
            ) : (
              <TiThMenu className="h-4 w-4" />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar >
  )
}
