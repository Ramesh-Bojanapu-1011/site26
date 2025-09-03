import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import blogHero from "../assets/blog.mp4";
import { useTranslation } from "react-i18next";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import { Link } from "react-router-dom";

export default function BlogHero() {
  const { t } = useTranslation();
  const categories = [
    {
      name: t("blog.categories.residential.name"),
      desc: t("blog.categories.residential.desc"),
    },
    {
      name: t("blog.categories.commercial.name"),
      desc: t("blog.categories.commercial.desc"),
    },
    {
      name: t("blog.categories.interior.name"),
      desc: t("blog.categories.interior.desc"),
    },
    {
      name: t("blog.categories.renovation.name"),
      desc: t("blog.categories.renovation.desc"),
    },
  ];
  const features = [
    {
      title: t("blog.features.residential.title"),
      description: t("blog.features.residential.description"),
      image: blog1,
      link: "/blog/1",
    },
    {
      title: t("blog.features.commercial.title"),
      description: t("blog.features.commercial.description"),
      image: blog2,
      link: "/blog/2",
    },
    {
      title: t("blog.features.interior.title"),
      description: t("blog.features.interior.description"),
      image: blog3,
      link: "/blog/3",
    },
  ];
  const services = [
    {
      name: t("blog.services.residential.name"),
      features: [
        t("blog.services.residential.features.0"),
        t("blog.services.residential.features.1"),
        t("blog.services.residential.features.2"),
        t("blog.services.residential.features.3"),
      ],
    },
    {
      name: t("blog.services.commercial.name"),
      features: [
        t("blog.services.commercial.features.0"),
        t("blog.services.commercial.features.1"),
        t("blog.services.commercial.features.2"),
        t("blog.services.commercial.features.3"),
      ],
    },
    {
      name: t("blog.services.interior.name"),
      features: [
        t("blog.services.interior.features.0"),
        t("blog.services.interior.features.1"),
        t("blog.services.interior.features.2"),
        t("blog.services.interior.features.3"),
      ],
    },
    {
      name: t("blog.services.renovation.name"),
      features: [
        t("blog.services.renovation.features.0"),
        t("blog.services.renovation.features.1"),
        t("blog.services.renovation.features.2"),
        t("blog.services.renovation.features.3"),
      ],
    },
  ];

  React.useEffect(() => {
    AOS.init({ once: false });
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
  // Read blogs from localStorage
  const [latestBlogs, setLatestBlogs] = React.useState([]);
  React.useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      setLatestBlogs(JSON.parse(stored));
    }
  }, []);

  // Myths and Facts
  const mythsFacts = [
    {
      myth: t("blog.myths.0.myth"),
      fact: t("blog.myths.0.fact"),
    },
    {
      myth: t("blog.myths.1.myth"),
      fact: t("blog.myths.1.fact"),
    },
    {
      myth: t("blog.myths.2.myth"),
      fact: t("blog.myths.2.fact"),
    },
    {
      myth: t("blog.myths.3.myth"),
      fact: t("blog.myths.3.fact"),
    },
    {
      myth: t("blog.myths.4.myth"),
      fact: t("blog.myths.4.fact"),
    },
    {
      myth: t("blog.myths.5.myth"),
      fact: t("blog.myths.5.fact"),
    },
  ];

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-black text-white"
          : "min-h-screen bg-white text-black"
      }
    >
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center w-full h-screen overflow-hidden"
        style={{ color: theme === "dark" ? "#fff" : "#222" }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 object-cover w-full h-full"
          src={blogHero}
          autoPlay
          muted
          loop
          data-aos="fade"
          data-aos-delay="120"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          data-aos="fade"
          data-aos-delay="140"
        ></div>

        {/* Content */}
        <div
          className="relative px-6 text-center"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-white"}`}
            data-aos="fade-up"
            data-aos-delay="180"
          >
            {t("blog.hero.title1")}{" "}
            <span
              className={
                theme === "dark" ? "text-yellow-400" : "text-yellow-400"
              }
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {t("blog.hero.title2")}
            </span>
          </h1>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-white" : "text-white"}`}
            data-aos="fade-up"
            data-aos-delay="220"
          >
            {t("blog.hero.desc1")}{" "}
            <span
              className={`${theme === "dark" ? "text-yellow-400" : "text-yellow-400"} font-semibold`}
              data-aos="zoom-in"
              data-aos-delay="240"
            >
              {t("blog.hero.desc2")}
            </span>
            {t("blog.hero.desc3")}
          </p>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-100"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="260"
      >
        <div
          className="px-6 mx-auto max-w-7xl"
          data-aos="fade-up"
          data-aos-delay="280"
        >
          <h2
            className="mb-12 text-4xl font-bold text-center md:text-5xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {t("blog.latest.title1")}{" "}
            <span className="text-yellow-500">{t("blog.latest.title2")}</span>
          </h2>
          <style>{`
            .flip-card { perspective: 1000px; }
            .flip-card-inner { transition: transform 0.6s; transform-style: preserve-3d; position: relative; }
            .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
            .flip-card-front, .flip-card-back {
              position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 1rem;
            }
            .flip-card-front { z-index: 2; }
            .flip-card-back { transform: rotateY(180deg); z-index: 3; }
          `}</style>
          {latestBlogs.length > 0 ? (
            <div
              className="grid gap-8 md:grid-cols-3"
              data-aos="fade-up"
              data-aos-delay="320"
            >
              {latestBlogs.map((blog, idx) => (
                <div
                  key={idx}
                  className="w-full flip-card h-80"
                  data-aos="zoom-in"
                  data-aos-delay={340 + idx * 20}
                >
                  <div className="w-full h-full flip-card-inner">
                    <div
                      className={`flip-card-front w-full h-full overflow-hidden rounded-2xl shadow flex items-center justify-center ${theme === "dark" ? "bg-[#222]" : "bg-gray-50"}`}
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-full rounded-2xl"
                      />
                    </div>
                    <div
                      className={`flip-card-back w-full h-full p-6 flex flex-col justify-center items-center rounded-2xl shadow ${theme === "dark" ? "bg-[#222] text-white" : "bg-gray-50 text-black"}`}
                    >
                      <h3
                        className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {blog.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-600"}`}
                      >
                        {blog.description}
                      </p>
                      <div
                        className={`text-xs mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                      >
                        By {blog.author}
                      </div>
                      <div
                        className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {new Date(blog.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              className={`text-center text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              data-aos="fade-up"
              data-aos-delay="340"
            >
              {t("blog.latest.empty")}
            </p>
          )}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-[#222]" : "bg-white"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="360"
      >
        <div
          className="px-6 mx-auto max-w-7xl"
          data-aos="fade-up"
          data-aos-delay="380"
        >
          {/* Heading */}
          <h2
            className="mb-12 text-4xl font-bold text-center md:text-5xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {t("blog.featured.title1")}{" "}
            <span style={{ color: "#fecc15" }}>
              {t("blog.featured.title2")}
            </span>
          </h2>

          {/* Grid */}
          <div
            className="grid gap-8 md:grid-cols-3"
            data-aos="fade-up"
            data-aos-delay="420"
          >
            {features.map((feature, index) => (
              <article
                key={index}
                className={`rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden ${theme === "dark" ? "bg-[#222] text-white" : "bg-gray-50 text-black"}`}
                data-aos="zoom-in"
                data-aos-delay={440 + index * 20}
              >
                {/* Image */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover w-full h-48"
                />

                {/* Content */}
                <div className="p-6">
                  <h3
                    className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-4 ${theme === "dark" ? "text-gray-200" : "text-gray-600"}`}
                  >
                    {feature.description}
                  </p>
                  <Link
                    to={feature.link}
                    className="font-semibold text-yellow-400 hover:underline"
                  >
                    {t("blog.featured.readMore")} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-100"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div
          className="grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2"
          data-aos="fade-up"
          data-aos-delay="520"
        >
          {/* Left Content */}
          <div data-aos="fade-right" data-aos-delay="540">
            <h2
              className="mb-6 text-4xl font-bold md:text-5xl"
              data-aos="fade-up"
              data-aos-delay="560"
            >
              {t("blog.categories.title1")}{" "}
              <span style={{ color: "#FFD700" }}>
                {t("blog.categories.title2")}
              </span>
            </h2>
            <p
              className={`text-lg mb-6 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
              data-aos="fade-up"
              data-aos-delay="580"
            >
              {t("blog.categories.desc1")}{" "}
              <span className="font-semibold" style={{ color: "#FFD700" }}>
                {t("blog.categories.desc2")}
              </span>{" "}
              {t("blog.categories.desc3")}
            </p>
            <p
              className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {t("blog.categories.desc4")}
            </p>
          </div>

          {/* Right Cards Grid */}
          <div
            className="grid gap-6 sm:grid-cols-2"
            data-aos="fade-left"
            data-aos-delay="620"
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition ${theme === "dark" ? "bg-[#222] text-white" : "bg-white text-black"}`}
                data-aos="zoom-in"
                data-aos-delay={640 + index * 20}
              >
                <div className="mb-4 text-3xl">{cat.icon}</div>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: "#FFD700" }}
                >
                  {cat.name}
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-200" : "text-gray-600"
                  }
                >
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`py-16 ${theme === "dark" ? "bg-[#222]" : "bg-[#fff]"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <div
          className="px-6 mx-auto max-w-7xl"
          data-aos="fade-up"
          data-aos-delay="720"
        >
          {/* Heading */}
          <h2
            className={`text-4xl md:text-5xl font-bold text-center mb-12 ${theme === "dark" ? "text-white" : "text-black"}`}
            data-aos="fade-up"
            data-aos-delay="740"
          >
            {t("blog.comparison.title1")}{" "}
            <span className="text-yellow-400">
              {t("blog.comparison.title2")}
            </span>
          </h2>

          {/* Responsive Table */}
          <div
            className="overflow-x-auto"
            data-aos="fade-up"
            data-aos-delay="760"
          >
            <table
              className={`w-full border rounded-lg shadow-md text-left ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
            >
              <thead
                className={
                  theme === "dark"
                    ? "bg-[#111] text-white"
                    : "bg-black text-white"
                }
              >
                <tr>
                  <th className="px-6 py-3 font-semibold">
                    {t("blog.comparison.features")}
                  </th>
                  {services.map((service, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 font-semibold text-center"
                    >
                      {service.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={
                  theme === "dark"
                    ? "bg-[#222] divide-y divide-gray-700"
                    : "bg-white divide-y divide-gray-200"
                }
              >
                {services[0].features.map((feature, i) => (
                  <tr key={i}>
                    {/* Feature Name */}
                    <td
                      className={`px-6 py-4 font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                    >
                      {feature}
                    </td>
                    {/* Features across services */}
                    {services.map((service, j) => (
                      <td
                        key={j}
                        className={`px-6 py-4 text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {service.features[i] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className={`py-16 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-100"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div
          className="max-w-6xl px-6 mx-auto"
          data-aos="fade-up"
          data-aos-delay="820"
        >
          {/* Heading */}
          <h2
            className="mb-12 text-4xl font-bold text-center text-yellow-400 md:text-5xl"
            data-aos="fade-up"
            data-aos-delay="840"
          >
            {t("blog.myths.title")}
          </h2>

          {/* Grid */}
          <div
            className="grid gap-10 md:grid-cols-2"
            data-aos="fade-up"
            data-aos-delay="860"
          >
            {mythsFacts.map((item, idx) => (
              <div
                key={idx}
                className="space-y-4"
                data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={880 + idx * 20}
              >
                <div className="flex gap-2">
                  <h3 className="font-bold text-red-500">
                    {t("blog.myths.mythLabel")}
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-800"
                    }
                  >
                    {item.myth}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h3 className="font-bold text-green-500">
                    {t("blog.myths.factLabel")}
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-800"
                    }
                  >
                    {item.fact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
