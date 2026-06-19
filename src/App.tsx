import React, { useState, useEffect } from "react";
import {
  Shield,
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Clock,
  Calculator,
  FileText,
  CheckCircle2,
  User,
  Star,
  Award,
  DollarSign,
  Hammer,
  Check,
  Plus,
  Search,
  Menu,
  X,
  Lock,
  Briefcase,
  Camera,
  Zap,
  Play,
  Filter,
  Wrench,
  BookOpen,
  MessageSquare,
  Sparkles,
  ClipboardList,
  AlertCircle
} from "lucide-react";
import { ActivePage, LeadSubmission, CustomerReview, BlogPost } from "./types";
import {
  SERVICES_DATA,
  PRICING_DATA,
  TEAM_DATA,
  BLOG_DATA,
  SERVICE_CITIES_DATA,
  CAREERS_DATA,
  TESTIMONIALS_DATA,
  FAQS_DATA,
} from "./data";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ServiceAreaMap from "./components/ServiceAreaMap";

// Complete set of 10 customer reviews for the home page interactive carousel
const CAROUSEL_REVIEWS_DATA: CustomerReview[] = [
  {
    name: "Amanda Lewis",
    location: "Charlotte, NC",
    stars: 5,
    verified: true,
    date: "April 14, 2026",
    text: "Titan Ridge Roofing worked directly with my adjuster and replaced my complete architectural shingle roof in just one single day. Brilliant service!"
  },
  {
    name: "Robert Jenkins",
    location: "Concord, NC",
    stars: 5,
    verified: true,
    date: "May 2, 2026",
    text: "We sustained major hail damage after a severe storm. Their storm damage experts arrived the same afternoon, installed emergency protective tarps within two hours, and navigated every step with our claims adjuster."
  },
  {
    name: "Melissa Turner",
    location: "Huntersville, NC",
    stars: 5,
    verified: true,
    date: "March 29, 2026",
    text: "The cleanest contractors we have ever worked with! Not a single stray shingle or nail was left behind—they used magnetic sweepers multiple times. My premium designer shingle roof looks pristine."
  },
  {
    name: "Thomas Caldwell",
    location: "Rock Hill, SC",
    stars: 5,
    verified: true,
    date: "May 10, 2026",
    text: "Outstanding commercial flat roof restoration. They saved our warehouse budget over 40% by deploying a premium silicone seal coat instead of complete replacement."
  },
  {
    name: "Marcus Vance",
    location: "Matthews, NC",
    stars: 5,
    verified: true,
    date: "May 14, 2026",
    text: "The GAF Master Elite craftsmanship and Golden Pledge warranty give us total peace of mind. Professional crew completed the teardown and replacement perfectly."
  },
  {
    name: "Brooke Harrington",
    location: "Fort Mill, SC",
    stars: 5,
    verified: true,
    date: "April 22, 2026",
    text: "Amazing emergency leak repair! Their service dispatch arrived in under an hour and tarped our entire damaged skylight during a downpour to save our hardwood floors."
  },
  {
    name: "Greg Davidson",
    location: "Mooresville, NC",
    stars: 5,
    verified: true,
    date: "May 5, 2026",
    text: "Flawless standing seam metal roof installation. Highly energy-efficient and gorgeous curb appeal. The drone footage of the finished layout was impressive!"
  },
  {
    name: "Patricia Gable",
    location: "Gastonia, NC",
    stars: 5,
    verified: true,
    date: "April 30, 2026",
    text: "We are extremely glad we chose Titan Ridge. Anthony met with our insurance inspector and ensured the roof deck rot was fully documented and approved."
  },
  {
    name: "Tyler Sterling",
    location: "Monroe, NC",
    stars: 5,
    verified: true,
    date: "March 18, 2026",
    text: "A GAF Master Elite rating really shows in their work. Solder-sealed chimney flashings are bulletproof. Very tidy site layout and quick progress."
  },
  {
    name: "Nancy Albright",
    location: "Pineville, NC",
    stars: 5,
    verified: true,
    date: "May 11, 2026",
    text: "Excellent communication from Sarah in the office. The dispatch crew kept us informed throughout our commercial flat roof coating. Slashed our HVAC bills by 20%!"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActivePage>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(CAROUSEL_REVIEWS_DATA);
  const [recentLeads, setRecentLeads] = useState<LeadSubmission[]>([]);

  // Top header sub-menus states for simplified navigation
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  // Home interactive review carousel states
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewDirection, setReviewDirection] = useState<"next" | "prev">("next");

  const handleCarouselNext = () => {
    setReviewDirection("next");
    setCurrentReviewIndex((prev) => (prev + 1) % CAROUSEL_REVIEWS_DATA.length);
  };

  const handleCarouselPrev = () => {
    setReviewDirection("prev");
    setCurrentReviewIndex((prev) => (prev - 1 + CAROUSEL_REVIEWS_DATA.length) % CAROUSEL_REVIEWS_DATA.length);
  };

  // Form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Charlotte",
    service: "Residential Shingle Assessment",
    notes: "",
    agreed: false
  });
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Review submission state
  const [reviewForm, setReviewForm] = useState({
    name: "",
    location: "Charlotte, NC",
    stars: 5,
    text: "",
  });
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // New Inline Testimonials/Reviews section states
  const [inlineReviewActiveIndex, setInlineReviewActiveIndex] = useState(0);
  const [inlineReviewForm, setInlineReviewForm] = useState({
    name: "",
    location: "Charlotte, NC",
    stars: 5,
    text: ""
  });
  const [inlineReviewSuccess, setInlineReviewSuccess] = useState(false);

  // Estimator States
  const [estimateType, setEstimateType] = useState<"residential" | "commercial">("residential");
  const [estSelectedRoofType, setEstSelectedRoofType] = useState("Architectural Shingle");
  const [estAreaSqFt, setEstAreaSqFt] = useState(2400); // Average home roof size
  const [estVentilation, setEstVentilation] = useState("Ridge Vent & Intake");
  const [estDroneRequired, setEstDroneRequired] = useState(false);
  const [calculatedEstimate, setCalculatedEstimate] = useState({
    baseCost: 14400,
    ventCost: 1200,
    droneCost: 0,
    total: 15600,
    monthlyPayment: 130
  });

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "model"; content: string }[]>([
    {
      role: "model",
      content: "Hello! I am your Titan Ridge Storm Claim & Roof Advisor. Ask me anything about hail damage criteria, standard repair cost scales, insurance adjuster claim documentation, or 2-hour emergency tarps in the Charlotte metro area."
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Load leads from Express server
  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = await response.json();
        setRecentLeads(data);
      }
    } catch (err) {
      console.error("Failed to load leads from persistent memory", err);
    }
  };

  useEffect(() => {
    // Fetch leads initially and whenever activeTab changes to admin
    if (activeTab === "admin") {
      fetchLeads();
    }
  }, [activeTab]);

  // Recalculate estimates
  useEffect(() => {
    let costPerSqFt = 6; // Architectural Shingle base avg
    if (estSelectedRoofType === "Basic Asphalt") costPerSqFt = 4;
    else if (estSelectedRoofType === "Premium Designer") costPerSqFt = 10;
    else if (estSelectedRoofType === "Standing Seam Metal") costPerSqFt = 15;
    else if (estSelectedRoofType === "TPO Commercial") costPerSqFt = 18;
    else if (estSelectedRoofType === "Silicone Restoration Coating") costPerSqFt = 9;

    const baseCost = estAreaSqFt * costPerSqFt;
    const ventCost = estVentilation === "None" ? 0 : estVentilation === "Ridge Vent & Intake" ? 1200 : 750;
    const droneCost = estDroneRequired ? 199 : 0;
    const total = baseCost + ventCost + droneCost;
    
    // Low monthly rate formulation based on financing: total over 120 months (approx) or Greensky program rates
    const monthlyPayment = Math.max(99, Math.round(total / 120));

    setCalculatedEstimate({
      baseCost,
      ventCost,
      droneCost,
      total,
      monthlyPayment
    });
  }, [estSelectedRoofType, estAreaSqFt, estVentilation, estDroneRequired]);

  // Handle lead submission
  const handleLeadSubmit = async (e: React.FormEvent, customType?: "inspection" | "emergency" | "career" | "contact") => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionSuccess(null);

    const submissionPayload = {
      name: contactForm.name,
      email: contactForm.email,
      phone: contactForm.phone,
      city: contactForm.city,
      service: contactForm.service,
      notes: contactForm.notes,
      type: customType || "inspection"
    };

    try {
      const resp = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionPayload)
      });
      if (resp.ok) {
        const data = await resp.json();
        setSubmissionSuccess(`Successfully transmitted! Lead ID ${data.lead.id} created. Standard NC/SC response dispatched.`);
        setContactForm({
          name: "",
          email: "",
          phone: "",
          city: "Charlotte",
          service: "Residential Shingle Assessment",
          notes: "",
          agreed: false
        });
        fetchLeads();
      } else {
        const errData = await resp.json();
        setSubmissionSuccess(`Submission issue: ${errData.error || "Please verify credentials."}`);
      }
    } catch (err: any) {
      // Fallback lead store in-memory if server not available
      const mockId = "TR-" + Math.floor(1000 + Math.random() * 9000);
      setSubmissionSuccess(`Saved successfully locally (offline fallback mode)! Lead reference ID: ${mockId}. We've logged this for our crews.`);
      const localLeadList = [...recentLeads, { ...submissionPayload, id: mockId, submittedAt: new Date().toISOString(), status: "Local Pending" }];
      setRecentLeads(localLeadList);
    } finally {
      setSubmitting(false);
    }
  };

  // Chat message sending to Express AI agent proxy
  const handleSendChatMessage = async (e?: React.FormEvent, suggestedText?: string) => {
    if (e) e.preventDefault();
    const messageToSend = suggestedText || chatInput;
    if (!messageToSend.trim()) return;

    const userMsg = { role: "user" as const, content: messageToSend };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput("");
    setIsTyping(true);

    try {
      const resp = await fetch("/api/gemini/claim-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });
      if (resp.ok) {
        const data = await resp.json();
        setChatMessages([...updatedMessages, { role: "model", content: data.text }]);
      } else {
        const errData = await resp.json();
        throw new Error(errData.error || "AI Core feedback offline");
      }
    } catch (err: any) {
      // Intelligently fallback to rules-based answer so the user interface never breaks!
      setTimeout(() => {
        let fallbackText = "I apologize, our localized Carolina server is temporarily running in offline backup mode. ";
        const query = messageToSend.toLowerCase();
        
        if (query.includes("hail") || query.includes("storm") || query.includes("insurance")) {
          fallbackText += "At Titan Ridge, our storm restoration advocates assist homeowners with insurance evaluations on hail fractures. We supply free standard assessments, HAAG photologs via Hover and EagleView, and meet directly with adjusters to authorize 25-Year premium warranties.";
        } else if (query.includes("price") || query.includes("cost") || query.includes("replaces")) {
          fallbackText += "For standard asphalt shingle roofs, pricing spans $7,500-$11,000. Premium architectural shingles average $12,000-$18,000, and long-term metal roofs cost $28,000-$60,000. Financing partners GreenSky & Hearth offer 0% APR for 12 months with payments as low as $99/mo.";
        } else if (query.includes("emergency") || query.includes("tarp") || query.includes("leak") || query.includes("urgent")) {
          fallbackText += "URGENT STATUS DETECTED: Call our 24/7 dedicated rapid response hotline immediately at (704) 555-9110. Our crews target minor repairs in 1-2 hours and install windproof heavy-duty plastic tarps starting at $750.";
        } else {
          fallbackText += "For GAF Master Elite craftsmanship, call us at (704) 555-2847 or schedule your free aerial inspection using the contact form, and we'll send a coordinator out within 24 hours.";
        }
        
        setChatMessages([...updatedMessages, { role: "model", content: fallbackText }]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  // Form submit for user reviews
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) return;

    const newRevObj: CustomerReview = {
      name: reviewForm.name,
      location: reviewForm.location,
      stars: reviewForm.stars,
      text: reviewForm.text,
      verified: true,
      date: "Just Now"
    };

    setReviewsList([newRevObj, ...reviewsList]);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setReviewForm({ name: "", location: "Charlotte, NC", stars: 5, text: "" });
    }, 3000);
  };

  // Scroll to a specific target by selector
  const scrollToContact = (cityName?: string) => {
    if (cityName) {
      setContactForm(prev => ({ ...prev, city: cityName, notes: `Standard drone inspection requested for location: ${cityName}` }));
    }
    const target = document.getElementById("contact-lead-portal");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-[#FFFFFF] font-sans antialiased flex flex-col selection:bg-orange-500 selection:text-black">
      
      {/* Styled Header Nav */}
      <header className="sticky top-0 z-50 bg-[#1F1F1F]/45 backdrop-blur-xl border-b border-white/10 flex-shrink-0 transition-all duration-200 shadow-xl shadow-black/15">
        <div className="max-w-[1400px] w-full mx-auto h-24 pl-2 pr-4 sm:pl-4 sm:pr-8 flex items-center justify-between">
          
          {/* Titanium Logo Peak design */}
          <div className="flex items-center gap-3 cursor-pointer -ml-1 md:-ml-3 flex-shrink-0" onClick={() => setActiveTab("home")}>
            <img
              src="https://i.imgur.com/GqHsvIV.png"
              alt="Titan Ridge Logo"
              className="h-20 md:h-24 w-auto object-contain rounded transition-transform hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="flex-shrink-0">
              <span className="text-2xl font-black tracking-tighter uppercase italic block leading-none text-white hover:text-orange-500 transition-colors">
                Titan Ridge
              </span>
              <p className="text-[9px] tracking-[0.34em] uppercase text-neutral-400 font-bold leading-none mt-1">
                Roofing & Exteriors
              </p>
            </div>
          </div>

          {/* Nav Tabs - Desktop representation (Modernized, highly simplified layout preventing overcrowding) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Home Tab */}
            <button
              onClick={() => {
                setActiveTab("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer ${
                activeTab === "home"
                  ? "text-[#F97316] bg-white/5 border border-white/10"
                  : "text-neutral-400"
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase flex items-center gap-1 hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer ${
                  ["residential", "commercial", "repair", "storm"].includes(activeTab)
                    ? "text-[#F97316] bg-white/5 border border-white/10"
                    : "text-neutral-400"
                }`}
              >
                Services
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-52 bg-[#1F1F1F] border border-white/10 rounded shadow-xl py-2 z-50">
                  {[
                    { id: "residential", label: "Residential Roofing" },
                    { id: "commercial", label: "Commercial Flat Systems" },
                    { id: "repair", label: "Inspections/Repairs" },
                    { id: "storm", label: "Storm restoration" },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActiveTab(sub.id as ActivePage);
                        setServicesDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-extrabold text-neutral-450 hover:text-orange-500 hover:bg-white/5 transition duration-150 uppercase tracking-wide block"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Estimator Shortcuts Link */}
            <button
              onClick={() => {
                setActiveTab("home");
                setTimeout(() => {
                  document.getElementById("estimator-section")?.scrollIntoView({ behavior: "smooth" });
                }, 120);
              }}
              className="px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase text-neutral-400 hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer"
            >
              Estimator
            </button>

            {/* Financing */}
            <button
              onClick={() => {
                setActiveTab("financing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer ${
                activeTab === "financing"
                  ? "text-[#F97316] bg-white/5 border border-white/10"
                  : "text-neutral-400"
              }`}
            >
              Financing
            </button>

            {/* Project Gallery */}
            <button
              onClick={() => {
                setActiveTab("gallery");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer ${
                activeTab === "gallery"
                  ? "text-[#F97316] bg-white/5 border border-white/10"
                  : "text-neutral-400"
              }`}
            >
              Gallery
            </button>

            {/* Reviews */}
            <button
              onClick={() => {
                setActiveTab("reviews");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer ${
                activeTab === "reviews"
                  ? "text-[#F97316] bg-white/5 border border-white/10"
                  : "text-neutral-400"
              }`}
            >
              Reviews
            </button>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyDropdownOpen(true)}
              onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
              <button
                className={`px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase flex items-center gap-1 hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer ${
                  ["about", "careers", "blog"].includes(activeTab)
                    ? "text-[#F97316] bg-white/5 border border-white/10"
                    : "text-neutral-400"
                }`}
              >
                Company
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {companyDropdownOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-48 bg-[#1F1F1F] border border-white/10 rounded shadow-xl py-2 z-50">
                  {[
                    { id: "about", label: "About Our Crew" },
                    { id: "careers", label: "Careers Portal" },
                    { id: "blog", label: "Roofing Intel" },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActiveTab(sub.id as ActivePage);
                        setCompanyDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-extrabold text-neutral-450 hover:text-orange-500 hover:bg-white/5 transition duration-150 uppercase tracking-wide block"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              onClick={() => {
                setActiveTab("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold tracking-tight uppercase hover:text-orange-500 hover:bg-white/5 transition duration-150 cursor-pointer ${
                activeTab === "contact"
                  ? "text-[#F97316] bg-white/5 border border-white/10"
                  : "text-neutral-400"
              }`}
            >
              Contact
            </button>

          </nav>
 
          {/* Quick Contact & Dispatch Actions */}
          <div className="hidden sm:flex items-center gap-4 flex-shrink-0 min-w-max">
            <button
              onClick={() => {
                setActiveTab("admin");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-2.5 py-1.5 border border-neutral-700/60 hover:border-orange-500 text-[10px] font-mono rounded tracking-wider text-neutral-400 uppercase hover:text-white transition"
              title="Administrator Dispatch console to overview submitted leads"
            >
              Console
            </button>
            <div className="flex flex-col items-end flex-shrink-0 whitespace-nowrap">
              <p className="text-[9px] uppercase font-black text-[#F97316] tracking-widest leading-none whitespace-nowrap">
                Emergency Client
              </p>
              <a href="tel:7045559110" className="text-base font-black hover:text-[#F97316] transition leading-none mt-1 whitespace-nowrap select-all inline-block">
                (704) 555-9110
              </a>
            </div>
          </div>
 
          {/* Mobile responsive toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
 
        {/* Mobile dropdown panel overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 shadow-2xl transition-all duration-300">
            <div className="px-6 py-6 space-y-6">
              
              {/* Core site navigation links */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-extrabold block mb-3">Core Sections</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "home", label: "Home Overview" },
                    { id: "financing", label: "Financing Plans" },
                    { id: "gallery", label: "Project Gallery" },
                    { id: "reviews", label: "Client Reviews" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as ActivePage);
                        setMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`px-3 py-2 text-center rounded text-xs font-bold tracking-tight uppercase transition duration-150 ${
                        activeTab === tab.id
                          ? "text-[#1F1F1F] bg-[#F97316]"
                          : "text-neutral-350 bg-neutral-900 hover:bg-neutral-850"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Categories dropdown replacement */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-extrabold block mb-3">Our Core Services</span>
                <div className="space-y-1.5">
                  {[
                    { id: "residential", label: "Residential Roofing Care", desc: "GAF Lifetime premium shingles" },
                    { id: "commercial", label: "Commercial Flat Systems", desc: "TPO Cool membranes & silicone coatings" },
                    { id: "repair", label: "Moisture Drone & Repairs", desc: "Precision infrared forensics & leaks" },
                    { id: "storm", label: "Storm Claim Damage Assistance", desc: "HAAG certified adjusters representation" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as ActivePage);
                        setMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                        activeTab === tab.id
                          ? "bg-[#F97316]/10 border-[#F97316] text-[#F97316]"
                          : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-850"
                      }`}
                    >
                      <div>
                        <span className="text-xs font-extrabold block uppercase tracking-tight">{tab.label}</span>
                        <span className="text-[10px] text-neutral-400 block mt-0.5 font-normal capitalize">{tab.desc}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Background Information */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800">
                {[
                  { id: "about", label: "About Crew" },
                  { id: "careers", label: "Work With Us" },
                  { id: "blog", label: "Roof Intel" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as ActivePage);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`py-2 text-center rounded text-[10px] font-bold uppercase transition ${
                      activeTab === tab.id
                        ? "text-[#F97316] bg-white/5"
                        : "text-neutral-500 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active emergency call parameters */}
              <div className="pt-4 border-t border-neutral-800 flex justify-between items-center bg-neutral-900/50 p-4 rounded-xl">
                <button
                  onClick={() => {
                    setActiveTab("admin");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-3 py-1.5 bg-neutral-800 text-[10px] font-mono rounded tracking-wider text-neutral-400 uppercase hover:text-white transition"
                >
                  Admin CRM
                </button>
                <div className="text-right">
                  <p className="text-[9px] text-orange-500 uppercase font-bold tracking-widest leading-none">Emergency Hotline</p>
                  <a href="tel:7045559110" className="text-xs font-black text-white mt-1 block">(704) 555-9110</a>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Main Page Swapper */}
      <main className="flex-1">

        {/* 1. HOMEPAGE TAB PANEL */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* HERO SECTION - Bold typographic emphasis */}
            <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800" id="hero-section">
              {/* Background image overlay with brand matching stripe details */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://i.imgur.com/PIYMUkY.jpg"
                  alt="Titan Ridge roofing flagship design"
                  className="w-full h-full object-cover opacity-95 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                {/* Soft gradient fade on the left just to keep text highly legible, keeping the image bright and vivid elsewhere */}
                <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/45 to-transparent"></div>
                <div className="absolute inset-0 bg-neutral-950/15"></div>
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Text column */}
                <div className="lg:col-span-7 flex flex-col justify-center gap-6">
                  <div className="bg-[#F97316] w-fit px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#1F1F1F]">
                    Charlotte, NC & Surrounding Metro Zones
                  </div>
                  
                  <h1 className="title-huge text-3xl xs:text-5xl sm:text-7xl lg:text-80px leading-[0.9] font-black italic uppercase tracking-tighter">
                    Built Above <br/>
                    <span className="text-[#F97316] not-italic text-stroke-orange">Expectations.</span>
                  </h1>

                  <p className="text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed mt-2 font-normal">
                    Premium residential and commercial roofing layouts backmarked by elite certified GAF Master Elite craftsmanship, transparent drone footage, and dedicated insurance coordinators.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                      onClick={() => scrollToContact()}
                      className="bg-[#F97316] text-[#1F1F1F] font-black py-4 px-8 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-200 shadow-lg shadow-orange-500/10 text-center"
                    >
                      Get Free Inspection
                    </button>
                    <button
                      onClick={() => setActiveTab("storm")}
                      className="border-2 border-white/20 text-white font-black py-4 px-8 uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-200 text-center"
                    >
                      Storm Damage Help
                    </button>
                  </div>

                  {/* Trust factors / Ratings snippet */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/10 pt-8 mt-4 animate-fade-in">
                    <div>
                      <span className="text-xl xs:text-2xl sm:text-3xl font-black text-white block">4.9 ★</span>
                      <span className="text-[9px] xs:text-[10px] uppercase text-neutral-400 tracking-wide">684 Google Reviews</span>
                    </div>
                    <div>
                      <span className="text-xl xs:text-2xl sm:text-3xl font-black text-orange-500 block">GAF</span>
                      <span className="text-[9px] xs:text-[10px] uppercase text-neutral-400 tracking-wide">Master Elite®</span>
                    </div>
                    <div>
                      <span className="text-xl xs:text-2xl sm:text-3xl font-black text-white block">A+</span>
                      <span className="text-[9px] xs:text-[10px] uppercase text-neutral-400 tracking-wide">BBB Accredited</span>
                    </div>
                  </div>
                </div>

                {/* Imagery / Feature details Column */}
                <div className="lg:col-span-5 relative bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-2xl">
                  
                  {/* Absolute Badge */}
                  <div className="absolute -top-4 -right-4 bg-orange-500 text-black py-2 px-3 tracking-widest uppercase font-black text-[10px] rounded border-2 border-[#1F1F1F] shadow-lg animate-bounce">
                    24/7 Rapid Action
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-6 uppercase italic">
                    Core Operational Pillars
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="text-[#F97316] font-black text-xl bg-orange-500/10 h-10 w-10 rounded-lg flex items-center justify-center shrink-0">01</div>
                      <div>
                        <h4 className="text-base font-bold uppercase italic tracking-tight">Residential Precision</h4>
                        <p className="text-sm text-neutral-400 mt-1 leading-snug">Premium shingle alignments & heavy-duty ice dams engineered to keep interiors completely insulated.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start border-t border-white/15 pt-5">
                      <div className="text-[#F97316] font-black text-xl bg-orange-500/10 h-10 w-10 rounded-lg flex items-center justify-center shrink-0">02</div>
                      <div>
                        <h4 className="text-base font-bold uppercase italic tracking-tight">Commercial low-slope</h4>
                        <p className="text-sm text-neutral-400 mt-1 leading-snug">High-reflectance commercial TPO panels & continuous leak-proof industrial flat coatings.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start border-t border-white/15 pt-5">
                      <div className="text-[#F97316] font-black text-xl bg-orange-500/10 h-10 w-10 rounded-lg flex items-center justify-center shrink-0">03</div>
                      <div>
                        <h4 className="text-base font-bold uppercase italic tracking-tight">Insurance claim advocacy</h4>
                        <p className="text-sm text-neutral-400 mt-1 leading-snug">Certified roof analysis with rapid digital reporting to secure fair storm restoration outcomes.</p>
                      </div>
                    </div>
                  </div>

                  {/* Small review callout box - Continuous 10-Review Loop Carousel */}
                  <div className="mt-8 bg-neutral-950 p-5 rounded-2xl border-2 border-neutral-800 flex flex-col justify-between relative shadow-xl overflow-hidden min-h-[190px]">
                    
                    {/* Top line with dot indicators and arrows */}
                    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-2.5 mb-3.5">
                      
                      {/* Left: Size-Scaling Dots representing the total 10 Reviews */}
                      <div className="flex items-center gap-1.5" title="Titan Customer Verification">
                        {CAROUSEL_REVIEWS_DATA.map((_, dotIdx) => {
                          const isCurrent = dotIdx === currentReviewIndex;
                          return (
                            <div
                              key={dotIdx}
                              className={`rounded-full transition-all duration-300 ${
                                isCurrent 
                                  ? "bg-[#F97316] w-3 h-1.5" 
                                  : "bg-neutral-800 w-1 h-1 hover:bg-neutral-600"
                              }`}
                            />
                          );
                        })}
                      </div>

                      {/* Right: Left & Right Mini Arrows */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handleCarouselPrev}
                          className="p-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#F97316] text-[#F97316] hover:text-white transition cursor-pointer"
                          aria-label="Previous direct review"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <button
                          onClick={handleCarouselNext}
                          className="p-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#F97316] text-[#F97316] hover:text-white transition cursor-pointer"
                          aria-label="Next direct review"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>

                    {/* Active Review Data Card with continuous keyframe slide animations */}
                    <div
                      key={currentReviewIndex}
                      className={`flex-1 flex flex-col justify-between ${
                        reviewDirection === "next" ? "animate-slide-right" : "animate-slide-left"
                      }`}
                    >
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-0.5 text-orange-500 mb-2">
                          {Array.from({ length: CAROUSEL_REVIEWS_DATA[currentReviewIndex].stars }).map((_, stIdx) => (
                            <Star key={stIdx} className="w-3.5 h-3.5 fill-orange-500 text-orange-500 border-none" />
                          ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-xs text-neutral-300 italic leading-relaxed">
                          "{CAROUSEL_REVIEWS_DATA[currentReviewIndex].text}"
                        </p>
                      </div>

                      {/* Signature Row */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-3 text-[10px] font-bold">
                        <span className="text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> VERIFIED CUSTOMER
                        </span>
                        <span className="text-orange-500 uppercase">
                          — {CAROUSEL_REVIEWS_DATA[currentReviewIndex].name}, {CAROUSEL_REVIEWS_DATA[currentReviewIndex].location}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* SERVICES OVERVIEW */}
            <section className="py-20 bg-[#1F1F1F] max-w-7xl mx-auto px-4 sm:px-8">
              <div className="text-center mb-16">
                <span className="text-xs font-black text-[#F97316] uppercase tracking-[0.3em] block mb-2">Architectural Excellence</span>
                <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold uppercase italic tracking-tight">Services Profile</h2>
                <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {SERVICES_DATA.map((srv) => (
                  <div
                    key={srv.id}
                    className={`bg-neutral-900 border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                      srv.id === "residential"
                        ? "border-orange-500 shadow-orange-500/10 ring-2 ring-orange-500/20"
                        : "border-neutral-800 hover:border-[#F97316]/65"
                    }`}
                  >
                    <div>
                      <div className={`relative overflow-hidden bg-neutral-950 transition-all duration-300 ${
                        srv.id === "residential" ? "h-64 border-b border-orange-500/20" : "h-48"
                      }`}>
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className={`w-full h-full object-cover transition-transform duration-500 opacity-80 ${
                            srv.id === "residential" ? "scale-105 group-hover:scale-115" : "group-hover:scale-110"
                          }`}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                        <span className="absolute bottom-4 left-4 text-xs font-mono font-bold uppercase py-1 px-2.5 bg-[#F97316] text-[#1F1F1F] rounded">
                          {srv.id === "storm" ? "Insurance Approved" : "Fully Certified"}
                        </span>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold uppercase italic text-white group-hover:text-orange-500 transition-colors">
                          {srv.title}
                        </h3>
                        <p className="text-neutral-400 text-xs mt-2 line-clamp-3">
                          {srv.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => {
                          setActiveTab(srv.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full py-2.5 bg-neutral-800 group-hover:bg-orange-500 text-white group-hover:text-black text-xs font-black uppercase tracking-wider transition-all duration-200 rounded"
                      >
                        Explore Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BEFORE / AFTER SLIDER SHOWCASE SECTION (with responsive wrapper block) */}
            <section className="py-16 bg-white text-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <BeforeAfterSlider />
              </div>
            </section>

            {/* INTERACTIVE WORK RESTORATION ESTIMATOR */}
            <section id="estimator-section" className="py-20 bg-neutral-950 border-t border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Form control side */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-[#F97316] text-xs font-black tracking-widest uppercase block mb-1">Interactive Calculator</span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold uppercase italic tracking-tight text-white">Instant Roof Estimator</h2>
                      <p className="text-sm text-neutral-400 mt-2">
                        Adjust measurements relative to your residential or commercial layout to project real-time expenses and financing installments.
                      </p>
                    </div>

                    <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-6">
                      {/* Structure type tabs */}
                      <div>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">Structure Archetype</span>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              setEstimateType("residential");
                              setEstSelectedRoofType("Architectural Shingle");
                            }}
                            className={`py-2 px-1 xs:px-4 rounded text-[10px] xs:text-xs font-bold uppercase tracking-wider border-2 transition ${
                              estimateType === "residential"
                                ? "bg-orange-500/10 border-orange-500 text-orange-500"
                                : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white"
                            }`}
                          >
                            Residential Family
                          </button>
                          <button
                            onClick={() => {
                              setEstimateType("commercial");
                              setEstSelectedRoofType("TPO Commercial");
                            }}
                            className={`py-2 px-1 xs:px-4 rounded text-[10px] xs:text-xs font-bold uppercase tracking-wider border-2 transition ${
                              estimateType === "commercial"
                                ? "bg-orange-500/10 border-orange-500 text-orange-500"
                                : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white"
                            }`}
                          >
                            Commercial Enterprise
                          </button>
                        </div>
                      </div>

                      {/* Material Select */}
                      <div>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">Material / System Choice</span>
                        <select
                          value={estSelectedRoofType}
                          onChange={(e) => setEstSelectedRoofType(e.target.value)}
                          className="w-full bg-[#1F1F1F] border border-neutral-700 px-4 py-2.5 rounded text-sm font-semibold focus:outline-none focus:border-orange-500"
                        >
                          {estimateType === "residential" ? (
                            <>
                              <option value="Basic Asphalt">Basic Asphalt ($4/sq ft)</option>
                              <option value="Architectural Shingle">Architectural Shingle ($6/sq ft)</option>
                              <option value="Premium Designer">Premium Designer ($10/sq ft)</option>
                              <option value="Standing Seam Metal">Standing Seam Metal ($15/sq ft)</option>
                            </>
                          ) : (
                            <>
                              <option value="TPO Commercial">TPO Commercial System ($18/sq ft)</option>
                              <option value="Silicone Restoration Coating">Fluid Silicone Coating ($9/sq ft)</option>
                            </>
                          )}
                        </select>
                      </div>

                      {/* Square Footage Area Slider */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Calculated Area Square Feet</span>
                          <span className="text-sm font-mono font-bold text-orange-500">{estAreaSqFt.toLocaleString()} sq. ft.</span>
                        </div>
                        <input
                          type="range"
                          min={estimateType === "residential" ? 1000 : 5000}
                          max={estimateType === "residential" ? 6000 : 40000}
                          step={100}
                          value={estAreaSqFt}
                          onChange={(e) => setEstAreaSqFt(Number(e.target.value))}
                          className="w-full accent-orange-500 bg-neutral-800 cursor-pointer h-1.5 rounded-lg"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                          <span>Min: {estimateType === "residential" ? "1,000" : "5,000"} sq ft</span>
                          <span>Max: {estimateType === "residential" ? "6,000" : "40,000"} sq ft</span>
                        </div>
                      </div>

                      {/* Ventilation Upgrade choices */}
                      <div>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">Ventilation & Defense Addons</span>
                        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2">
                          {["None", "Standard Gable", "Ridge Vent & Intake"].map((vType) => (
                            <button
                              key={vType}
                              onClick={() => setEstVentilation(vType)}
                              className={`py-2 px-1 text-center text-[10px] font-bold uppercase rounded border transition ${
                                estVentilation === vType
                                  ? "bg-orange-500 text-[#1F1F1F] border-transparent"
                                  : "bg-neutral-850 border-neutral-750 text-neutral-400"
                              }`}
                            >
                              {vType}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Drone Check toggle */}
                      <label className="flex items-center gap-3 cursor-pointer bg-neutral-850 p-3 rounded-lg border border-neutral-750 select-none">
                        <input
                          type="checkbox"
                          checked={estDroneRequired}
                          onChange={(e) => setEstDroneRequired(e.target.checked)}
                          className="w-4 h-4 rounded accent-orange-500 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-extrabold text-white uppercase block">Upgrade to Thermal Drone Flight (+$199)</span>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">Captures micro cracks & water collection pockets under scanning lens.</span>
                        </div>
                      </label>
                    </div>

                  </div>

                  {/* Calculations Result Output */}
                  <div className="bg-neutral-900 border-2 border-orange-500/60 p-4 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[440px]">
                    
                    {/* Visual pattern grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none"></div>

                    <div className="relative">
                      <span className="px-2.5 py-0.5 bg-orange-500/10 text-orange-500 border border-orange-500/20 text-[10px] tracking-widest uppercase font-black rounded">
                        Titan Custom Assessment Projections
                      </span>
                      
                      <div className="mt-8 space-y-4">
                        <div className="flex justify-between text-sm text-neutral-400 pb-3 border-b border-white/5">
                          <span>Base Layout Cost ({estAreaSqFt.toLocaleString()} sq ft)</span>
                          <span className="font-mono font-bold text-white">${calculatedEstimate.baseCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-neutral-400 pb-3 border-b border-white/5">
                          <span>Premium Ventilation Ridge Seals</span>
                          <span className="font-mono font-bold text-white">${calculatedEstimate.ventCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-neutral-400 pb-3 border-b border-white/5">
                          <span>Forensic Thermal Scanning Flight</span>
                          <span className="font-mono font-bold text-white">${calculatedEstimate.droneCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-4">
                          <span className="text-base font-bold text-white uppercase italic">Complete Cost Projection</span>
                          <span className="text-3xl font-black text-[#F97316] font-mono">${calculatedEstimate.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-8 bg-neutral-950 p-4 sm:p-6 rounded-2xl border border-neutral-800 flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-[10px] text-[#B0B7C3] uppercase tracking-widest block font-bold">Greensky Partner Plan</span>
                        <span className="text-3xl font-black text-white block mt-1">${calculatedEstimate.monthlyPayment}<span className="text-xs font-bold text-neutral-400">/mo</span></span>
                        <span className="text-[9px] text-orange-500 font-bold block mt-1">0% APR available for 12 mos</span>
                      </div>
                      <button
                        onClick={() => {
                          setContactForm(prev => ({ ...prev, notes: `Interactive Estimator Summary: ${estAreaSqFt}sqft of ${estSelectedRoofType}. Estimated Total: $${calculatedEstimate.total}.` }));
                          scrollToContact();
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wider transition-colors shrink-0"
                      >
                        Secure Financing Now
                      </button>
                    </div>

                    <p className="text-[9px] text-neutral-500 mt-4 italic">
                      *Estimates are calculated via standard Carolinas structural models. Roof complexity factors, dynamic pitch variations, and gutter tie-ins will be verified in-person by HAAG certified consultants free of charge.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* AERIAL MAP AREA COVERAGE */}
            <section className="py-20 bg-[#1F1F1F]">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="text-center mb-12">
                  <span className="text-xs font-bold text-[#F97316] uppercase tracking-[0.3em] block mb-2">Regional Dispatch Network</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold uppercase italic">Our Service Territory</h2>
                  <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded"></div>
                </div>
                
                <ServiceAreaMap onSelectCity={(cityName) => scrollToContact(cityName)} />
              </div>
            </section>

            {/* INSURANCE CO-ORDINATOR GUIDE */}
            <section id="insurance-section" className="py-20 bg-neutral-950 text-white border-t border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-orange-500 text-xs font-mono font-bold uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded">Certified Storm Restoration Procedures</span>
                  <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight uppercase italic mt-4">Filing Insurance Claims Without Hassle</h2>
                  <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                    We bring extensive underwriting logic to your assistance. Do not let claims adjusters undervalue shingle wind-shear or fractured composite layers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                  
                  {/* Decorative timeline line */}
                  <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-neutral-800 z-0"></div>

                  {[
                    { step: "01", title: "Drone Diagnostics", desc: "Our specialists deploy high-definition thermal drones to map hail bruises and shingle fracture stresses completely off-site." },
                    { step: "02", title: "Adjuster Session", desc: "We meet directly on-site with your insurance carrier's claims adjuster to provide forensic photographic proof of water intrusion." },
                    { step: "03", title: "Approval & Choices", desc: "Once authorized, browse lifetime certified shingle styles, gutter profiles, and ventilation layouts in our client portal." },
                    { step: "04", title: "Seamless Re-roof", desc: "Our residential crew tears off, installs water systems, and conducts dual magnet sweeps—usually finished in a single day!" },
                  ].map((s, i) => (
                    <div key={i} className="relative z-10 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-orange-500 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-orange-500 text-black flex items-center justify-center font-black text-lg shadow-md mb-4">
                        {s.step}
                      </div>
                      <h4 className="text-lg font-bold uppercase italic text-white mb-2">{s.title}</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Emergency tarp CTA Callout */}
                <div className="bg-[#1f1f1f] border-2 border-[#F97316] rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest block">Active Leak Mitigation</span>
                    <h3 className="text-2xl font-black text-white uppercase italic">Active storm water intrusion?</h3>
                    <p className="text-xs text-[#B0B7C3] max-w-xl">
                      Do not wait for standard appraisal timelines. Our 24/7 emergency response teams deploy water barriers and windproof heavy tarps within 2 hours to prevent drywall rot.
                    </p>
                  </div>
                  <a href="tel:7045559110" className="bg-[#F97316] text-[#1F1F1F] text-xs font-black py-4 px-8 uppercase tracking-widest hover:bg-white hover:text-black transition shrink-0 inline-block text-center">
                    Dispatch Emergency Team
                  </a>
                </div>
              </div>
            </section>

            {/* NEW SECTION: REVIEWS MODULE */}
            <section className="py-20 bg-[#1F1F1F] border-t border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-orange-500 text-xs font-mono font-bold uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded">
                    Client Testimonials
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase italic mt-4 text-white">
                    What Our Clients Say
                  </h2>
                  <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                    Read unedited reviews from homeowners across the Carolinas, or submit your own feedback live.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                  
                  {/* LEFT SIDE: Slideshow Carousel */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[380px] lg:min-h-[420px]">
                    
                    {/* Background visual detail */}
                    <div className="absolute top-2 right-4 text-neutral-850 font-serif text-[180px] font-black pointer-events-none select-none leading-none opacity-20">
                      “
                    </div>

                    <div className="relative z-10 w-full overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${inlineReviewActiveIndex * 100}%)` }}
                      >
                        {reviewsList.map((rev, idx) => (
                          <div key={idx} className="w-full shrink-0 flex-shrink-0 flex flex-col justify-between break-words" style={{ width: "100%" }}>
                            <div>
                              {/* Rating display */}
                              <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, sIdx) => (
                                  <Star 
                                    key={sIdx} 
                                    className={`w-4 h-4 ${sIdx < rev.stars ? "text-orange-500 fill-orange-500" : "text-neutral-700"}`} 
                                  />
                                ))}
                              </div>

                              {/* Review text */}
                              <p className="text-sm text-neutral-200 italic leading-relaxed mb-6 font-medium">
                                "{rev.text}"
                              </p>
                            </div>

                            {/* Review author & location details */}
                            <div className="border-t border-white/5 pt-4 mt-auto">
                              <h4 className="text-base font-black text-white">{rev.name}</h4>
                              <p className="text-xs text-neutral-400 font-mono mt-0.5">{rev.location}</p>
                              
                              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Verified Homeowner — {rev.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation layout */}
                    <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5 relative z-20">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        Review {inlineReviewActiveIndex + 1} of {reviewsList.length}
                      </span>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setInlineReviewActiveIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1))}
                          className="w-10 h-10 bg-neutral-900 border border-neutral-800 hover:border-orange-500 text-white rounded-lg flex items-center justify-center transition hover:bg-[#1F1F1F] cursor-pointer"
                          aria-label="Previous review"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setInlineReviewActiveIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1))}
                          className="w-10 h-10 bg-neutral-900 border border-neutral-800 hover:border-orange-500 text-white rounded-lg flex items-center justify-center transition hover:bg-[#1F1F1F] cursor-pointer"
                          aria-label="Next review"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT SIDE: Submit Review Form */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-2xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black uppercase italic text-orange-500 mb-2">
                        Write a Review
                      </h3>
                      <p className="text-neutral-400 text-xs mb-6">
                        We value your honest feedback. Share your Titan Ridge experience with other local homeowners.
                      </p>

                      {inlineReviewSuccess ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-xl text-xs flex flex-col items-center text-center gap-3 animate-fade-in my-auto py-12">
                          <Check className="w-10 h-10 text-emerald-400 bg-emerald-500/10 rounded-full p-2" />
                          <div>
                            <p className="font-extrabold uppercase tracking-widest text-sm text-white">Feedback Submitted!</p>
                            <p className="mt-1 text-neutral-400">Your review was verified and added to our slider.</p>
                          </div>
                        </div>
                      ) : (
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!inlineReviewForm.name.trim() || !inlineReviewForm.text.trim()) return;
                            
                            const newRev: CustomerReview = {
                              name: inlineReviewForm.name.trim(),
                              location: inlineReviewForm.location.trim() || "Charlotte, NC",
                              stars: inlineReviewForm.stars,
                              text: inlineReviewForm.text.trim(),
                              verified: true,
                              date: "Just Now"
                            };

                            setReviewsList((prev) => [newRev, ...prev]);
                            setInlineReviewActiveIndex(0);
                            setInlineReviewSuccess(true);
                            
                            setTimeout(() => {
                              setInlineReviewSuccess(false);
                              setInlineReviewForm({
                                name: "",
                                location: "Charlotte, NC",
                                stars: 5,
                                text: ""
                              });
                            }, 4000);
                          }} 
                          className="space-y-4 text-xs"
                        >
                          <div>
                            <label className="block text-neutral-400 uppercase tracking-widest font-bold mb-1.5">
                              Your Name
                            </label>
                            <input
                              type="text"
                              required
                              value={inlineReviewForm.name}
                              onChange={(e) => setInlineReviewForm({ ...inlineReviewForm, name: e.target.value })}
                              placeholder="e.g. John Doe"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500 font-medium transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-neutral-400 uppercase tracking-widest font-bold mb-1.5">
                              Location
                            </label>
                            <input
                              type="text"
                              required
                              value={inlineReviewForm.location}
                              onChange={(e) => setInlineReviewForm({ ...inlineReviewForm, location: e.target.value })}
                              placeholder="e.g. Charlotte, NC"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500 font-medium transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-neutral-400 uppercase tracking-widest font-bold mb-1.5">
                              Star Rating
                            </label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setInlineReviewForm({ ...inlineReviewForm, stars: s })}
                                  className="group p-1 font-bold text-lg focus:outline-none transition-transform active:scale-95"
                                >
                                  <Star 
                                    className={`w-5 h-5 ${
                                      inlineReviewForm.stars >= s 
                                        ? "text-orange-500 fill-orange-500" 
                                        : "text-neutral-700 hover:text-neutral-500"
                                    }`} 
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-neutral-400 uppercase tracking-widest font-bold mb-1.5">
                              Your Message
                            </label>
                            <textarea
                              required
                              rows={3}
                              value={inlineReviewForm.text}
                              onChange={(e) => setInlineReviewForm({ ...inlineReviewForm, text: e.target.value })}
                              placeholder="Detail your experience with our crew and roof quality..."
                              className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500 font-medium transition-colors resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 bg-[#F97316] hover:bg-orange-600 text-[#1F1F1F] font-black uppercase tracking-widest text-xs transition duration-150 shadow-lg shadow-orange-500/10 cursor-pointer text-center block rounded mt-2"
                          >
                            Submit Review
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </section>

          </div>
        )}

        {/* 2. RESIDENTIAL ROOFING TAB */}
        {activeTab === "residential" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Home Defense Systems</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Residential Roofing</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Charlotte’s leading GAF Master Elite installer of lifetime warranted shingles, designer slate shingles, and sleek standing seam systems.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
              <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl group">
                <img
                  src="https://i.imgur.com/IPS4SjA.jpg"
                  alt="Quality shingles installation close up"
                  className="w-full h-auto min-h-[400px] md:min-h-[500px] object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-2xl font-black uppercase italic text-orange-500">The Anatomy of a Lifetime Roof</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Most roofing failures originate from cutting material corners on water shields or neglecting balanced attic cooling flow. At Titan Ridge, our shingle installations integrate GAF system architecture to lock weather entirely outside.
                </p>

                <div className="space-y-4">
                  {[
                    { name: "Double Ice & Water Guards", text: "Compulsory premium membranes glued on all valleys, chimneys, and roof eaves to reject severe water ponding." },
                    { name: "High-Density Ridge Venting", text: "Prompts constant air evacuation, pulling out extreme NC heat to prevent shingle blistering." },
                    { name: "Synthetic Underlayment barrier", text: "Tough water-resistant protective layer that replaces traditional paper felt for 25x greater strength." },
                    { name: "Premium Zinc Cleat Bars", text: "Resists mold and dark algae streaks typical to high-humidity Carolina seasons." }
                  ].map((f, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-extrabold text-white uppercase">{f.name}</h4>
                        <p className="text-xs text-neutral-400 mt-1">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Section for Residential */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
              <h3 className="text-2xl font-extrabold uppercase italic mt-2 text-white text-center mb-8">Residential Base Pricing Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRICING_DATA.filter(p => p.category === "replacement" && !p.name.includes("Commercial")).map((plan, i) => (
                  <div key={i} className="bg-[#1f1f1f] border border-neutral-800 hover:border-orange-500/80 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-black uppercase italic text-orange-500">{plan.name}</h4>
                      <p className="text-2xl font-mono font-black text-white mt-1">{plan.range}</p>
                      <ul className="space-y-2 mt-4">
                        {plan.features.map((f, j) => (
                          <li key={j} className="text-xs text-neutral-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => {
                      setContactForm(prev => ({ ...prev, notes: `Interested in: ${plan.name} pricing package.` }));
                      scrollToContact();
                    }} className="w-full text-center bg-transparent hover:bg-orange-500 border border-neutral-700 hover:border-transparent hover:text-black py-2.5 rounded text-xs uppercase font-bold tracking-wider mt-6 transition">
                      Schedule Estimate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. COMMERCIAL ROOFING TAB */}
        {activeTab === "commercial" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Commercial Assets Protection</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Commercial Roofing</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Engineered for maximum thermal barrier reflectivity, flat low-slope durability, and severe weather compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold uppercase italic text-white">Reflective Single-Ply System Specialists</h3>
                <p className="text-sm text-neutral-350 leading-relaxed">
                  Commercial building properties across the Southeast lose thousands to premature roof degradation caused by poor ventilation and sub-standard roofing tarps. Professional grade Single-Ply TPO and Silicone coatings form a watertight barrier that slashes summer energy load.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-neutral-900 p-4 border border-neutral-800 rounded-xl">
                    <h4 className="font-extrabold text-orange-500 uppercase text-xs tracking-wider">TPO COOL ROOFS</h4>
                    <p className="text-xs text-neutral-400 mt-1">Heat-welded commercial seams that expand and contract under severe thermal shifts.</p>
                  </div>
                  <div className="bg-neutral-900 p-4 border border-neutral-800 rounded-xl">
                    <h4 className="font-extrabold text-orange-500 uppercase text-xs tracking-wider">EPDM COLD WEATHER STABILITY</h4>
                    <p className="text-xs text-neutral-400 mt-1">Synthetic black rubber roofs optimized for massive distribution warehouses and manufacturing plants.</p>
                  </div>
                  <div className="bg-neutral-900 p-4 border border-neutral-800 rounded-xl">
                    <h4 className="font-extrabold text-orange-500 uppercase text-xs tracking-wider">SILICONE FLUID SEALS</h4>
                    <p className="text-xs text-neutral-400 mt-1">Cost-effective fluid coating which forms a monolithic layer, saving up to 50% vs material replacement.</p>
                  </div>
                  <div className="bg-neutral-900 p-4 border border-neutral-800 rounded-xl">
                    <h4 className="font-extrabold text-orange-500 uppercase text-xs tracking-wider">SCHEDULING PREVENTATIVE PLANS</h4>
                    <p className="text-xs text-neutral-400 mt-1">Continuous drone tracking & thermal imagery checkpoints verifying membrane health twice a year.</p>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="https://i.imgur.com/tSZANe4.jpg"
                  alt="Industrial commercial flat roof installation"
                  className="rounded-2xl border border-[#555D66]/20 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Special Callout: Commercial flat roof pricing banner */}
            <div className="bg-neutral-950 p-8 border-2 border-orange-500/80 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-xl font-bold uppercase italic text-[#F97316]">Flat Industrial Membrane Pricing</h4>
                <p className="text-sm text-neutral-400 mt-1 max-w-xl">
                  Commercial Flat Roof installations start from <strong>$18 per sq. ft.</strong>, inclusive of high-reflectivity guarantees, insulation board, and GAF/Owens Corning system warranties.
                </p>
              </div>
              <button onClick={() => {
                setContactForm(prev => ({ ...prev, service: "Commercial Flat Roof Evaluation" }));
                scrollToContact();
              }} className="bg-orange-500 hover:bg-orange-600 text-black font-extrabold py-3.5 px-6 rounded text-xs uppercase tracking-wider transition">
                Request Facility Evaluation
              </button>
            </div>
          </div>
        )}

        {/* 4. REPAIRS & DRONE DIAGNOSTICS TAB */}
        {activeTab === "repair" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Pinpoint Thermal Diagnostics</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Inspections & Repairs</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Detecting molecular moisture pockets under shingles before internal drywall mold and ceiling rot occurs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src="https://i.imgur.com/GaaKU6O.jpg"
                  alt="Roofer repair flashing work"
                  className="rounded-2xl border border-neutral-800 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6">
                <span className="px-2.5 py-0.5 bg-[#F97316]/20 text-orange-500 text-xs font-mono font-bold tracking-widest uppercase rounded">
                  Thermal Drone Mapping
                </span>
                <h3 className="text-2xl font-black uppercase italic text-white">How We Trace Concealed Traps</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Standard roofing leaks look straightforward on top, but water trickles sideways along rafters. Our drone technicians use temperature scans to analyze heat loss profiles, finding trapped moisture sheets under decking before mold spreads.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-black uppercase text-white">Infrared Scanning ($199)</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">Scans structural surface curves within minutes to track rafter leak flows.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Wrench className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-black uppercase text-white">Flashing Reconstruction</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">Solder-sealed chimney aprons and heavy step copper valley seals.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRICING_DATA.filter(p => p.category === "repair").map((srv, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-widest">Repair Package</span>
                    <h4 className="text-lg font-black uppercase italic text-white mt-1 pt-1 border-t border-white/5">{srv.name}</h4>
                    <p className="text-xl font-mono font-black text-orange-500 mt-1.5">{srv.range}</p>
                    <ul className="space-y-2 mt-4 text-xs text-neutral-400">
                      {srv.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => {
                    setContactForm(prev => ({ ...prev, service: `Repair Task: ${srv.name}` }));
                    scrollToContact();
                  }} className="w-full text-center bg-neutral-800 hover:bg-orange-500 text-white hover:text-black py-2.5 rounded text-xs font-bold uppercase tracking-wider mt-6 transition">
                    Dispatch Repair
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. STORM RESTORATION / CLAIM NAV TAB */}
        {activeTab === "storm" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Insurance Navigation Authority</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Storm Damage Center</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Do not let insurance companies short-change your hail and high-wind shingle fractures. We provide comprehensive HAAG appraisals to secure full claims.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              
              {/* Claims Details Card */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-black uppercase italic text-orange-500">Navigating Hail Repairs With Expert Adjusters</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Following strong windstorms or hail microbursts, windward shingle layers lose aggregate shingle layers and fracture underneath the composite mat. Insurance adjusters regularly classify storm damage as cosmetic wear.
                </p>

                <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h4 className="text-base font-bold text-white uppercase italic">Our Claim Support Deliverables:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <li className="text-xs text-neutral-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      <div>
                        <strong>HAAG Forensic Flight Logs:</strong>
                        <p className="text-neutral-400 mt-0.5">Aerial high resolution maps proving shingle bruising stresses.</p>
                      </div>
                    </li>
                    <li className="text-xs text-neutral-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      <div>
                        <strong>Line-Item Claim Surveys:</strong>
                        <p className="text-neutral-400 mt-0.5">Xactimate compatible structures directly mapped to NC builders code specifications.</p>
                      </div>
                    </li>
                    <li className="text-xs text-neutral-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      <div>
                        <strong>Physical Adjuster Meets:</strong>
                        <p className="text-neutral-400 mt-0.5">We meet adjusters physically at the site to highlight rafters stress and seam splits.</p>
                      </div>
                    </li>
                    <li className="text-xs text-neutral-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      <div>
                        <strong>Total Temporary Coverage:</strong>
                        <p className="text-neutral-400 mt-0.5">Same-day heavy-duty tarp protections to lock out moisture rot immediately.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => scrollToContact()} className="bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs py-3.5 px-6 rounded uppercase tracking-wider transition">
                    Book HAAG Inspection
                  </button>
                  <a href="tel:7045559110" className="border-2 border-orange-500 text-orange-500 font-extrabold text-xs py-3 px-6 rounded uppercase tracking-wider hover:bg-orange-500 hover:text-black transition flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-orange-500 group-hover:text-black" /> Call Storm dispatch
                  </a>
                </div>
              </div>

              {/* LIVE AI HELPER CHAT COLUMN */}
              <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col overflow-hidden h-[540px]">
                {/* AI Chat Header */}
                <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#FFFFFF]">TITAN STORM CONSULTANT ADVISOR</h4>
                      <p className="text-[9px] text-neutral-400 font-bold tracking-tight">AI Claim Support Simulator Core</p>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-orange-500" />
                </div>

                {/* Messages panel */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                      <span className="text-[8px] text-neutral-500 uppercase tracking-widest block mb-1">
                        {m.role === "user" ? "Homeowner / Client" : "Titan Agent"}
                      </span>
                      <div className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                        m.role === "user"
                          ? "bg-orange-500 text-black rounded-tr-none font-bold"
                          : "bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-tl-none"
                      }`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] pl-1 animate-pulse">
                      <span>Titan agent mapping shingle database...</span>
                    </div>
                  )}
                </div>

                {/* Suggestions triggers */}
                <div className="p-2 bg-neutral-950 border-t border-neutral-800 border-b border-neutral-800/80 scroll-x flex gap-2 overflow-x-auto whitespace-nowrap">
                  {[
                    "Confirm my hail damage eligibility",
                    "How much is standing seam?",
                    "Do adjusters review drone flyovers?",
                    "Schedule emergency leak stabilization"
                  ].map((sText, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendChatMessage(undefined, sText)}
                      className="px-2.5 py-1 bg-neutral-900 rounded text-[9px] text-neutral-400 hover:text-orange-500 border border-neutral-800 transition"
                    >
                      {sText}
                    </button>
                  ))}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendChatMessage} className="p-3 bg-neutral-950 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about hail damage, warranties, or prices..."
                    className="flex-1 bg-neutral-900 border border-neutral-850 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                  <button type="submit" className="bg-[#F97316] hover:bg-orange-600 text-[#1F1F1F] text-xs font-bold px-4 py-2 rounded uppercase tracking-wider">
                    Send
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

        {/* 6. FINANCING OPTIONS TAB */}
        {activeTab === "financing" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Flexible Investment Solutions</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Financing & Terms</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Quick approvals from Greensky, Hearth, and Synchrony with payments as low as $99/mo depending on composite volume parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <span className="bg-orange-500 text-black text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded">
                  Carolina Budget Solutions
                </span>
                <h3 className="text-2xl font-black uppercase italic text-white">0% APR For 12 Whole Months</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Roof replacement represents a highly critical security investment that should never be delayed due to liquidity limitations. We partner with the nation's leading consumer underwriters, ensuring Charlotte property owners can instantly schedule repairs offline or online.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-neutral-900 p-4 border border-neutral-800 rounded-xl text-center">
                    <span className="text-2xl font-mono font-black text-orange-500 block">0%</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1 block">APR Interest for 1 Year</span>
                  </div>
                  <div className="bg-neutral-900 p-4 border border-neutral-800 rounded-xl text-center">
                    <span className="text-2xl font-mono font-black text-white block">$99</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1 block">Installments low as</span>
                  </div>
                  <div className="bg-neutral-900 p-4 border border-neutral-800 rounded-xl text-center">
                    <span className="text-2xl font-mono font-black text-orange-500 block">Fast</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1 block">Approvals logged in secs</span>
                  </div>
                </div>
              </div>

              {/* Financing Partners Cards */}
              <div className="bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-6">
                <h4 className="text-lg font-black uppercase italic text-white pb-3 border-b border-white/5">Our Partner Underwriters:</h4>
                
                <div className="space-y-4">
                  {[
                    { name: "Greensky Underwriting", text: "Optimal for comprehensive standing seam metal replacement and multi-valley composite shingle structures." },
                    { name: "Hearth Financing Plans", text: "Specialized in emergency roof stabilizers, leak reconstructions, and gutter replacements with immediate approvals." },
                    { name: "Synchrony Home Improvement", text: "Features extremely affordable vertical terms mapping lower monthly payments starting at $99." }
                  ].map((p, idx) => (
                    <div key={idx} className="bg-neutral-950 p-4 border border-neutral-800 rounded-xl">
                      <h5 className="text-sm font-extrabold text-white uppercase">{p.name}</h5>
                      <p className="text-xs text-neutral-400 mt-1">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Our Visual Footprints</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Carolinas Showcase</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Review verified home before-and-after projects across North and South Carolina.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Architectural Remodel", tag: "Charlotte NC", img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=700", notes: "Complete replacement with GAF Charcoal Timberline shingles." },
                { title: "Industrial flat TPO Seal", tag: "Concord NC", img: "https://i.imgur.com/tSZANe4.jpg", notes: "Heat-welded commercial membrane system over multi-unit warehouse complex." },
                { title: "Metal Seam Installation", tag: "Mooresville NC", img: "https://i.imgur.com/74vJfvi.jpg", notes: "Standing seam configuration with reflective solar index panels." },
                { title: "Designer Slate shingle style", tag: "Huntersville NC", img: "https://i.imgur.com/KTcCmsL.jpg", notes: "Premium designer shingles coupled with copper flashing collars." },
                { title: "Fluid Silicone Seal Coat", tag: "Rock Hill SC", img: "https://i.imgur.com/NrTAPyu.jpg", notes: "Fluid applied seamless overlay restoring 12,000sqft low-slope center." },
                { title: "Storm reconstruction and tarps", tag: "Matthews NC", img: "https://i.imgur.com/kRtHiyd.jpg", notes: "Reconstruction of weather-damaged wood decks and ridge vent configuration." }
              ].map((item, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500 transition shadow-xl group">
                  <div className="h-56 overflow-hidden relative bg-neutral-950">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85" referrerPolicy="no-referrer" />
                    <span className="absolute top-4 left-4 bg-orange-500 text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-white uppercase italic">{item.title}</h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Homeowner Testimonials</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Client Reviews</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Over 680+ homeowners and business managers rate our GAF operations 4.9 out of 5 stars.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              
              {/* Reviews List column */}
              <div className="lg:col-span-8 space-y-6">
                {reviewsList.map((rev, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-white">{rev.name}</h4>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{rev.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star key={sIdx} className={`w-3.5 h-3.5 ${sIdx < rev.stars ? "text-orange-500 fill-orange-500" : "text-neutral-700"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-300 italic leading-relaxed">"{rev.text}"</p>
                    <div className="flex items-center gap-2 mt-4 text-[10px] text-emerald-500 font-bold uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Client Project — {rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Review Column */}
              <div className="lg:col-span-4 bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
                <h3 className="text-lg font-bold text-[#F97316] uppercase italic mb-4">Leave Feedback</h3>
                {reviewSuccess ? (
                  <div className="bg-emerald-500/15 border border-emerald-500 p-4 rounded text-xs text-emerald-400">
                    Thank you! Your verified review has been published instantly on our local matrix list.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-neutral-400 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        placeholder="Amanda Lewis"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 uppercase tracking-wider mb-1">Location</label>
                      <input
                        type="text"
                        required
                        value={reviewForm.location}
                        onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                        placeholder="Concord, NC"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 uppercase tracking-wider mb-1">Stars Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, stars: s })}
                            className={`p-1 text-base ${reviewForm.stars >= s ? "text-orange-500" : "text-neutral-600"}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-neutral-400 uppercase tracking-wider mb-1">Review Comments</label>
                      <textarea
                        required
                        rows={4}
                        value={reviewForm.text}
                        onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                        placeholder="Detail your experience with our crew quality and magnet cleanups..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-extrabold uppercase tracking-widest text-xs rounded transition-colors">
                      Publish Review
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

        {/* 9. CAREERS TAB */}
        {activeTab === "careers" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Join 47 Carolina Pros</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Careers Portal</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Titan Ridge is expanding its residential and commercial crews. Work with modern drone fleets and uncapped incentives.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              {/* Info Column */}
              <div className="lg:col-span-8 space-y-6">
                {CAREERS_DATA.map((job, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                      <h3 className="text-lg font-black uppercase italic text-orange-500">{job.title}</h3>
                      <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 border border-neutral-700 text-[10px] uppercase font-bold tracking-wider rounded">
                        {job.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
                      <div>
                        <h4 className="text-white font-extrabold uppercase">Employee Perks:</h4>
                        <ul className="space-y-1.5 mt-2 text-neutral-400">
                          {job.benefits.map((b, bIdx) => (
                            <li key={bIdx} className="flex gap-2 items-center">
                              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-extrabold uppercase">Applicant Requirements:</h4>
                        <ul className="space-y-1.5 mt-2 text-neutral-400">
                          {job.requirements.map((r, rIdx) => (
                            <li key={rIdx} className="flex gap-2 items-center">
                              <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full"></span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <button onClick={() => {
                      setContactForm(prev => ({ ...prev, service: `Career Application: ${job.title}`, notes: `I would like to apply for the position of ${job.title}.` }));
                      scrollToContact();
                    }} className="mt-6 px-4 py-2 bg-neutral-800 hover:bg-orange-500 hover:text-black border border-neutral-700 hover:border-transparent text-xs uppercase font-extrabold rounded transition">
                      Apply via Careers Dispatch
                    </button>
                  </div>
                ))}
              </div>

              {/* Benefits overview block */}
              <div className="lg:col-span-4 bg-neutral-950 p-6 rounded-3xl border border-neutral-800 space-y-6">
                <h3 className="text-lg font-bold text-white uppercase italic">Working Here</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We are an LLC with 47 registered employees, 8 F-250 service trucks, and HAAG certified supervisors.
                </p>
                <div className="space-y-3.5 text-xs">
                  <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                    <span className="text-orange-500 font-extrabold uppercase block">Paid Training</span>
                    <span className="text-neutral-400 text-[11px] block mt-0.5">We sponsor standard HAAG and OSHA safety qualifications free of cost.</span>
                  </div>
                  <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                    <span className="text-orange-500 font-extrabold uppercase block">Premium Vehicles</span>
                    <span className="text-neutral-400 text-[11px] block mt-0.5">Opportunities for supervisors to drive late-model Ford F-250 trucks.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 10. BLOG TAB */}
        {activeTab === "blog" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Education & Science core</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Roofing Intel</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Expert roofing and storm season insurance guides formulated by our supervisor crews.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-12">
                {BLOG_DATA.map((post) => (
                  <article key={post.id} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center text-xs flex-wrap gap-2 text-neutral-400">
                      <span className="px-2 py-0.5 bg-[#F97316]/20 text-[#F97316] uppercase font-bold rounded">
                        {post.category}
                      </span>
                      <span>{post.readTime} Read • {post.date}</span>
                    </div>
                    <h2 className="text-2xl font-black uppercase italic text-white leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-xs text-[#B0B7C3] leading-relaxed">
                      {post.content}
                    </p>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                      <span className="text-neutral-500 font-bold">Written by Titan Ridge Editors</span>
                      <button onClick={() => {
                        setContactForm(prev => ({ ...prev, notes: `Referencing post: "${post.title}"` }));
                        scrollToContact();
                      }} className="text-orange-500 font-bold uppercase hover:underline">
                        Discuss With Consultant →
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
                  <h3 className="text-base font-black text-white uppercase italic mb-4">Storm season notice</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Charlotte’s high-humidity gales and ice gales require proper deck layers. Browse historical storm codes using our chatbot coordinator for localized guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 11. ABOUT US TAB */}
        {activeTab === "about" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Our Blueprint & Core values</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">About Us</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Founded in 2014 under North Carolina Licensing #NC-472819 with a vision to deliver unmatched premium warranties.
              </p>
            </div>

            {/* Core statistics cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { label: "Founded", val: "2014" },
                { label: "Active Field Crews", val: "10 Total" },
                { label: "Registered Employees", val: "47 Pros" },
                { label: "Annual Revenue", val: "$12.8M" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center">
                  <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">{stat.label}</span>
                  <span className="text-3xl font-black text-orange-500 block mt-2">{stat.val}</span>
                </div>
              ))}
            </div>

            {/* Team details */}
            <h3 className="text-2xl font-black uppercase italic text-center text-white mb-8">Titan Executive Leadership</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {TEAM_DATA.map((t, i) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
                  <div>
                    <span className="text-[10px] text-orange-500 font-mono font-bold uppercase tracking-widest">{t.role}</span>
                    <h4 className="text-lg font-black uppercase text-white mt-1">{t.name}</h4>
                    <p className="text-xs text-neutral-400 mt-1 italic">{t.experience}</p>
                  </div>
                  <p className="text-xs text-neutral-350 leading-relaxed pt-2 border-t border-white/5">
                    {t.bio}
                  </p>
                  <div className="bg-neutral-950 p-3 rounded text-[11px] font-mono text-neutral-400">
                    <strong className="text-orange-500 uppercase block text-[10px]">Primary Focus:</strong>
                    {t.specialty}
                  </div>
                </div>
              ))}
            </div>

            {/* Fleet details */}
            <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-850">
              <h3 className="text-xl font-bold uppercase italic text-white mb-6">Fleet & Equipment Roster</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xs text-[#F97316] font-bold uppercase tracking-wider mb-2">Trucks & Commands</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    <li>• 8 Ford F-250 Heavy Duties</li>
                    <li>• 3 Heavy Hydraulic Dump Trailers</li>
                    <li>• 2 Field Box Deliveries</li>
                    <li>• 1 Mobile Command Claims Trailer</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs text-[#F97316] font-bold uppercase tracking-wider mb-2">Forensic Hardware</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    <li>• Dual DJI Thermal Scanning Drone networks</li>
                    <li>• Hover and EagleView volumetric licenses</li>
                    <li>• Magnetic clean sweep line sweepers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs text-[#F97316] font-bold uppercase tracking-wider mb-2">Certifications</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    <li>• GAF Master Elite® certified</li>
                    <li>• Owens Corning Preferred Contractor</li>
                    <li>• CertainTeed Select ShingleMaster</li>
                    <li>• South Carolina SCR-99482 status</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12. CONTACT TAB */}
        {activeTab === "contact" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] block">Locally Owned & Operated LLC</span>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black italic uppercase mt-2">Contact Us</h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm mt-3">
                Connect with our Charlotte offices to dispatch roofing crews instantly.
              </p>
            </div>
          </div>
        )}

        {/* 13. ADMINISTRATIVE DISPATCH CONSOLE */}
        {activeTab === "admin" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 animate-fade-in">
            <div className="text-center mb-8">
              <span className="text-orange-500 text-xs font-black uppercase tracking-[0.2em] px-2 py-0.5 bg-orange-500/10 rounded">Internal CRM</span>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black italic uppercase mt-2 text-white">Administrative Portal</h1>
              <p className="text-xs text-neutral-400 mt-2 max-w-2xl mx-auto">
                Real-time lead tracker capturing submissions from the Express backend in-memory registry. Use this section to review local dispatch requests.
              </p>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Total Inbound Leads</span>
                <span className="text-3xl font-black mt-1 text-white block">{recentLeads.length}</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">NC Service Active</span>
                <span className="text-3xl font-black mt-1 text-orange-500 block">
                  {recentLeads.filter(l => l.city !== "Rock Hill" && l.city !== "Fort Mill" && l.city !== "Tega Cay" && l.city !== "Indian Land").length}
                </span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">SC Service Active</span>
                <span className="text-3xl font-black mt-1 text-white block">
                  {recentLeads.filter(l => ["Rock Hill", "Fort Mill", "Tega Cay", "Indian Land"].includes(l.city)).length}
                </span>
              </div>
            </div>

            {/* Interactive Dispatcher Grid */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4 border-b border-white/5 pb-4">
                <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-orange-500" />
                  Live Dispatch Table
                </h3>
                <div className="flex gap-2">
                  <button onClick={fetchLeads} className="px-3 py-1 bg-neutral-800 hover:bg-neutral-750 text-xs font-bold uppercase rounded border border-neutral-700">
                    Refresh Table
                  </button>
                  <button
                    onClick={() => {
                      // Seed a prototype demo lead so the admin list is always interactive!
                      const mockList = [
                        {
                          id: "TR-5582",
                          name: "Marcus Miller",
                          email: "marcus.m@gmail.com",
                          phone: "704-555-8812",
                          city: "Gastonia",
                          service: "Residential Shingle Assessment",
                          notes: "Wind blew shingles off back rafter from Wednesday storm.",
                          type: "inspection" as const,
                          submittedAt: new Date().toISOString(),
                          status: "Dispatched Coordinator"
                        },
                        ...recentLeads
                      ];
                      setRecentLeads(mockList);
                    }}
                    className="px-3 py-1 bg-orange-500 text-black text-xs font-bold uppercase rounded"
                  >
                    + Add Demo Lead
                  </button>
                </div>
              </div>

              {recentLeads.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 space-y-3">
                  <AlertCircle className="w-12 h-12 text-neutral-700 mx-auto" />
                  <p className="text-sm font-semibold">No Leads submitted on the Express server database yet.</p>
                  <p className="text-xs max-w-sm mx-auto">Use the contact form below or submit calculation configurations to populate leads.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs text-neutral-300">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-2">ID</th>
                        <th className="py-3 px-2">Owner / Client</th>
                        <th className="py-3 px-2">Inbound Service</th>
                        <th className="py-3 px-2">Contact Phone</th>
                        <th className="py-3 px-2">Region City</th>
                        <th className="py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentLeads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-neutral-950/40 transition">
                          <td className="py-3.5 px-2 text-[#F97316] font-bold">{lead.id || `TR-${1000 + idx}`}</td>
                          <td className="py-3.5 px-2">
                            <span className="font-bold text-white block">{lead.name}</span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5">{lead.email}</span>
                          </td>
                          <td className="py-3.5 px-2 text-neutral-400">
                            <span className="text-[#FFFFFF] uppercase font-bold text-[10px] block">{lead.type}</span>
                            <span className="text-xs block text-neutral-500 mt-0.5">{lead.service}</span>
                          </td>
                          <td className="py-3.5 px-2 font-mono">{lead.phone}</td>
                          <td className="py-3.5 px-2">
                            <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 text-[10px] rounded block text-center max-w-[100px]">
                              {lead.city}
                            </span>
                          </td>
                          <td className="py-3.5 px-2">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded text-[10px] font-bold">
                              {lead.status || "Active New"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMBINED INTERACTIVE LEAD CAPTURE SYSTEM (Anchor component present across all navigation contexts) */}
        <section className="py-20 bg-neutral-900 text-white border-t border-b border-[#555D66]/20" id="contact-lead-portal">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Descriptive side */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#F97316] text-xs font-black uppercase tracking-[0.3em] block">Built Above Expectations</span>
              <h2 className="title-huge text-3xl xs:text-4xl sm:text-5xl font-black italic uppercase leading-none text-white">
                Book Free <br/>
                <span className="text-[#F97316] not-italic">Inspection.</span>
              </h2>
              <p className="text-sm text-neutral-450 leading-relaxed max-w-md">
                We respect your time. Complete our immediate NC/SC dispatch request below to receive GAF Master Elite technician estimates and drone scanning results.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5 text-xs text-neutral-300">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <h4 className="font-extrabold uppercase text-white">Titan Headquarters</h4>
                    <p className="text-neutral-400 mt-0.5">2847 Northwood Industrial Drive, Charlotte, North Carolina 28206</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <h4 className="font-extrabold uppercase text-white">24/7 Service Hotline</h4>
                    <p className="text-neutral-400 mt-0.5">(704) 555-2847</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <h4 className="font-extrabold uppercase text-white">Electronic Mail Inbound</h4>
                    <p className="text-neutral-400 mt-0.5">info@titanridgeroofing.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inbound Lead Form and Client Inputs */}
            <div className="lg:col-span-7 bg-[#1F1F1F] border-2 border-[#555D66]/20 p-8 rounded-3xl relative shadow-2xl">
              <h3 className="text-xl font-bold uppercase italic text-white mb-6">Dispatch Dispatcher Request</h3>
              {submissionSuccess && (
                <div className="bg-orange-500/10 border-2 border-orange-500/40 p-5 rounded-2xl text-xs text-orange-400 mb-6 font-mono">
                  {submissionSuccess}
                </div>
              )}

              <form onSubmit={handleLeadSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 uppercase tracking-widest font-black mb-1">Owner Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Marcus Miller"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 uppercase tracking-widest font-black mb-1">Direct Phone</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="(704) 555-2847"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 uppercase tracking-widest font-black mb-1">Email Inbound</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="marcus.miller@gmail.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 uppercase tracking-widest font-black mb-1">Service City Sector</label>
                    <select
                      value={contactForm.city}
                      onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                    >
                      {SERVICE_CITIES_DATA.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}, {c.state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase tracking-widest font-black mb-1">Requested Service Focus</label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Residential Shingle Assessment">Residential Shingle Assessment</option>
                    <option value="TPO Commercial Customization">TPO Commercial Customization</option>
                    <option value="Thermal Moisture Drone Scan">Thermal Moisture Drone Scan</option>
                    <option value="Emergency Wind Tarp Service">Emergency Wind Tarp Service</option>
                    <option value="Vinyl / Fiber Cement Siding">Vinyl / Fiber Cement Siding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase tracking-widest font-black mb-1">Specific Damage Details (Optional)</label>
                  <textarea
                    rows={4}
                    value={contactForm.notes}
                    onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                    placeholder="Spot wind blown shingle sheets, damp attic insulation, or active valley leak points..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <label className="flex items-start gap-2 max-w-md pt-2 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={contactForm.agreed}
                    onChange={(e) => setContactForm({ ...contactForm, agreed: e.target.checked })}
                    className="mt-0.5 accent-orange-500 rounded"
                  />
                  <span className="text-[10px] text-neutral-455">
                    I authorize Titan Ridge to dispatch communications relative to this free assessment coordinate request.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#F97316] hover:bg-orange-600 disabled:bg-neutral-800 text-[#1F1F1F] font-black uppercase tracking-widest text-xs transition shadow-md shadow-orange-500/10 cursor-pointer text-center"
                >
                  {submitting ? "Dispatched transmission..." : "Dispatch Regional Crew Manager"}
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Structured Footer with Certification Badges */}
      <footer className="bg-neutral-950 border-t border-white/5 py-16 px-4 sm:px-8 mt-auto flex-shrink-0 text-neutral-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Certifications & License */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555D66]">Elite Partners</span>
            <div className="flex flex-col gap-1.5 font-bold text-xs text-neutral-300">
              <span className="hover:text-white transition">GAF MASTER ELITE®</span>
              <span className="hover:text-white transition">OWENS CORNING® PREFERRED</span>
              <span className="hover:text-white transition">CERTAINTEED® SELECT</span>
            </div>
            <p className="text-[10px] text-[#555D66] mt-2 uppercase font-bold tracking-widest leading-relaxed">
              NC GENERAL CONTRACTOR LIC #NC-472819 <br />
              SC RESIDENTIAL BUILDER LIC #SC-29384
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555D66]">Quick links</span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-[#F97316] transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-[#F97316] transition"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveTab("gallery"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-[#F97316] transition"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Solutions */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555D66]">Services</span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveTab("residential"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-[#F97316] transition"
                >
                  Residential Roofing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveTab("commercial"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-[#F97316] transition"
                >
                  Commercial Flat Systems
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveTab("repair"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                  className="hover:text-[#F97316] transition"
                >
                  Inspections & Repairs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Priority Actions */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555D66]">Priority Actions</span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("home");
                    setTimeout(() => {
                      document.getElementById("insurance-section")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }} 
                  className="hover:text-[#F97316] transition"
                >
                  Filing Insurance Claim
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact-lead-portal")?.scrollIntoView({ behavior: "smooth" });
                  }} 
                  className="hover:text-[#F97316] transition"
                >
                  Book Free Inspection
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Financing Callout bar */}
        <div className="max-w-7xl mx-auto border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#555D66]">Financing Support Available</span>
            <div className="flex gap-4 items-center flex-wrap justify-center">
              <div className="text-xs font-bold italic text-white">Payments as low as <span className="text-[#F97316] font-extrabold">$99/mo</span></div>
              <div className="text-[9px] text-[#B0B7C3] uppercase tracking-widest font-semibold border border-white/10 px-1.5 py-0.5 rounded bg-white/5">0% APR for 12 mos</div>
            </div>
          </div>
          <div className="flex gap-2 text-[9px] font-bold text-center">
            <div className="px-2 py-0.5 bg-[#F97316]/10 text-[#F97316] rounded border border-orange-500/20">OSHA CERTIFIED</div>
            <div className="px-2 py-0.5 bg-[#F97316]/10 text-[#F97316] rounded border border-orange-500/20">HAAG INSPECTOR</div>
          </div>
        </div>

        {/* Copyright and Brand Credit Bar */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between text-[11px] text-neutral-600 font-mono tracking-wider flex-wrap gap-4 items-center">
          <p>© 2026 - 2030 Titan Ridge Roofing & Exteriors LLC. All rights reserved. Slogan "Built Above Expectations."</p>
          <div className="flex items-center gap-6">
            <p className="text-neutral-500 hover:text-neutral-400 transition text-[11px]">
              Made by AS Works
            </p>
            <div className="flex gap-3 text-neutral-500 font-bold uppercase">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("admin"); }} className="hover:text-white transition">Admin System</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
