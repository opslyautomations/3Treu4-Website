type P = { size?: number };

export const IgIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const ScIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M1 14.5c0-.3.2-.5.4-.5s.4.2.4.5l.3 2-.3 2c0 .3-.2.5-.4.5s-.4-.2-.4-.5l-.2-2 .2-2zm2.2-1.3c.3 0 .5.2.5.5l.3 3.3-.3 3.2c0 .3-.2.5-.5.5-.2 0-.4-.2-.5-.5L2.5 17l.2-3.3c.1-.3.3-.5.5-.5zm2.4-.8c.3 0 .6.3.6.6l.3 4-.3 3.9c0 .3-.3.6-.6.6s-.6-.3-.6-.6L4.8 17l.2-4c0-.3.3-.6.6-.6zm2.4-.3c.4 0 .7.3.7.7l.2 4.2-.2 4c0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7L7.2 17l.2-4.2c0-.4.3-.7.6-.7zm2.5-1.6c.4 0 .8.4.8.8l.2 5.7-.2 4.1c0 .5-.4.8-.8.8s-.8-.4-.8-.8l-.2-4.1.2-5.7c0-.4.4-.8.8-.8zm2.8-1.5c.2-.1.4-.1.6-.1 3.4 0 6.1 2.3 6.5 5.4.4-.2.9-.3 1.4-.3 2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6h-8.4c-.4 0-.7-.4-.7-.8V9.8c0-.3.2-.6.6-.8z" />
  </svg>
);

export const TtIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7l-.8-.1a5.7 5.7 0 1 0 5.7 5.7V9a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z" />
  </svg>
);

export const MailIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const PlayIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
);

export const PauseIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4.5" width="4" height="15" rx="1" />
    <rect x="14" y="4.5" width="4" height="15" rx="1" />
  </svg>
);
