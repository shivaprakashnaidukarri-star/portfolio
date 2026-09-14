import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { profile } from "./data/profile";
import ParticleBackground from "./components/ParticleBackground";
import "./App.css";

/* -------------------- Icons (inline SVG, no extra deps) -------------------- */

function GitHubIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* -------------------- Navbar -------------------- */

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#interests", label: "Interests" },
  { href: "#contact", label: "Say Hi" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(e, href) {
    e.preventDefault();
    setOpen(false);

    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const navbarClassName = scrolled
    ? "navbar navbar--scrolled"
    : "navbar";

  return (
    <header className={navbarClassName}>
      <div className="navbar__inner">
        <a
          href="#home"
          className="navbar__brand"
          onClick={(e) => handleClick(e, "#home")}
        >
          KSP<span className="navbar__brand-dot">.</span>
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            return (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* -------------------- Hero -------------------- */

function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },

    show: {
      opacity: 1,

      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 18,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  function scrollTo(href) {
    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true"></div>

      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="hero__eyebrow">
          {profile.tagline}
        </motion.p>

        <motion.h1 variants={item} className="hero__title">
          <span>Hi, I'm </span>
          <span className="hero__title-accent">
            {profile.firstName}
          </span>
          <span>.</span>
        </motion.h1>

        <motion.p variants={item} className="hero__description">
          {profile.shortDescription}
        </motion.p>

        <motion.div variants={item} className="hero__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => scrollTo("#projects")}
          >
            View My Work
          </button>

          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => scrollTo("#contact")}
          >
            Say Hi
          </button>
        </motion.div>

        <motion.div variants={item} className="hero__socials">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="hero__social-link"
          >
            <GitHubIcon />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="hero__social-link"
          >
            <LinkedInIcon />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------- Shared: reveal-on-scroll wrapper -------------------- */

function Reveal(props) {
  const { children, delay, className } = props;

  const reduceMotion = useReducedMotion();

  const effectiveDelay = delay === undefined ? 0 : delay;

  const effectiveClassName =
    className === undefined ? "" : className;

  return (
    <motion.div
      className={effectiveClassName}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: effectiveDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------- About -------------------- */

function About() {
  const { about } = profile;

  return (
    <section id="about" className="section">
      <div className="section__inner about-layout">

        <div className="about-heading">
          <Reveal>
            <p className="section__eyebrow">
              About Me
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="section__title">
              Building with curiosity.
            </h2>
          </Reveal>
        </div>

        <div className="about-content">
          {about.map((paragraph, index) => (
            <Reveal key={index} delay={0.1 + index * 0.08}>
              <p className="about-text">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* -------------------- Skills -------------------- */

function SkillBadge(props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="skill-badge"
      whileHover={
        reduceMotion
          ? {}
          : {
              y: -3,
              borderColor: "var(--accent)",
            }
      }
      transition={{
        duration: 0.18,
      }}
    >
      {props.label}
    </motion.span>
  );
}

function SkillGroup(props) {
  return (
    <Reveal
      delay={props.delay}
      className="skill-group"
    >
      <h3 className="skill-group__title">
        {props.title}
      </h3>

      <div className="skill-group__badges">
        {props.items.map((item) => {
          return (
            <SkillBadge
              key={item}
              label={item}
            />
          );
        })}
      </div>
    </Reveal>
  );
}

function Skills() {
  const skills = profile.skills;

  return (
    <section
      id="skills"
      className="section section--alt"
    >
      <div className="section__inner">

        <Reveal>
          <p className="section__eyebrow">
            Technical Expertise
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section__title">
            What I work with.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="skills-intro">
            My technical focus spans artificial intelligence,
            full-stack development, data structures and
            algorithms, and data science.
          </p>
        </Reveal>

        <div className="skills-grid">

          <SkillGroup
            title="AI / Machine Learning"
            items={skills.aiMl}
            delay={0.05}
          />

          <SkillGroup
            title="Full-Stack Development"
            items={skills.fullStack}
            delay={0.1}
          />

          <SkillGroup
            title="Data Structures & Algorithms"
            items={skills.dsa}
            delay={0.15}
          />

          <SkillGroup
            title="Data Science"
            items={skills.dataScience}
            delay={0.2}
          />

        </div>
      </div>
    </section>
  );
}

/* -------------------- Experience -------------------- */

function Experience() {
  const { experience } = profile;

  return (
    <section id="experience" className="section section--alt">
      <div className="section__inner">

        <Reveal>
          <p className="section__eyebrow">
            Experience
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section__title">
            Where I got to build.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="experience-card">

            <div className="experience-card__top">
              <div>
                <p className="experience-card__label">
                  Summer Internship Programme
                </p>

                <h3 className="experience-card__title">
                  {experience.programme}
                </h3>

                <p className="experience-card__organization">
                  {experience.organization}
                </p>

                <p className="experience-card__institute">
                  {experience.institute}
                </p>
              </div>

              <span className="experience-card__duration">
                {experience.duration}
              </span>
            </div>

            <div className="experience-card__divider" />

            <div className="experience-card__project">
              <p className="experience-card__label">
                Featured Project
              </p>

              <h4>
                {experience.project}
              </h4>

              <p>
                {experience.description}
              </p>

              <p className="experience-card__mentor">
                Mentor — {experience.mentor}
              </p>
            </div>

            <div className="experience-topics">
              {experience.topics.map((topic) => (
                <span key={topic}>
                  {topic}
                </span>
              ))}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* -------------------- Projects -------------------- */

function ProjectLinks(props) {
  const project = props.project;

  let codeLink;

  if (project.githubUrl) {
    codeLink = (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="project-card__link"
      >
        <GitHubIcon /> Code
      </a>
    );
  } else {
    codeLink = (
      <span className="project-card__link project-card__link--disabled">
        <GitHubIcon /> Coming Soon
      </span>
    );
  }

  let demoLink;

  if (project.liveUrl) {
    demoLink = (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="project-card__link"
      >
        Live Demo
      </a>
    );
  } else {
    demoLink = (
      <span className="project-card__link project-card__link--disabled">
        Coming Soon
      </span>
    );
  }

  return (
    <div className="project-card__links">
      {codeLink}
      {demoLink}
    </div>
  );
}

function ProjectCard({ project }) {
  const isFeatured = project.status === "Featured";

  return (
    <motion.article
      className={`project-card ${
        isFeatured ? "project-card--featured" : ""
      }`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >

      {isFeatured && (
        <div className="project-card__visual">

          <div className="project-card__visual-grid" />

          <div className="project-card__visual-orbit orbit--one" />
          <div className="project-card__visual-orbit orbit--two" />

          <div className="project-card__visual-core">
            <span>AI</span>
          </div>

          <div className="project-card__visual-label">
            COMPUTER VISION
          </div>

          <div className="project-card__visual-number">
            01
          </div>

        </div>
      )}

      <div className="project-card__body">

        <div className="project-card__meta">
          <span className="project-card__category">
            {project.category}
          </span>

          <span className="project-card__status">
            {project.status}
          </span>
        </div>

        <h3 className="project-card__title">
          {project.title}
        </h3>

        <p className="project-card__description">
          {project.description}
        </p>

        <div className="project-card__technologies">
          {project.technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        <div className="project-card__footer">
          <ProjectLinks project={project} />

          {isFeatured && (
            <span className="project-card__featured-label">
              Featured Project
            </span>
          )}
        </div>

      </div>

    </motion.article>
  );
}


function Projects() {
  return (
    <section id="projects" className="section section--alt">
      <div className="section__inner">

        <Reveal>
          <p className="section__eyebrow">
            Projects
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section__title">
            Projects that turn ideas
            <br />
            into systems.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="projects-intro">
            A selection of work across machine learning,
            computer vision, data science, and software
            development.
          </p>
        </Reveal>

        <div className="projects-grid">

          {profile.projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={0.12 + index * 0.06}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}

        </div>

      </div>
    </section>
  );
}

/* -------------------- Education -------------------- */

function Education() {
  const { education } = profile;

  return (
    <section id="education" className="section">
      <div className="section__inner">

        <Reveal>
          <p className="section__eyebrow">
            Education
          </p>
        </Reveal>

        <Reveal delay={0.05}>
  <h2 className="section__title">
    My academic journey.
  </h2>
</Reveal>

<Reveal delay={0.1}>
  <p className="education-description">
    A journey from school to university, shaped by curiosity,
    consistency, and a passion for building things.
  </p>
</Reveal>

        <div className="education-timeline">
          {education.map((item, index) => (
            <Reveal
              key={item.year}
              delay={0.1 + index * 0.1}
            >
              <div className="education-timeline__item">

                <div className="education-timeline__year">
                  {item.year}
                </div>

                <div className="education-timeline__marker">
                  <span />
                </div>

                <div className="education-timeline__content">
                  <div className="education-timeline__top">
                    <h3>{item.title}</h3>

                    <span className="education-timeline__score">
                      {item.score}
                    </span>
                  </div>

                  <p>{item.institute}</p>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* -------------------- Interests -------------------- */

function Interests() {
  const { interestCards } = profile;

  return (
    <section id="interests" className="section section--alt">
      <div className="section__inner">

        <Reveal>
          <p className="section__eyebrow">
            Interests
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section__title">
            Beyond the screen.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="interests-intro">
            A few things that keep me curious, creative,
            and balanced outside of everyday work.
          </p>
        </Reveal>

        <div className="interests-grid">
          {interestCards.map((interest, index) => (
            <Reveal
              key={interest.title}
              delay={0.12 + index * 0.08}
            >
              <div className="interest-card">

                <div className="interest-card__number">
                  0{index + 1}
                </div>

                <div className="interest-card__content">
                  <h3>{interest.title}</h3>

                  <p>
                    {interest.description}
                  </p>
                </div>

                <div className="interest-card__arrow">
                  ↗
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
/* -------------------- Contact -------------------- */

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setForm((f) => {
      const next = Object.assign({}, f);
      next[name] = value;
      return next;
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  setStatus("submitting");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message.");
    }

    setStatus("sent");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    setStatus("error");
  }
}

  const mailHref = "mailto:" + profile.email;
  const telHref = "tel:+91" + profile.phone;

  return (
    <section
      id="contact"
      className="section"
    >
      <div className="section__inner">
        <Reveal>
          <p className="section__eyebrow">
            Say Hi
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section__title">
            Let's talk.
          </h2>
        </Reveal>

        <div className="contact-grid">
          <Reveal
            delay={0.1}
            className="contact-form-wrapper"
          >
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-row">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="form-row">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Sending..."
                  : "Send Message"}
              </button>

             {status === "sent" ? (
  <p
    className="form-note"
    role="status"
  >
    Message sent successfully! 🚀
  </p>
) : null}

{status === "error" ? (
  <p
    className="form-note"
    role="alert"
  >
    Something went wrong. Please try again.
  </p>
) : null}
            </form>
          </Reveal>

          <Reveal
            delay={0.15}
            className="contact-alt"
          >
            <h3 className="contact-alt__title">
              Or reach me directly
            </h3>

            <a
              href={mailHref}
              className="contact-alt__link"
            >
              <MailIcon /> {profile.email}
            </a>

            <a
              href={telHref}
              className="contact-alt__link"
            >
              <PhoneIcon /> +91 {profile.phone}
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="contact-alt__link"
            >
              <GitHubIcon /> GitHub
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="contact-alt__link"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">

        <div className="site-footer__left">
          <span className="site-footer__logo">KSP.</span>

          <span className="site-footer__copyright">
            © {new Date().getFullYear()} Shiva Prakash
          </span>
        </div>

        <nav className="site-footer__links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          href="#top"
          className="site-footer__top"
        >
          Back to top ↑
        </a>

      </div>
    </footer>
  );
}

/* -------------------- App -------------------- */

export default function App() {
  return (
    <div className="app">
      <ParticleBackground />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Interests />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}