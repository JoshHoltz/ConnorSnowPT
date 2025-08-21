import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MenuIcon,
  X as CloseIcon,
  LayoutDashboard,
  User,
  ChartLine,
  CalendarCheck2,
  Dumbbell,
  ScrollText,
  Settings,
  LogOut,
} from "lucide-react";

export const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <section className="hidden flex-col bg-gray-900 text-white md:flex md:w-64">
        <div className="flex h-screen flex-col">
          <div className="bg-gray-900 p-4 py-10">
            <h1 className="px-2 text-2xl font-bold">
              CONNOR<span className="text-blue-600">SNOW</span>
            </h1>
          </div>

          <nav className="flex flex-grow flex-col">
            <ul className="mt-4 flex flex-col gap-2">
              <li className="list-none px-4">
                <NavButton
                  href="/admin/home"
                  icon={<LayoutDashboard />}
                  text="Dashboard"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/admin/AdminClients"
                  icon={<User />}
                  text="Clients"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/admin/analytics"
                  icon={<ChartLine />}
                  text="Analytics"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/admin/calendar"
                  icon={<CalendarCheck2 />}
                  text="Calendar"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/admin/AdminPackages"
                  icon={<Dumbbell />}
                  text="Packages"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/admin/AdminPlans"
                  icon={<ScrollText />}
                  text="Plans"
                />
              </li>
            </ul>

            <div className="flex-grow" />

            <ul className="mb-4 flex list-none flex-col gap-2 px-4">
              <li>
                <NavButton
                  href="/admin/user"
                  icon={<Settings />}
                  text="Website Settings"
                />
              </li>
              <li>
                <NavButton
                  href="/admin/Logout"
                  icon={<LogOut />}
                  text="Logout"
                />
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Mobile Header */}
      <div className="fixed left-0 top-0 z-50 flex w-full justify-between bg-gray-900 p-4 text-white md:hidden">
        <h1 className="text-xl font-bold">
          CONNOR<span className="text-blue-600">SNOW</span>
        </h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Spacer to push content below fixed header */}
      {isMenuOpen && (
        <div className="fixed left-0 top-12 z-40 w-full space-y-4 bg-gray-900 px-4 py-4 text-white md:hidden">
          <Link to="/" className="block hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="block hover:text-gray-400">
            About
          </Link>
          <Link to="#" className="block hover:text-gray-400">
            Plans
          </Link>
          <Link to="/packages" className="block hover:text-gray-400">
            Packages
          </Link>
          <Link to="/contact" className="block hover:text-gray-400">
            Contact
          </Link>
          <Link
            to="/"
            className="block rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-500"
          >
            Logout
          </Link>
        </div>
      )}
    </>
  );
};

const NavButton = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: JSX.Element;
  text: string;
}) => (
  <button className="flex w-full rounded-xl text-left transition duration-300 ease-in-out hover:bg-gray-400">
    <a
      href={href}
      className="flex w-full gap-2 px-4 py-2 font-normal text-white hover:font-bold hover:text-black"
    >
      {icon}
      {text}
    </a>
  </button>
);
