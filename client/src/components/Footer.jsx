import React from "react";
import { BsBarChart, BsFileEarmarkText, BsMic, BsRobot } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  const footerGroups = [
    {
      title: "Platform",
      static: true,
      links: [
        { label: "Mock Interviews", to: "/interview" },
        { label: "Reports", to: "/history" },
        { label: "Pricing", to: "/pricing" },
      ],
    },
    {
      title: "Features",
      static: true,
      links: [
        { label: "Resume Analysis", to: "/interview", icon: <BsFileEarmarkText size={14} /> },
        { label: "Voice Interview", to: "/interview", icon: <BsMic size={14} /> },
        { label: "Analytics", to: "/history", icon: <BsBarChart size={14} /> },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/" },
        { label: "Contact", to: "/" },
        { label: "Support", to: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-[#f3f3f3] px-6 pt-4 pb-8 sm:px-10">
      <div className="mx-auto w-full max-w-6xl border-t border-gray-200 pt-8">
        <div className="flex flex-col gap-5">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-black p-2.5 text-white">
                <BsRobot size={18} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                InterviewIQ.AI
              </h2>
            </div>

            <h3 className="text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl">
              Practice smarter. Interview better.
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              AI-powered interview preparation built for realistic practice,
              sharper communication, and measurable improvement across every
              attempt.
            </p>
          </div>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                {group.title}
              </h4>

              <div className="space-y-3">
                {group.static
                  ? group.links.map((link) => (
                      <div
                        key={link.label}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        {link.icon || null}
                        <span>{link.label}</span>
                      </div>
                    ))
                  : group.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
                      >
                        {link.icon || null}
                        <span>{link.label}</span>
                      </Link>
                    ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-200 py-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>Built for mock interviews, feedback loops, and steady improvement.</p>
          <p>InterviewIQ.AI © 2026</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
