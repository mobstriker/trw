import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Company knowledge context for the Gemini assistant
const TITAN_RIDGE_KNOWLEDGE = `
You are the Titan Ridge AI Assistant, an elite virtual project consultant and storm restoration specialist representing "Titan Ridge Roofing & Exteriors".
Conduct yourself with professional expertise, reassuring support, and clear precision.

Titan Ridge Roofing & Exteriors Key Information:
- Slogan: “Built Above Expectations.”
- Founded: 2014, Headquarters in Charlotte, NC (2847 Northwood Industrial Drive, Charlotte, NC 28206).
- Contact: (704) 555-2847. Emergency Hotline (24/7 client rescue): (704) 555-9110. Email: info@titanridgeroofing.com.
- Service Areas: Charlotte, Concord, Huntersville, Matthews, Gastonia, Monroe, Rock Hill, Fort Mill, and surrounding NC/SC areas.
- Material Brands used: GAF (Master Elite Contractor), Owens Corning (Preferred Contractor), CertainTeed (Select ShingleMaster), Atlas, MuleHide.
- Licensing: NC General Contractor License #NC-472819, SC Residential Roofing License #SCR-99482. Fully licensed and insured with $5 Million General Liability.
- Pricing Guidelines:
  * Basic Asphalt: $7,500–$11,000
  * Architectural: $12,000–$18,000
  * Premium Designer: $20,000–$35,000
  * Standing Seam Metal: $28,000–$60,000
  * Flat Roof systems: starts at $18/sq.ft.
  * Minor Repairs: $250–$800, Leaks: $500–$2,000, Flashing: $450–$1,500, Emergency Stabilization: starting at $750.
- Financing: GreenSky, Hearth, Synchrony. Offers 0% APR for 12 months, payments low as $99/mo, fast online approval.
- Warranties: 10-Year Standard, 25-Year Premium Installation, lifetime shingle manufacturer.
- Emergency Rapid Response: 24/7 hotline, emergency tarping within 2 hours.

Core Services:
1. Residential Roofing (asphalt, designer, metal, ventilation ridge vent, skylights, chimney flashing).
2. Commercial Roofing (TPO, EPDM, PVC, flat coatings, silicone coatings).
3. Storm Damage Specialty (Hail/wind inspection, temporary protection, insurance claim advocacy from start to finish).
4. Exteriors (gutters, siding, trim, soffit/fascia, exterior painting).

Instructions:
1. Provide accurate, trustworthy estimates of storm restoration and residential roof pricing based on user questions.
2. Explain how homeowners can navigate hail and wind insurance claims (e.g. standard inspection -> detailed digital estimate with CompanyCam/Hover -> claim approval -> material choices -> installation & walkthrough).
3. If they require urgent help, provide the Emergency Hotline (704) 555-9110 and prompt them to book a "Free Roof Inspection" or "Emergency Tarping".
4. Speak in an encouraging, expert, non-spammy tone. Do not invent details beyond this knowledgebase.
`;

// API endpoint for chatbot assistant
app.post("/api/gemini/claim-assistant", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request format. 'messages' array required." });
    }

    const client = getGeminiClient();
    
    // Construct prompt structure for Gemini-3.5-flash
    let promptText = "Titan Ridge Storm Claim Assistant Chatbot Session History:\n\n";
    messages.forEach((m: any) => {
      const role = m.role === "user" ? "Client" : "Assistant";
      promptText += `${role}: ${m.content}\n`;
    });
    promptText += "\nAssistant:";

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: TITAN_RIDGE_KNOWLEDGE,
        temperature: 0.7,
      },
    });

    const textResponse = response.text || "I apologize, I experienced a issue. Please try again or call our team.";
    res.json({ text: textResponse });
  } catch (error: any) {
    console.error("Gemini assistant route error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to contact Gemini roof intelligence core.",
      details: "Ensure GEMINI_API_KEY is configured in the Secrets panel."
    });
  }
});

// Mock Leads store in memory to keep it full-stack & interactive
const leads: any[] = [];
app.post("/api/leads", (req, res) => {
  try {
    const { name, email, phone, city, service, notes, type } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone number are required." });
    }
    const lead = {
      id: "TR-" + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone,
      city,
      service,
      notes: notes || "",
      type: type || "inspection", // 'inspection', 'emergency', 'career', 'contact'
      submittedAt: new Date().toISOString(),
      status: "New"
    };
    leads.push(lead);
    console.log("Lead created:", lead);
    res.status(201).json({ success: true, lead });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve mock leads (useful if someone browses administrative console)
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Vite middleware configuration for development vs production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Titan Ridge server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
