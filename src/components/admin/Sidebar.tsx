import React from "react";
import {
  LayoutDashboard,
  User,
  ChartLine,
  CalendarCheck2,
  Dumbbell,
  ScrollText,
  Settings,
  LogOut
} from "lucide-react";

export const Sidebar = () => {
  return (
    <section className="bg-gray-900 text-white md:w-64 hidden md:flex flex-col">
      <div className="flex flex-col h-screen">
        <div className="py-10 bg-gray-900 p-4">
          <h1 className="text-2xl font-bold px-2">
            CONNOR<span className="text-blue-600">SNOW</span>
          </h1>
        </div>

        <nav className="flex flex-col flex-grow">
          {/* Top Nav */}
          <ul className="flex flex-col gap-2 mt-4">
            <li className="list-none px-4">
              <NavButton href="/admin/dashboard" icon={<LayoutDashboard />} text="Dashboard" />
            </li>
            <li className="list-none px-4">
              <NavButton href="/admin/user" icon={<User />} text="Clients" />
            </li>
            <li className="list-none px-4">
              <NavButton href="/admin/analytics" icon={<ChartLine />} text="Analytics" />
            </li>
            <li className="list-none px-4">
              <NavButton href="/admin/calendar" icon={<CalendarCheck2 />} text="Calendar" />
            </li>
            <li className="list-none px-4">
              <NavButton href="/admin/user" icon={<Dumbbell />} text="Packages" />
            </li>
            <li className="list-none px-4">
              <NavButton href="/admin/user" icon={<ScrollText />} text="Plans" />
            </li>
          </ul>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Bottom Nav */}
          <ul className="flex flex-col gap-2 px-4 list-none mb-4">
            <li>
              <NavButton href="/admin/user" icon={<Settings />} text="Website Settings" />
            </li>
            <li>
              <NavButton href="/" icon={<LogOut />} text="Logout" />
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

// REF: (reuseable components and styling https://medium.com/@rashmipatil24/reusable-react-components-7b025f232ca4)
const NavButton = ({ href, icon, text }: { href: string; icon: JSX.Element; text: string }) => (
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
