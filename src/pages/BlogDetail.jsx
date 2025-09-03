import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";

export default function BlogDetail() {
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
      return () => {
        window.removeEventListener("theme-changed", handleThemeChange);
        window.removeEventListener("storage", handleThemeChange);
      };
    }
  }, []);
  const { id } = useParams();

  // Blog data using translation keys
  const blogs = [
    {
      id: "1",
      title: t("blogDetail.1.title"),
      image: blog1,
      intro: t("blogDetail.1.intro"),
      sections: [
        {
          heading: t("blogDetail.1.sections.0.heading"),
          content: t("blogDetail.1.sections.0.content"),
        },
        {
          heading: t("blogDetail.1.sections.1.heading"),
          content: t("blogDetail.1.sections.1.content"),
        },
        {
          heading: t("blogDetail.1.sections.2.heading"),
          content: t("blogDetail.1.sections.2.content"),
        },
        {
          heading: t("blogDetail.1.sections.3.heading"),
          content: t("blogDetail.1.sections.3.content"),
        },
        {
          heading: t("blogDetail.1.sections.4.heading"),
          content: t("blogDetail.1.sections.4.content"),
        },
      ],
    },
    {
      id: "2",
      title: t("blogDetail.2.title"),
      image: blog2,
      intro: t("blogDetail.2.intro"),
      sections: [
        {
          heading: t("blogDetail.2.sections.0.heading"),
          content: t("blogDetail.2.sections.0.content"),
        },
        {
          heading: t("blogDetail.2.sections.1.heading"),
          content: t("blogDetail.2.sections.1.content"),
        },
        {
          heading: t("blogDetail.2.sections.2.heading"),
          content: t("blogDetail.2.sections.2.content"),
        },
        {
          heading: t("blogDetail.2.sections.3.heading"),
          content: t("blogDetail.2.sections.3.content"),
        },
        {
          heading: t("blogDetail.2.sections.4.heading"),
          content: t("blogDetail.2.sections.4.content"),
        },
      ],
    },
    {
      id: "3",
      title: t("blogDetail.3.title"),
      image: blog3,
      intro: t("blogDetail.3.intro"),
      sections: [
        {
          heading: t("blogDetail.3.sections.0.heading"),
          content: t("blogDetail.3.sections.0.content"),
        },
        {
          heading: t("blogDetail.3.sections.1.heading"),
          content: t("blogDetail.3.sections.1.content"),
        },
        {
          heading: t("blogDetail.3.sections.2.heading"),
          content: t("blogDetail.3.sections.2.content"),
        },
        {
          heading: t("blogDetail.3.sections.3.heading"),
          content: t("blogDetail.3.sections.3.content"),
        },
        {
          heading: t("blogDetail.3.sections.4.heading"),
          content: t("blogDetail.3.sections.4.content"),
        },
      ],
    },
  ];

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div
        className={`text-center py-20 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <h2 className="text-2xl font-bold">{t("blogDetail.notFound")}</h2>
        <Link to="/blog" className="block mt-4 text-yellow-400 underline">
          {t("blogDetail.backToBlogs")}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={
        theme === "dark"
          ? "pt-20 min-h-screen bg-black text-white"
          : "pt-20 min-h-screen bg-white text-black"
      }
    >
      {/* Back Link */}
      <Link to="/blog" className="block mt-4 text-yellow-400 underline">
        {t("blogDetail.backToBlogs")}
      </Link>
      {/* Blog Hero */}
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </section>

      {/* Blog Content */}
      <section className="max-w-5xl px-6 py-12 mx-auto">
        <p
          className={`text-lg md:text-xl max-w-5xl text-center mx-auto ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
        >
          {blog.intro}
        </p>
        {blog.sections.map((sec, index) => (
          <div key={index} className="mb-10">
            <h2
              className="mb-4 text-2xl font-bold"
              style={{ color: "#fecc15" }}
            >
              {sec.heading}
            </h2>
            <p
              className={`leading-relaxed ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
            >
              {sec.content}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
