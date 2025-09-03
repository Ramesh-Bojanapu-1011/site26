import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import serviceHeroVideo from "../assets/service.mp4";
import s1 from "../assets/s1.webp";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.webp";
import s5 from "../assets/s5.webp";
import s6 from "../assets/s6.jpeg";
import ex1 from "../assets/ex1.webp";
import ex2 from "../assets/exm2.jpg";
import ex3 from "../assets/exm3.jpeg";
import ex4 from "../assets/ex4.avif";
import ex5 from "../assets/exm5.webp";
import cta from "../assets/cta.jpg";

// Service data will use translation keys
const servicesData = [
  {
    title: "services.residential.title",
    description: "services.residential.description",
    image: s1,
    link: "/residential-construction",
  },
  {
    title: "services.commercial.title",
    description: "services.commercial.description",
    image: s2,
    link: "/commercial-construction",
  },
  {
    title: "services.interior.title",
    description: "services.interior.description",
    image: s3,
    link: "/interior-fitouts",
  },
  {
    title: "services.renovation.title",
    description: "services.renovation.description",
    image: s4,
    link: "/renovation-remodeling",
  },
  {
    title: "services.design.title",
    description: "services.design.description",
    image: s5,
    link: "/design-planning-execution",
  },
  {
    title: "services.project.title",
    description: "services.project.description",
    image: s6,
    link: "/project-management-consultation",
  },
];
const images = [
  {
    src: ex1,
    title: "projects.luxuryVilla.title",
    desc: "projects.luxuryVilla.desc",
  },
  {
    src: ex2,
    title: "projects.corporateOffice.title",
    desc: "projects.corporateOffice.desc",
  },
  {
    src: ex3,
    title: "projects.retailStore.title",
    desc: "projects.retailStore.desc",
  },
  {
    src: ex4,
    title: "projects.urbanApartment.title",
    desc: "projects.urbanApartment.desc",
  },
  {
    src: ex5,
    title: "projects.signatureProject.title",
    desc: "projects.signatureProject.desc",
  },
];
const communityPrograms = [
  {
    title: "community.landmark.title",
    description: "community.landmark.description",
    stat: "community.landmark.stat",
  },
  {
    title: "community.green.title",
    description: "community.green.description",
    stat: "community.green.stat",
  },
  {
    title: "community.training.title",
    description: "community.training.description",
    stat: "community.training.stat",
  },
  {
    title: "community.infrastructure.title",
    description: "community.infrastructure.description",
    stat: "community.infrastructure.stat",
  },
  {
    title: "community.safety.title",
    description: "community.safety.description",
    stat: "community.safety.stat",
  },
  {
    title: "community.innovation.title",
    description: "community.innovation.description",
    stat: "community.innovation.stat",
  },
];

export default function ServiceHero() {
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
      className={`${theme === "dark" ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-black"}`}
    >
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 object-cover w-full h-full"
          src={serviceHeroVideo}
          autoPlay
          loop
          muted
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1
            className="text-5xl font-bold md:text-6xl"
            style={{ color: theme === "dark" ? "#fff" : "#fff" }}
          >
            {t("hero.title")}{" "}
            <span style={{ color: "#facc15" }}>{t("hero.vision")}</span>
          </h1>
          <p
            className={`mt-6 text-xl md:text-2xl max-w-3xl ${
              theme === "dark" ? "text-white" : "text-white"
            }`}
          >
            {t("hero.description1")}{" "}
            <span className="font-semibold text-yellow-400">
              {t("hero.projectManagement")}
            </span>
            ,
            <span className="font-semibold text-yellow-400">
              {" "}
              {t("hero.designPlanning")}
            </span>
            , {t("hero.and")}
            <span className="font-semibold text-yellow-400">
              {t("hero.constructionExecution")}
            </span>
            . {t("hero.description2")}
          </p>
        </div>
      </section>
      {/* Service Steps Section */}

      {/* Services Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-[#111111]" : "bg-[#f9fafb]"}`}
      >
        <div className="container px-4 mx-auto">
          <h2
            className="mb-12 text-4xl font-bold text-center"
            style={{ color: "#fecc15" }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("services.heading")}
          </h2>

          <div className="grid gap-16">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="grid items-center gap-8 md:grid-cols-2"
                data-aos="fade-up"
                data-aos-delay={120 + index * 40}
              >
                {/* Image */}
                <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
                  <img
                    src={service.image}
                    alt={t(service.title)}
                    className="object-cover w-full border border-gray-300 shadow-xl h-80 rounded-2xl"
                    data-aos="fade-up"
                    data-aos-delay={140 + index * 40}
                  />
                </div>

                {/* Content */}
                <div className={`${index % 2 !== 0 ? "md:order-1" : ""}`}>
                  <h3
                    className="mb-4 text-3xl font-semibold"
                    style={{ color: "#fecc15" }}
                    data-aos="fade-up"
                    data-aos-delay={160 + index * 40}
                  >
                    {t(service.title)}
                  </h3>
                  <p
                    className={
                      (theme === "dark"
                        ? "text-gray-300 mb-6"
                        : "text-gray-800 mb-6") +
                      " text-justify leading-relaxed"
                    }
                    data-aos="fade-up"
                    data-aos-delay={180 + index * 40}
                  >
                    {t(service.description)}
                  </p>
                  <Link
                    to={service.link}
                    className={
                      `px-6 py-3 font-semibold rounded-lg transition inline-block shadow-md ` +
                      (theme === "dark"
                        ? "bg-[#fecc15] text-black hover:bg-yellow-400"
                        : "bg-yellow-400 text-white hover:bg-blue-500")
                    }
                    data-aos="fade-up"
                    data-aos-delay={200 + index * 40}
                  >
                    {t("services.readMore")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`py-16 ${theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#f5f5f5]"}`}
      >
        <div className="container px-4 mx-auto">
          <h2
            className="mb-12 text-4xl font-bold text-center"
            style={{ color: theme === "dark" ? "#FFD700" : "#333" }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {t("steps.heading")}
          </h2>
          <div className="grid gap-10 md:grid-cols-4">
            {/* Step 1 */}
            <div
              className="flex flex-col items-center text-center transition transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="320"
            >
              <div
                className={
                  `rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg ` +
                  (theme === "dark" ? "bg-[#333]" : "bg-[#fff]")
                }
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#FFD700" }}
                >
                  1
                </span>
              </div>
              <h3
                className="mb-2 text-xl font-semibold"
                style={{ color: theme === "dark" ? "#FFD700" : "#333" }}
              >
                {t("steps.1.title")}
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                {t("steps.1.desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="flex flex-col items-center text-center transition transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="360"
            >
              <div
                className={
                  `rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg ` +
                  (theme === "dark" ? "bg-[#333]" : "bg-[#fff]")
                }
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#FFD700" }}
                >
                  2
                </span>
              </div>
              <h3
                className="mb-2 text-xl font-semibold"
                style={{ color: theme === "dark" ? "#FFD700" : "#333" }}
              >
                {t("steps.2.title")}
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                {t("steps.2.desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="flex flex-col items-center text-center transition transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div
                className={
                  `rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg ` +
                  (theme === "dark" ? "bg-[#333]" : "bg-[#fff]")
                }
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#FFD700" }}
                >
                  3
                </span>
              </div>
              <h3
                className="mb-2 text-xl font-semibold"
                style={{ color: theme === "dark" ? "#FFD700" : "#333" }}
              >
                {t("steps.3.title")}
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                {t("steps.3.desc")}
              </p>
            </div>

            {/* Step 4 */}
            <div
              className="flex flex-col items-center text-center transition transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="440"
            >
              <div
                className={
                  `rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg ` +
                  (theme === "dark" ? "bg-[#333]" : "bg-[#fff]")
                }
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#FFD700" }}
                >
                  4
                </span>
              </div>
              <h3
                className="mb-2 text-xl font-semibold"
                style={{ color: theme === "dark" ? "#FFD700" : "#333" }}
              >
                {t("steps.4.title")}
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                {t("steps.4.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className={`w-full py-16 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-50"} overflow-hidden`}
      >
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2
            className={`text-4xl md:text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {t("projects.heading")}{" "}
            <span className="text-yellow-400">{t("projects.projects")}</span>
          </h2>
          <p
            className={`mt-4 text-lg md:text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
            data-aos="fade-up"
            data-aos-delay="420"
          >
            {t("projects.subheading")}
          </p>
        </div>

        {/* Grid container */}
        <div className="grid max-w-6xl gap-6 mx-auto lg:grid-cols-3">
          {/* ex5 big image (on desktop spans 2 rows, single col on mobile) */}
          <div
            className="relative overflow-hidden shadow-lg group rounded-2xl md:row-span-2"
            data-aos="fade-up"
            data-aos-delay="440"
          >
            <img
              src={images[4].src}
              alt={t(images[4].title)}
              className="object-cover w-full h-full transition-all duration-500 group-hover:opacity-0"
              data-aos="fade-up"
              data-aos-delay="460"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 bg-yellow-400 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
              <h3 className="px-4 py-2 mb-2 text-2xl font-bold text-black rounded-lg">
                {t(images[4].title)}
              </h3>
              <p className="px-3 py-1 text-lg text-black rounded">
                {t(images[4].desc)}
              </p>
            </div>
          </div>

          {/* Other images */}
          {images.slice(0, 4).map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden shadow-lg group rounded-2xl"
              data-aos="fade-up"
              data-aos-delay={500 + idx * 40}
            >
              <img
                src={img.src}
                alt={t(img.title)}
                className="object-cover w-full h-full transition-all duration-500 group-hover:opacity-0"
                data-aos="fade-up"
                data-aos-delay={520 + idx * 40}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 bg-yellow-400 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                <h3 className="px-3 py-1 mb-1 text-xl font-bold text-black rounded">
                  {t(img.title)}
                </h3>
                <p className="px-2 py-1 text-black rounded">{t(img.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Impact Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-100"} overflow-hidden`}
      >
        <div className="container px-4 mx-auto">
          {/* Heading */}
          <h2
            className={`text-4xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-black"}`}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {t("community.heading")}{" "}
            <span style={{ color: "#fecc15" }}>
              {t("community.socialResponsibility")}
            </span>
          </h2>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {communityPrograms.map((program, index) => (
              <div
                key={index}
                className={`pt-3 pb-6 px-6 rounded-lg shadow-md flex flex-col justify-between ${theme === "dark" ? "bg-[#222]" : "bg-white"}`}
                data-aos="fade-up"
                data-aos-delay={620 + index * 40}
              >
                <div>
                  <h3
                    className={`text-xl text-justify font-semibold mb-2 ${theme === "dark" ? "text-[#fecc15]" : "text-black"}`}
                    data-aos="fade-up"
                    data-aos-delay={640 + index * 40}
                  >
                    {t(program.title)}
                  </h3>
                  <p
                    className={`${theme === "dark" ? "text-gray-200" : "text-gray-700"} text-justify mb-3`}
                    data-aos="fade-up"
                    data-aos-delay={660 + index * 40}
                  >
                    {t(program.description)}
                  </p>
                </div>
                <div className="flex justify-center">
                  <span
                    className="inline-block bg-[#fecc15] rounded-full text-white font-semibold align-middle px-4 py-2"
                    data-aos="fade-up"
                    data-aos-delay={680 + index * 40}
                  >
                    {t(program.stat)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Tools Section */}
      <section
        className={`w-full py-16 ${theme === "dark" ? "bg-[#181818]" : "bg-[#fff]"} overflow-hidden`}
      >
        <div className="grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2
              className="mb-6 text-4xl font-bold leading-tight md:text-5xl"
              style={{ color: "#facc15" }}
              data-aos="fade-up"
              data-aos-delay="700"
            >
              {t("cta.heading")}
            </h2>
            <p
              className={`text-lg md:text-xl mb-8 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
              data-aos="fade-up"
              data-aos-delay="720"
            >
              {t("cta.desc")}
            </p>
            <a
              href="/contactus"
              className={
                `inline-block font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ` +
                (theme === "dark"
                  ? "bg-yellow-400 text-black hover:bg-[#00BFFF] hover:text-white"
                  : "bg-yellow-400 text-black hover:bg-[#00BFFF] hover:text-white")
              }
              data-aos="fade-up"
              data-aos-delay="740"
            >
              {t("cta.button")}
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-delay="760"
          >
            <img
              src={cta}
              alt={t("cta.imgAlt")}
              className="rounded-2xl shadow-lg w-full md:w-[90%] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
