/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

import aihero from "../assets/pr.mp4";
import a1 from "../assets/pr1.jpg"; // your AI/ML service image
import a2 from "../assets/pr2.jpg"; // another AI/ML service

// Use translation keys for benefits and steps (projectMgmt namespace)
const benefitKeys = [
  { title: "projectMgmt.benefit1.title", desc: "projectMgmt.benefit1.desc" },
  { title: "projectMgmt.benefit2.title", desc: "projectMgmt.benefit2.desc" },
  { title: "projectMgmt.benefit3.title", desc: "projectMgmt.benefit3.desc" },
  { title: "projectMgmt.benefit4.title", desc: "projectMgmt.benefit4.desc" },
  { title: "projectMgmt.benefit5.title", desc: "projectMgmt.benefit5.desc" },
  { title: "projectMgmt.benefit6.title", desc: "projectMgmt.benefit6.desc" },
];
const stepKeys = [
  "projectMgmt.step1",
  "projectMgmt.step2",
  "projectMgmt.step3",
  "projectMgmt.step4",
  "projectMgmt.step5",
  "projectMgmt.step6",
];

export default function AIServicePage() {
  const { t } = useTranslation();
  React.useEffect(() => {
    AOS.init({ once: false });
  }, []);
  // Theme state synced with Header
  const [theme, setTheme] = useState("light");
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
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div
      className={`${theme === "dark" ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-black"}`}
    >
      {/* Hero Section */}
      <section
        className="relative grid w-full h-screen overflow-hidden text-center md:h-screen place-items-center"
        style={{ color: theme === "dark" ? "#fff" : "#fff" }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 object-cover w-full h-full"
          src={aihero}
          autoPlay
          loop
          muted
          playsInline
          data-aos="fade"
          data-aos-delay="120"
        />

        {/* Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50"
          data-aos="fade"
          data-aos-delay="140"
        ></div>

        {/* Content */}
        <div
          className="relative z-10 px-4 sm:px-6"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <h1
            className="mb-4 text-3xl font-bold leading-snug sm:text-4xl md:text-6xl"
            style={{ color: theme === "dark" ? "#fff" : "#fff" }}
            data-aos="fade-up"
            data-aos-delay="180"
          >
            {t("projectMgmt.hero.title")}
            <span
              style={{ color: "#facc15" }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {t("projectMgmt.hero.highlight")}
            </span>
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-white" : "text-white"}`}
            data-aos="fade-up"
            data-aos-delay="220"
          >
            {t("projectMgmt.hero.desc")}
          </p>
        </div>
      </section>

      <section
        className={`w-full py-16 ${theme === "dark" ? "bg-[#222]" : "bg-white"} overflow-hidden"`}
        data-aos="fade-up"
        data-aos-delay="240"
      >
        <div
          className="mb-6 text-center"
          data-aos="fade-up"
          data-aos-delay="260"
        >
          <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight mb-4 
    ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            data-aos="fade-up"
            data-aos-delay="280"
          >
            {t("projectMgmt.process.title")}
          </h2>
          <p
            className={`text-lg leading-relaxed 
  ${theme === "dark" ? "text-white" : "text-gray-700"}`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {t("projectMgmt.process.desc")}
          </p>
        </div>

        <div
          className="grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2"
          data-aos="fade-up"
          data-aos-delay="320"
        >
          {/* LEFT CONTENT */}
          <div
            className="flex flex-col justify-between h-full"
            data-aos="fade-right"
            data-aos-delay="340"
          >
            <ul className="space-y-5" data-aos="fade-up" data-aos-delay="360">
              {stepKeys.map((key, index) => (
                <li
                  key={index}
                  className="flex items-start"
                  data-aos="fade-up"
                  data-aos-delay={380 + index * 20}
                >
                  <span className="flex items-center justify-center w-6 h-6 mr-4 text-sm font-semibold text-black bg-yellow-400 rounded-full shadow">
                    {index + 1}
                  </span>
                  <p
                    className={`text-base leading-relaxed 
            ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                  >
                    {t(key)}
                  </p>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              className={`px-6 py-3 w-[200px] rounded-xl font-semibold text-lg shadow-md transition duration-300 mt-6
        ${
          theme === "dark"
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-yellow-400 text-black hover:bg-yellow-500"
        }`}
              data-aos="fade-up"
              data-aos-delay={160 + stepKeys.length * 40}
              onClick={() => {
                const el = document.getElementById("pricing");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {t("projectMgmt.startProject")}
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="flex items-center justify-center"
            data-aos="fade-left"
            data-aos-delay="420"
          >
            <img
              src={a1}
              alt="Residential Construction"
              className="object-cover w-full h-full shadow-lg rounded-2xl"
            />
          </div>
        </div>
      </section>
      {/* Service Includes Section */}
      <section
        className="w-full py-16 overflow-hidden"
        style={{ backgroundColor: theme === "dark" ? "#000" : "#f3f4f6" }}
        data-aos="fade-up"
        data-aos-delay="440"
      >
        <div className="grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div data-aos="fade-right" data-aos-delay="460">
            <h2
              className="mb-4 text-4xl font-bold"
              style={{ color: "#FACC15" }} // yellow-400
              data-aos="fade-up"
              data-aos-delay="480"
            >
              {t("projectMgmt.whyChoose.title")}
            </h2>

            <p
              className="mb-6 leading-relaxed text-justify"
              style={{ color: theme === "dark" ? "#ddd" : "#444" }}
            >
              {t("projectMgmt.whyChoose.desc1")}
            </p>

            <p
              className="mb-6 leading-relaxed text-justify"
              style={{ color: theme === "dark" ? "#ddd" : "#444" }}
            >
              {t("projectMgmt.whyChoose.desc2")}
            </p>

            <p
              className="leading-relaxed text-justify"
              style={{ color: theme === "dark" ? "#ddd" : "#444" }}
            >
              {t("projectMgmt.whyChoose.desc3")}
            </p>

            <p
              className="mb-6 leading-relaxed text-justify"
              style={{ color: theme === "dark" ? "#ddd" : "#444" }}
            >
              {t("projectMgmt.whyChoose.desc4")}
            </p>
          </div>

          {/* RIGHT CARDS - 6 BENEFITS IN GRID */}
          <div
            className="grid gap-6 sm:grid-cols-2"
            data-aos="fade-left"
            data-aos-delay="520"
          >
            {benefitKeys.map((benefit, index) => (
              <div
                key={index}
                className="p-6 transition duration-300 shadow-md rounded-xl hover:shadow-lg"
                style={{
                  backgroundColor: theme === "dark" ? "#111" : "#fff",
                  color: theme === "dark" ? "#ddd" : "#444",
                }}
                data-aos="zoom-in"
                data-aos-delay={540 + index * 20}
              >
                <h3
                  className="mb-2 text-lg font-semibold"
                  style={{ color: "#FACC15" }}
                >
                  {t(benefit.title)}
                </h3>
                <p className="text-sm leading-relaxed">{t(benefit.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`w-full py-20 ${theme === "dark" ? "bg-[#222]" : "bg-white"}`}
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div
          className="px-6 mx-auto max-w-7xl"
          data-aos="fade-up"
          data-aos-delay="620"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${theme === "dark" ? "text-yellow-400" : "text-yellow-400"}`}
            data-aos="fade-up"
            data-aos-delay="640"
          >
            {t("projectMgmt.costGuide.title")}
          </h2>
          <p
            className={`text-lg mb-8 max-w-3xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            data-aos="fade-up"
            data-aos-delay="660"
          >
            {t("projectMgmt.costGuide.desc")}
          </p>

          {/* Name and Phone Inputs */}

          {/* Table stays same */}
          <div
            className="overflow-x-auto"
            data-aos="fade-up"
            data-aos-delay="680"
          >
            <table
              className={`min-w-full border rounded-lg overflow-hidden text-left 
        ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
            >
              <thead
                className={`${theme === "dark" ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
              >
                <tr>
                  <th className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.floorArea")}
                  </th>
                  <th className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.interiorStyle")}
                  </th>
                  <th className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.estimatedCost")}
                  </th>
                  <th className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.timeline")}
                  </th>
                  <th className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.keyInclusions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={`${theme === "dark" ? "bg-black text-gray-300" : "bg-white"}`}
                >
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row1.area")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row1.style")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row1.cost")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row1.timeline")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row1.inclusions")}
                  </td>
                </tr>
                <tr
                  className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100"}`}
                >
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row2.area")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row2.style")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row2.cost")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row2.timeline")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row2.inclusions")}
                  </td>
                </tr>
                <tr
                  className={`${theme === "dark" ? "bg-black text-gray-300" : "bg-white"}`}
                >
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row3.area")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row3.style")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row3.cost")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row3.timeline")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row3.inclusions")}
                  </td>
                </tr>
                <tr
                  className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100"}`}
                >
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row4.area")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row4.style")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row4.cost")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row4.timeline")}
                  </td>
                  <td className="px-4 py-3">
                    {t("projectMgmt.costGuide.table.row4.inclusions")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p
            className={`text-sm mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            data-aos="fade-up"
            data-aos-delay="700"
          >
            {t("projectMgmt.costGuide.note")}
          </p>
        </div>
      </section>

      <section
        className={`w-full py-16 sm:py-20 ${
          theme === "dark" ? "bg-[#000]" : "bg-gray-100"
        }`}
        id="case-study"
        data-aos="fade-up"
        data-aos-delay="720"
      >
        <div className="grid items-center gap-12 px-4 mx-auto max-w-7xl sm:px-6 md:grid-cols-2 md:gap-16">
          <div
            className="grid justify-center"
            data-aos="fade-up"
            data-aos-delay="740"
          >
            <img
              src={a2} // import your image at top: import caseStudyImg from "../assets/casestudy.jpg";
              alt="Case Study"
              className="object-cover w-full h-auto max-w-xs shadow-2xl rounded-2xl sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
          </div>

          {/* LEFT CONTENT */}
          <div data-aos="fade-up" data-aos-delay="760">
            <h2 className="mb-4 text-3xl font-bold leading-snug text-yellow-400 sm:text-4xl md:text-5xl sm:mb-6">
              {t("projectMgmt.caseStudy.title")}
            </h2>

            <p
              className={`text-base sm:text-lg md:text-xl text-justify mb-4 sm:mb-6 leading-relaxed ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {t("projectMgmt.caseStudy.desc")}
            </p>

            <ul
              className={`space-y-3 sm:space-y-4 text-base sm:text-lg ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <li className="grid grid-cols-[auto_1fr] gap-2">
                <span className="text-yellow-400">•</span>
                {t("projectMgmt.caseStudy.point1")}
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-2">
                <span className="text-yellow-400">•</span>
                {t("projectMgmt.caseStudy.point2")}
              </li>
            </ul>
          </div>

          {/* RIGHT IMAGE */}
        </div>
      </section>

      <section
        className={`w-full py-20 font-sans antialiased ${theme === "dark" ? "bg-[#222]" : "bg-[#FFF]"}`}
        data-aos="fade-up"
        data-aos-delay="800"
        id="pricing"
      >
        {/* SECTION HEADER */}
        <div
          className="mb-12 text-center"
          data-aos="fade-up"
          data-aos-delay="820"
        >
          <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            data-aos="fade-up"
            data-aos-delay="840"
          >
            {t("projectMgmt.pricing.title")}
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            data-aos="fade-up"
            data-aos-delay="860"
          >
            {t("projectMgmt.pricing.desc")}
          </p>
        </div>

        {/* PRICING GRID */}
        <div
          className="grid gap-8 px-6 mx-auto max-w-7xl md:grid-cols-3"
          data-aos="fade-up"
          data-aos-delay="880"
        >
          {/* CARD 1 */}
          <div
            className={`border rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
            data-aos="zoom-in"
            data-aos-delay="900"
          >
            <div
              className="p-6 text-center bg-yellow-400 rounded-t-2xl"
              data-aos="fade-up"
              data-aos-delay="920"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {t("projectMgmt.pricing.basic.title")}
              </h3>
              <p className="mt-2 text-xl font-semibold text-gray-800">
                {t("projectMgmt.pricing.basic.price")}
              </p>
            </div>
            <ul
              className={`p-6 flex-1 space-y-4 text-base leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              <li>{t("projectMgmt.pricing.basic.feature1")}</li>
              <li>{t("projectMgmt.pricing.basic.feature2")}</li>
              <li>{t("projectMgmt.pricing.basic.feature3")}</li>
              <li>{t("projectMgmt.pricing.basic.feature4")}</li>
            </ul>
            <div className="p-6 text-center">
              <button className="px-6 py-3 font-semibold text-gray-900 transition duration-300 bg-yellow-400 shadow rounded-xl hover:bg-yellow-300">
                {t("projectMgmt.pricing.choosePlan")}
              </button>
            </div>
          </div>

          {/* CARD 2 (HIGHLIGHTED) */}
          <div
            className={`border rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col ${theme === "dark" ? "border-yellow-400" : "border-yellow-400"}`}
            data-aos="zoom-in"
            data-aos-delay="940"
          >
            <div
              className="p-6 text-center bg-yellow-400 rounded-t-2xl"
              data-aos="fade-up"
              data-aos-delay="960"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {t("projectMgmt.pricing.premium.title")}
              </h3>
              <p className="mt-2 text-xl font-semibold text-gray-900">
                {t("projectMgmt.pricing.premium.price")}
              </p>
            </div>
            <ul
              className={`p-6 flex-1 space-y-4 text-base leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              <li>{t("projectMgmt.pricing.premium.feature1")}</li>
              <li>{t("projectMgmt.pricing.premium.feature2")}</li>
              <li>{t("projectMgmt.pricing.premium.feature3")}</li>
              <li>{t("projectMgmt.pricing.premium.feature4")}</li>
            </ul>
            <div className="p-6 text-center">
              <button className="px-6 py-3 font-semibold text-gray-900 transition duration-300 bg-yellow-400 shadow rounded-xl hover:bg-yellow-300">
                {t("projectMgmt.pricing.choosePlan")}
              </button>
            </div>
          </div>

          {/* CARD 3 */}
          <div
            className={`border rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
            data-aos="zoom-in"
            data-aos-delay="980"
          >
            <div
              className="p-6 text-center bg-yellow-400 rounded-t-2xl"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {t("projectMgmt.pricing.luxury.title")}
              </h3>
              <p className="mt-2 text-xl font-semibold text-gray-800">
                {t("projectMgmt.pricing.luxury.price")}
              </p>
            </div>
            <ul
              className={`p-6 flex-1 space-y-4 text-base leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              <li>{t("projectMgmt.pricing.luxury.feature1")}</li>
              <li>{t("projectMgmt.pricing.luxury.feature2")}</li>
              <li>{t("projectMgmt.pricing.luxury.feature3")}</li>
              <li>{t("projectMgmt.pricing.luxury.feature4")}</li>
            </ul>
            <div className="p-6 text-center">
              <button className="px-6 py-3 font-semibold text-gray-900 transition duration-300 bg-yellow-400 shadow rounded-xl hover:bg-yellow-300">
                {t("projectMgmt.pricing.choosePlan")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
