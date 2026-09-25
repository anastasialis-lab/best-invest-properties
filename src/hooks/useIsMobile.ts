import { useEffect, useState } from 'react';

// The prototype branches its layout on a single `mobile` flag rather than CSS
// breakpoints, and the two layouts differ structurally (not just in spacing),
// so the port keeps that shape and drives the flag from a media query.
const QUERY = '(max-width: 760px)';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
