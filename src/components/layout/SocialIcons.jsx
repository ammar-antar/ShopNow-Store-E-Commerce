const ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M13.5 21v-7h2.5l.5-3h-3V9c0-.9.2-1.5 1.5-1.5H17V5c-.3 0-1.3-.1-2.5-.1-2.5 0-4 1.5-4 4.1V11H8v3h2.5v7h3z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  ),
};

const SOCIALS = [
  { key: "instagram", label: "Instagram", href: "https://instagram.com" },
  { key: "facebook",  label: "Facebook",  href: "https://facebook.com" },
  { key: "twitter",   label: "Twitter",   href: "https://twitter.com" },
  { key: "linkedin",  label: "LinkedIn",  href: "https://linkedin.com" },
];

export default function SocialIcons() {
  return (
    <div className="mt-6 flex items-center gap-4 sm:gap-5">
      {SOCIALS.map(({ key, label, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="text-background/70 transition-colors hover:text-background"
        >
          {ICONS[key]}
        </a>
      ))}
    </div>
  );
}