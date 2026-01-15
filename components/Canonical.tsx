// filepath: components/Canonical.tsx
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function Canonical() {
  const location = useLocation();

  return (
    <Helmet>
      <link
        rel="canonical"
        href={`https://www.bhaktivandan.com${location.pathname}`}
      />
    </Helmet>
  );
}