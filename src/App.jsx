import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Cpu,
  Stethoscope,
  Rocket,
  ShieldCheck,
  Droplet,
  Feather,
  ThermometerSnowflake,
  Search,
  X,
} from "lucide-react";

/**
 * Sweetwater Helium — One-page site
 *
 * FIX: Removed all stray backslashes/escaped braces that broke JSX (e.g., " and \{) which
 * triggered `Expecting Unicode escape sequence \uXXXX` during TSX parsing.
 * All style objects now use proper `style={{ ... }}` syntax and strings use normal quotes.
 *
 * Notes:
 * - Uses Tailwind utility classes; ensure Tailwind is enabled in your project.
 * - The optional `.animate-ping-slow` keyframes are included at the bottom as a comment.
 */

// ===== BRAND THEME =====
const brand = {
  name: "Sweetwater Helium",
  primary: "#1CA6A6",
  primaryDark: "#0D6B6B",
  accent: "#E6A24D",
  darkBg: "#1B1F24",
  lightBg: "#F6F3EE",
  text: "#DDE3EA",
  muted: "#94A3B8",
};

export default function SweetwaterHeliumPage() {
  const heliumProperties = [
    {
      slug: "inert",
      title: "Inert",
      description: "Doesn't react with other elements, and doesn't explode like hydrogen.",
      Icon: ShieldCheck,
    },
    {
      slug: "non-toxic",
      title: "Non-toxic",
      description: "Can be used by humans in a variety of applications.",
      Icon: Droplet,
    },
    {
      slug: "lighter",
      title: "Lighter than air",
      description: "Ability to lift and/or float.",
      Icon: Feather,
    },
    {
      slug: "melting",
      title: "Melting point −272°C",
      description: "Liquid at ultra-cool temps enables superconductivity.",
      Icon: ThermometerSnowflake,
    },
    {
      slug: "molecular",
      title: "Small molecular size",
      description: "Can be used to find the smallest of leaks.",
      Icon: Search,
    },
  ];

  const processSteps = [
    {
      id: "01",
      title: "Identify",
      description: "Locate primary helium accumulations using regional geology and analog wells.",
      phase: "identify",
    },
    {
      id: "02",
      title: "Leases",
      description: "Secure exclusive helium and associated gas rights with local partners.",
      phase: "leases",
      tags: ["Denihotso", "Chilchinbeto"],
    },
    {
      id: "03",
      title: "Data",
      description: "Analyze legacy logs, analyze seismic samples to locate most likely zones.",
      phase: "data",
      status: "TUNU is at this phase",
      tags: ["Mexican Water"],
    },
    {
      id: "04",
      title: "Drill",
      description: "Execute exploratory and appraisal wells to verify deliverability.",
      phase: "drill",
      status: "TOPAZ is at this phase",
    },
    {
      id: "05",
      title: "Reserves",
      description: "Update resource models and convert to proved reserves.",
      phase: "reserves",
    },
    {
      id: "06",
      title: "Produce",
      description: "Build and commission the modular helium processing facility.",
      phase: "produce",
    },
  ];

  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeProperty, setActiveProperty] = useState({ name: "", token: 0 });
  const propertyTimeoutRef = useRef(null);

  const openLightbox = (src, alt) => setLightboxImage({ src, alt });
  const closeLightbox = () => setLightboxImage(null);
  const handleKeyOpen = (event, src, alt) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(src, alt);
    }
  };

  const triggerPropertyEffect = (slug) => {
    if (propertyTimeoutRef.current) {
      clearTimeout(propertyTimeoutRef.current);
    }
    const token = Date.now();
    setActiveProperty({ name: slug, token });
    propertyTimeoutRef.current = setTimeout(() => {
      setActiveProperty({ name: "", token: 0 });
    }, 1200);
  };

  const handlePropertyKey = (event, slug) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerPropertyEffect(slug);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const nodes = document.querySelectorAll(".reveal");
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = [
      "mission",
      "proposal",
      "facts",
      "uses",
      "technology",
      "geology",
      "process",
      "environment",
      "community",
      "gallery",
      "contact",
    ];
    const sectionEls = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const linkById = new Map();
    document.querySelectorAll('header nav a[href^="#"]').forEach((a) => {
      const id = a.getAttribute("href")?.slice(1);
      if (id) linkById.set(id, a);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const link = linkById.get(id);
          if (!link) return;
          if (entry.isIntersecting) {
            link.setAttribute("data-active", "true");
          } else {
            link.removeAttribute("data-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );

    sectionEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  useEffect(() => {
    return () => {
      if (propertyTimeoutRef.current) {
        clearTimeout(propertyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full relative text-slate-100 overflow-x-hidden"
      style={{ background: "#13171C" }}
    >
      {/* Subtle patterned backdrop */}
      <div aria-hidden className="hidden" />

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#13171C]/95 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="Sweetwater Helium" className="h-16 w-auto md:h-20" />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#94A3B8" }}>
            <a href="#mission" className="hover:text-white">
              Mission
            </a>
            <a href="#proposal" className="hover:text-white">
              Overview
            </a>
            <a href="#facts" className="hover:text-white">
              Facts
            </a>
            <a href="#uses" className="hover:text-white">
              Uses
            </a>
            <a href="#technology" className="hover:text-white">
              Technology
            </a>
            <a href="#geology" className="hover:text-white">
              Geology
            </a>
            <a href="#process" className="hover:text-white">
              Process
            </a>
            <a href="#environment" className="hover:text-white">
              Environment
            </a>
            <a href="#community" className="hover:text-white">
              Community
            </a>
            <a href="#gallery" className="hover:text-white">
              Gallery
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="mission" className="relative overflow-hidden pt-4 md:pt-8">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/arizona.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <div className="flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="Sweetwater Helium"
                className="w-auto h-[18rem] md:h-[22rem] xl:h-[26rem]"
              />
            </div>
            <div className="max-w-xl space-y-6">
              <p className="text-3xl md:text-4xl leading-snug font-medium" style={{ color: "#DDE3EA" }}>
                Clean, quiet, and sustainable helium production—built around respect for the land, water, and nearby families.
              </p>
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-slate-400">
                Focused on responsible production and long-term stewardship.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#facts"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-white hover:bg-slate-800 transition"
                >
                  Explore the facts <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#community"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-3.5 text-slate-100 hover:bg-white/10 transition"
                >
                  Community first
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPOSAL / OVERVIEW */}
      <section id="proposal" className="bg-[#1E2530] border-y border-white/10 reveal">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Project overview</h2>
            <p className="mt-4 text-slate-300">
              In nearby legacy oil exploration, companies found deep ancient seawater over a mile down—mixed with trapped ancient air. Over geologic time, unique conditions enriched this air with helium. Sweetwater proposes a dedicated helium well to responsibly access this resource, with commitments to local jobs, infrastructure, education, and full site restoration.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1E2530] p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Immediate community support</h3>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
              <li>Infrastructure funding for wells, irrigation, and essential projects.</li>
              <li>Scholarships and research support focused on water solutions.</li>
              <li>Local hiring with training pathways for technical roles.</li>
              <li>Trust-funded well plugging & full restoration at end of life.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section id="facts" className="relative border-y border-white/10 bg-[#1E2530] reveal">
        <div className="bubble-overlay" aria-hidden />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 items-center">
          <div className="relative flex justify-center">
            <div className="relative h-72 w-72 md:h-80 md:w-80 rounded-full border-4 border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 via-slate-900 to-cyan-800/30 shadow-xl">
              <div className="absolute inset-6 rounded-full border-2 border-cyan-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 md:h-48 md:w-48 rounded-full bg-slate-900/80 border border-cyan-500/30 flex items-center justify-center text-4xl md:text-5xl font-extrabold text-cyan-300 shadow-inner">
                  He
                </div>
              </div>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full" style={{ background: brand.accent }} />
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full" style={{ background: brand.primary }} />
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-6 w-6 rounded-full" style={{ background: brand.primaryDark }} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: brand.accent }}>
                The properties of helium
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Unique traits that power its value</h2>
              <p className="text-slate-400 max-w-2xl">
                Helium is best known for being lighter than air, but it actually has many unique qualities that make it important
                for modern technology and industrial applications.
              </p>
            </div>

            <div className="space-y-4">
              {heliumProperties.map(({ slug, title, description, Icon }) => {
                const isActive = activeProperty.name === slug;
                return (
                  <button
                    key={slug}
                    type="button"
                    className={`helium-property flex items-start gap-4 w-full ${isActive ? "is-active" : ""}`}
                    data-effect={slug}
                    onClick={() => triggerPropertyEffect(slug)}
                    onKeyDown={(event) => handlePropertyKey(event, slug)}
                  >
                    <div
                      className="helium-icon h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ background: brand.primary + "1A", color: brand.primaryDark }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100 helium-title">{title}</h3>
                      <p className="text-sm text-slate-400">{description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* USES */}
      <section id="uses" className="bg-[#1E2530] reveal">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology powered by helium</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Usecard icon={<Stethoscope className="h-5 w-5" />} title="Medical (MRI)" imageSrc="/images/mri.png" imageAlt="MRI equipment" onImageClick={openLightbox}>
              Cooling superconducting magnets for high-resolution imaging.
            </Usecard>
            <Usecard icon={<Cpu className="h-5 w-5" />} title="Semiconductors" imageSrc="/images/semiconductors.png" imageAlt="Semiconductor wafers" onImageClick={openLightbox}>
              Ultra-clean purge/carrier gas; precision cooling and leak detection in chip fabs.
            </Usecard>
            <Usecard icon={<Rocket className="h-5 w-5" />} title="Aerospace" imageSrc="/images/aerospace.png" imageAlt="Rocket launch" onImageClick={openLightbox}>
              Pressurization, purging, and cryogenic operations in rocketry and spaceflight.
            </Usecard>
          </div>
        </div>
      </section>

      {/* GEOLOGY */}
      <section id="geology" className="bg-[#1E2530] border-y border-white/10 reveal">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">How helium accumulates</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>Source: Thorium/uranium decay in certain rocks generates helium.</li>
              <li>Release: Heating & fluids liberate helium into water/gas phases.</li>
              <li>Migration: Faults and fractures provide pathways.</li>
              <li>Trap & Seal: Evaporites, clays, shales create tight seals.</li>
              <li>Time: Ancient systems often favor enrichment.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1E2530] p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Regional context</h3>
            <p className="mt-2 text-slate-300">
              Nearby legacy wells showed no commercial oil/gas, aligning the area with helium-forward potential consistent with regional production.
            </p>
          </div>
        </div>
      </section>

      {/* ENVIRONMENT */}
      <section id="environment" className="bg-[#1E2530] border-y border-white/10 reveal">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Designed to be clean, quiet, and neighbor-friendly</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 p-6 bg-[#1E2530]">
              <h3 className="text-lg font-semibold">Safety & environment</h3>
              <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
                <li>Inert, non-toxic, non-flammable gas; no flaring in normal operation.</li>
                <li>Closed-loop process; zero routine chemical waste.</li>
                <li>Continuous monitoring by trained staff.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 p-6 bg-[#1E2530]">
              <h3 className="text-lg font-semibold">Neighbors & noise</h3>
              <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
                <li>Acoustically insulated enclosures for compressors/purifiers.</li>
                <li>Compact layout to minimize visual and acoustic impact.</li>
                <li>Suitable near existing roads and utilities subject to permitting.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY (appeal without naming) */}
      <section id="community" className="bg-[#1E2530] reveal">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Community first</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 p-6 bg-[#1E2530]">
              <h3 className="text-lg font-semibold">What neighbors can expect</h3>
              <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
                <li>Low-profile facilities that blend with the landscape.</li>
                <li>Employment & training with a focus on nearby residents.</li>
                <li>Scholarships and youth programs in science/skills.</li>
                <li>Transparent communication throughout construction and operations.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 p-6 bg-[#1E2530]">
              <h3 className="text-lg font-semibold">Our commitments</h3>
              <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
                <li>Independent monitoring of air, water, and sound—shared publicly.</li>
                <li>Trust-funded reserves for future well plugging & site restoration.</li>
                <li>Infrastructure funding with community input.</li>
                <li>Respect for cultural sites and community calendars in planning.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#1E2530] p-6">
            <h3 className="text-lg font-semibold">Listening & partnership</h3>
            <p className="mt-2 text-slate-300">
              We meet with local leaders, chapters, and families to understand priorities, incorporate feedback, and build long-term value close to home.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY WE ARE ADDING */}
      <section id="technology" className="bg-[#1E2530] border-y border-white/10 reveal">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology we’re researching</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                We are advancing a compact, hypersaline treatment train that integrates membrane separation with closed-loop
                reinjection. This design minimizes surface impacts while preserving the quality of local water and soil systems.
                The illustration highlights the three core modular options under evaluation for the Sweetwater Helium site.
              </p>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full" style={{ background: brand.accent }} />
                  Modular treatment skids sized for rapid deployment and easy servicing.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full" style={{ background: brand.accent }} />
                  Integrated monitoring for flow, pressure, and chemistry to safeguard aquifers.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full" style={{ background: brand.accent }} />
                  Low-profile layout that fits within the existing pad footprint and supports enclosure options.
                </li>
              </ul>
            </div>
            <figure
              className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#1E2530] cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-slate-400"
              role="button"
              tabIndex={0}
              onClick={() => openLightbox("/images/Top3_Options_Hypersaline_AZ.pptx.gif", "Hypersaline treatment configurations under review for the Sweetwater pad.")}
              onKeyDown={(event) => handleKeyOpen(event, "/images/Top3_Options_Hypersaline_AZ.pptx.gif", "Hypersaline treatment configurations under review for the Sweetwater pad.")}
            >
              <img
                src="/images/Top3_Options_Hypersaline_AZ.pptx.gif"
                alt="Top three hypersaline treatment options for Sweetwater"
                className="w-full h-full object-contain bg-[#1E2530]"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="px-4 py-3 text-sm text-slate-400">Hypersaline treatment configurations under review for the Sweetwater pad.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#1E2530] border-y border-white/10 reveal">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Project gallery</h2>
          <p className="mt-2 text-slate-400">Swap these placeholders with your actual images or diagrams.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { src: "/images/plant-enclosed.png", caption: "Low-noise plant enclosure (concept)" },
              { src: "/images/casing-program.png", caption: "Casing program schematic" },
              { src: "/images/area-map.jpg", caption: "Regional area map" },
              { src: "/images/drill-site.png", caption: "Proposed drill site design" },
              { src: "/images/helium-tanks.jpg", caption: "Cryogenic helium storage tanks" },
              { src: "/images/community-meeting.png", caption: "Community partnership meeting" },
              { src: "/images/geology-crosssection.png", caption: "Helium-bearing formation cross-section" },
              { src: "/images/environmental-monitoring.jpg", caption: "Environmental monitoring station" },
              { src: "/images/desert-landscape.jpg", caption: "Surrounding landscape at sunset" },
            ].map((img, index) => (
              <figure
                key={index}
                className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#1E2530] cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-slate-400"
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(img.src, img.caption)}
                onKeyDown={(event) => handleKeyOpen(event, img.src, img.caption)}
              >
                <img src={img.src} alt={img.caption} className="w-full h-56 object-cover" loading="lazy" decoding="async" />
                <figcaption className="px-4 py-3 text-sm text-slate-400">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="bg-[#1E2530] reveal">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">From prospect to production</h2>
            <p className="mt-4 text-slate-300">
              A clear sequence of milestones guides the project from early identification and leasing through drilling, reserves, and production.
            </p>
          </div>
          <div className="process-grid mt-10">
            {processSteps.map((step) => (
              <article key={step.id} className="process-step" data-phase={step.phase}>
                <div className="step-meta">
                  <span className="step-number">{step.id}</span>
                  <span className="step-title">{step.title}</span>
                </div>
                <p className="step-description">{step.description}</p>
                {step.tags && step.tags.length > 0 && (
                  <div className="step-tags" aria-label={`${step.title} phase locations`}>
                    {step.tags.map((tag) => (
                      <span key={tag} className="step-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative reveal" style={{ background: "#13171C" }}>
        <div className="mx-auto max-w-7xl px-6 py-16 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Let’s talk helium</h2>
              <p className="mt-2 text-slate-300 max-w-2xl">
                Ready to collaborate or learn more about our work? Reach out to us anytime.
              </p>
            </div>
            <a
              href="mailto:info@sweetwaterhelium.com"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/30 hover:bg-white/20"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F1318]">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#mission" className="hover:text-white">
              Mission
            </a>
            <a href="#community" className="hover:text-white">
              Community
            </a>
          </div>
        </div>
      </footer>
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close image</span>
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Reusable Components =====
function Infocard({ icon, title, bullets }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1E2530] p-6">
      <div className="flex items-center gap-3 text-slate-300">
        <div className="grid place-items-center h-10 w-10 rounded-xl" style={{ background: brand.primary + "15", color: brand.primaryDark }}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-slate-300">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-2 w-2 rounded-full" style={{ background: brand.accent }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Usecard({ icon, title, children, imageSrc, imageAlt, onImageClick }) {
  return (
    <div className="rounded-xl border border-white/10 p-5 bg-[#1E2530] space-y-3">
      {imageSrc && (
        <button
          type="button"
          onClick={() => onImageClick?.(imageSrc, imageAlt ?? title)}
          className="h-32 w-full overflow-hidden rounded-lg ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <img src={imageSrc} alt={imageAlt ?? title} className="h-full w-full object-cover cursor-zoom-in" loading="lazy" decoding="async" />
        </button>
      )}
      <div className="flex items-center gap-2 text-slate-100">
        <div className="grid place-items-center h-9 w-9 rounded-lg" style={{ background: brand.primary + "15", color: brand.primaryDark }}>
          {icon}
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

/* Optional CSS to add if you want the slow ping animation
.animate-ping-slow { animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
@keyframes ping { 75%, 100% { transform: scale(1.1); opacity: 0; } }
*/

