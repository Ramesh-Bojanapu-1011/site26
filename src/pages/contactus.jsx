import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import contactVideo from "../assets/contact.mp4";
import contact1 from "../assets/contact1.jpg";
import contact2 from "../assets/contact2.jpg";
import contact3 from "../assets/contact3.webp";
import faqImage from "../assets/faq.jpg";
import jcbImage from "../assets/jcb.png";

export default function ContactHero() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t("contact.faqs.0.question"),
      answer: t("contact.faqs.0.answer"),
    },
    {
      question: t("contact.faqs.1.question"),
      answer: t("contact.faqs.1.answer"),
    },
    {
      question: t("contact.faqs.2.question"),
      answer: t("contact.faqs.2.answer"),
    },
    {
      question: t("contact.faqs.3.question"),
      answer: t("contact.faqs.3.answer"),
    },
    {
      question: t("contact.faqs.4.question"),
      answer: t("contact.faqs.4.answer"),
    },
  ];

  const cards = [
    {
      img: contact1,
      title: t("contact.cards.0.title"),
      text: t("contact.cards.0.text"),
    },
    {
      img: contact2,
      title: t("contact.cards.1.title"),
      text: t("contact.cards.1.text"),
    },
    {
      img: contact3,
      title: t("contact.cards.2.title"),
      text: t("contact.cards.2.text"),
    },
  ];

  React.useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Theme state synced with Header (live update)
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

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen text-white"
          : "min-h-screen  text-black"
      }
    >
      {/* Hero Section */}
      <section
        className={`relative h-screen flex items-center justify-center ${theme === "dark" ? "" : ""} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 object-cover w-full h-full -z-10"
          data-aos="fade"
          data-aos-delay="120"
        >
          <source src={contactVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Optional dark overlay for readability */}
        <div
          className={
            theme === "dark"
              ? "absolute inset-0 bg-black/60 text-white -z-10"
              : "absolute inset-0 bg-black/40 text-white -z-10"
          }
          data-aos="fade"
          data-aos-delay="140"
        ></div>

        {/* Content */}
        <div
          className="flex flex-col items-center justify-center text-center text-white"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <h1
            className="mb-4 text-3xl font-extrabold leading-tight md:text-6xl whitespace-nowrap"
            data-aos="fade-up"
            data-aos-delay="180"
          >
            {t("contact.hero.title1")}{" "}
            <span
              className="text-yellow-400"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {t("contact.hero.title2")}
            </span>{" "}
            {t("contact.hero.title3")}
          </h1>
          <p
            className="mb-6 text-lg font-light md:text-2xl"
            data-aos="fade-up"
            data-aos-delay="220"
          >
            {t("contact.hero.desc1")}{" "}
            <span
              className="font-semibold text-yellow-400"
              data-aos="zoom-in"
              data-aos-delay="240"
            >
              {t("contact.hero.desc2")}
            </span>
            , {t("contact.hero.desc3")}
            <span
              className="font-semibold text-yellow-400"
              data-aos="zoom-in"
              data-aos-delay="260"
            >
              {t("contact.hero.desc4")}
            </span>{" "}
            {t("contact.hero.desc5")}
          </p>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-[#222]" : "bg-white"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="280"
      >
        <div
          className="max-w-6xl px-6 mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {/* Section Heading */}
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === "dark" ? "text-yellow-400" : "text-yellow-400"}`}
            data-aos="fade-up"
            data-aos-delay="320"
          >
            {t("contact.cardsTitle")}
          </h2>
          {/* Cards Grid */}
          <div
            className="grid gap-10 md:grid-cols-3"
            data-aos="fade-up"
            data-aos-delay="340"
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`${theme === "dark" ? "bg-[#181818] text-white" : "bg-white text-black"} rounded-2xl shadow-md hover:shadow-xl transition text-center p-6`}
                data-aos="zoom-in"
                data-aos-delay={360 + index * 20}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="object-cover w-full h-56 mb-6 rounded-xl"
                />
                <h3
                  className="mb-2 text-xl font-bold"
                  style={{ color: "#facc15" }}
                >
                  {card.title}
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-200" : "text-gray-600"
                  }
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`py-20 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-100"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div
          className="max-w-4xl px-6 mx-auto"
          data-aos="fade-up"
          data-aos-delay="420"
        >
          {/* Small Heading */}
          <p
            className="mb-2 font-semibold text-yellow-400 uppercase"
            data-aos="fade-up"
            data-aos-delay="440"
          >
            {t("contact.form.smallTitle")}
          </p>
          {/* Main Heading */}
          <h2
            className={`text-3xl md:text-4xl font-extrabold mb-10 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            data-aos="fade-up"
            data-aos-delay="460"
          >
            {t("contact.form.title1")}{" "}
            <span className="text-yellow-400">{t("contact.form.title2")}</span>
          </h2>

          {/* Contact Form */}
          <form
            className={`${theme === "dark" ? "bg-[#222] text-white" : "bg-white text-black"} rounded-2xl shadow-lg p-8 space-y-6`}
            data-aos="fade-up"
            data-aos-delay="480"
            onSubmit={(e) => {
              e.preventDefault();
              setFormSubmitted(true);
            }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder={t("contact.form.firstName")}
                className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "border-gray-700 bg-[#181818] text-white" : "border-gray-200 bg-white text-black"}`}
              />
              <input
                type="text"
                placeholder={t("contact.form.lastName")}
                className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "border-gray-700 bg-[#181818] text-white" : "border-gray-200 bg-white text-black"}`}
              />
            </div>
            <input
              type="email"
              placeholder={t("contact.form.email")}
              className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "border-gray-700 bg-[#181818] text-white" : "border-gray-200 bg-white text-black"}`}
            />
            <input
              type="tel"
              placeholder={t("contact.form.phone")}
              className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "border-gray-700 bg-[#181818] text-white" : "border-gray-200 bg-white text-black"}`}
            />
            <textarea
              rows="5"
              placeholder={t("contact.form.message")}
              className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "border-gray-700 bg-[#181818] text-white" : "border-gray-200 bg-white text-black"}`}
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-black transition bg-yellow-400 rounded-lg hover:bg-yellow-500"
              disabled={formSubmitted}
            >
              {formSubmitted
                ? t("contact.form.submitted")
                : t("contact.form.send")}
            </button>
            {formSubmitted && (
              <div className="mt-4 font-semibold text-center text-green-500">
                {t("contact.form.success")}
              </div>
            )}
          </form>
        </div>
      </section>

      <section
        className={`py-20 ${theme === "dark" ? "bg-[#222]" : "bg-white"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div
          className="max-w-6xl px-6 mx-auto"
          data-aos="fade-up"
          data-aos-delay="520"
        >
          {/* Small heading */}
          <p
            className="mb-2 font-semibold text-yellow-400 uppercase"
            data-aos="fade-up"
            data-aos-delay="540"
          >
            {t("contact.location.smallTitle")}
          </p>

          {/* Main heading */}
          <h2
            className={`text-3xl md:text-4xl font-extrabold mb-10 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            data-aos="fade-up"
            data-aos-delay="560"
          >
            {t("contact.location.title1")}{" "}
            <span className="text-yellow-400">
              {t("contact.location.title2")}
            </span>{" "}
            {t("contact.location.title3")}
          </h2>

          {/* Map embed */}
          <div
            className="overflow-hidden shadow-lg rounded-2xl"
            data-aos="fade-up"
            data-aos-delay="580"
          >
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019826876137!2d-122.40081358468178!3d37.79361197975621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064ebcc65e9%3A0x34b3b70f6a64a96f!2s456%20Market%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1692225939182!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <section
        className={`py-20 ${theme === "dark" ? "bg-[#181818]" : "bg-gray-100"} overflow-hidden`}
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div
          className="grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2"
          data-aos="fade-up"
          data-aos-delay="620"
        >
          {/* Left: Image and Heading */}
          <div data-aos="fade-right" data-aos-delay="640">
            <p
              className="mb-2 font-semibold text-yellow-400 uppercase"
              data-aos="fade-up"
              data-aos-delay="660"
            >
              {t("contact.faqsTitle")}
            </p>
            <h2
              className={`text-4xl md:text-5xl font-extrabold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              data-aos="fade-up"
              data-aos-delay="680"
            >
              {t("contact.faqsMain1")}{" "}
              <span className="text-yellow-400">{t("contact.faqsMain2")}</span>{" "}
              {t("contact.faqsMain3")}
            </h2>
            <img
              src={faqImage}
              alt="FAQ illustration"
              className="shadow-lg rounded-xl"
              data-aos="zoom-in"
              data-aos-delay="700"
            />
          </div>

          {/* Right: Accordion */}
          <div className="space-y-4" data-aos="fade-left" data-aos-delay="720">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${theme === "dark" ? "bg-[#222] border-gray-700" : "bg-gray-50 border-gray-100"} rounded-xl shadow-sm border`}
                data-aos="zoom-in"
                data-aos-delay={740 + index * 20}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex justify-between items-center p-6 text-left ${theme === "dark" ? "text-white" : ""}`}
                >
                  <span
                    className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {faq.question}
                  </span>
                  <span className="text-2xl text-yellow-400">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div
                    className={`px-6 pb-6 ${theme === "dark" ? "text-gray-200" : "text-gray-600"}`}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`w-full min-h-[400px] flex items-center justify-center p-4 sm:p-8 font-sans antialiased ${
          theme === "dark" ? "bg-[#000]" : "bg-white"
        }`}
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div
          className={`rounded-2xl shadow-xl max-w-6xl w-full p-8 md:p-12 grid  lg:grid-cols-2 gap-10 items-center ${
            theme === "dark" ? "bg-[#111]" : "bg-white"
          }`}
          data-aos="fade-up"
          data-aos-delay="820"
        >
          {/* Left side: Text and Form */}
          <div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            data-aos="fade-right"
            data-aos-delay="840"
          >
            {/* Main Title with highlighted word */}
            <h2
              className={`text-3xl md:text-4xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              data-aos="fade-up"
              data-aos-delay="860"
            >
              {t("contact.newsletter.title1")}{" "}
              <span
                className="text-yellow-400"
                data-aos="zoom-in"
                data-aos-delay="880"
              >
                {t("contact.newsletter.title2")}
              </span>
            </h2>

            {/* Subtitle */}
            <p
              className={`text-base md:text-lg mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              data-aos="fade-up"
              data-aos-delay="900"
            >
              {t("contact.newsletter.desc")}
            </p>

            {/* Form for email input and button */}
            <form
              className="flex flex-col w-full max-w-md gap-4 sm:flex-row"
              data-aos="fade-up"
              data-aos-delay="920"
            >
              <input
                type="email"
                placeholder={t("contact.newsletter.email")}
                className={`flex-grow px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  theme === "dark"
                    ? "bg-[#222] border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              />
              <button
                type="submit"
                className="px-8 py-3 font-semibold text-black transition-colors bg-yellow-400 rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              >
                {t("contact.newsletter.subscribe")}
              </button>
            </form>
          </div>

          {/* Right side: Image of the JCB */}
          <div
            className="flex justify-center lg:justify-end"
            data-aos="fade-left"
            data-aos-delay="940"
          >
            <img
              src={jcbImage}
              alt="A large yellow JCB excavator"
              className="w-full h-auto max-w-lg shadow-lg rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
