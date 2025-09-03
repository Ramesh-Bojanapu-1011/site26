import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Header from "../components/Header";

export default function UserDetailsSection() {
  // --- THEME: Always use the current theme from localStorage, update immediately on change ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      setTheme(currentTheme);
      if (typeof window !== "undefined") {
        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.body.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.body.classList.remove("dark");
        }
      }
    };
    window.addEventListener("theme-changed", updateTheme);
    window.addEventListener("storage", updateTheme);
    updateTheme(); // run once on mount
    return () => {
      window.removeEventListener("theme-changed", updateTheme);
      window.removeEventListener("storage", updateTheme);
    };
  }, []);
  // ...existing code...
  // State hooks must come before any usage
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    image: "",
    author: "",
    description: "",
  });
  const [signupDetails, setSignupDetails] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: "",
    image: "",
    author: "",
    description: "",
  });
  const [customerPackages, setCustomerPackages] = useState([]);
  // Latest Projects state
  const [latestProjects, setLatestProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    image: "",
    title: "",
    duration: "",
    description: "",
  });
  const [editProjectIdx, setEditProjectIdx] = useState(null);

  // Chart data for user signups by date
  const signupCountsByDate = signupDetails.reduce((acc, user) => {
    if (user.signupDate) {
      acc[user.signupDate] = (acc[user.signupDate] || 0) + 1;
    }
    return acc;
  }, {});
  const signupChartData = Object.entries(signupCountsByDate).map(
    ([date, count]) => ({ date, count }),
  );

  // ...existing code...

  // --- Summary Graph Section ---
  // Place this above the User Signup and Customer Packages sections in the return
  // ...rest of your component logic and JSX...
  // (No code should be outside the function)

  // NOTE: In your theme toggle logic (e.g., in Header), after updating localStorage, add:
  // window.dispatchEvent(new Event("themeChanged"));
  // Remove a blog (same logic as webinars)
  const handleRemoveBlog = (idx) => {
    const newBlogs = blogs.filter((_, i) => i !== idx);
    localStorage.setItem("blogs", JSON.stringify(newBlogs));
    setBlogs(newBlogs);
    setEditIdx(null);
  };

  // Start editing a blog (same logic as webinars)
  const handleEditBlog = (idx) => {
    setEditIdx(idx);
    const b = blogs[idx];
    setEditForm({
      title: b.title || "",
      image: b.image || "",
      author: b.author || "",
      description: b.description || "",
    });
  };

  // Save edited blog (same logic as webinars)
  const handleBlogEditSave = (idx) => {
    if (
      !editForm.title ||
      !editForm.image ||
      !editForm.author ||
      !editForm.description
    )
      return;
    const newBlogs = blogs.map((b, i) =>
      i === idx ? { ...editForm, createdAt: b.createdAt } : b,
    );
    setBlogs(newBlogs);
    localStorage.setItem("blogs", JSON.stringify(newBlogs));
    setEditIdx(null);
  };

  useEffect(() => {
    // Fetch all admin data from localStorage
    const fetchDetails = () => {
      const storedUsers = localStorage.getItem("users");
      setSignupDetails(storedUsers ? JSON.parse(storedUsers) : []);
      // Removed instructor, webinar, and registration fetch
      const storedBlogs = localStorage.getItem("blogs");
      setBlogs(storedBlogs ? JSON.parse(storedBlogs) : []);
      // Fetch customer packages
      const storedPackages = localStorage.getItem("customPackages");
      let parsedPackages = [];
      try {
        parsedPackages = storedPackages ? JSON.parse(storedPackages) : [];
      } catch (e) {
        console.error(
          "Error parsing customPackages from localStorage",
          e,
          storedPackages,
        );
        parsedPackages = [];
      }
      console.log("Loaded customPackages:", parsedPackages);
      setCustomerPackages(parsedPackages);
      // Fetch latest projects
      const storedProjects = localStorage.getItem("latestProjects");
      setLatestProjects(storedProjects ? JSON.parse(storedProjects) : []);
    };
    fetchDetails();
    window.addEventListener("storage", fetchDetails);
    return () => window.removeEventListener("storage", fetchDetails);
  }, []);

  // Latest Projects handlers
  const handleProjectInput = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (
      !projectForm.image ||
      !projectForm.title ||
      !projectForm.duration ||
      !projectForm.description
    )
      return;
    let newProjects;
    if (editProjectIdx !== null) {
      newProjects = latestProjects.map((p, i) =>
        i === editProjectIdx ? { ...projectForm } : p,
      );
    } else {
      newProjects = [{ ...projectForm }, ...latestProjects];
    }
    setLatestProjects(newProjects);
    localStorage.setItem("latestProjects", JSON.stringify(newProjects));
    setProjectForm({ image: "", title: "", duration: "", description: "" });
    setEditProjectIdx(null);
  };

  const handleEditProject = (idx) => {
    setEditProjectIdx(idx);
    setProjectForm(latestProjects[idx]);
  };

  const handleDeleteProject = (idx) => {
    const newProjects = latestProjects.filter((_, i) => i !== idx);
    setLatestProjects(newProjects);
    localStorage.setItem("latestProjects", JSON.stringify(newProjects));
    setEditProjectIdx(null);
    setProjectForm({ image: "", title: "", duration: "", description: "" });
  };

  // After adding/removing a blog, always sync with localStorage
  const syncBlogs = () => {
    const storedBlogs = localStorage.getItem("blogs");
    setBlogs(storedBlogs ? JSON.parse(storedBlogs) : []);
  };

  // Handle blog form input
  const handleBlogInput = (e) => {
    const { name, value } = e.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle blog form submit
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (
      !blogForm.title ||
      !blogForm.image ||
      !blogForm.author ||
      !blogForm.description
    )
      return;
    const newBlogs = [
      { ...blogForm, createdAt: new Date().toISOString() },
      ...blogs,
    ];
    localStorage.setItem("blogs", JSON.stringify(newBlogs));
    syncBlogs();
    setBlogForm({ title: "", image: "", author: "", description: "" });
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditIdx(null);
  };

  return (
    <div
      className={clsx(
        "min-h-screen w-full",
        theme === "dark"
          ? "bg-[#10141c] text-white"
          : "bg-[#f6fafd] text-[#22223b]",
      )}
    >
      <Header />

      {/* Latest Projects Section */}

      {/* User Signup Table Section */}
      <div
        className={clsx(
          "rounded-xl shadow p-6 mt-16",
          theme === "dark" ? "bg-[#181f2a]" : "bg-white",
        )}
      >
        <h2
          className={clsx(
            "text-2xl font-bold mb-4",
            theme === "dark" ? "text-yellow-400" : "text-yellow-400",
          )}
        >
          User Signup Details
        </h2>
        {signupDetails.length > 0 ? (
          <div className="overflow-x-auto">
            <table
              className={clsx(
                "min-w-full border rounded-lg",
                theme === "dark" ? "border-gray-700" : "border-gray-200",
              )}
            >
              <thead
                className={clsx(
                  "text-white",
                  theme === "dark"
                    ? "bg-yellow-400 text-black"
                    : "bg-yellow-400 text-black",
                )}
              >
                <tr>
                  <th className="px-4 py-2 text-center">S.No</th>
                  <th className="px-4 py-2 text-center">First Name</th>
                  <th className="px-4 py-2 text-center">Last Name</th>
                  <th className="px-4 py-2 text-center">Email</th>
                  <th className="px-4 py-2 text-center">Phone</th>
                  <th className="px-4 py-2 text-center">Signup Time</th>
                  <th className="px-4 py-2 text-center">Signup Date</th>
                </tr>
              </thead>
              <tbody>
                {signupDetails.map((user, idx) => (
                  <tr
                    key={user.email || idx}
                    className={clsx(
                      "border-b",
                      theme === "dark"
                        ? "border-yellow-400"
                        : "border-yellow-400",
                    )}
                  >
                    <td className="px-4 py-2 text-center">{idx + 1}</td>
                    <td className="px-4 py-2 text-center">{user.firstName}</td>
                    <td className="px-4 py-2 text-center">{user.lastName}</td>
                    <td className="px-4 py-2 text-center">{user.email}</td>
                    <td className="px-4 py-2 text-center">{user.phone}</td>
                    <td className="px-4 py-2 text-center">{user.signupTime}</td>
                    <td className="px-4 py-2 text-center">{user.signupDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p
            className={clsx(
              theme === "dark" ? "text-gray-400" : "text-gray-500",
            )}
          >
            No user signup details found.
          </p>
        )}
      </div>

      {/* Customer Packages Table Section */}
      <div
        className={clsx(
          "rounded-xl shadow p-6 mt-8",
          theme === "dark" ? "bg-[#181f2a]" : "bg-white",
        )}
      >
        <h2
          className={clsx(
            "text-2xl font-bold mb-4",
            theme === "dark" ? "text-yellow-400" : "text-yellow-400",
          )}
        >
          Customer Packages
        </h2>
        {customerPackages && customerPackages.length > 0 ? (
          <div className="overflow-x-auto">
            <table
              className={clsx(
                "min-w-full border rounded-lg",
                theme === "dark" ? "border-gray-700" : "border-gray-200",
              )}
            >
              <thead
                className={clsx(
                  "text-white",
                  theme === "dark"
                    ? "bg-yellow-400 text-black"
                    : "bg-yellow-400 text-black",
                )}
              >
                <tr>
                  <th className="px-4 py-2 text-center">S.No</th>
                  <th className="px-4 py-2 text-center">Name</th>
                  <th className="px-4 py-2 text-center">Phone Number</th>
                  <th className="px-4 py-2 text-center">Site Area</th>
                  <th className="px-4 py-2 text-center">Plot Location</th>
                  <th className="px-4 py-2 text-center">Other Info</th>
                </tr>
              </thead>
              <tbody>
                {customerPackages.map((pkg, idx) => (
                  <tr
                    key={pkg.id || idx}
                    className={clsx(
                      "border-b",
                      theme === "dark"
                        ? "border-yellow-400"
                        : "border-yellow-400",
                    )}
                  >
                    <td className="px-4 py-2 text-center">{idx + 1}</td>
                    <td className="px-4 py-2 text-center">{pkg.name || "-"}</td>
                    <td className="px-4 py-2 text-center">
                      {pkg.phoneNumber || "-"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {pkg.siteArea || "-"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {pkg.plotLocation || "-"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {Object.entries(pkg)
                        .filter(
                          ([key]) =>
                            ![
                              "name",
                              "phoneNumber",
                              "siteArea",
                              "plotLocation",
                              "id",
                            ].includes(key),
                        )
                        .map(([key, value]) => (
                          <div key={key}>
                            <span className="font-semibold">{key}:</span>{" "}
                            {String(value)}
                          </div>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <p
              className={clsx(
                theme === "dark" ? "text-gray-400" : "text-gray-500",
              )}
            >
              No customer packages found.
            </p>
            {/* Debug: show raw localStorage value if present */}
            {typeof window !== "undefined" &&
              localStorage.getItem("customPackages") && (
                <pre className="mt-2 text-xs text-red-500 bg-gray-100 p-2 rounded">
                  Raw localStorage: {localStorage.getItem("customPackages")}
                </pre>
              )}
          </>
        )}
      </div>

      {/* --- User Signups by Date Graph Section --- */}
      <div
        className={clsx(
          "rounded-xl shadow p-6 mt-12 mb-8",
          theme === "dark" ? "bg-[#181f2a]" : "bg-white",
        )}
      >
        <h2
          className={clsx(
            "text-2xl font-bold mb-4 text-center",
            theme === "dark" ? "text-yellow-400" : "text-yellow-400",
          )}
        >
          User Signups by Date
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={signupChartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#444" : "#eee"}
            />
            <XAxis dataKey="date" stroke={theme === "dark" ? "#fff" : "#222"} />
            <YAxis
              stroke={theme === "dark" ? "#fff" : "#222"}
              allowDecimals={false}
            />
            <Tooltip
              wrapperStyle={{ color: theme === "dark" ? "#222" : "#222" }}
            />
            <Bar
              dataKey="count"
              fill={theme === "dark" ? "#facc15" : "#facc15"}
              barSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        className={clsx(
          "rounded-xl shadow p-6 mt-8",
          theme === "dark" ? "bg-[#181f2a]" : "bg-white",
        )}
      >
        <h2
          className={clsx(
            "text-2xl font-bold mb-4",
            theme === "dark" ? "text-yellow-400" : "text-yellow-400",
          )}
        >
          Latest Projects
        </h2>
        <form className="mb-6 w-full" onSubmit={handleProjectSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              name="image"
              value={projectForm.image}
              onChange={handleProjectInput}
              placeholder="Image URL"
              className={clsx(
                "border rounded px-4 py-3 text-lg flex-1 min-w-0",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
            <input
              type="text"
              name="title"
              value={projectForm.title}
              onChange={handleProjectInput}
              placeholder="Project Title"
              className={clsx(
                "border rounded px-4 py-3 text-lg flex-1 min-w-0",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
            <input
              type="text"
              name="duration"
              value={projectForm.duration}
              onChange={handleProjectInput}
              placeholder="Duration"
              className={clsx(
                "border rounded px-4 py-3 text-lg flex-1 min-w-0",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleProjectInput}
              placeholder="Project Description"
              className={clsx(
                "border rounded px-4 py-3 text-lg w-full min-h-[80px]",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={clsx(
                "rounded px-5 py-2 text-base font-semibold transition",
                "bg-yellow-400 text-black hover:bg-yellow-500",
              )}
            >
              {editProjectIdx !== null ? "Update Project" : "Add Project"}
            </button>
            {editProjectIdx !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditProjectIdx(null);
                  setProjectForm({
                    image: "",
                    title: "",
                    duration: "",
                    description: "",
                  });
                }}
                className={clsx(
                  "ml-4 rounded px-5 py-2 text-base font-semibold transition",
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-300 text-black hover:bg-gray-400",
                )}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <div>
          {latestProjects.length > 0 ? (
            <ul className="space-y-4">
              {latestProjects.map((proj, idx) => (
                <li
                  key={idx}
                  className={clsx(
                    "border rounded p-4 flex flex-col md:flex-row md:items-center gap-4",
                    theme === "dark"
                      ? "border-gray-700 bg-[#232b3b]"
                      : "border-gray-200 bg-white",
                  )}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div
                      className={clsx(
                        "font-bold text-lg",
                        theme === "dark"
                          ? "text-yellow-400"
                          : "text-yellow-400",
                      )}
                    >
                      {proj.title}
                    </div>
                    <div
                      className={clsx(
                        "text-sm mb-1",
                        theme === "dark" ? "text-gray-300" : "text-gray-600",
                      )}
                    >
                      {proj.duration}
                    </div>
                    <div
                      className={clsx(
                        "text-sm mb-1",
                        theme === "dark" ? "text-gray-200" : "text-gray-700",
                      )}
                    >
                      {proj.description}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      className={clsx(
                        "rounded px-3 py-1 font-semibold transition",
                        theme === "dark"
                          ? "bg-yellow-500 text-white hover:bg-yellow-400"
                          : "bg-yellow-400 text-white hover:bg-yellow-500",
                      )}
                      onClick={() => handleEditProject(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className={clsx(
                        "rounded px-3 py-1 font-semibold transition",
                        theme === "dark"
                          ? "bg-red-600 text-white hover:bg-red-500"
                          : "bg-red-500 text-white hover:bg-red-600",
                      )}
                      onClick={() => handleDeleteProject(idx)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className={clsx(
                "text-center",
                theme === "dark" ? "text-gray-400" : "text-gray-500",
              )}
            >
              No projects added yet.
            </p>
          )}
        </div>
      </div>

      {/* Add New Blog Section */}
      <div
        className={clsx(
          "rounded-xl shadow p-6 mt-8",
          theme === "dark" ? "bg-[#181f2a]" : "bg-white",
        )}
      >
        <h2
          className={clsx(
            "text-2xl font-bold mb-4",
            theme === "dark" ? "text-yellow-400" : "text-yellow-400",
          )}
        >
          Add New Blog
        </h2>
        <form className="mb-6 w-full" onSubmit={handleBlogSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              name="title"
              value={blogForm.title}
              onChange={handleBlogInput}
              placeholder="Blog Title"
              className={clsx(
                "border rounded px-4 py-3 text-lg flex-1 min-w-0",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
            <input
              type="text"
              name="image"
              value={blogForm.image}
              onChange={handleBlogInput}
              placeholder="Image URL"
              className={clsx(
                "border rounded px-4 py-3 text-lg flex-1 min-w-0",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              name="author"
              value={blogForm.author}
              onChange={handleBlogInput}
              placeholder="Author Name"
              className={clsx(
                "border rounded px-4 py-3 text-lg flex-1 min-w-0",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              value={blogForm.description}
              onChange={handleBlogInput}
              placeholder="Description"
              className={clsx(
                "border rounded px-4 py-3 text-lg w-full min-h-[80px]",
                theme === "dark"
                  ? "bg-[#232b3b] text-white border-gray-700"
                  : "bg-white text-[#22223b] border-gray-300",
              )}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={clsx(
                "rounded px-5 py-2 text-base font-semibold transition",
                "bg-yellow-400 text-black hover:bg-yellow-500",
              )}
            >
              Add Blog
            </button>
          </div>
        </form>
        <div>
          {blogs.length > 0 ? (
            <ul className="space-y-4">
              {blogs.map((blog, idx) => (
                <li
                  key={idx}
                  className={clsx(
                    "border rounded p-4 flex flex-col md:flex-row md:items-center gap-4",
                    theme === "dark"
                      ? "border-gray-700 bg-[#232b3b]"
                      : "border-gray-200 bg-white",
                  )}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    {editIdx === idx ? (
                      <form
                        className="flex flex-col gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleBlogEditSave(idx);
                        }}
                      >
                        <input
                          type="text"
                          name="title"
                          value={editForm.title}
                          onChange={handleEditInput}
                          className={clsx(
                            "border rounded px-2 py-1",
                            theme === "dark"
                              ? "bg-[#181f2a] text-white border-gray-700"
                              : "bg-white text-[#22223b] border-gray-300",
                          )}
                          required
                        />
                        <input
                          type="text"
                          name="image"
                          value={editForm.image}
                          onChange={handleEditInput}
                          className={clsx(
                            "border rounded px-2 py-1",
                            theme === "dark"
                              ? "bg-[#181f2a] text-white border-gray-700"
                              : "bg-white text-[#22223b] border-gray-300",
                          )}
                          required
                        />
                        <input
                          type="text"
                          name="author"
                          value={editForm.author}
                          onChange={handleEditInput}
                          className={clsx(
                            "border rounded px-2 py-1",
                            theme === "dark"
                              ? "bg-[#181f2a] text-white border-gray-700"
                              : "bg-white text-[#22223b] border-gray-300",
                          )}
                          required
                        />
                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleEditInput}
                          className={clsx(
                            "border rounded px-2 py-1",
                            theme === "dark"
                              ? "bg-[#181f2a] text-white border-gray-700"
                              : "bg-white text-[#22223b] border-gray-300",
                          )}
                          required
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            type="submit"
                            className={clsx(
                              "rounded px-3 py-1 font-semibold transition",
                              "bg-yellow-400 text-black hover:bg-yellow-500",
                            )}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className={clsx(
                              "rounded px-3 py-1 font-semibold transition",
                              theme === "dark"
                                ? "bg-gray-700 text-white hover:bg-gray-600"
                                : "bg-gray-300 text-black hover:bg-gray-400",
                            )}
                            onClick={handleEditCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div
                          className={clsx(
                            "font-bold text-lg",
                            theme === "dark"
                              ? "text-yellow-400"
                              : "text-yellow-400",
                          )}
                        >
                          {blog.title}
                        </div>
                        <div
                          className={clsx(
                            "text-sm mb-1",
                            theme === "dark"
                              ? "text-gray-300"
                              : "text-gray-600",
                          )}
                        >
                          By {blog.author}
                        </div>
                        <div
                          className={clsx(
                            "text-sm mb-1",
                            theme === "dark"
                              ? "text-gray-200"
                              : "text-gray-700",
                          )}
                        >
                          {blog.description}
                        </div>
                        <div className={clsx("text-xs", "text-gray-400")}>
                          {new Date(blog.createdAt).toLocaleString()}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            className={clsx(
                              "rounded px-3 py-1 font-semibold transition",
                              theme === "dark"
                                ? "bg-yellow-500 text-white hover:bg-yellow-400"
                                : "bg-yellow-400 text-white hover:bg-yellow-500",
                            )}
                            onClick={() => handleEditBlog(idx)}
                          >
                            Edit
                          </button>
                          <button
                            className={clsx(
                              "rounded px-3 py-1 font-semibold transition",
                              theme === "dark"
                                ? "bg-red-600 text-white hover:bg-red-500"
                                : "bg-red-500 text-white hover:bg-red-600",
                            )}
                            onClick={() => handleRemoveBlog(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className={clsx(
                "text-center",
                theme === "dark" ? "text-gray-400" : "text-gray-500",
              )}
            >
              No blogs added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
