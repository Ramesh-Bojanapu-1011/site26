import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import home2Video from "../assets/herohome2.mp4";

import re1 from "../assets/re1.jpg";
import re2 from "../assets/re2.webp";
import re3 from "../assets/re3.webp";
import re4 from "../assets/re4.jpg";
import re5 from "../assets/re5.jpg";
import re6 from "../assets/re6.avif";
import aboutus from "../assets/aboutus.jpg";
import ctaImg from "../assets/cta.jpg";

export default function Home2() {
  const { t } = useTranslation();
  // Latest Projects state from localStorage
  const [latestProjects, setLatestProjects] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("latestProjects");
    setLatestProjects(stored ? JSON.parse(stored) : []);
    const sync = () => {
      const s = localStorage.getItem("latestProjects");
      setLatestProjects(s ? JSON.parse(s) : []);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
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
      return () => {
        window.removeEventListener("theme-changed", handleThemeChange);
        window.removeEventListener("storage", handleThemeChange);
      };
    }
  }, []);

  const images = [re1, re2, re3, re4, re5, re6];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [images.length]);

  const testimonials = [
    {
      title: t("testimonial1_title"),
      text: t("testimonial1_text"),
      name: t("testimonial1_name"),
      role: t("testimonial1_role"),
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      title: t("testimonial2_title"),
      text: t("testimonial2_text"),
      name: t("testimonial2_name"),
      role: t("testimonial2_role"),
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
    },
    {
      title: t("testimonial3_title"),
      text: t("testimonial3_text"),
      name: t("testimonial3_name"),
      role: t("testimonial3_role"),
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4,
    },
    {
      title: t("testimonial4_title"),
      text: t("testimonial4_text"),
      name: t("testimonial4_name"),
      role: t("testimonial4_role"),
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
      rating: 5,
    },
    {
      title: t("testimonial5_title"),
      text: t("testimonial5_text"),
      name: t("testimonial5_name"),
      role: t("testimonial5_role"),
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
    },
    {
      title: t("testimonial6_title"),
      text: t("testimonial6_text"),
      name: t("testimonial6_name"),
      role: t("testimonial6_role"),
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      rating: 5,
    },
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const prev = () =>
    setCarouselIndex(
      (i) => (i - 3 + testimonials.length) % testimonials.length,
    );
  const next = () => setCarouselIndex((i) => (i + 3) % testimonials.length);
  let cards = testimonials.slice(carouselIndex, carouselIndex + 3);
  if (cards.length < 3) {
    cards = cards.concat(testimonials.slice(0, 3 - cards.length));
  }
  return (
    <div
      className={`${theme === "dark" ? "min-h-screen  text-white" : "min-h-screen  text-white"}`}
    >
      {/* Hero Section */}
      <section
        className="relative w-full h-screen overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <video
          className="absolute top-0 left-0 object-cover w-full h-full"
          src={home2Video}
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
            <span style={{ color: "#facc15" }}>{t("build")}</span>{" "}
            {t("without_boundaries")}
          </h1>
          <p
            className={`mt-4 max-w-3xl text-lg md:text-xl ${theme === "dark" ? "text-white" : "text-white"}`}
          >
            {t("home2_hero_desc")}
          </p>

          <button
            className={
              `mt-6 px-6 py-3 rounded-lg shadow transition font-semibold ` +
              (theme === "dark"
                ? "bg-[#facc15] text-white hover:bg-[#facc15]"
                : "bg-[#facc15] text-white hover:bg-[#facc15]")
            }
            onClick={() => {
              const el = document.getElementById("about-us");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("get_started")}
          </button>
        </div>
      </section>

      <section
        className={`w-full py-16 sm:py-20 ${
          theme === "dark" ? "bg-[#000]" : "bg-[#FFF]"
        } overflow-hidden`}
        id="about-us"
      >
        <div className="grid items-center gap-12 px-4 mx-auto max-w-7xl sm:px-6 md:grid-cols-2 md:gap-16">
          {/* LEFT CONTENT */}
          <div id="about-us">
            <h2
              className="mb-4 text-3xl font-bold leading-snug text-yellow-400 sm:text-4xl md:text-5xl sm:mb-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t("building_trust")}
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-relaxed ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              {t("home2_about_desc")}
            </p>
            <ul
              className={`space-y-3 sm:space-y-4 text-base sm:text-lg ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
              data-aos="fade-up"
              data-aos-delay="140"
            >
              <li className="grid grid-cols-[auto_1fr] gap-2">
                <span className="text-yellow-400">•</span>
                {t("home2_about_bullet1")}
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-2">
                <span className="text-yellow-400">•</span>
                {t("home2_about_bullet2")}
              </li>
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="grid justify-center"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            <img
              src={aboutus}
              alt="About Us"
              className="object-cover w-full h-auto max-w-xs shadow-2xl rounded-2xl sm:max-w-sm md:max-w-md lg:max-w-lg"
              data-aos="fade-up"
              data-aos-delay="180"
            />
          </div>
        </div>
      </section>

      {/* Special Offers Section */}

      <section
        className={`w-full py-16 sm:py-20 ${
          theme === "dark" ? "bg-[#222]" : "bg-gray-100"
        } overflow-hidden`}
        id="before-after"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="px-4 mx-auto text-center max-w-7xl">
          {/* Heading */}
          <h2
            className="mb-4 text-4xl font-bold"
            style={{ color: theme === "dark" ? "#fff" : "#000" }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("transformations_speak")}
          </h2>
          <p
            className={`text-lg mb-12 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
            data-aos="fade-up"
            data-aos-delay="220"
          >
            {t("transformations_desc")}
          </p>

          {/* Image Display */}
          <div
            className="relative w-full  h-[500px] max-w-full mx-auto"
            data-aos="fade-up"
            data-aos-delay="240"
          >
            <img
              src={images[currentIndex]}
              alt={`Result ${currentIndex + 1}`}
              className="w-full h-[500px] rounded-2xl shadow-lg transition-opacity duration-700"
              data-aos="fade-up"
              data-aos-delay="260"
            />
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section
        className={`w-full py-16 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-50"} overflow-hidden`}
        id="latest-projects"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <style>{`
       .flip-card { perspective: 1000px; }
       .flip-card-inner { transition: transform 0.6s; transform-style: preserve-3d; position: relative; }
       .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
       .flip-card-front, .flip-card-back {
         position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0.75rem;
       }
       .flip-card-front { z-index: 2; }
       .flip-card-back { transform: rotateY(180deg); z-index: 3; }
     `}</style>
        <div className="px-4 mx-auto max-w-7xl">
          <h2
            className="mb-8 text-4xl font-bold text-center"
            style={{ color: "#facc15" }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {t("latest_projects")}
          </h2>
          {latestProjects && latestProjects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="w-full h-64 flip-card"
                  data-aos="fade-up"
                  data-aos-delay={320 + idx * 40}
                >
                  <div
                    className={`flip-card-inner w-full h-full ${theme === "dark" ? "" : ""}`}
                  >
                    <div className="flip-card-front w-full h-full overflow-hidden rounded-xl shadow-lg flex items-center justify-center bg-white dark:bg-[#232b3b]">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="object-cover w-full h-full rounded-xl"
                      />
                    </div>
                    <div
                      className={`flip-card-back w-full h-full p-6 flex flex-col justify-center items-center rounded-xl shadow-lg ${theme === "dark" ? "bg-[#232b3b] text-white" : "bg-white text-[#22223b]"}`}
                    >
                      <div
                        className="mb-2 text-xl font-bold"
                        style={{ color: "#facc15" }}
                      >
                        {proj.title}
                      </div>
                      <div
                        className={`text-sm mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {proj.duration}
                      </div>
                      <div
                        className={`mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                      >
                        {proj.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section
        className={`w-full py-16 ${theme === "dark" ? "bg-[#000]" : "bg-[#fff]"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="max-w-5xl px-4 mx-auto">
          <h2
            className="mb-4 text-4xl font-bold text-center"
            style={{ color: "#fed700" }}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {t("what_clients_say")}
          </h2>
          <p
            className={`text-center text-lg mb-10 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
            data-aos="fade-up"
            data-aos-delay="420"
          >
            {t("clients_say_desc")}
          </p>

          {/* Carousel Logic - Arrows beside cards */}
          <div className="flex items-center justify-center w-full">
            <button
              onClick={prev}
              className={`w-12 h-12 flex items-center justify-center rounded-full shadow transition-colors mr-6 ${theme === "dark" ? "bg-[#fed700] text-white hover:bg-yellow-400" : "bg-[#fed700] text-white hover:bg-yellow-500"}`}
              aria-label="Previous"
            >
              &#8592;
            </button>
            <div className="w-full max-w-4xl">
              <div className="grid gap-8 lg:grid-cols-3">
                {cards.map((t, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl shadow-lg p-6 border-t-4 flex flex-col ${theme === "dark" ? "bg-[#181818] border-[#fed700]" : "bg-white border-[#fed700]"}`}
                    data-aos="fade-up"
                    data-aos-delay={440 + idx * 40}
                  >
                    <div className="flex items-center mb-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full mr-3 border-2 border-[#fed700]"
                      />
                      <div>
                        <div
                          className="font-semibold"
                          style={{ color: "#fed700" }}
                        >
                          {t.name}
                        </div>
                        <div
                          className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-600"}`}
                    >
                      {t.title}
                    </div>
                    <div
                      className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {t.text}
                    </div>
                    <div className="flex items-center mt-auto">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5"
                          style={{ color: "#Fed700" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${carouselIndex === i * 3 ? "bg-[#fed700]" : theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
                  ></span>
                ))}
              </div>
            </div>
            <button
              onClick={next}
              className={`w-12 h-12 flex items-center justify-center rounded-full shadow transition-colors ml-6 ${theme === "dark" ? "bg-[#fed700] text-white hover:bg-yellow-400" : "bg-[#fed700] text-white hover:bg-yellow-500"}`}
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>
      <section
        className={`py-20 ${
          theme === "dark" ? "bg-[#181818]" : "bg-white"
        } overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2
              className="mb-6 text-4xl font-bold leading-tight"
              style={{ color: "#facc15" }} // yellow-400
              data-aos="fade-up"
              data-aos-delay="500"
            >
              {t("ready_to_build")}
            </h2>
            <p
              className={`text-lg mb-8 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
              data-aos="fade-up"
              data-aos-delay="520"
            >
              {t("ready_to_build_desc")}
            </p>
            <a
              href="/contactus"
              className="inline-block bg-[#facc15] text-black font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay="540"
            >
              {t("contact")}
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="relative overflow-hidden shadow-xl rounded-2xl"
            data-aos="fade-up"
            data-aos-delay="560"
          >
            <img
              src={ctaImg}
              alt="Call to action"
              className="w-full h-[400px] object-cover transform transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 transition duration-500 opacity-0 bg-black/30 hover:opacity-100"></div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars Section */}
    </div>
  );
}
