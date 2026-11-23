import { useState } from "react";

import { TileLayer } from "react-leaflet";
type CustomTileLayerProps = {
  url: string;
  fallbackUrl: string;
  retryCount?: number;
  retryDelay?: number;
} & React.ComponentProps<typeof TileLayer>;
const CustomTileLayer = ({
  url,
  fallbackUrl,
  retryCount = 3,
  retryDelay = 1600,
  ...props
}: CustomTileLayerProps) => {
  const [attempt, setAttempt] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(url);

  const handleError = () => {
    if (attempt < retryCount) {
      setTimeout(() => {
        setAttempt((prev) => prev + 1);
        setCurrentUrl(url); // Retry with the same URL
      }, retryDelay);
    } else if (fallbackUrl) {
      setCurrentUrl(fallbackUrl); // Switch to fallback URL after retries
    }
  };

  return (
    <TileLayer url={currentUrl} eventHandlers={{ tileerror: handleError }} {...props} />
  );
};

export default CustomTileLayer;
