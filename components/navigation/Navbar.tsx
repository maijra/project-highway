"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type NavItem = {
  label: string;
  href: string;
  sectionId: string;
};

export default function Navbar() {
  const navItems = useMemo<NavItem[]>(
    () => [
      {
        label: "Home",
        href: "#home",
        sectionId: "home",
      },
      {
        label: "Leadership",
        href: "#leadership",
        sectionId: "leadership",
      },
      {
        label: "About",
        href: "#about",
        sectionId: "about",
      },
      {
        label: "Events",
        href: "#events",
        sectionId: "events",
      },
      {
        label: "Watch Live",
        href: "#live",
        sectionId: "live",
      },
      {
        label: "Prayer",
        href: "#prayer",
        sectionId: "prayer",
      },
      {
        label: "Testimonies",
        href: "#testimonials",
        sectionId: "testimonials",
      },
    ],
    []
  );

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [scrolled, setScrolled] =
    useState(false);

  const [showNavbar, setShowNavbar] =
    useState(false);

  useEffect(() => {
    let frame = 0;
    let visibilityTimer = 0;

    const updateNavbarState = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);

        const welcome =
          document.querySelector(
            ".journey-welcome-copy"
          ) as HTMLElement | null;

        const journey =
          document.getElementById("home");

        if (welcome) {
          const welcomeOpacity =
            Number.parseFloat(
              window
                .getComputedStyle(welcome)
                .opacity || "0"
            );

          const journeyHeight =
            journey?.offsetHeight ??
            window.innerHeight;

          const journeyWasManuallyPassed =
            window.scrollY >
            Math.max(
              window.innerHeight * 0.72,
              journeyHeight * 0.72
            );

          setShowNavbar(
            welcomeOpacity > 0.18 ||
              journeyWasManuallyPassed
          );
        } else {
          setShowNavbar(
            window.scrollY >
              window.innerHeight * 0.75
          );
        }
      });
    };

    updateNavbarState();

    visibilityTimer = window.setInterval(
      updateNavbarState,
      180
    );

    window.addEventListener(
      "scroll",
      updateNavbarState,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateNavbarState
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateNavbarState
      );

      window.removeEventListener(
        "resize",
        updateNavbarState
      );

      window.clearInterval(visibilityTimer);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) =>
        document.getElementById(
          item.sectionId
        )
      )
      .filter(
        (
          section
        ): section is HTMLElement =>
          Boolean(section)
      );

    if (!sections.length) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );

          if (visible[0]) {
            setActiveSection(
              visible[0].target.id
            );
          }
        },
        {
          root: null,
          rootMargin:
            "-30% 0px -55% 0px",
          threshold: [
            0.01,
            0.1,
            0.25,
            0.5,
          ],
        }
      );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () =>
      observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      closeOnEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        closeOnEscape
      );
  }, [menuOpen]);

  const handleLinkClick = (
    event:
      React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    if (href === "#home") {
      window.dispatchEvent(
        new Event(
          "project-highway:go-to-welcome"
        )
      );

      setActiveSection("home");
      setMenuOpen(false);
      return;
    }

    const targetId =
      href.replace("#", "");

    const target =
      document.getElementById(targetId);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  return (
    <header
      className={[
        "site-navbar",
        showNavbar
          ? "site-navbar-visible"
          : "site-navbar-hidden",
        scrolled
          ? "site-navbar-scrolled"
          : "",
        menuOpen
          ? "site-navbar-menu-open"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Main site navigation"
    >
      <div className="site-navbar-shell">
        <a
          className="site-navbar-brand"
          href="#home"
          onClick={(event) =>
            handleLinkClick(
              event,
              "#home"
            )
          }
          aria-label="Isaiah 35:8 Ministries home"
        >
          <span
            className="site-navbar-brand-mark"
            aria-hidden="true"
          >
            ✦
          </span>

          <span className="site-navbar-brand-copy">
            <span className="site-navbar-brand-name">
              Isaiah 35:8
            </span>

            <span className="site-navbar-brand-subtitle">
              Ministries
            </span>
          </span>
        </a>

        <nav
          className="site-navbar-desktop"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const isLive =
              item.sectionId === "live";

            const isActive =
              activeSection ===
              item.sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) =>
                  handleLinkClick(
                    event,
                    item.href
                  )
                }
                className={[
                  "site-navbar-link",
                  isActive
                    ? "site-navbar-link-active"
                    : "",
                  isLive
                    ? "site-navbar-live-link"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="site-navbar-menu-button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="site-mobile-navigation"
          onClick={() =>
            setMenuOpen(
              (current) => !current
            )
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="site-mobile-navigation"
        className="site-navbar-mobile"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => {
          const isLive =
            item.sectionId === "live";

          const isActive =
            activeSection ===
            item.sectionId;

          return (
            <a
              key={`mobile-${item.href}`}
              href={item.href}
              onClick={(event) =>
                handleLinkClick(
                  event,
                  item.href
                )
              }
              className={[
                "site-navbar-mobile-link",
                isActive
                  ? "site-navbar-mobile-link-active"
                  : "",
                isLive
                  ? "site-navbar-mobile-live-link"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={
                isActive
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}