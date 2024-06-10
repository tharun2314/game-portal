import React, { useEffect, useNavigate } from "react";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div>
      <h1>404: Page Not Found</h1>
      <p>The page you requested could not be found.</p>
      <p>Redirecting to Home page in 3 seconds...</p>
    </div>
  );
}

export default NotFound;
