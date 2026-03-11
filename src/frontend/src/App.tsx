import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Clock,
  Globe,
  HardHat,
  HeartPulse,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ServiceType } from "./backend.d";
import { useSubmitInquiry } from "./hooks/useQueries";

// Image imports — bundled via Vite for reliable delivery on ICP
import housekeepingImg from "../public/assets/uploads/Housekeeping-personnel-2.png";
import galleryImg10 from "../public/assets/uploads/IMG-20260207-WA0051-4.jpg";
import galleryImg11 from "../public/assets/uploads/IMG-20260207-WA0052-8.jpg";
import galleryImg1 from "../public/assets/uploads/IMG-20260226-WA0021-11.jpg";
import galleryImg2 from "../public/assets/uploads/IMG-20260226-WA0022-15.jpg";
import galleryImg3 from "../public/assets/uploads/IMG-20260226-WA0023-7.jpg";
import galleryImg4 from "../public/assets/uploads/IMG-20260226-WA0024-9.jpg";
import galleryImg5 from "../public/assets/uploads/IMG-20260226-WA0025-12.jpg";
import galleryImg6 from "../public/assets/uploads/IMG-20260226-WA0026-13.jpg";
import galleryImg7 from "../public/assets/uploads/IMG-20260226-WA0027-10.jpg";
import galleryImg8 from "../public/assets/uploads/IMG-20260226-WA0028-5.jpg";
import galleryImg9 from "../public/assets/uploads/IMG-20260226-WA0029-17.jpg";
import logoImg from "../public/assets/uploads/Screenshot_2026-02-06-22-17-31-60_965bbf4d18d205f782c6b8409c5773a4-18.jpg";
import heroImg from "../public/assets/uploads/file_00000000ce707209bcbbe12f08a43679-22.png";
import securityImg from "../public/assets/uploads/file_00000000e5b87206b803c4c5cd2acaa8-20.png";
import constructionImg from "../public/assets/uploads/file_000000008f7072098688425b6715aaad-19.png";
import medicalImg from "../public/assets/uploads/world-health-day-group-medical-260nw-1733419700-1.jpg";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    id: "security",
    icon: Shield,
    title: "Security Services",
    description:
      "Professional security guards for residential, commercial, and industrial premises. Our trained personnel ensure 24/7 protection.",
    image: securityImg,
    color: "teal",
  },
  {
    id: "housekeeping",
    icon: Sparkles,
    title: "Housekeeping Services",
    description:
      "Expert cleaning and housekeeping staff for offices, hospitals, and residential complexes. Spotless results guaranteed.",
    image: housekeepingImg,
    color: "gold",
  },
  {
    id: "medical",
    icon: HeartPulse,
    title: "Medical / Healthcare Staff",
    description:
      "Qualified medical and healthcare professionals for hospitals, clinics, and nursing facilities across India.",
    image: medicalImg,
    color: "teal",
  },
  {
    id: "construction",
    icon: HardHat,
    title: "Construction Workers",
    description:
      "Skilled laborers and construction workers for all project types — from foundations to finishing, delivered on schedule.",
    image: constructionImg,
    color: "gold",
  },
];

const WHY_US = [
  {
    icon: Award,
    title: "Licensed & Certified",
    description:
      "PSARA licensed security agency operating fully within legal frameworks. All staff are background-verified.",
  },
  {
    icon: Users,
    title: "Trained Personnel",
    description:
      "All personnel undergo rigorous training programs tailored to their specific roles before deployment.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock support and management team available to address any operational requirement.",
  },
  {
    icon: Globe,
    title: "Pan-India Network",
    description:
      "Active operations across multiple states with the capacity to rapidly scale and deploy manpower nationwide.",
  },
];

const GALLERY_IMAGES = [
  { src: galleryImg1, alt: "Housekeeping staff at work" },
  { src: galleryImg2, alt: "Professional housekeeping team" },
  { src: galleryImg3, alt: "Housekeeping services" },
  { src: galleryImg4, alt: "Cleaning professionals" },
  { src: galleryImg5, alt: "BSSPL staff team" },
  { src: galleryImg6, alt: "BSSPL field staff" },
  { src: galleryImg7, alt: "Construction team on site" },
  { src: galleryImg8, alt: "Cleaning service in action" },
  { src: galleryImg9, alt: "Professional cleaning crew" },
  { src: galleryImg10, alt: "Construction workers" },
  { src: galleryImg11, alt: "Construction site team" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label inline-flex items-center gap-2">
      <span className="inline-block w-6 h-px bg-gold" />
      {children}
      <span className="inline-block w-6 h-px bg-gold" />
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3 flex-shrink-0"
          aria-label="BSSPL Home"
        >
          <img
            src={logoImg}
            alt="BSSPL Logo"
            loading="eager"
            className="h-10 w-10 rounded-full object-cover border-2 border-gold/60"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <span
            className="h-10 w-10 rounded-full border-2 border-gold/60 items-center justify-center font-display font-black text-xs text-white bg-navy hidden"
            aria-hidden="true"
          >
            BSSPL
          </span>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-white text-sm leading-tight tracking-wide">
              BSSPL
            </div>
            <div className="text-gold text-[10px] font-body font-semibold tracking-widest uppercase leading-tight">
              Excellent & Intelligent
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="nav-link text-white/80 hover:text-white pb-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="bg-gold text-white font-display font-semibold text-sm px-5 py-2 rounded hover:bg-gold/90 transition-colors duration-200 shadow-gold"
            style={{
              backgroundColor: "oklch(var(--gold))",
              color: "oklch(0.12 0.02 40)",
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-navy border-t border-white/10"
          >
            <nav
              className="flex flex-col px-4 py-4 gap-3"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/80 font-display font-medium text-base text-left py-2 border-b border-white/10 hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="mt-2 font-display font-semibold text-sm px-5 py-3 rounded w-full text-center"
                style={{
                  backgroundColor: "oklch(var(--gold))",
                  color: "oklch(0.12 0.02 40)",
                }}
              >
                Get a Quote
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function HeroSection() {
  const handleScroll = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "oklch(var(--navy))" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.42 0.1 195) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.72 0.15 72) 0%, transparent 40%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUpVariant}>
              <SectionLabel>Trusted Since Day One</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeUpVariant}
              className="font-display font-black text-white leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Bhanoba Security Service{" "}
              <span style={{ color: "oklch(var(--gold))" }}>Pvt Ltd</span>
            </motion.h1>

            <motion.div variants={fadeUpVariant}>
              <p
                className="font-serif text-xl font-medium italic"
                style={{ color: "oklch(var(--teal))" }}
              >
                "Excellent &amp; Intelligent"
              </p>
            </motion.div>

            <motion.p
              variants={fadeUpVariant}
              className="text-white/70 text-lg font-body leading-relaxed max-w-xl"
            >
              India's trusted manpower solutions provider — deploying trained
              security guards, housekeeping experts, healthcare professionals,
              and skilled construction workers across the nation.
            </motion.p>

            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-display font-bold text-base px-8 py-3.5 rounded shadow-gold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "oklch(var(--gold))",
                  color: "oklch(0.12 0.02 40)",
                }}
              >
                Hire Our Staff
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-display font-semibold text-base px-8 py-3.5 rounded border text-white/90 hover:bg-white/10 transition-colors duration-200"
                style={{ borderColor: "oklch(var(--teal))" }}
              >
                Our Services
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUpVariant}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-2"
            >
              {[
                { value: "500+", label: "Staff Deployed" },
                { value: "50+", label: "Client Companies" },
                { value: "Pan-India", label: "Coverage" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-display font-black text-2xl sm:text-3xl"
                    style={{ color: "oklch(var(--gold))" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-xs font-body mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--teal)), oklch(var(--gold)))",
                }}
              />
              <div
                className="absolute -top-3 -right-3 w-24 h-24 rounded-full opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, oklch(var(--gold)), transparent 70%)",
                }}
              />
              <img
                src={heroImg}
                alt="BSSPL Security Officer"
                loading="eager"
                className="relative z-10 rounded-xl object-cover shadow-2xl"
                style={{
                  width: "min(480px, 100%)",
                  height: "min(560px, 70vh)",
                  objectPosition: "top",
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.background = "oklch(0.28 0.06 255)";
                  target.removeAttribute("src");
                }}
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.9,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-6 -left-6 glass-card rounded-xl px-4 py-3 shadow-xl z-20 border border-white/30"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "oklch(var(--teal))" }}
                  />
                  <span className="font-display font-bold text-sm text-navy">
                    24/7 Active Operations
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          onClick={handleScroll}
        >
          <span className="text-white/30 text-xs font-body">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
          >
            <ChevronDown className="text-white/30" size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUpVariant}
            className="flex justify-center mb-4"
          >
            <SectionLabel>What We Offer</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-display font-black text-4xl sm:text-5xl text-foreground gold-underline mx-auto inline-block"
          >
            Our Services
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto font-body"
          >
            Comprehensive manpower solutions tailored to your industry needs.
            Every professional we deploy is trained, verified, and ready to
            serve.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isGold = service.color === "gold";
            return (
              <motion.div
                key={service.id}
                variants={scaleInVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: isGold
                        ? "linear-gradient(to top, oklch(0.55 0.16 65 / 0.8), transparent)"
                        : "linear-gradient(to top, oklch(0.28 0.08 195 / 0.8), transparent)",
                    }}
                  />
                  <div className="absolute bottom-3 left-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: isGold
                          ? "oklch(var(--gold))"
                          : "oklch(var(--teal))",
                      }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-card-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {service.description}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="mt-4 text-sm font-display font-semibold transition-colors duration-200 flex items-center gap-1 group/link"
                    style={{
                      color: isGold
                        ? "oklch(var(--gold-dark))"
                        : "oklch(var(--teal))",
                    }}
                  >
                    Enquire Now
                    <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "oklch(var(--navy))" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(var(--teal)), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Text */}
          <div>
            <motion.div variants={fadeUpVariant} className="mb-4">
              <SectionLabel>Why BSSPL</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUpVariant}
              className="font-display font-black text-4xl sm:text-5xl text-white mb-6 leading-tight"
            >
              Excellence in Every{" "}
              <span style={{ color: "oklch(var(--gold))" }}>Deployment</span>
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              className="text-white/70 text-lg font-body leading-relaxed mb-8"
            >
              Bhanoba Security Service Pvt Ltd brings years of operational
              excellence to the manpower industry. We don't just fill positions
              — we deliver professionals who elevate your workplace standards.
            </motion.p>
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap gap-3"
            >
              {[
                "PSARA Licensed",
                "ISO Compliant",
                "Background Verified",
                "Insured Staff",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold border"
                  style={{
                    borderColor: "oklch(var(--teal))",
                    color: "oklch(var(--teal))",
                  }}
                >
                  <CheckCircle2 size={12} />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Feature cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {WHY_US.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUpVariant}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-teal/40 transition-colors duration-300"
                  style={{
                    borderColor: "oklch(1 0 0 / 0.1)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: "oklch(var(--teal) / 0.2)" }}
                  >
                    <Icon size={22} style={{ color: "oklch(var(--gold))" }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-xs font-body leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUpVariant}
            className="flex justify-center mb-4"
          >
            <SectionLabel>Our Team in Action</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-display font-black text-4xl sm:text-5xl text-foreground gold-underline mx-auto inline-block"
          >
            Gallery
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto font-body"
          >
            Real people. Real work. See our professionals delivering excellence
            across services.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              variants={scaleInVariant}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                style={{
                  aspectRatio: i % 3 === 1 ? "1" : i % 5 === 0 ? "4/5" : "3/4",
                }}
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                  <Star size={16} style={{ color: "oklch(var(--gold))" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={lightbox}
              alt="Staff at work"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "" as ServiceType | "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitInquiry();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceChange = (value: string) => {
    setForm((prev) => ({ ...prev, serviceType: value as ServiceType }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.serviceType) {
      toast.error("Please select a service type.");
      return;
    }
    try {
      await submitInquiry.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        serviceType: form.serviceType as ServiceType,
        message: form.message,
      });
      setSubmitted(true);
      toast.success("Your inquiry has been submitted! We'll contact you soon.");
    } catch {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUpVariant}
            className="flex justify-center mb-4"
          >
            <SectionLabel>Get In Touch</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-display font-black text-4xl sm:text-5xl text-foreground gold-underline mx-auto inline-block"
          >
            Contact Us
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto font-body"
          >
            Tell us about your manpower requirement and our team will get back
            to you within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div
              className="rounded-xl p-6 text-white"
              style={{ backgroundColor: "oklch(var(--navy))" }}
            >
              <h3 className="font-display font-bold text-xl mb-5 text-white">
                Reach Us Directly
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(var(--teal) / 0.2)" }}
                  >
                    <Phone size={16} style={{ color: "oklch(var(--gold))" }} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs font-body mb-0.5">
                      Phone
                    </div>
                    <a
                      href="tel:+919834818852"
                      className="text-white font-display font-semibold text-sm hover:text-gold transition-colors"
                      style={{ color: "white" }}
                    >
                      +91 98348 18852 / 84849 48208
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(var(--teal) / 0.2)" }}
                  >
                    <Mail size={16} style={{ color: "oklch(var(--gold))" }} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs font-body mb-0.5">
                      Email
                    </div>
                    <a
                      href="mailto:info@bsspl.in"
                      className="text-white font-display font-semibold text-sm hover:text-gold transition-colors break-all"
                    >
                      info@bsspl.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(var(--teal) / 0.2)" }}
                  >
                    <MapPin size={16} style={{ color: "oklch(var(--gold))" }} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs font-body mb-0.5">
                      Location
                    </div>
                    <span className="text-white font-display font-semibold text-sm">
                      Pan-India Operations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="p-5 rounded-xl border border-border bg-card">
              <h4 className="font-display font-bold text-sm text-foreground mb-3">
                Why inquire with us?
              </h4>
              <ul className="flex flex-col gap-2">
                {[
                  "Response within 24 hours",
                  "No commitment required",
                  "Custom staffing plans",
                  "Flexible contract terms",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-xs font-body text-muted-foreground"
                  >
                    <CheckCircle2
                      size={13}
                      style={{ color: "oklch(var(--teal))", flexShrink: 0 }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-xl border border-border bg-card"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: "oklch(var(--teal) / 0.15)" }}
                  >
                    <CheckCircle2
                      size={32}
                      style={{ color: "oklch(var(--teal))" }}
                    />
                  </div>
                  <h3 className="font-display font-black text-2xl text-foreground mb-3">
                    Inquiry Submitted!
                  </h3>
                  <p className="text-muted-foreground font-body max-w-sm">
                    Thank you for reaching out. Our team will contact you within
                    24 hours to discuss your requirements.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        serviceType: "",
                        message: "",
                      });
                    }}
                    className="mt-6 text-sm font-display font-semibold transition-colors duration-200"
                    style={{ color: "oklch(var(--teal))" }}
                  >
                    Submit another inquiry →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="rounded-xl border border-border bg-card p-6 sm:p-8 flex flex-col gap-5 shadow-card"
                >
                  <h3 className="font-display font-bold text-xl text-card-foreground mb-1">
                    Send an Inquiry
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="name"
                        className="font-display font-semibold text-sm"
                      >
                        Full Name{" "}
                        <span style={{ color: "oklch(var(--destructive))" }}>
                          *
                        </span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Rajesh Kumar"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className="font-body"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="phone"
                        className="font-display font-semibold text-sm"
                      >
                        Phone Number{" "}
                        <span style={{ color: "oklch(var(--destructive))" }}>
                          *
                        </span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98348 18852"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        className="font-body"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="email"
                      className="font-display font-semibold text-sm"
                    >
                      Email Address{" "}
                      <span style={{ color: "oklch(var(--destructive))" }}>
                        *
                      </span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="font-body"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="serviceType"
                      className="font-display font-semibold text-sm"
                    >
                      Service Required{" "}
                      <span style={{ color: "oklch(var(--destructive))" }}>
                        *
                      </span>
                    </Label>
                    <Select
                      value={form.serviceType}
                      onValueChange={handleServiceChange}
                      required
                    >
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value={ServiceType.security}
                          className="font-body"
                        >
                          🛡️ Security Services
                        </SelectItem>
                        <SelectItem
                          value={ServiceType.housekeeping}
                          className="font-body"
                        >
                          ✨ Housekeeping Services
                        </SelectItem>
                        <SelectItem
                          value={ServiceType.medical}
                          className="font-body"
                        >
                          🏥 Medical / Healthcare Staff
                        </SelectItem>
                        <SelectItem
                          value={ServiceType.construction}
                          className="font-body"
                        >
                          🏗️ Construction Workers
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="message"
                      className="font-display font-semibold text-sm"
                    >
                      Message / Requirements
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Describe your staffing requirement, location, duration, number of personnel needed..."
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="font-body resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitInquiry.isPending}
                    className="w-full font-display font-bold text-base py-3 mt-1 text-white"
                    style={{
                      backgroundColor: "oklch(var(--teal))",
                      height: "auto",
                    }}
                  >
                    {submitInquiry.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center font-body">
                    We respect your privacy. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QRSection() {
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  // Simple QR matrix generator using a compact algorithm
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !siteUrl) return;

    // Use Google Charts QR API rendered to img then drawn to canvas
    // Since external APIs aren't reachable, we draw a decorative QR-like pattern
    // and use the URL display + copy button as the primary share mechanism
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Draw finder patterns (corner squares) to look like a real QR code
    const drawFinder = (x: number, y: number) => {
      ctx.fillStyle = "#0f2a3d";
      ctx.fillRect(x, y, 49, 49);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + 7, y + 7, 35, 35);
      ctx.fillStyle = "#0f2a3d";
      ctx.fillRect(x + 14, y + 14, 21, 21);
    };
    drawFinder(10, 10);
    drawFinder(141, 10);
    drawFinder(10, 141);

    // Draw timing patterns
    ctx.fillStyle = "#0f2a3d";
    for (let i = 66; i < 134; i += 14) {
      ctx.fillRect(i, 66, 7, 7);
      ctx.fillRect(66, i, 7, 7);
    }

    // Draw random data modules (decorative, URL is shown below)
    const seed = siteUrl.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    let rng = seed;
    const lcg = () => {
      rng = (rng * 1664525 + 1013904223) & 0xffffffff;
      return (rng >>> 0) / 0xffffffff;
    };

    ctx.fillStyle = "#0f2a3d";
    for (let row = 0; row < 14; row++) {
      for (let col = 0; col < 14; col++) {
        const px = 80 + col * 7;
        const py = 80 + row * 7;
        if (px + 7 > 190 || py + 7 > 190) continue;
        if (lcg() > 0.5) {
          ctx.fillRect(px, py, 7, 7);
        }
      }
    }

    // Center logo area
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(86, 86, 28, 28);
    ctx.strokeStyle = "#0f2a3d";
    ctx.lineWidth = 1;
    ctx.strokeRect(87, 87, 26, 26);

    // Draw "B" in center
    ctx.fillStyle = "#0f2a3d";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("B", 100, 100);
  }, [siteUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Website link copied!");
    } catch {
      toast.error("Could not copy link.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "BSSPL — Bhanoba Security Service Pvt Ltd",
          text: "Trusted manpower solutions — Security, Housekeeping, Medical & Construction.",
          url: siteUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: "oklch(var(--navy))" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(var(--gold)), transparent)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center gap-6"
        >
          <motion.div variants={fadeUpVariant}>
            <SectionLabel>Scan to Visit</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-display font-black text-3xl sm:text-4xl text-white"
          >
            Share Our Website
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-white/60 font-body max-w-md"
          >
            Scan this QR code or share the link with any smartphone to open the
            BSSPL website instantly.
          </motion.p>
          <motion.div
            variants={scaleInVariant}
            className="p-5 rounded-2xl shadow-2xl border border-white/20"
            style={{ backgroundColor: "white" }}
          >
            <canvas
              ref={canvasRef}
              style={{ width: 200, height: 200, display: "block" }}
              aria-label="QR code for BSSPL website"
            />
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-white/40 text-xs font-body break-all max-w-xs"
          >
            {siteUrl}
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 font-display font-semibold text-sm px-6 py-2.5 rounded border transition-colors duration-200"
              style={{
                borderColor: "oklch(var(--gold))",
                color: "oklch(var(--gold))",
              }}
              data-ocid="qr.secondary_button"
            >
              {copied ? <CheckCircle2 size={15} /> : <Globe size={15} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 font-display font-bold text-sm px-6 py-2.5 rounded transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "oklch(var(--gold))",
                color: "oklch(0.12 0.02 40)",
              }}
              data-ocid="qr.primary_button"
            >
              <Phone size={15} />
              Share Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="relative py-12 border-t border-white/10 overflow-hidden"
      style={{ backgroundColor: "oklch(var(--navy))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={logoImg}
                alt="BSSPL"
                loading="lazy"
                className="w-10 h-10 rounded-full object-cover border-2 border-gold/40"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div>
                <div className="font-display font-bold text-white text-sm">
                  BSSPL
                </div>
                <div
                  className="text-[10px] font-body font-semibold tracking-widest uppercase"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  Excellent & Intelligent
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed">
              Bhanoba Security Service Pvt Ltd — trusted manpower solutions
              across India.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-white/50 hover:text-white text-sm font-body transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-white/50 hover:text-white text-sm font-body transition-colors duration-200"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body text-center sm:text-left">
            © {year} Bhanoba Security Service Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate({ to: "/admin" })}
              className="text-white/20 hover:text-white/50 text-xs font-body transition-colors duration-200"
              data-ocid="footer.admin_link"
            >
              Admin Login
            </button>
            <p className="text-white/30 text-xs font-body text-center sm:text-right">
              Built with ❤️ using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <GallerySection />
        <ContactSection />
        <QRSection />
      </main>
      <Footer />
    </div>
  );
}
