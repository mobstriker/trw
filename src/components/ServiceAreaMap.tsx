import React, { useState } from "react";
import { SERVICE_CITIES_DATA } from "../data";
import { ServiceCity } from "../types";
import { MapPin, Phone, CheckCircle2, Search, ArrowUpRight, HelpCircle, ShieldCheck } from "lucide-react";

export default function ServiceAreaMap({
  onSelectCity,
}: {
  onSelectCity: (cityName: string) => void;
}) {
  const [selectedCity, setSelectedCity] = useState<ServiceCity>(SERVICE_CITIES_DATA[0]);
  const [addressInput, setAddressInput] = useState("");
  const [coverageResult, setCoverageResult] = useState<{
    searched: boolean;
    covered: boolean;
    matchCity?: string;
    message?: string;
  } | null>(null);

  // Simple, powerful list of covered ZIP codes or cities in the Greater Charlotte Area
  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;

    const query = addressInput.trim().toLowerCase();
    
    // Check if zip matches standard Charlotte metro zip codes or if any of our covered cities match
    const matchedCity = SERVICE_CITIES_DATA.find(
      (city) => 
        city.name.toLowerCase() === query ||
        query.includes(city.name.toLowerCase())
    );

    // List of common Charlotte area ZIP prefixes
    const coverZips = ["282", "280", "281", "297"]; // 282xx (Charlotte), 280-281xx (Concord, Huntersville, Gastonia, etc.), 297xx (SC Rock Hill, Fort Mill)
    const isZipMatch = /^\d+$/.test(query) && coverZips.some(prefix => query.startsWith(prefix));

    if (matchedCity || isZipMatch) {
      const cityName = matchedCity ? matchedCity.name : "Greater Charlotte Region";
      setCoverageResult({
        searched: true,
        covered: true,
        matchCity: cityName,
        message: `Excellent news! Your area is 100% within our GAF Master Elite Guarantee Zone. Standard roof inspections are completely free.`
      });
    } else {
      setCoverageResult({
        searched: true,
        covered: false,
        message: `We don't have a standard hub registered in that immediate town, but we often extend coverage for complete replacement projects! Call us to confirm customized dispatch.`
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl border border-neutral-200/80 shadow-lg p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 text-neutral-800" id="service-area-map-card">
      
      {/* Interactive Map Layout Section */}
      <div className="md:col-span-7 flex flex-col justify-between">
        <div className="mb-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded-md">
            Interactive Coverage Map
          </span>
          <h4 className="text-xl font-black text-neutral-900 mt-1.5">Our Service Territory</h4>
          <p className="text-xs text-neutral-500 mt-1">
            We are fully licensed across both North and South Carolina, providing guaranteed emergency storm response within our orange target zone.
          </p>
        </div>

        {/* Real Google Map iframe embed with responsive Orange Territory overlay */}
        <div className="relative aspect-[4/3] md:aspect-[16/11] w-full bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-inner group isolate z-0">
          
          {/* Embedded familiar Google Map focused on Charlotte, NC region (No API key required, 100% free and robust) */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d182255.4346808799!2d-81.011603592651!3d35.20307185011985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a612f3274393%3A0xa20ea7ef861c85d7!2sCharlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1716490326000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "brightness(0.92) contrast(1.05)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="z-0 relative"
            title="Titan Ridge Coverage Google Map"
          />

          {/* Translucent Orange SVG Zone paint layer overlay - Click opens Google Maps directions */}
          <a
            href="https://www.google.com/maps/place/Charlotte,+NC"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-transparent block cursor-pointer z-10 hover:bg-black/5 transition duration-300"
            title="Click here to open in Google Maps to search your address"
            id="open-google-maps-overlay-link"
          >
            {/* Custom SVG Drawing representing our coverage zone bounds */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-45 sm:opacity-55" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <radialGradient id="titan-glow" cx="50%" cy="50%" r="45%">
                  <stop offset="0%" stopColor="#FB923C" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#EA580C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Glow zone over the central Charlotte/Huntersville/Concord/Fort Mill/Rock Hill/Gastonia zone */}
              <circle cx="50%" cy="50%" r="35" fill="url(#titan-glow)" />

              {/* Exact Service Limits Polygon painted in glowing orange outline, styled thin and smooth */}
              <path
                d="M 42,18 Q 60,20 78,28 Q 83,45 85,62 Q 71,75 58,88 Q 43,83 28,78 Q 20,63 15,48 Q 19,35 24,28 Q 33,33 42,18 Z"
                fill="#F97316"
                fillOpacity="0.12"
                stroke="#EA580C"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            {/* Quick Action Badge overlay to easily navigate */}
            <div className="absolute bottom-3 left-3 bg-neutral-950/90 backdrop-blur-md border border-orange-500/40 px-2.5 py-2 rounded-xl text-neutral-200 z-20 flex items-center gap-2 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-50"></span>
              </span>
              <div className="text-left font-mono">
                <p className="text-[9px] font-black uppercase text-white tracking-widest leading-none">Titan Ridge Service Zone</p>
                <p className="text-[8px] text-neutral-400 mt-1 font-sans leading-none">Click to check your address on Google Maps</p>
              </div>
              <ArrowUpRight className="w-3 h-3 text-orange-500 flex-shrink-0" />
            </div>

            {/* Floating Top Warning Bar */}
            <div className="absolute top-3 right-3 bg-orange-600/90 backdrop-blur-md text-white font-mono text-[8.5px] font-black uppercase tracking-widest py-1 px-2.5 rounded-md shadow-md hover:bg-orange-600 z-20">
              Licensed NC & SC
            </div>
          </a>

        </div>

        {/* Dynamic Horizontal Quick-Click City Tab list */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {SERVICE_CITIES_DATA.map((city) => {
            const isSelected = city.name === selectedCity.name;
            return (
              <button
                key={city.name}
                id={`map-city-tab-${city.name.toLowerCase()}`}
                onClick={() => setSelectedCity(city)}
                className={`py-1 px-2.5 rounded-full text-[9px] font-extrabold uppercase whitespace-nowrap tracking-wider border cursor-pointer transition duration-150 ${
                  isSelected 
                    ? "bg-orange-500 border-orange-500 text-white shadow-xs" 
                    : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side Control Panel: Search Tool & Detailed Lead Hub */}
      <div className="md:col-span-5 flex flex-col justify-between bg-neutral-50 rounded-xl border border-neutral-200 p-4">
        
        <div>
          {/* Quick lookup tool */}
          <div className="pb-4 border-b border-neutral-200">
            <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-orange-500" />
              Check Your House Location
            </h5>
            <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
              Find out instantly if we serve your zip code or town near Charlotte.
            </p>

            <form onSubmit={handleCheckCoverage} className="mt-2.5 flex gap-1.5">
              <input
                type="text"
                id="address-checker-input"
                placeholder="Enter city or zip code..."
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="flex-1 bg-white border border-neutral-300 rounded-lg px-2.5 py-1 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                id="btn-submit-address-checker"
                className="bg-neutral-900 hover:bg-black text-white px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                Verify
              </button>
            </form>

            {coverageResult && (
              <div className={`mt-2.5 p-2.5 rounded-lg border text-xs leading-relaxed ${
                coverageResult.covered 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : "bg-amber-50 border-amber-200 text-amber-800"
              }`}>
                <div className="flex items-center gap-1 font-bold mb-0.5">
                  {coverageResult.covered ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  )}
                  <span className="text-[11px]">{coverageResult.covered ? "Coverage Verified" : "Out of Direct Perimeter"}</span>
                </div>
                <p className="text-neutral-700 text-[10px] mt-0.5 leading-snug">{coverageResult.message}</p>
                {coverageResult.covered && (
                  <button
                    onClick={() => {
                      onSelectCity(coverageResult.matchCity || "Charlotte");
                    }}
                    id="btn-trigger-coverage-select"
                    className="mt-1.5 text-[9px] font-black uppercase text-emerald-800 underline hover:text-black block"
                  >
                    Select & Dispatch Crew →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Active Sector info */}
          <div className="pt-4 space-y-3">
            <div>
              <div className="flex items-center gap-1 text-neutral-400 text-[9px] font-mono tracking-widest uppercase">
                <MapPin className="w-3 h-3 text-orange-500" />
                <span>Selected Sector Hub</span>
              </div>
              <h6 className="text-xl font-black text-neutral-900 mt-0.5">
                {selectedCity.name}, <span className="text-neutral-400 text-sm font-bold">{selectedCity.state}</span>
              </h6>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-0.5">
              <div className="bg-white p-2.5 rounded-lg border border-neutral-200/70 shadow-2xs">
                <span className="text-[8.5px] text-neutral-400 uppercase tracking-widest block font-bold leading-none">Response Time</span>
                <span className="text-xs font-black text-neutral-900 mt-1 block">{selectedCity.responseRate}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-neutral-200/70 shadow-2xs">
                <span className="text-[8.5px] text-neutral-400 uppercase tracking-widest block font-bold leading-none">Sector Manager</span>
                <span className="text-xs font-semibold text-neutral-800 mt-1 block">{selectedCity.manager}</span>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-neutral-200 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[9.5px] font-bold text-neutral-800 uppercase tracking-wider">GAF Master Elite Dispatch</p>
                <p className="text-[9px] text-neutral-500 mt-0.5 leading-normal">
                  Our regional trucks carry stabilization supplies so we can tarp leak breaches immediately following high storms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action triggers */}
        <div className="mt-4 pt-3.5 border-t border-neutral-200 space-y-2">
          <button
            onClick={() => onSelectCity(selectedCity.name)}
            id="btn-schedule-map-inspection"
            className="w-full text-center bg-neutral-950 hover:bg-black text-white text-[11px] font-bold py-2 px-3 rounded-lg transition duration-150 shadow-xs cursor-pointer uppercase tracking-wider"
          >
            Inquire in {selectedCity.name}
          </button>
          
          <a
            href="tel:7045559110"
            id="link-emergency-map-call"
            className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-extrabold py-2 px-3 rounded-lg transition duration-150 flex items-center justify-center gap-1.5 shadow-xs uppercase tracking-wider cursor-pointer"
          >
            <Phone className="w-3 h-3 text-white animate-bounce" />
            (704) 555-9110
          </a>
        </div>

      </div>
    </div>
  );
}
