import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const SKILLS = [
  { cat: "SEO", color: "#C9A84C", items: ["Keyword Research", "On-Page SEO", "Off-Page SEO", "Technical Basics"] },
  { cat: "Local SEO", color: "#7ECBC5", items: ["Google Business Profile", "Local Citations", "GMB Posts", "Map Visibility"] },
  { cat: "Content", color: "#E07B8F", items: ["Website Content", "Meta Tags", "Blogs", "SEO Captions"] },
  { cat: "Backlinks", color: "#9B8FD4", items: ["Directory", "Bookmarking", "Classifieds", "Article Submission"] },
  { cat: "Digital", color: "#5BAD7E", items: ["Content Calendar", "Instagram Posting", "YouTube Uploads", "Canva Coordination"] },
];

const TOOLS = [
  { name: "Google Search Console", icon: "📊" },
  { name: "Google Analytics", icon: "📈" },
  { name: "Google Business Profile", icon: "📍" },
  { name: "Google Sheets", icon: "📋" },
  { name: "WordPress", icon: "🌐" },
  { name: "Canva", icon: "🎨" },
  { name: "Meta Business Suite", icon: "📱" },
  { name: "YouTube Studio", icon: "▶️" },
  { name: "Ubersuggest", icon: "🔍" },
  { name: "SEOQuake", icon: "⚡" },
];

const STATS = [
  { label: "Clicks", value: 167000, suffix: "K", display: "167K", client: "Khandelwal Gift Mart", color: "#C9A84C" },
  { label: "Impressions", value: 345000, suffix: "K", display: "345K", client: "Khandelwal Gift Mart", color: "#7ECBC5" },
  { label: "CTR", value: 48.4, suffix: "%", display: "48.4%", client: "Khandelwal Gift Mart", color: "#E07B8F" },
  { label: "Avg Position", value: 5.3, suffix: "", display: "5.3", client: "Khandelwal Gift Mart", color: "#9B8FD4" },
];

const CASES = [
  {
    id: "01", title: "Khandelwal Gift Mart", industry: "Gift & Retail",
    stats: [{ label: "Clicks", val: "167K" }, { label: "Impressions", val: "345K" }, { label: "CTR", val: "48.4%" }, { label: "Position", val: "5.3" }],
    desc: "SEO keywords, Search Console tracking, backlink sheets, Google Business Profile support and local visibility activities for a gift & corporate gifts store in Nagpur.",
    keywords: ["corporate gift supplier in Nagpur", "wedding gifts Nagpur", "New Year gifts", "Diwali gifts"],
    color: "#C9A84C",
  },
  {
    id: "02", title: "RA Solution", industry: "Stock Market Advisory",
    stats: [{ label: "Clicks", val: "103K" }, { label: "Impressions", val: "2.18M" }, { label: "CTR", val: "4.7%" }, { label: "Position", val: "8" }],
    desc: "Keyword research and ranking strategy for stock market advisory. Search Console performance tracking and comprehensive SEO content planning.",
    keywords: ["best stock market advisory in India", "stock market tips", "advisory services"],
    color: "#7ECBC5",
  },
  {
    id: "03", title: "Acceptance Lifestyle / Riddhi Saboo", industry: "Life Coaching",
    stats: [{ label: "Clicks", val: "190" }, { label: "Impressions", val: "2.32K" }, { label: "CTR", val: "8.2%" }, { label: "Position", val: "9.2" }],
    desc: "Life coach SEO, GMB optimization, backlink bookmarking and article submissions for local Nagpur coaching discovery.",
    keywords: ["best life coach in Nagpur", "Law of Attraction Coach", "emotional well-being coach"],
    color: "#E07B8F",
  },
  {
    id: "04", title: "Richha Zariya Clinic", industry: "Beauty & Skin Care",
    stats: [{ label: "GMB Posts", val: "20+" }, { label: "Keywords", val: "12+" }, { label: "Profile", val: "Active" }, { label: "Reach", val: "Local" }],
    desc: "GMB posts, SEO captions, skin treatment keywords, pigmentation and bridal skin content for a beauty & cosmetic clinic.",
    keywords: ["best skin specialist in Nagpur", "pigmentation treatment", "bridal skin treatment"],
    color: "#9B8FD4",
  },
];

const INDUSTRIES = ["Coaching", "Healthcare", "Beauty Clinic", "Pest Control", "Gift & Retail", "Security", "Education", "Hospitality"];

const CLIENTS = [
  "Adborn Solutions", "Bansal Classes", "RA Solutions", "Form & Function",
  "Samarth Resort", "Hackers Guards", "Richha Zariya", "Khandelwal Gift Mart",
  "RSMS Pest Control", "Acceptance Lifestyle Circle", "Eco Hygenix", "Vastu Van",
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCounter(target, duration = 2000, start = false, isFloat = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isFloat ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, isFloat]);
  return count;
}

// ─── CURSOR ─────────────────────────────────────────────────────────────────

function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: -100, my: -100, rx: -100, ry: -100 });
  const isHover = useRef(false);

  useEffect(() => {
    const onMove = (e) => { pos.current.mx = e.clientX; pos.current.my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    const addHover = () => { isHover.current = true; };
    const removeHover = () => { isHover.current = false; };

    const interval = setInterval(() => {
      document.querySelectorAll("a,button,[data-magnetic]").forEach(el => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    }, 1000);

    let raf;
    const animate = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.1;
      p.ry += (p.my - p.ry) * 0.1;
      if (dotRef.current) {
        dotRef.current.style.left = p.mx + "px";
        dotRef.current.style.top = p.my + "px";
        dotRef.current.style.transform = `translate(-50%,-50%) scale(${isHover.current ? 2.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + "px";
        ringRef.current.style.top = p.ry + "px";
        ringRef.current.style.transform = `translate(-50%,-50%) scale(${isHover.current ? 0.4 : 1})`;
        ringRef.current.style.borderColor = isHover.current ? "#C9A84C" : "rgba(201,168,76,0.5)";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", width: 8, height: 8, background: "#C9A84C", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transition: "transform 0.15s", mixBlendMode: "difference" }} />
      <div ref={ringRef} style={{ position: "fixed", width: 40, height: 40, border: "1.5px solid rgba(201,168,76,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transition: "transform 0.15s, border-color 0.2s" }} />
    </>
  );
}

// ─── PARTICLES ──────────────────────────────────────────────────────────────

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      });
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

// ─── REVEAL ─────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, dir = "up", style = {}, className = "" }) {
  const [ref, visible] = useInView();
  const from = dir === "up" ? "translateY(40px)" : dir === "left" ? "translateX(-40px)" : dir === "right" ? "translateX(40px)" : "translateY(-20px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0,0)" : from,
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      const secs = ["hero", "about", "skills", "results", "cases", "experience", "education", "contact"];
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(secs[i]); break; }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["About", "Skills", "Results", "Cases", "Experience", "Education", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      padding: "1rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(6,8,18,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.08)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.01em" }}>
        <span style={{ color: "#C9A84C" }}>S</span><span style={{ color: "#e8e6e0" }}>nehal</span>
        <span style={{ color: "rgba(201,168,76,0.3)", margin: "0 0.3rem" }}>·</span>
        <span style={{ color: "#7ECBC5", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>SEO</span>
      </div>
      <ul style={{ display: "flex", gap: "2.2rem", listStyle: "none", margin: 0, padding: 0 }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} data-magnetic style={{
              color: active === l.toLowerCase() ? "#C9A84C" : "rgba(232,230,224,0.5)",
              textDecoration: "none", fontSize: "0.78rem", fontWeight: 500,
              letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "color 0.3s", position: "relative", cursor: "none",
            }}>
              {l}
              {active === l.toLowerCase() && (
                <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1, background: "#C9A84C", display: "block" }} />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const anim = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 1s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 1s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 5rem", position: "relative", overflow: "hidden",
    }}>
      {/* BG decorative rings */}
      <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", animation: "spinRing 30s linear infinite" }} />
      <div style={{ position: "absolute", right: "10%", top: "50%", transform: "translateY(-50%)", width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.05)", animation: "spinRing 20s linear infinite reverse" }} />

      {/* Photo placeholder */}
      <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", zIndex: 2, ...anim(600) }}>
        <div style={{ position: "relative", width: 320, height: 400 }}>
          <div style={{ position: "absolute", inset: -3, borderRadius: "20px 60px 20px 60px", background: "linear-gradient(135deg,#C9A84C,rgba(126,203,197,0.6),rgba(201,168,76,0.2))", zIndex: -1 }} />
          <div style={{ width: "100%", height: "100%", borderRadius: "20px 60px 20px 60px", overflow: "hidden", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <img
              src="/snehal-photo.jpg"
              alt="Snehal S. Asole"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", gap: "0.8rem" }}>
              <div style={{ fontSize: "3.5rem" }}>👩‍💻</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(201,168,76,0.6)", textAlign: "center", padding: "0 1rem" }}>
                Add <code style={{ background: "rgba(201,168,76,0.1)", padding: "0.1rem 0.4rem", borderRadius: 4 }}>snehal-photo.jpg</code><br />to your project root
              </div>
            </div>
          </div>
          {/* floating badge */}
          <div style={{ position: "absolute", bottom: -20, left: -30, background: "rgba(6,8,18,0.95)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: "0.8rem 1.2rem", backdropFilter: "blur(20px)", animation: "floatBadge 3s ease-in-out infinite" }}>
            <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Experience</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#C9A84C" }}>6 Months</div>
            <div style={{ fontSize: "0.72rem", color: "rgba(232,230,224,0.5)" }}>Adborn Solutions</div>
          </div>
          <div style={{ position: "absolute", top: -16, right: -30, background: "rgba(6,8,18,0.95)", border: "1px solid rgba(126,203,197,0.2)", borderRadius: 12, padding: "0.8rem 1.2rem", backdropFilter: "blur(20px)", animation: "floatBadge2 3.5s ease-in-out infinite" }}>
            <div style={{ fontSize: "0.68rem", color: "rgba(126,203,197,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Best Result</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#7ECBC5" }}>48.4% CTR</div>
            <div style={{ fontSize: "0.72rem", color: "rgba(232,230,224,0.5)" }}>Khandelwal Gift Mart</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 620, zIndex: 3 }}>
        <div style={{ ...anim(0), display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 100, padding: "0.4rem 1.1rem", marginBottom: "1.8rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", display: "inline-block", animation: "pulse 1.6s infinite" }} />
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600 }}>Open to Opportunities</span>
        </div>

        <h1 style={{ ...anim(80), fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2.8rem,5vw,5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1.2rem", color: "#e8e6e0" }}>
          <span style={{ display: "block" }}>Snehal S.</span>
          <span style={{ display: "block", color: "#C9A84C" }}>Asole</span>
          <span style={{ display: "block", fontSize: "0.42em", fontWeight: 400, color: "rgba(232,230,224,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "0.4rem" }}>SEO Executive & Digital Marketer</span>
        </h1>

        <p style={{ ...anim(200), color: "rgba(232,230,224,0.55)", fontSize: "0.97rem", lineHeight: 1.8, maxWidth: 460, marginBottom: "2.8rem" }}>
          Driving organic growth through strategic keyword research, on-page excellence, GMB optimization, and data-backed local SEO — with 6 months hands-on experience across 12+ clients.
        </p>

        <div style={{ ...anim(320), display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#cases" data-magnetic style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2.2rem",
            background: "linear-gradient(135deg,#C9A84C,#b8913a)", color: "#060812",
            borderRadius: 100, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none",
            cursor: "none", transition: "all 0.3s", letterSpacing: "0.02em",
            boxShadow: "0 8px 32px rgba(201,168,76,0.25)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(201,168,76,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.25)"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            View Case Studies
          </a>
          <a href="#contact" data-magnetic style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2.2rem",
            border: "1px solid rgba(201,168,76,0.25)", color: "#e8e6e0",
            borderRadius: 100, fontWeight: 500, fontSize: "0.88rem", textDecoration: "none",
            cursor: "none", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; e.currentTarget.style.color = "#e8e6e0"; e.currentTarget.style.transform = ""; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            Get In Touch
          </a>
        </div>

        {/* mini stats row */}
        <div style={{ ...anim(440), display: "flex", gap: "2.5rem", marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          {[["12+", "Clients Served"], ["8+", "Industries"], ["167K", "Peak Clicks"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.7rem", fontWeight: 800, color: "#C9A84C", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(232,230,224,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.3rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" style={{ padding: "7rem 5rem", background: "rgba(255,255,255,0.015)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <Reveal>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />About Me
          </div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem", color: "#e8e6e0" }}>
            Turning Search<br /><span style={{ color: "#C9A84C" }}>Visibility</span> into<br />Real Business Growth
          </h2>
          <p style={{ color: "rgba(232,230,224,0.55)", lineHeight: 1.85, fontSize: "0.94rem", marginBottom: "1.2rem" }}>
            Hi, I am <strong style={{ color: "#e8e6e0" }}>Snehal S. Asole</strong>, an SEO Executive & Digital Marketer with 6 months of hands-on internship experience at <strong style={{ color: "#C9A84C" }}>Adborn Solutions</strong>.
          </p>
          <p style={{ color: "rgba(232,230,224,0.55)", lineHeight: 1.85, fontSize: "0.94rem", marginBottom: "1.2rem" }}>
            My core focus is <strong style={{ color: "#e8e6e0" }}>SEO, Local SEO, Google Business Profile optimization, keyword research, content optimization, and backlink building</strong> — all backed by real data from Google Search Console.
          </p>
          <p style={{ color: "rgba(232,230,224,0.55)", lineHeight: 1.85, fontSize: "0.94rem" }}>
            I also bring solid digital marketing experience including content calendars, Instagram/YouTube posting, captions, and social media planning — giving me a <strong style={{ color: "#e8e6e0" }}>complete understanding of organic + content growth</strong>.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
            {[["Location", "Nagpur, India"], ["Email", "snehalasole2005@gmail.com"], ["Phone", "7757804127"], ["Status", "Open to Work ●"]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: "0.67rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(201,168,76,0.5)", marginBottom: "0.2rem" }}>{k}</div>
                <div style={{ fontSize: "0.85rem", color: k === "Status" ? "#7ECBC5" : "#e8e6e0", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "SEO Focus", icon: "🎯", desc: "Keyword research, on-page SEO, off-page SEO, GMB, local SEO and content optimization.", color: "#C9A84C" },
              { label: "Digital Work", icon: "📱", desc: "Content calendars, posting, captions, creatives coordination and YouTube/Instagram activities.", color: "#7ECBC5" },
              { label: "Data Tracking", icon: "📊", desc: "Search Console, GMB insights, ranking sheets and structured backlink tracking.", color: "#E07B8F" },
            ].map(item => (
              <div key={item.label} data-magnetic style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)`,
                borderRadius: 16, padding: "1.4rem 1.6rem", display: "flex", gap: "1.2rem", alignItems: "flex-start",
                transition: "all 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${item.color}33`; e.currentTarget.style.background = `${item.color}08`; e.currentTarget.style.transform = "translateX(6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = ""; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}14`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: item.color, marginBottom: "0.3rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.83rem", color: "rgba(232,230,224,0.5)", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SKILLS ─────────────────────────────────────────────────────────────────

function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="skills" style={{ padding: "7rem 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />Core Skills<span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />
          </div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#e8e6e0" }}>
            What I Bring to the Table
          </h2>
        </Reveal>

        {/* Tab nav */}
        <Reveal delay={100}>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
            {SKILLS.map((s, i) => (
              <button key={s.cat} data-magnetic onClick={() => setActiveTab(i)} style={{
                padding: "0.55rem 1.4rem", borderRadius: 100, border: `1px solid ${activeTab === i ? s.color : "rgba(255,255,255,0.08)"}`,
                background: activeTab === i ? `${s.color}14` : "transparent",
                color: activeTab === i ? s.color : "rgba(232,230,224,0.4)",
                fontSize: "0.8rem", fontWeight: 600, cursor: "none", transition: "all 0.3s",
                letterSpacing: "0.05em",
              }}>
                {s.cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Skill chips */}
        <Reveal delay={200}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}>
            {SKILLS[activeTab].items.map((item, i) => (
              <div key={item} data-magnetic
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === i ? `${SKILLS[activeTab].color}10` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hovered === i ? SKILLS[activeTab].color + "50" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 14, padding: "1.4rem 1.6rem",
                  transition: "all 0.35s", transform: hovered === i ? "translateY(-4px)" : "none",
                  boxShadow: hovered === i ? `0 12px 30px ${SKILLS[activeTab].color}15` : "none",
                  cursor: "default",
                }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: SKILLS[activeTab].color, marginBottom: "0.9rem", boxShadow: `0 0 10px ${SKILLS[activeTab].color}60` }} />
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "0.92rem", color: "#e8e6e0", marginBottom: "0.2rem" }}>{item}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(232,230,224,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{SKILLS[activeTab].cat}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Tools */}
        <Reveal delay={300} style={{ marginTop: "5rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />Tools & Platforms
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {TOOLS.map(t => (
              <div key={t.name} data-magnetic style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 100, padding: "0.55rem 1.2rem", fontSize: "0.82rem", color: "rgba(232,230,224,0.7)",
                fontWeight: 500, transition: "all 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.background = "rgba(201,168,76,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(232,230,224,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                <span style={{ fontSize: "0.9rem" }}>{t.icon}</span>{t.name}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── RESULTS ────────────────────────────────────────────────────────────────

function CounterStat({ stat }) {
  const [ref, visible] = useInView(0.3);
  const isFloat = stat.display.includes(".");
  const target = isFloat ? parseFloat(stat.display) : parseInt(stat.display.replace(/[^0-9]/g, ""));
  const count = useCounter(target, 2200, visible, isFloat);

  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 20, padding: "2rem 2rem", textAlign: "center", position: "relative", overflow: "hidden",
      transition: "all 0.3s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${stat.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${stat.color},transparent)` }} />
      <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: stat.color, lineHeight: 1, marginBottom: "0.4rem" }}>
        {stat.display.includes("K") ? `${count > 1000 ? Math.floor(count / 1000) : count}K` : stat.display.includes("%") ? `${count}%` : count}
      </div>
      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#e8e6e0", marginBottom: "0.3rem" }}>{stat.label}</div>
      <div style={{ fontSize: "0.68rem", color: "rgba(232,230,224,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.client}</div>
    </div>
  );
}

function Results() {
  return (
    <section id="results" style={{ padding: "7rem 5rem", background: "rgba(255,255,255,0.015)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />Google Search Console
          </div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#e8e6e0" }}>
            Real Results,<br /><span style={{ color: "#C9A84C" }}>Real Data</span>
          </h2>
          <p style={{ color: "rgba(232,230,224,0.45)", fontSize: "0.9rem", marginTop: "1rem", maxWidth: 500 }}>3-month performance snapshot from Google Search Console across client portfolios</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem", marginBottom: "3rem" }}>
          {STATS.map(s => <CounterStat key={s.label} stat={s} />)}
        </div>

        {/* additional clients bar */}
        <Reveal delay={200}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {[
              { client: "RA Solution", clicks: "103K", impressions: "2.18M", ctr: "4.7%", pos: "8", color: "#7ECBC5" },
              { client: "Riddhi Saboo", clicks: "190", impressions: "2.32K", ctr: "8.2%", pos: "9.2", color: "#E07B8F" },
            ].map(c => (
              <div key={c.client} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 16, padding: "1.4rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${c.color},transparent)` }} />
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: c.color, marginBottom: "1rem", fontSize: "0.95rem" }}>{c.client}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  {[["Clicks", c.clicks], ["Impressions", c.impressions], ["CTR", c.ctr], ["Avg Position", c.pos]].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e8e6e0", fontFamily: "'Poppins',sans-serif" }}>{v}</div>
                      <div style={{ fontSize: "0.68rem", color: "rgba(232,230,224,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Industries */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.4rem" }}>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: "#9B8FD4", marginBottom: "1rem", fontSize: "0.95rem" }}>Industries Served</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {INDUSTRIES.map(ind => (
                  <span key={ind} style={{ padding: "0.22rem 0.7rem", background: "rgba(155,143,212,0.08)", border: "1px solid rgba(155,143,212,0.2)", borderRadius: 100, fontSize: "0.7rem", color: "rgba(232,230,224,0.6)" }}>{ind}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ────────────────────────────────────────────────────────────

function Cases() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section id="cases" style={{ padding: "7rem 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />Case Studies
          </div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#e8e6e0" }}>
            Work That <span style={{ color: "#C9A84C" }}>Speaks</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem" }}>
          {/* sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {CASES.map((cs, i) => (
              <button key={cs.id} data-magnetic onClick={() => setActive(i)} style={{
                textAlign: "left", padding: "1.1rem 1.4rem", borderRadius: 14,
                background: active === i ? `${cs.color}10` : "rgba(255,255,255,0.03)",
                border: `1px solid ${active === i ? cs.color + "50" : "rgba(255,255,255,0.06)"}`,
                cursor: "none", transition: "all 0.3s",
              }}>
                <div style={{ fontSize: "0.65rem", color: active === i ? cs.color : "rgba(232,230,224,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>{cs.id} — {cs.industry}</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: active === i ? "#e8e6e0" : "rgba(232,230,224,0.5)" }}>{cs.title}</div>
              </button>
            ))}
          </div>

          {/* detail panel */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 20, padding: "2.5rem", position: "relative", overflow: "hidden", transition: "all 0.4s" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${c.color},transparent)`, transition: "all 0.4s" }} />
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: c.color, fontWeight: 600, marginBottom: "0.5rem" }}>{c.id} — {c.industry}</div>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#e8e6e0", marginBottom: "1.2rem" }}>{c.title}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.8rem" }}>
              {c.stats.map(s => (
                <div key={s.label} style={{ background: `${c.color}08`, border: `1px solid ${c.color}20`, borderRadius: 12, padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: c.color }}>{s.val}</div>
                  <div style={{ fontSize: "0.68rem", color: "rgba(232,230,224,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(232,230,224,0.55)", lineHeight: 1.8, fontSize: "0.9rem", marginBottom: "1.5rem" }}>{c.desc}</p>
            <div>
              <div style={{ fontSize: "0.72rem", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.8rem", fontWeight: 600 }}>Keywords Targeted</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {c.keywords.map(kw => (
                  <span key={kw} style={{ padding: "0.3rem 0.9rem", background: `${c.color}0a`, border: `1px solid ${c.color}25`, borderRadius: 100, fontSize: "0.75rem", color: "rgba(232,230,224,0.65)" }}>{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  const responsibilities = [
    "SEO keyword research and content keyword planning",
    "On-page SEO: meta titles, descriptions, headings and page content",
    "Off-page SEO: bookmarking, directory, classified and article submissions",
    "Google Business Profile optimization and GMB post publishing",
    "Monthly content calendars for client social media pages",
    "Instagram, Facebook and YouTube posting support",
  ];

  const approach = [
    { icon: "🔍", step: "Research", desc: "Business, competitors and target keywords" },
    { icon: "⚙️", step: "Optimize", desc: "Website pages, meta tags and content structure" },
    { icon: "🔗", step: "Build", desc: "Backlinks through safe off-page SEO activities" },
    { icon: "📍", step: "Manage", desc: "Google Business Profile posts and local details" },
    { icon: "📊", step: "Track", desc: "Results using Search Console, GMB insights and sheets" },
  ];

  return (
    <section id="experience" style={{ padding: "7rem 5rem", background: "rgba(255,255,255,0.015)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />Experience
          </div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#e8e6e0" }}>
            Work <span style={{ color: "#C9A84C" }}>Experience</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <Reveal>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 20, padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#C9A84C,rgba(201,168,76,0.1))" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#e8e6e0", marginBottom: "0.2rem" }}>Adborn Solutions</div>
                  <div style={{ color: "#C9A84C", fontSize: "0.85rem", fontWeight: 600 }}>SEO Executive & Digital Marketer Intern</div>
                </div>
                <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 100, padding: "0.3rem 0.9rem", fontSize: "0.72rem", color: "#C9A84C", fontWeight: 600, whiteSpace: "nowrap" }}>6 Months</div>
              </div>
              <div style={{ fontSize: "0.72rem", color: "rgba(232,230,224,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                <a href="https://adbornsolutions.com" style={{ color: "rgba(201,168,76,0.5)", textDecoration: "none" }}>adbornsolutions.com</a>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {responsibilities.map((r, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start", fontSize: "0.85rem", color: "rgba(232,230,224,0.55)", lineHeight: 1.6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", display: "inline-block", flexShrink: 0, marginTop: "0.55em" }} />
                    {r}
                  </li>
                ))}
              </ul>
              {/* clients marquee */}
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                <div style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.8rem", fontWeight: 600 }}>Clients Worked With</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {CLIENTS.map(cl => (
                    <span key={cl} style={{ padding: "0.22rem 0.7rem", background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 100, fontSize: "0.68rem", color: "rgba(232,230,224,0.5)" }}>{cl}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#e8e6e0", marginBottom: "1.5rem" }}>My SEO Work Approach</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {approach.map((a, i) => (
                  <div key={a.step} style={{
                    display: "flex", gap: "1.2rem", alignItems: "flex-start",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 14, padding: "1.1rem 1.4rem", transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; e.currentTarget.style.transform = "translateX(6px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{a.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "#C9A84C", marginBottom: "0.2rem" }}>
                        <span style={{ color: "rgba(201,168,76,0.4)", marginRight: "0.4rem" }}>0{i + 1}</span>{a.step}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "rgba(232,230,224,0.45)", lineHeight: 1.5 }}>{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "2rem", background: "rgba(126,203,197,0.06)", border: "1px solid rgba(126,203,197,0.15)", borderRadius: 14, padding: "1.4rem 1.6rem" }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#7ECBC5", marginBottom: "0.6rem" }}>💡 My Strength</div>
                <div style={{ fontSize: "0.84rem", color: "rgba(232,230,224,0.55)", lineHeight: 1.7 }}>I understand both <strong style={{ color: "#e8e6e0" }}>SEO execution and digital content planning</strong>, so I can support businesses with organic search, local visibility, and consistent digital presence.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────

function Education() {
  const EDU = [
    {
      level: "Graduation",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "G.H. Raisoni College of Engineering & Management",
      location: "Nagpur, India",
      year: "2023 – Present",
      score: "9.02",
      scoreLabel: "CGPA",
      icon: "🎓",
      color: "#C9A84C",
      highlight: true,
    },
    {
      level: "Higher Secondary",
      degree: "12th Standard (HSC)",
      institution: "Mahatma Gandhi High School",
      location: "Nagpur, India",
      year: "2022 – 2023",
      score: "57%",
      scoreLabel: "Percentage",
      icon: "📘",
      color: "#7ECBC5",
      highlight: false,
    },
    {
      level: "Secondary",
      degree: "10th Standard (SSC)",
      institution: "Mahatma Gandhi High School",
      location: "Nagpur, India",
      year: "2020 – 2021",
      score: "87%",
      scoreLabel: "Percentage",
      icon: "📗",
      color: "#9B8FD4",
      highlight: false,
    },
  ];

  return (
    <section id="education" style={{ padding: "7rem 5rem", background: "rgba(255,255,255,0.015)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <Reveal style={{ marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />Academics
          </div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#e8e6e0" }}>
            Educational <span style={{ color: "#C9A84C" }}>Background</span>
          </h2>
        </Reveal>

        {/* Timeline layout */}
        <div style={{ position: "relative" }}>
          {/* vertical line */}
          <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,#C9A84C,rgba(126,203,197,0.5),rgba(155,143,212,0.2))", zIndex: 0 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {EDU.map((e, i) => (
              <Reveal key={e.degree} delay={i * 130}>
                <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", position: "relative" }}>
                  {/* dot */}
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${e.color}14`, border: `2px solid ${e.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0, position: "relative", zIndex: 1, boxShadow: `0 0 20px ${e.color}20` }}>
                    {e.icon}
                  </div>

                  {/* card */}
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: `1px solid ${e.highlight ? e.color + "35" : "rgba(255,255,255,0.07)"}`, borderRadius: 20, padding: "1.8rem 2rem", position: "relative", overflow: "hidden", transition: "all 0.3s" }}
                    onMouseEnter={ev => { ev.currentTarget.style.borderColor = `${e.color}55`; ev.currentTarget.style.transform = "translateX(6px)"; ev.currentTarget.style.boxShadow = `0 8px 32px ${e.color}10`; }}
                    onMouseLeave={ev => { ev.currentTarget.style.borderColor = e.highlight ? `${e.color}35` : "rgba(255,255,255,0.07)"; ev.currentTarget.style.transform = ""; ev.currentTarget.style.boxShadow = ""; }}>

                    {/* top accent line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${e.color},transparent)` }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                      <div style={{ flex: 1 }}>
                        {/* level badge */}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: `${e.color}10`, border: `1px solid ${e.color}25`, borderRadius: 100, padding: "0.22rem 0.8rem", fontSize: "0.68rem", color: e.color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.7rem" }}>
                          {e.level}
                        </div>
                        <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#e8e6e0", marginBottom: "0.3rem" }}>{e.degree}</div>
                        <div style={{ fontWeight: 600, fontSize: "0.88rem", color: e.color, marginBottom: "0.2rem" }}>{e.institution}</div>
                        <div style={{ fontSize: "0.78rem", color: "rgba(232,230,224,0.35)", display: "flex", gap: "1rem" }}>
                          <span>📍 {e.location}</span>
                          <span>🗓 {e.year}</span>
                        </div>
                      </div>

                      {/* score badge */}
                      <div style={{ background: `${e.color}0e`, border: `1px solid ${e.color}30`, borderRadius: 16, padding: "1rem 1.4rem", textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: e.color, lineHeight: 1 }}>{e.score}</div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(232,230,224,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.3rem" }}>{e.scoreLabel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const links = [
    { label: "snehalasole2005@gmail.com", href: "mailto:snehalasole2005@gmail.com", icon: "✉️", color: "#C9A84C" },
    { label: "7757804127", href: "tel:7757804127", icon: "📞", color: "#7ECBC5" },
    { label: "Adborn Solutions", href: "https://adbornsolutions.com", icon: "🌐", color: "#E07B8F" },
  ];

  return (
    <section id="contact" style={{ padding: "7rem 5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
            <span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />Contact<span style={{ width: 32, height: 1, background: "#C9A84C", display: "inline-block" }} />
          </div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2rem,4.5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "1.5rem", color: "#e8e6e0" }}>
            Let's Grow Your<br /><span style={{ color: "#C9A84C" }}>Search Presence</span>
          </h2>
          <p style={{ color: "rgba(232,230,224,0.45)", lineHeight: 1.8, fontSize: "0.94rem" }}>
            Open to SEO, Local SEO, Digital Marketing and Content Marketing opportunities. Let's talk about how I can help your business rank and grow.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "3rem", alignItems: "center" }}>
            {links.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-magnetic
                style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "1.1rem 2.2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100, textDecoration: "none", color: "#e8e6e0", fontSize: "0.9rem", fontWeight: 500, transition: "all 0.3s", cursor: "none", minWidth: 320, justifyContent: "center" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${l.color}60`; e.currentTarget.style.color = l.color; e.currentTarget.style.background = `${l.color}08`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 10px 30px ${l.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#e8e6e0"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <span>{l.icon}</span>{l.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(201,168,76,0.1)", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.6rem" }}>
            {["SEO", "Local SEO", "GMB Optimization", "Content Marketing", "Backlink Building", "Keyword Research"].map(tag => (
              <span key={tag} style={{ padding: "0.3rem 0.9rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 100, fontSize: "0.75rem", color: "rgba(201,168,76,0.7)" }}>{tag}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function SnehalPortfolio() {
  return (
    <div style={{
      background: "#060812", color: "#e8e6e0",
      fontFamily: "'Poppins',sans-serif", minHeight: "100vh",
      overflowX: "hidden", cursor: "none",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#C9A84C;border-radius:4px}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}
        @keyframes spinRing{to{transform:translateY(-50%) rotate(360deg)}}
        @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes floatBadge2{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      `}</style>

      <MagneticCursor />
      <Particles />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Results />
      <Cases />
      <Experience />
      <Education />
      <Contact />

      <footer style={{ padding: "2rem 5rem", borderTop: "1px solid rgba(201,168,76,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(232,230,224,0.25)", fontSize: "0.78rem", position: "relative", zIndex: 2 }}>
        <span>© 2025 Snehal S. Asole. All rights reserved.</span>
        <span>SEO Executive & Digital Marketer · Nagpur</span>
      </footer>
    </div>
  );
}
