import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Ques.AI - Your AI Podcast Assistant",
  description = "Supercharge Your Podcast Distribution using our AI assistant!",
  keywords = "podcast, AI, distribution, podcast assistant, content creation",
  author = "Ques.AI",
  canonicalUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
}) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const canonical = canonicalUrl || `${siteUrl}${currentPath}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
