import React from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import aboutHero from "../assets/abouthero.mp4";

import e1 from "../assets/ex1.jpg";
import e2 from "../assets/ex2.webp";
import e3 from "../assets/ex3.jpg";
import e4 from "../assets/ex4.jpg";
import e5 from "../assets/ex5.jpg";
import e6 from "../assets/ex6.jpg";
import awardsImg from "../assets/awards.webp";
import c1 from "../assets/c1.avif";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.png";
import c4 from "../assets/c4.webp";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.png";
import c7 from "../assets/c7.png";
import c8 from "../assets/c8.png";
import c9 from "../assets/c9.png";
import c10 from "../assets/c10.jpg";
import mission from "../assets/mission.avif";
import visionImg from "../assets/v.png";
import missionImg1 from "../assets/m.png";

const logos = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10];

const team = [
  { img: e1, nameKey: "team1_name", roleKey: "team1_role" },
  { img: e2, nameKey: "team2_name", roleKey: "team2_role" },
  { img: e3, nameKey: "team3_name", roleKey: "team3_role" },
  { img: e4, nameKey: "team4_name", roleKey: "team4_role" },
  { img: e5, nameKey: "team5_name", roleKey: "team5_role" },
  { img: e6, nameKey: "team6_name", roleKey: "team6_role" },
];

const timelineData = [
  {
    year: "2018",
    titleKey: "timeline_2018_title",
    descKey: "timeline_2018_desc",
    align: "left",
  },
  {
    year: "2019",
    titleKey: "timeline_2019_title",
    descKey: "timeline_2019_desc",
    align: "right",
  },
  {
    year: "2020",
    titleKey: "timeline_2020_title",
    descKey: "timeline_2020_desc",
    align: "left",
  },
  {
    year: "2021",
    titleKey: "timeline_2021_title",
    descKey: "timeline_2021_desc",
    align: "right",
  },
  {
    year: "2022",
    titleKey: "timeline_2022_title",
    descKey: "timeline_2022_desc",
    align: "left",
  },
  {
    year: "2023",
    titleKey: "timeline_2023_title",
    descKey: "timeline_2023_desc",
    align: "right",
  },
  {
    year: "2024",
    titleKey: "timeline_2024_title",
    descKey: "timeline_2024_desc",
    align: "left",
  },
];
const achievements = [
  "achieve1",
  "achieve2",
  "achieve3",
  "achieve4",
  "achieve5",
];

export default function AboutPage() {
  const { t } = useTranslation();
  // Theme state synced with Header
  const [theme, setTheme] = React.useState("light");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem("theme") || "light";
        setTheme(newTheme);
      };
      window.addEventListener("theme-changed", handleThemeChange);
      window.addEventListener("storage", handleThemeChange);
      // Initialize AOS for section animations
      AOS.init({ once: false, duration: 800 });
      return () => {
        window.removeEventListener("theme-changed", handleThemeChange);
        window.removeEventListener("storage", handleThemeChange);
      };
    }
  }, []);
  return (
    <div
      className={`${theme === "dark" ? "min-h-screen bg-black text-white overflow-x-hidden" : "min-h-screen bg-white text-black overflow-x-hidden"}`}
    >
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 object-cover w-full h-full"
          src={aboutHero}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1
            className="text-4xl font-bold md:text-6xl"
            style={{ color: theme === "dark" ? "#fff" : "#fff" }}
          >
            {t("aboutus_hero_title1")}{" "}
            <span style={{ color: "#facc15" }}>{t("aboutus_hero_title2")}</span>
            , {t("aboutus_hero_title3")}
          </h1>
          <p
            className={`mt-4 max-w-3xl text-lg md:text-xl ${theme === "dark" ? "text-white" : "text-white"}`}
          >
            {t("aboutus_hero_desc")}
          </p>
        </div>
      </section>

      {/* Our Growth Through Years Timeline Section */}
      <section
        className={`w-full py-16 overflow-hidden ${theme === "dark" ? "bg-[#181818]" : "bg-[#fff]"}`}
      >
        <div className="max-w-4xl px-4 mx-auto">
          <h2
            className="text-4xl font-bold text-center text-yellow-400 mb-14"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("aboutus_timeline_title")}
          </h2>
          <div className="relative">
            <div className="absolute top-0 w-1 h-full transform -translate-x-1/2 bg-yellow-400 left-1/2"></div>
            <div className="flex flex-col gap-16">
              {timelineData.map((item) => {
                const isLeft = item.align === "left";
                return (
                  <div
                    key={item.year}
                    className="relative flex items-center min-h-[180px]"
                    data-aos="fade-up"
                    data-aos-delay="150"
                  >
                    {/* Left side */}
                    {isLeft && (
                      <div className="flex justify-end w-1/2 pr-8">
                        <div
                          className={
                            `rounded-lg shadow-lg p-8 w-full max-w-md ml-auto ` +
                            (theme === "dark" ? "bg-[#222]" : "bg-white")
                          }
                        >
                          <div className="mb-2 font-bold text-yellow-400">
                            {item.year}
                          </div>
                          <h3
                            className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                          >
                            {t(item.titleKey)}
                          </h3>
                          <p
                            className={
                              theme === "dark"
                                ? "text-gray-200"
                                : "text-gray-700"
                            }
                          >
                            {t(item.descKey)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Year circle */}
                    <div className="absolute z-10 flex items-center justify-center w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                      <span className="px-4 py-2 text-lg font-bold text-white bg-yellow-400 rounded-full shadow-lg">
                        {item.year}
                      </span>
                    </div>

                    {/* Right side */}
                    {!isLeft && <div className="w-1/2"></div>}
                    {item.align === "right" && (
                      <div className="flex justify-start w-1/2 pl-8">
                        <div
                          className={
                            `rounded-lg shadow-lg p-8 w-full max-w-md mr-auto ` +
                            (theme === "dark" ? "bg-[#222]" : "bg-white")
                          }
                        >
                          <div className="mb-2 font-bold text-yellow-400">
                            {item.year}
                          </div>
                          <h3
                            className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                          >
                            {t(item.titleKey)}
                          </h3>
                          <p
                            className={
                              theme === "dark"
                                ? "text-gray-200"
                                : "text-gray-700"
                            }
                          >
                            {t(item.descKey)}
                          </p>
                        </div>
                      </div>
                    )}
                    {isLeft && <div className="w-1/2"></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div
        className={`w-full py-16 relative font-sans antialiased ${theme === "dark" ? "bg-[#181818] text-white" : "bg-gray-100 text-gray-800"}`}
      >
        <div className="container px-6 mx-auto">
          {/* Title and description */}
          <div
            className="mb-12 text-center lg:text-left"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1
              className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-yellow-400" : "text-yellow-400"}`}
            >
              {t("aboutus_mission_vision_title")}
            </h1>
            <p
              className={`mt-2 max-w-4xl mx-auto lg:mx-0 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              {t("aboutus_mission_vision_desc")}
            </p>
          </div>

          {/* Main grid */}
          <div className="grid items-stretch gap-8 lg:grid-cols-3">
            {/* Vision Card */}
            <div
              className={`p-8 rounded-3xl shadow-lg flex flex-col items-center text-center lg:text-left lg:items-start ${theme === "dark" ? "bg-[#222]" : "bg-white"}`}
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <div className="p-4 mb-4 bg-yellow-400 rounded-full">
                <img
                  src={visionImg}
                  alt="Vision icon"
                  className="object-contain w-8 h-8"
                />
              </div>
              <h3
                className={`text-xl md:text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              >
                {t("aboutus_vision_title")}
              </h3>
              <p
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                {t("aboutus_vision_desc")}
              </p>
            </div>

            {/* Center Image */}
            <div
              className="flex items-center justify-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                src={mission}
                alt="Team collaboration"
                className="w-full h-full object-cover rounded-3xl shadow-2xl max-h-[400px]"
              />
            </div>

            {/* Mission Card */}
            <div
              className={`p-8 rounded-3xl shadow-lg flex flex-col items-center text-center lg:text-left lg:items-start ${theme === "dark" ? "bg-[#222]" : "bg-white"}`}
              data-aos="fade-up"
              data-aos-delay="350"
            >
              <div className="p-4 mb-4 bg-yellow-400 rounded-full">
                <img
                  src={missionImg1}
                  alt="Mission icon"
                  className="object-contain w-8 h-8"
                />
              </div>
              <h3
                className={`text-xl md:text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              >
                {t("aboutus_mission_title")}
              </h3>
              <p
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                {t("aboutus_mission_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* End Timeline Section */}
      {/* Awards & Certificates Section */}
      <section
        className={`py-20 ${theme === "dark" ? "bg-[#000]" : "bg-white"} overflow-hidden`}
      >
        <div className="grid items-center gap-10 px-6 mx-auto max-w-7xl md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div
            className="flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${theme === "dark" ? "text-yellow-400" : "text-yellow-400"}`}
            >
              {t("aboutus_awards_title")}
            </h2>
            <p
              className={`text-lg leading-relaxed text-justify ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              {t("aboutus_awards_desc")}
            </p>
            <ul className="pl-5 space-y-3 list-disc">
              {achievements.map((item, index) => (
                <li
                  key={index}
                  className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <img
              src={awardsImg}
              alt="Awards and Achievements"
              className="object-cover w-full h-full shadow-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section
        className={`py-20 ${theme === "dark" ? "bg-[#181818]" : "bg-white"} overflow-hidden`}
      >
        <div className="px-6 mx-auto max-w-7xl">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-14 ${theme === "dark" ? "text-yellow-400" : "text-yellow-400"}`}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {t("aboutus_team_title")}
          </h2>

          <div className="grid gap-10 lg:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="relative overflow-hidden shadow-lg rounded-2xl group"
                data-aos="fade-up"
                data-aos-delay={450 + index * 50}
              >
                {/* Team Member Image */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-cover w-full transition duration-500 transform h-80 group-hover:scale-110"
                />

                {/* Yellow overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 transition duration-500 opacity-0 bg-yellow-400/50 group-hover:opacity-100">
                  <a
                    href="#"
                    className={`text-black text-2xl hover:text-white`}
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="#"
                    className={`text-black text-2xl hover:text-white`}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className={`text-black text-2xl hover:text-white`}
                  >
                    <FaInstagram />
                  </a>
                </div>

                {/* Name and Role */}
                <div
                  className={`absolute bottom-0 left-0 right-0 ${theme === "dark" ? "bg-black/80" : "bg-white/90"} text-center py-4`}
                >
                  <h3
                    className={`text-lg font-semibold ${theme === "dark" ? "text-yellow-400" : "text-gray-900"}`}
                  >
                    {t(member.nameKey)}
                  </h3>
                  <p
                    className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {t(member.roleKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`w-full py-12 relative w-full ${theme === "dark" ? "bg-[#000]" : "bg-[#f9f9f9]"} overflow-hidden`}
      >
        <div className="px-6 mx-auto max-w-7xl">
          <h2
            className={`text-3xl font-bold text-center ${theme === "dark" ? "text-yellow-400" : "text-gray-800"}`}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {t("aboutus_partners_title")}
          </h2>
          <p
            className={`text-lg text-center mt-2 mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            data-aos="fade-up"
            data-aos-delay="520"
          >
            {t("aboutus_partners_desc")}
          </p>

          {/* SCROLLING CONTAINER */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll hover:[animation-play-state:paused] ">
              {[...logos, ...logos].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center flex-shrink-0 w-48 mx-4 transition duration-500 h-28 hover:scale-110"
                >
                  <img
                    src={logo}
                    alt={`Partner ${idx + 1}`}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INLINE CSS BELOW SECTION */}
        <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      </section>
    </div>
  );
}
