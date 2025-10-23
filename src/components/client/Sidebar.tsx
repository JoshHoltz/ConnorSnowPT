import React, { useState } from "react";
import { ReviewTrainer } from "./reviewTrainer";
import { UseabilityTrial } from "./UsabilityTrial";
import { Link } from "react-router-dom";
import { Star, NotepadText } from 'lucide-react';

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
  const [showReviewScreen, setReviewScreen] = useState(false);
  const [showUsabilityTrials, setShowUsabilityTrials] = useState(false);

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
                  href="/client/home"
                  icon={<LayoutDashboard />}
                  text="Dashboard"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/client/workouts"
                  icon={<User />}
                  text="Workout Split"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/client/analytics"
                  icon={<ChartLine />}
                  text="Analytics"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/client/booking"
                  icon={<CalendarCheck2 />}
                  text="Book a Session"
                />
              </li>
              <li className="list-none px-4">
                <NavButton
                  href="/client/Messages"
                  icon={<Dumbbell />}
                  text="Message Trainer"
                />
              </li>
            </ul>

            {/* Bottom */}
            <div className="flex-grow" />

            <ul className="mb-4 flex list-none flex-col gap-2 px-4">
              <li>
                <NavButton
                  onClick={() => setShowUsabilityTrials(true)}
                  icon={<NotepadText />}
                  text="Site Feedback"
                />
              </li>
              <li>
                <NavButton
                  onClick={() => setReviewScreen(true)}
                  icon={<Star />}
                  text="Leave Review"
                />
              </li>
              <li>
                <NavButton
                  href="/client/logout"
                  icon={<LogOut />}
                  text="Logout"
                />
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Review screen */}
      {showReviewScreen && (
        <>
          {console.log("review screen pressed")}
          <ReviewTrainer onClose={() => setReviewScreen(false)} />
        </>
      )}

      {/* useabilty screen feedback */}
      {showUsabilityTrials && (
        <>
          {console.log("Usabilty review screen pressed")}
          <UseabilityTrial onClose={() => setReviewScreen(false)} />
        </>
      )}

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
          <Link to="/client/home" className="block hover:text-gray-400">
            Home
          </Link>
          <Link to="/client/workouts" className="block hover:text-gray-400">
            Workouts
          </Link>
          <Link to="/client/analytics" className="block hover:text-gray-400">
            Plans
          </Link>
          <Link to="/client/booking" className="block hover:text-gray-400">
            Book
          </Link>
          <Link to="/client/messages" className="block hover:text-gray-400">
            Messages
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
  onClick,
  icon,
  text,
}: {
  href?: string;
  onClick?: () => void;
  icon: JSX.Element;
  text: string;
}) => (
  <button
    onClick={onClick}
    className="flex w-full rounded-xl text-left transition duration-300 ease-in-out hover:bg-gray-400"
  >
    {href ? (
      <a
        href={href}
        className="flex w-full gap-2 px-4 py-2 font-normal text-white hover:font-bold hover:text-black"
      >
        {icon}
        {text}
      </a>
    ) : (
      <span className="flex w-full gap-2 px-4 py-2 font-normal text-white hover:font-bold hover:text-black">
        {icon}
        {text}
      </span>
    )}
  </button>
);
