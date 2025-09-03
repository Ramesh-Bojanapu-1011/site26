import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initTheme } from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home1 from "./pages/Home1";
import Home2Hero from "./pages/Home2";
import AboutHero from "./pages/aboutus";
import ServiceHero from "./pages/services";
import WelcomePage from "./pages/welcome";
import AIHero from "./pages/Artificial-Intelligence&Machine-Learning";
import WebDevServicePage from "./pages/web-development";
import DataSciencePage from "./pages/DataScience&Analytics";
import CybersecurityPage from "./pages/Cybersecurity&Ethical-Hacking";
import BlockchainPage from "./pages/Blockchain&Cryptocurrency";
import CloudComputingPage from "./pages/CloudComputing&DevOps";
import BlogHero from "./pages/blog";
import BlogDetail from "./pages/BlogDetail";
import ContactHero from "./pages/contactus";
import UserDetailsSection from "./pages/admindashboard"; //
import UserDashboard from "./pages/userdashboard";

function App() {
  useEffect(() => {
    initTheme();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Redirect root to /welcome */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          {/* Admin Dashboard route without Header/Footer */}
          <Route path="/admindashboard" element={<UserDetailsSection />} />
          {/* All other routes with Header/Footer */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="home1" element={<Home1 />} />
                  <Route path="home2" element={<Home2Hero />} />
                  <Route path="aboutus" element={<AboutHero />} />
                  <Route path="services" element={<ServiceHero />} />
                  <Route path="ResidentialConstruction" element={<AIHero />} />
                  <Route
                    path="ProjectManagement&Consultation"
                    element={<WebDevServicePage />}
                  />
                  <Route
                    path="Design-Planning&Execution"
                    element={<DataSciencePage />}
                  />
                  <Route
                    path="CommercialConstruction"
                    element={<BlockchainPage />}
                  />
                  <Route
                    path="Renovation&Remodeling"
                    element={<CybersecurityPage />}
                  />
                  <Route
                    path="InteriorFit-outs"
                    element={<CloudComputingPage />}
                  />
                  <Route path="blog" element={<BlogHero />} />
                  <Route path="blog/:id" element={<BlogDetail />} />
                  <Route path="contactus" element={<ContactHero />} />
                  <Route path="userdashboard" element={<UserDashboard />} />
                  {/* Add more routes as needed */}
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
