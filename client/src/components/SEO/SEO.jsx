import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Podcast Management Tool",
  description = "Manage and repurpose your podcast content with Ques.AI",
  keywords = [
    "podcast",
    "content management",
    "repurpose",
    "AI",
    "transcription",
  ],
  canonical,
}) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Access window object safely after component mounts
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const canonicalUrl = canonical || currentUrl;
  const defaultTitle = "Ques.AI";
  const fullTitle =
    title !== defaultTitle ? `${title} | ${defaultTitle}` : defaultTitle;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} />
      <meta name="twitter:title" content={fullTitle} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta
        name="keywords"
        content={Array.isArray(keywords) ? keywords.join(", ") : keywords}
      />

      {canonicalUrl && (
        <>
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:url" content={canonicalUrl} />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ques.AI" />

      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
