import { Link } from "react-router-dom";
import Container from "@/components/Container.jsx";
import useCategories from "@/hooks/useCategories.js";
import SocialIcons from "./SocialIcons.jsx";

const HELP_LINKS = [
  { label: "Contact Us", to: "/help" },
  { label: "FAQ", to: "/help" },
  { label: "Shipping", to: "/help" },
  { label: "Returns", to: "/help" },
];

const ABOUT_LINKS = [
  { label: "Our Story", to: "/help" },
  { label: "Catalog", to: "/products" },
  { label: "Careers", to: "/help" },
  { label: "Press", to: "/help" },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", to: "/help" },
  { label: "Privacy Policy", to: "/help" },
  {
    label: "Powered by DummyJSON",
    to: "https://dummyjson.com/",
    external: true,
  },
];

export default function Footer() {
  const { categories } = useCategories();
  const shopLinks = categories.filter((c) => c.slug !== "all").slice(0, 4);

  return (
    <footer className="relative bg-foreground text-background mt-12">
      {/* Wave */}
      <div className="hidden lg:absolute -top-10 left-0 right-0 sm:-top-14">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="block h-10 w-full sm:h-14"
        >
          <path
            d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z"
            fill="var(--foreground)"
          />
        </svg>
      </div>

      <Container>
        <div className="pb-8 pt-12 sm:pt-16 lg:pt-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <FooterColumn title="Shop" className="lg:col-span-2">
              {shopLinks.map((c) => (
                <FooterLink key={c.slug} to={`/products?category=${c.slug}`}>
                  {c.name}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Help" className="lg:col-span-2">
              {HELP_LINKS.map((l) => (
                <FooterLink key={l.label} to={l.to}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="About" className="lg:col-span-2">
              {ABOUT_LINKS.map((l) => (
                <FooterLink key={l.label} to={l.to}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>

            {/* Newsletter */}
            <div className="col-span-2 lg:col-span-6 lg:pl-8">
              <h3 className="text-base font-bold text-background sm:text-lg">
                Sign up to get 10% off your first order
              </h3>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Your Email Address"
                  aria-label="Email"
                  className="h-12 flex-1 rounded-full border border-transparent bg-card p-3 text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 cursor-pointer rounded-full bg-brand px-7 text-sm font-bold text-primary-foreground transition-colors hover:bg-brand-hover"
                >
                  Subscribe
                </button>
              </form>

              <SocialIcons />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-background/10 pt-6 text-center sm:flex-row sm:justify-between sm:text-start">
            <p className="text-xs text-background/70 sm:text-sm">
              © {new Date().getFullYear()} ShopNow, Inc. All Rights Reserved
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.to}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-background/70 transition-colors hover:text-background sm:text-sm"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-xs text-background/70 transition-colors hover:text-background sm:text-sm"
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children, className = "" }) {
  return (
    <div className={className}>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-background">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-background/70 transition-colors hover:text-background"
      >
        {children}
      </Link>
    </li>
  );
}
