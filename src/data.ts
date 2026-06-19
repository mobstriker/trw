import {
  ServiceCategory,
  PricingTier,
  TeamMember,
  BlogPost,
  JobPosition,
  CustomerReview,
  ServiceCity,
} from "./types";

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "residential",
    title: "Residential Roofing",
    subtitle: "Premium home protection with unmatched durability.",
    description: "Your home’s roof protects everything beneath it. We provide complete shingle, designer, and high-performance metal systems engineered to handle extreme southern heat, humidity, and coastal weather patterns.",
    image: "https://i.imgur.com/IPS4SjA.jpg",
    items: [
      {
        name: "Architectural & Designer Shingles",
        description: "High-definition dimensional shingles offering beautiful shadow lines, enhanced curb appeal, and 110-130 MPH wind ratings.",
        features: ["Uptown aesthetics", "GAF Lifetime Warranty", "Enhanced algae resistance", "Heavy-duty wind defense"]
      },
      {
        name: "Standing Seam Metal Units",
        description: "The gold standard of residential roofs. Sleek, energy-efficient metal panels with hidden fasteners for supreme leak prevention.",
        features: ["50+ Year expectancy", "Reflective solar index", "Virtually zero maintenance", "Class 4 Hail Resistance"]
      },
      {
        name: "Soffit, Fascia, and Ventilation Systems",
        description: "Balanced intake and exhaust venting (ridge and ridge-vents) to slash attic heat levels and lower utility bills.",
        features: ["Ice & water shield barrier", "Ridge vent protection", "Improved attic climate control", "Dampness elimination"]
      },
      {
        name: "Skylight & Decking Integrations",
        description: "Flashing replacements, deck board remediation, and skylight installation using seamless water guards.",
        features: ["Leak-free seal warrants", "High-efficiency thermal glass", "Structural timber checkups"]
      }
    ]
  },
  {
    id: "commercial",
    title: "Commercial & Flat Roofing",
    subtitle: "Low-slope solutions and protective high-performance membranes.",
    description: "Specialized, durable roofing materials custom-engineered for business centers, industrial factories, and flat-roof complexes around the Carolinas.",
    image: "https://i.imgur.com/tSZANe4.jpg",
    items: [
      {
        name: "Single-Ply TPO Membranes",
        description: "Thermoplastic Polyolefin systems providing exceptional heat-reflective properties and resistance to ozone and chemical exposures.",
        features: ["Highly reflective cool roof", "Heat-welded secure seams", "Superior UV endurance", "Slashes commercial A/C draw"]
      },
      {
        name: "EPDM Synthetic Rubber Roofing",
        description: "Time-tested Ethylene Propylene Diene Terpolymer rubber systems optimal for severe weather resistance and low-slope facilities.",
        features: ["Extreme cold elasticity", "Highly impact resistant", "Minimal joint vulnerability", "Unmatched service longevity"]
      },
      {
        name: "Silicone Restoration Coatings",
        description: "Cost-effective fluid-applied membranes that form a seamless, waterproof barrier without requiring a complete structural tear-off.",
        features: ["Avoids landfill material waste", "Saves up to 50% vs replacement", "Subdues ponding water issues", "Includes GAF/CertainTeed custom endorsements"]
      },
      {
        name: "Commercial PM and Inspections",
        description: "Scheduled preventative inspections and joint maintenance programs satisfying multi-year warranty conditions.",
        features: ["Bi-annual checkups", "Detailed drone thermal imaging", "Instant digital reporting", "24/7 priority emergency dispatch"]
      }
    ]
  },
  {
    id: "repair",
    title: "Leak Repair & Maintenance",
    subtitle: "Precision leak detection and rapid restoration services.",
    description: "A small roof leak can trigger thousands of dollars in hidden structure and drywall mold. Our thermal drone diagnostics pinpoint the source instantly.",
    image: "https://i.imgur.com/GaaKU6O.jpg",
    items: [
      {
        name: "Certified Leak Diagnostics",
        description: "Using infrared humidity tracing to detect moisture anomalies underneath layers before water leaks inside ceilings.",
        features: ["Non-invasive detection", "Pinpoint water entry targeting", "Full photo logs with Hover app"]
      },
      {
        name: "Chimney & Valley Flashing Restoration",
        description: "Replacing compromised metal valleys, standard step flashing, counter-flashing, and rusted chimney collars.",
        features: ["Solder-joined aluminum & copper", "Permashield seal treatment", "Custom masonry integration"]
      },
      {
        name: "Emergency Leak Stabilization",
        description: "Immediate industrial heavy tarp service deployed to stabilize roofs and save valuable family properties from severe dynamic rainstorms.",
        features: ["2-Hour quick dispatch", "Industrial storm tarps used", "Meets insurance validation specs"]
      }
    ]
  },
  {
    id: "storm",
    title: "Storm & Hail Damage Restoration",
    subtitle: "Charlotte's premier insurance restoration authorities.",
    description: "Our certified storm restoration specialists are former insurance claims adjusters. We provide unmatched forensic documentation that speeds up approvals.",
    image: "https://i.imgur.com/kRtHiyd.jpg",
    items: [
      {
        name: "Free HAAG-Certified Inspections",
        description: "Forensic analysis of hail bruises on shingles and split seams matching strict insurance criteria.",
        features: ["HAAG Inspector certified", "Comprehensive drone photographic packages", "Direct insurance adjuster briefings"]
      },
      {
        name: "Adjuster Collaboration & Documentation",
        description: "Filing systematic structural damage surveys via EagleView or Hover formats to represent your claims with solid evidence.",
        features: ["Direct meeting services", "Line-item material calculations", "Fast digital electronic contract signoffs"]
      },
      {
        name: "Immediate Temporary Tarp Protective Coverings",
        description: "Securing breached structural points immediately following wind and hail events.",
        features: ["High-durability securement", "Structural preservation", "Quick safety clearance approvals"]
      }
    ]
  }
];

export const PRICING_DATA: PricingTier[] = [
  {
    category: "replacement",
    name: "Basic Asphalt Roof",
    range: "$7,500 – $11,000",
    features: [
      "Standard 3-Tab Fiberglass Shingles",
      "Synthetic Underlayer Integration",
      "Leak Barrier on eaves and valleys",
      "Standard 10-Year Labor Warranty",
      "Full clean-up & magnetic nail sweep"
    ]
  },
  {
    category: "replacement",
    name: "Architectural Shingle Roof",
    range: "$12,000 – $18,000",
    features: [
      "High-Definition Dimension Shingles",
      "Double-layer Ice & Water shield protection",
      "Enhanced Ridge Vent cooling ventilation",
      "GAF System-Plus Lifetime Material Warranty",
      "25-Year Premium Workmanship Warranty"
    ]
  },
  {
    category: "replacement",
    name: "Premium Designer Roof",
    range: "$20,000 – $35,000",
    features: [
      "Elite Class 4 Impact-Resistant Shingles",
      "Custom copper or hand-folded metal valley lines",
      "Premium ridge cap aesthetics",
      "Maximum GAF Golden Pledge endorsement",
      "Full comprehensive lifetime system warranty"
    ]
  },
  {
    category: "replacement",
    name: "Standing Seam Metal Roof",
    range: "$28,000 – $60,000",
    features: [
      "24-Gauge commercial-grade heavy-metal panels",
      "Hidden clip fastening structural layouts",
      "Cool-roof solar reflective coatings",
      "50-Year absolute structural asset life",
      "Superior resistance to Category 4 category storms"
    ]
  },
  {
    category: "repair",
    name: "Minor Roof Repairs",
    range: "$250 – $800",
    features: [
      "Replacement of blown-off asphalt shingles",
      "Isolated minor leak correction",
      "Plumbing pipe boot replace & sealing",
      "Fast same-day dispatcher response"
    ]
  },
  {
    category: "repair",
    name: "Active Water Leak Repair",
    range: "$500 – $2,000",
    features: [
      "Thermal drone leakage diagnostic tracing",
      "Plywood roof decking moisture extraction",
      "Underlayment patching & flashing refits",
      "Guaranteed leak-free certification"
    ]
  },
  {
    category: "repair",
    name: "Flashing Repair / Reconstruction",
    range: "$450 – $1,500",
    features: [
      "Chimney chimney flashing restructure",
      "Metal wall counter-flashing replacement",
      "Custom ice waterproof barriers",
      "Corrosion-resistant metal fabrication"
    ]
  },
  {
    category: "repair",
    name: "Emergency Storm Stabilization",
    range: "Starting at $750",
    features: [
      "Deploys in under 2 hours",
      "Heavy-duty windproof industrial tarps",
      "Fast response safety clearances",
      "Insurance claim billing compatible"
    ]
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    name: "Michael Carter",
    role: "Founder & CEO",
    experience: "18 Years in Roofing & Reconstruction",
    specialty: "Storm Restoration, Commercial Layouts & Claims Navigation",
    bio: "Former lead insurance adjuster who founded Titan Ridge in 2014 to eliminate developer shortcuts. He bridges deep insurance claims insights with absolute high-end roof engineering."
  },
  {
    name: "Daniel Reyes",
    role: "Chief Operations Officer",
    experience: "14 Years in Construction Logistics",
    specialty: "Crew Scheduling, Production Controls & OSHA Compliance",
    bio: "Oversees daily task operations, fleet management, and absolute OSHA safety enforcement on commercial and residential job locations."
  },
  {
    name: "Anthony Brooks",
    role: "Sales & Estimation Director",
    experience: "11 Years",
    specialty: "Drone Inspection Reports & Claim Adjuster Representation",
    bio: "Assists residential and commercial property owners with accurate diagnostics, guiding custom material selections and organizing digital claims approvals."
  },
  {
    name: "Kevin Holt",
    role: "Production & QC Manager",
    experience: "12 Years Field Operations",
    specialty: "Quality Control Audits & Final Walkthrough Inspections",
    bio: "Conducts mandatory quality audits at every installation, ensuring zero details remain untrushed and utilizing magnetized nail sweeps."
  },
  {
    name: "Sarah Whitmore",
    role: "Office & Financing Manager",
    experience: "9 Years Executive Coordination",
    specialty: "Customer Care & Hearth/GreenSky Financing Approvals",
    bio: "Coordinates financing programs, schedules free diagnostic appointments, and runs the client secure communications portal."
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: "signs-replace",
    title: "10 Critical Signs Your Carolinas Roof Needs Complete Replacement",
    category: "Education",
    summary: "Curling asphalt shingles, persistent leaks, and heavy grit in gutters represent major structural warning signs. Spot them before expensive failures occur.",
    readTime: "5 min",
    date: "May 12, 2026",
    content: "North and South Carolina weather conditions present extreme demands on standard residential roof systems. Intense radiant UV waves throughout high humid summer months deteriorate protective shingle ceramic granular outer shells, yielding bald spots. Meanwhile, heavy seasonal thunderstorm gales warp weak shingles, causing micro-fracturing along underlayers. In this article, our field crews list the top ten indicators of critical composite fatigue, ranging from ridge wind shear tabs to chimney flashing breaches."
  },
  {
    id: "hail-damage",
    title: "How Extreme Hail Damage Affects Asphalt Shingles Under Infrared Scans",
    category: "Storm Damage",
    summary: "Hail damage is often invisible to untrained eyes. Discover how minor compromises lead to rapid decay under summer heat.",
    readTime: "4 min",
    date: "April 28, 2026",
    content: "A hail impact might look like a simple cosmetic blemish on your rooftop. However, heavy hail impacts fracture the inner fiberglass reinforcing mat that supports modern asphalt shingle durability. Once fractured, standard water tension rapidly penetrates the core, rotting underlying oriented-wood deck sheets during NC's intense summer. We outline the science of thermal drone inspection scans in tracking water pooling lines and how to seek complete adjuster approval."
  },
  {
    id: "weather-materials",
    title: "The Ultimate Guide: Best Roofing Materials for North Carolina Weather",
    category: "Guide",
    summary: "Compare architectural options, standing seam metal systems, and heavy composite shingles for long-term protection.",
    readTime: "6 min",
    date: "March 15, 2026",
    content: "From snowy winters in Gaston County to sweltering high-humidity periods in Charlotte, your home's roof needs dynamic resistance properties. We compare the durability lifecycle, installation weights, reflective insulation grades, and upfront capital requirements of premium designer composites, standard 3-tab shingle barriers, and structural standing-seam metal roofs, outlining exact Carolinas building code recommendations."
  },
  {
    id: "flat-roof-maintenance",
    title: "Fast Commercial Flat Roof Maintenance Tips to Extend Asset Life",
    category: "Commercial",
    summary: "Commercial TPO and rubber roofs require structured preventative steps. Prevent ponding water issues before winter seasons.",
    readTime: "5 min",
    date: "Feb 10, 2026",
    content: "Commercial building owners often overlook water ponding issues until massive water infiltration ruins high-value inventory warehouses or offices. Discover how keeping drainage paths clear, inspecting rubber EPDM flashing lines, and deploying silicone roof preservation coatings can double the usable life of standard flat commercial roofs for a fraction of full replacement budgets."
  },
  {
    id: "insurance-process",
    title: "Demystifying Homeowner Insurance Claims: Step-by-Step Roof Restoration",
    category: "Claims HELP",
    summary: "Learn how the step-by-step insurance documentation process works and how specialized HAAG roofing specialists support claims.",
    readTime: "7 min",
    date: "Jan 22, 2026",
    content: "Homeowners often struggle to deal with insurance providers after windstorms or hail events. Without extensive photographic proof, insurers may deny claims. We break down standard insurance claims step-by-step. Learn how standard free inspections, Hover drone maps, adjuster walkthrough meetings, and professional line-item estimates resolve claims fairly without stressful surprises."
  }
];

export const SERVICE_CITIES_DATA: ServiceCity[] = [
  { name: "Charlotte", state: "NC", responseRate: "Under 1 hr", manager: "Kevin H.", coords: { x: 45, y: 50 } },
  { name: "Concord", state: "NC", responseRate: "Under 1.5 hrs", manager: "Kevin H.", coords: { x: 58, y: 32 } },
  { name: "Huntersville", state: "NC", responseRate: "Under 1.2 hrs", manager: "Anthony B.", coords: { x: 44, y: 28 } },
  { name: "Matthews", state: "NC", responseRate: "Under 1 hr", manager: "Sarah W.", coords: { x: 55, y: 65 } },
  { name: "Pineville", state: "NC", responseRate: "Under 1 hr", manager: "Michael C.", coords: { x: 40, y: 72 } },
  { name: "Monroe", state: "NC", responseRate: "Under 2 hrs", manager: "Daniel R.", coords: { x: 72, y: 78 } },
  { name: "Gastonia", state: "NC", responseRate: "Under 1.5 hrs", manager: "Anthony B.", coords: { x: 18, y: 48 } },
  { name: "Belmont", state: "NC", responseRate: "Under 1.1 hrs", manager: "Anthony B.", coords: { x: 28, y: 52 } },
  { name: "Mooresville", state: "NC", responseRate: "Under 1.8 hrs", manager: "Daniel R.", coords: { x: 42, y: 12 } },
  { name: "Rock Hill", state: "SC", responseRate: "Under 1.5 hrs", manager: "Michael C.", coords: { x: 30, y: 88 } },
  { name: "Fort Mill", state: "SC", responseRate: "Under 1.2 hrs", manager: "Michael C.", coords: { x: 38, y: 82 } },
  { name: "Tega Cay", state: "SC", responseRate: "Under 1.3 hrs", manager: "Michael C.", coords: { x: 24, y: 80 } },
  { name: "Indian Land", state: "SC", responseRate: "Under 1.5 hrs", manager: "Sarah W.", coords: { x: 46, y: 88 } },
];

export const CAREERS_DATA: JobPosition[] = [
  {
    title: "Roofing Sales & Claims Consultant",
    department: "Sales & Restoration Estimation",
    type: "Full-Time (Commission + Base Options)",
    location: "Charlotte Metro Area & Field",
    benefits: [
      "Average earnings of $85,000–$145,000/year",
      "Company-provided iPad with Hover & CompanyCam tools",
      "Comprehensive HAAG material inspection training",
      "Uncapped commission multipliers",
      "Flexible schedule blocks"
    ],
    requirements: [
      "Outstanding human communication skills",
      "Clean driving license record and willingness to inspect rooftops",
      "Basic tech proficiency to navigate CRM records",
      "Detail-oriented attitude supporting adjuster claims"
    ]
  },
  {
    title: "Project Quality Manager",
    department: "Production Operations",
    type: "Full-Time (Salary + Performance Bonusing)",
    location: "Charlotte HQ & Site Field Operations",
    benefits: [
      "Competitive base salary with OSHA coordinator options",
      "Fully covered company vehicle (F-250)",
      "Premium health, vision, and dental plans",
      "Paid standard vacations"
    ],
    requirements: [
      "3+ Years of general roofing project management experience",
      "OSHA certified installer safety credentials preferred",
      "Experienced roof quality inspection skills",
      "Strong coordination with multi-crew environments"
    ]
  },
  {
    title: "Emergency Service & Repair Installer",
    department: "Repair & Tarping Dispatch",
    type: "Full-Time (Hourly with Emergency Premiums)",
    location: "Carolinas Service Hubs",
    benefits: [
      "Strong basic rates with premium hazard adjustments",
      "Paid safety ongoing guidance courses",
      "Modern high-grade equipment",
      "Strong vertical path to foreman"
    ],
    requirements: [
      "Solid asphalt shingle or single-ply flat seam repair experience",
      "Excellent high-altitude safety awareness and balance systems",
      "Able to handle immediate storm dispatcher assignments"
    ]
  }
];

export const TESTIMONIALS_DATA: CustomerReview[] = [
  {
    name: "Amanda Lewis",
    location: "Charlotte, NC",
    stars: 5,
    verified: true,
    date: "April 14, 2026",
    text: "Titan Ridge Roofing handled our entire insurance claim from start to finish and replaced our complete architectural shingle roof in just one single day. The transparent drone photologs and quick coordination were incredible."
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
    text: "Outstanding commercial flat roof restoration. They saved our warehouse budget over 40% by deploying a premium high-grade silicone protective seal coat instead of complete replacement."
  }
];

export const FAQS_DATA = [
  {
    q: "How long does a residential roof replacement take?",
    a: "Most residential roof replacements by Titan Ridge are completed within 1 to 2 days, including structural tear-offs, material placement, and thorough magnetic clean-ups."
  },
  {
    q: "Do you help with our storm damage insurance claims?",
    a: "Yes, we specialize in insurance claim navigation. Our founder is a former adjuster, and we supply forensic high-definition drone photo packages and Hover dimensional calculations to adjusters directly."
  },
  {
    q: "What types of financing choices do you support?",
    a: "We offer programs through GreenSky, Hearth, and Synchrony, featuring terms like 0% APR for 12 months, fast online approval steps, and affordable payments starting from $99/month."
  },
  {
    q: "Are your roof inspections and estimates free?",
    a: "Yes! All standard residential assessments, roof evaluations, and storm consultations are completely free. High-definition drone inspections with full reporting are $199."
  },
  {
    q: "What high-quality roofing brands do you install?",
    a: "We are GAF Master Elite Contractors, Owens Corning Preferred Contractors, and CertainTeed Select ShingleMasters. We install industry-leading materials backed by lifetime warranties."
  }
];
