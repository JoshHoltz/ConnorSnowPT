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
      <section className="hidden md:flex bg-gray-900 text-white md:w-64 flex-col">
        <div className="flex flex-col h-screen">
          <div className="py-10 bg-gray-900 p-4">
            <h1 className="text-2xl font-bold px-2">
              CONNOR<span className="text-blue-600">SNOW</span>
            </h1>
          </div>

          <nav className="flex flex-col flex-grow">
            <ul className="flex flex-col gap-2 mt-4">
              <li className="list-none px-4">
                <NavButton
                  href="/admin/dashboard"
                  icon={<LayoutDashboard />}
                  text="Dashboard"
                />
              </li>
              <li className="list-none px-4">
                <NavButton href="/admin/user" icon={<User />} text="Clients" />
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
                  href="/admin/user"
                  icon={<Dumbbell />}
                  text="Packages"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/admin/user"
                  icon={<ScrollText />}
                  text="Plans"
                />
              </li>
            </ul>

            <div className="flex-grow" />

            <ul className="flex flex-col gap-2 px-4 list-none mb-4">
              <li>
                <NavButton
                  href="/admin/user"
                  icon={<Settings />}
                  text="Website Settings"
                />
              </li>
              <li>
                <NavButton href="/" icon={<LogOut />} text="Logout" />
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gray-900 p-4 text-white flex justify-between md:hidden">
        <h1 className="text-xl font-bold">
          CONNOR<span className="text-blue-600">SNOW</span>
        </h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Spacer to push content below fixed header */}
      {isMenuOpen && (
        <div className="fixed top-12 left-0 w-full bg-gray-900 text-white px-4 py-4 space-y-4 z-40 md:hidden">
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
            className="block bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 text-center rounded"
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
  <button className="flex w-full rounded-xl text-left hover:bg-gray-400 transition duration-300 ease-in-out">
    <a
      href={href}
      className="flex gap-2 text-white hover:text-black font-normal hover:font-bold py-2 px-4 w-full"
    >
      {icon}
      {text}
    </a>
  </button>
);
