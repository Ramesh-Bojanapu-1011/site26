import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation, Link } from "react-router-dom";
import heroVideo from "../assets/herohome.mp4";
import impactImg from "../assets/impact.jpg";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import r from "../assets/r1.jpg";
import c from "../assets/c1.jpg";
import i from "../assets/i1.jpg";

// Helper for count up animation
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    let startTime = null;
    function animateCountUp(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animateCountUp);
      } else {
        setCount(target);
      }
    }
    ref.current = requestAnimationFrame(animateCountUp);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);
  return count;
}

// Animated metric card for Our Impact
function ImpactMetric({ value, suffix, label, delay, color }) {
  const [start, setStart] = useState(false);
  const ref = useRef();
  const count = useCountUp(start ? value : 0, 2000);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let observer;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStart(true);
          } else {
            setStart(false);
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(node);
    }
    return () => {
      if (observer && node) observer.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="p-6 bg-white rounded-lg shadow bg-opacity-80"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-4xl font-bold" style={{ color }}>
        {count}
        {suffix}
      </h3>
      <p className="mt-2 text-gray-700">{label}</p>
    </div>
  );
}

// Child component for instructor form

// MAIN COMPONENT
export default function Home1() {
  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.fromNav) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  // Theme state synced with Header
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem("theme") || "light";
        setTheme(newTheme);
      };
      window.addEventListener("theme-changed", handleThemeChange);
      window.addEventListener("storage", handleThemeChange);
      // Initialize AOS to animate every time section comes into view
      AOS.init({ once: false, duration: 800 });
      return () => {
        window.removeEventListener("theme-changed", handleThemeChange);
        window.removeEventListener("storage", handleThemeChange);
      };
    }
  }, []);
  // Instructor form state and logic (must be at top level, before return)
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    siteArea: "",
    plotLocation: "",
    construction: "",
    houseType: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store in localStorage
    const savedForms = JSON.parse(
      localStorage.getItem("customPackages") || "[]",
    );
    savedForms.push(formData);
    localStorage.setItem("customPackages", JSON.stringify(savedForms));

    // Show toast
    setShowToast(true);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false); // start fade-out
    }, 2500);

    setTimeout(() => {
      setShowToast(false); // remove completely
    }, 3000);

    // Reset form
    setFormData({
      name: "",
      phoneNumber: "",
      siteArea: "",
      plotLocation: "",
      construction: "",
      houseType: "",
    });
  };

  // ...existing code...

  const [area, setArea] = useState("");
  const [floors, setFloors] = useState(1);
  const [quality, setQuality] = useState("standard");
  const [projectLocation, setProjectLocation] = useState("urban");
  const [extras, setExtras] = useState({ interior: false, landscaping: false });
  const [estimate, setEstimate] = useState(null);

  // ✅ Calculation function
  const calculateEstimate = (e) => {
    e.preventDefault();

    const qualityRates = {
      standard: 1500,
      premium: 2000,
      luxury: 3000,
    };

    const locationFactor = {
      urban: 1.2,
      semiUrban: 1.0,
      rural: 0.85,
    };

    let cost = area * floors * qualityRates[quality];
    cost *= locationFactor[projectLocation];

    if (extras.interior) cost += area * 400;
    if (extras.landscaping) cost += area * 200;

    setEstimate(cost.toFixed(2));
  };

  // Carousel logic moved to top level

  const categories = {
    Residential: {
      img: r,
      heading: t("residential_projects_heading"),
      desc: t("residential_projects_desc"),
    },
    Commercial: {
      img: c,
      heading: t("commercial_projects_heading"),
      desc: t("commercial_projects_desc"),
    },
    Industrial: {
      img: i,
      heading: t("industrial_projects_heading"),
      desc: t("industrial_projects_desc"),
    },
  };

  const [activeCategory, setActiveCategory] = useState("Residential");

  return (
    <div
      className={`${
        theme === "dark"
          ? "min-h-screen bg-black text-white"
          : "min-h-screen bg-white text-white"
      }`}
    >
      {/* Hero Section - Full width */}
      <section
        className="relative w-full h-screen overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <video
          className="absolute top-0 left-0 object-cover w-full h-full"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        ></video>
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
            {t("hero_title")}{" "}
            <span style={{ color: "#facc15" }}>
              {t("hero_title_highlight")}
            </span>
          </h1>

          <h2
            className="mb-6 text-3xl font-bold text-center md:text-4xl"
            style={{
              color: theme === "dark" ? "text-[#fed700]" : "text-yellow-400",
            }}
          >
            {t("cost_estimator")}
          </h2>
          <p>{t("hero_desc")}</p>

          <button
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("project-categories").offsetTop,
                behavior: "smooth",
              })
            }
            className={`${
              theme === "dark"
                ? "bg-[#facc15] text-white hover:bg-[#ca8a04]"
                : "bg-[#facc15] text-white hover:bg-[#ca8a04]"
            } px-6 py-3 mt-5 rounded-lg transition-colors font-semibold`}
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            {t("learn_more")}
          </button>
        </div>
      </section>

      {/* Daily Question - Centered container */}
      <section
        className={`w-full py-16 sm:py-20 ${
          theme === "dark" ? "bg-[#222]" : "bg-[#FFF]"
        } overflow-hidden`}
        id="project-categories"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="px-4 mx-auto max-w-7xl">
          {/* Heading */}
          <h2
            className="mb-4 text-4xl font-bold text-center"
            style={{ color: theme === "dark" ? "#fff" : "#000" }}
            data-aos="fade-up"
          >
            {t("explore_expertise")}
          </h2>
          <p
            className={`text-lg text-center mb-12 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("explore_expertise_desc")}
          </p>

          {/* Filter Buttons */}
          <div
            className="flex justify-center gap-6 mb-12"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {Object.keys(categories).map((name) => (
              <button
                key={name}
                onClick={() => setActiveCategory(name)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeCategory === name
                    ? "bg-yellow-400 text-black"
                    : theme === "dark"
                      ? "bg-[#111] text-gray-300 hover:bg-[#222]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                data-aos="zoom-in"
              >
                {t(name.toLowerCase())}
              </button>
            ))}
          </div>

          {/* Content Layout */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left Image */}
            <div className="w-full" data-aos="fade-right" data-aos-delay="200">
              <img
                src={categories[activeCategory].img}
                alt={categories[activeCategory].heading}
                className="w-full h-[350px] object-cover rounded-2xl shadow-lg transition-all duration-500"
              />
            </div>

            {/* Right Content */}
            <div
              className="text-left"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <h3 className="mb-4 text-3xl font-semibold text-yellow-400">
                {categories[activeCategory].heading}
              </h3>
              <p
                className={`text-lg text-justify ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {categories[activeCategory].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Full width grid */}
      <section
        className={`w-full py-16 sm:py-20 ${
          theme === "dark" ? "bg-[#000]" : "bg-gray-100"
        } overflow-hidden`}
        id="services"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="px-4 mx-auto text-center max-w-7xl">
          {/* Heading */}
          <h2
            className="mb-4 text-4xl font-bold"
            style={{ color: theme === "dark" ? "#facc15" : "#facc15" }}
          >
            {t("we_provide_services")}
          </h2>
          <p
            className={`text-lg mb-12 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("we_provide_services_desc")}
          </p>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Residential */}
            <div
              className="p-6 transition bg-white border shadow-lg rounded-2xl hover:shadow-xl"
              style={{ backgroundColor: theme === "dark" ? "#222" : "#fff" }}
            >
              <img src={img1} alt="Residential" className="h-16 mx-auto mb-6" />
              <h3
                className="mb-4 text-2xl font-semibold text-black"
                style={{ color: theme === "dark" ? "#fff" : "#000" }}
              >
                {t("residential")}
              </h3>
              <p
                className="mb-6 text-gray-600"
                style={{ color: theme === "dark" ? "#fff" : "#000" }}
              >
                {t("residential_card_desc")}
              </p>
              <Link
                to="/contactus"
                className="bg-[#fed700] text-black font-medium py-2 px-6 rounded-lg hover:bg-[#e5c400] transition "
              >
                {t("get_started")}
              </Link>
            </div>

            {/* Interior Designs */}
            <div
              className="p-6 transition bg-white border shadow-lg rounded-2xl hover:shadow-xl"
              style={{ backgroundColor: theme === "dark" ? "#222" : "#fff" }}
            >
              <img
                src={img2}
                alt="Interior Designs"
                className="h-16 mx-auto mb-6"
              />
              <h3
                className="mb-4 text-2xl font-semibold text-black"
                style={{ color: theme === "dark" ? "#fff" : "#000" }}
              >
                {t("interior_designs")}
              </h3>
              <p
                className="mb-6 text-gray-600"
                style={{ color: theme === "dark" ? "#fff" : "#000" }}
              >
                {t("interior_designs_card_desc")}
              </p>
              <Link
                to="/contactus"
                className="bg-[#fed700] text-black font-medium py-2 px-6 rounded-lg hover:bg-[#e5c400] transition "
              >
                {t("get_started")}
              </Link>
            </div>

            {/* Structural Repair */}
            <div
              className="p-6 transition bg-white border shadow-lg rounded-2xl hover:shadow-xl"
              style={{ backgroundColor: theme === "dark" ? "#222" : "#fff" }}
            >
              <img
                src={img3}
                alt="Structural Repair"
                className="h-16 mx-auto mb-6"
              />
              <h3
                className="mb-4 text-2xl font-semibold text-black"
                style={{ color: theme === "dark" ? "#fff" : "#000" }}
              >
                {t("structural_repair")}
              </h3>
              <p
                className="mb-6 text-gray-600"
                style={{ color: theme === "dark" ? "#fff" : "#000" }}
              >
                {t("structural_repair_card_desc")}
              </p>
              <Link
                to="/contactus"
                className="bg-[#fed700] text-black font-medium py-2 px-6 rounded-lg hover:bg-[#e5c400] transition "
              >
                {t("get_started")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add your other sections here... */}

      <section
        className={`w-full min-h-screen flex items-center justify-center  
  ${
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
  } overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div
          className={`rounded-2xl shadow-2xl w-full max-w-4xl p-8 
    ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
        >
          {/* Section Heading */}
          <h2
            className="mb-6 text-3xl font-bold text-center md:text-4xl"
            style={{ color: theme === "dark" ? "#facc15" : "#facc15" }}
          >
            {t("cost_estimator")}
          </h2>

          <form
            onSubmit={calculateEstimate}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Area */}
            <div>
              <label
                className={`block mb-2 font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("builtup_area")}
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-lg border 
            ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } 
            focus:ring-2 focus:ring-yellow-400 outline-none transition`}
              />
            </div>

            {/* Floors */}
            <div>
              <label
                className={`block mb-2 font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("number_of_floors")}
              </label>
              <input
                type="number"
                min="1"
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-lg border 
            ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } 
            focus:ring-2 focus:ring-yellow-400 outline-none transition`}
              />
            </div>

            {/* Quality */}
            <div>
              <label
                className={`block mb-2 font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("construction_quality")}
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border 
            ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } 
            focus:ring-2 focus:ring-yellow-400 outline-none transition`}
              >
                <option value="standard">{t("standard")}</option>
                <option value="premium">{t("premium")}</option>
                <option value="luxury">{t("luxury")}</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                className={`block mb-2 font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("project_location")}
              </label>
              <select
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border 
            ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } 
            focus:ring-2 focus:ring-yellow-400 outline-none transition`}
              >
                <option value="urban">{t("urban")}</option>
                <option value="semiUrban">{t("semi_urban")}</option>
                <option value="rural">{t("rural")}</option>
              </select>
            </div>

            {/* Extras */}
            <div className="flex flex-col gap-3 md:col-span-2">
              <label
                className={`block mb-2 font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("additional_services")}
              </label>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={extras.interior}
                    onChange={(e) =>
                      setExtras({ ...extras, interior: e.target.checked })
                    }
                    className="accent-yellow-400"
                  />
                  {t("interior_work")}
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={extras.landscaping}
                    onChange={(e) =>
                      setExtras({ ...extras, landscaping: e.target.checked })
                    }
                    className="accent-yellow-400"
                  />
                  {t("landscaping")}
                </label>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center md:col-span-2">
              <button
                type="submit"
                className="px-8 py-3 font-semibold text-gray-900 transition bg-yellow-400 rounded-lg hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300"
              >
                {t("calculate_estimate")}
              </button>
            </div>
          </form>

          {/* Result */}
          {estimate && (
            <div className="mt-8 text-center">
              <h3
                className="text-2xl font-bold"
                style={{ color: theme === "dark" ? "#facc15" : "#facc15" }}
              >
                {t("estimated_cost")}
              </h3>
              <p
                className="mt-2 text-3xl font-extrabold"
                style={{ color: theme === "dark" ? "#facc15" : "#facc15" }}
              >
                ₹ {estimate}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Carousel Section */}

      <section
        className="relative w-full py-16 overflow-hidden"
        style={{
          backgroundImage: `url(${impactImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(250,204,21,0.3)" }} // yellow-400 with transparency
        ></div>

        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <h2
            className="mb-12 text-5xl font-bold text-center"
            style={{ color: "#fff" }}
          >
            {t("building_legacy")}
          </h2>

          <div className="grid gap-8 text-center rounded-full lg:grid-cols-4">
            {/* Metric 1 */}
            <ImpactMetric
              value={250}
              suffix="+"
              label={t("projects_completed")}
              delay={100}
              color="#000" // yellow-400
            />
            {/* Metric 2 */}
            <ImpactMetric
              value={50}
              suffix="+"
              label={t("ongoing_constructions")}
              delay={200}
              color="#000"
            />
            {/* Metric 3 */}
            <ImpactMetric
              value={30}
              suffix="+"
              label={t("cities_served")}
              delay={300}
              color="#000"
            />
            {/* Metric 4 */}
            <ImpactMetric
              value={98}
              suffix="%"
              label={t("client_satisfaction")}
              delay={400}
              color="#000"
            />
          </div>
        </div>
      </section>

      <div className="relative" data-aos="fade-up" data-aos-delay="500">
        {/* FORM */}
        <div
          className={`max-w-full mx-auto shadow-lg rounded-xl p-6 
    ${theme === "dark" ? "bg-[#181818] text-white" : "bg-white text-gray-900"}`}
        >
          <h2
            className={`text-4xl font-bold text-center mb-6 mt-10
      ${theme === "dark" ? "text-[#fed700]" : "text-yellow-400"}`}
          >
            {t("need_custom_package")}
          </h2>

          <p
            className={`text-center mb-10 
      ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            {t("custom_package_desc")}
          </p>

          <form
            onSubmit={handleSubmit}
            className={`p-8 rounded-lg shadow-lg space-y-6 
        ${theme === "dark" ? "bg-[#1f1f1f]" : "bg-white"}`}
          >
            {/* Name */}
            <div>
              <label className="block mb-2 font-semibold">{t("name")}</label>
              <input
                type="text"
                name="name"
                placeholder={t("name")}
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            ${
              theme === "dark"
                ? "bg-[#181818] text-white border-gray-600 focus:ring-[#fed700]"
                : "bg-white text-black border-gray-300 focus:ring-yellow-400"
            }`}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-2 font-semibold">
                {t("phone_number")}
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder={t("phone_number")}
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            ${
              theme === "dark"
                ? "bg-[#181818] text-white border-gray-600 focus:ring-[#fed700]"
                : "bg-white text-black border-gray-300 focus:ring-yellow-400"
            }`}
                required
              />
            </div>

            {/* Site Area */}
            <div>
              <label className="block mb-2 font-medium">{t("site_area")}</label>
              <input
                type="text"
                name="siteArea"
                placeholder={t("site_area")}
                value={formData.siteArea}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            ${
              theme === "dark"
                ? "bg-[#181818] text-white border-gray-600 focus:ring-[#fed700]"
                : "bg-white text-black border-gray-300 focus:ring-yellow-400"
            }`}
                required
              />
            </div>

            {/* Plot Location */}
            <div>
              <label className="block mb-2 font-medium">
                {t("plot_location")}
              </label>
              <input
                type="text"
                name="plotLocation"
                placeholder={t("plot_location")}
                value={formData.plotLocation}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            ${
              theme === "dark"
                ? "bg-[#181818] text-white border-gray-600 focus:ring-[#fed700]"
                : "bg-white text-black border-gray-300 focus:ring-yellow-400"
            }`}
              />
            </div>

            {/* Construction Type */}
            <div>
              <label className="block mb-2 font-medium">
                {t("construction_type")}
              </label>
              <select
                name="construction"
                value={formData.construction}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            ${
              theme === "dark"
                ? "bg-[#181818] text-white border-gray-600 focus:ring-[#fed700]"
                : "bg-white text-black border-gray-300 focus:ring-yellow-400"
            }`}
              >
                <option value="">{t("select")}</option>
                <option value="Residential construction">
                  {t("residential_construction")}
                </option>
                <option value="Commercial construction">
                  {t("commercial_construction")}
                </option>
              </select>
            </div>

            {/* House Type */}
            <div>
              <label className="block mb-2 font-medium">
                {t("house_type")}
              </label>
              <select
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            ${
              theme === "dark"
                ? "bg-[#181818] text-white border-gray-600 focus:ring-[#fed700]"
                : "bg-white text-black border-gray-300 focus:ring-yellow-400"
            }`}
              >
                <option value="">{t("select")}</option>
                <option value="Ground floor">{t("ground_floor")}</option>
                <option value="Duplex">{t("duplex")}</option>
                <option value="Triplex">{t("triplex")}</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-3 rounded 
          ${
            theme === "dark"
              ? "bg-[#fed700] text-black hover:bg-yellow-500"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
            >
              {t("submit")}
            </button>
          </form>
        </div>

        {/* TOAST */}
        {showToast && (
          <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all duration-500 
        ${
          toastVisible
            ? "opacity-100 translate-y-0 bg-green-600 text-white"
            : "opacity-0 translate-y-4 bg-green-600 text-white"
        }`}
          >
            {t("form_saved")}
          </div>
        )}
      </div>
    </div>
  );
}
