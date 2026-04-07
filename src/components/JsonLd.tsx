// JSON-LD structured data components for rich snippets in Google Search

const BUSINESS = {
  name: "5 Star Movers Minnesota",
  url: "https://www.5starmoversmn.com",
  telephone: "+16514619202",
  email: "5starmoversmn@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6325 Cambridge St #1",
    addressLocality: "St Louis Park",
    addressRegion: "MN",
    postalCode: "55416",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.9537,
    longitude: -93.3496,
  },
  areaServed: "Minneapolis–Saint Paul Metropolitan Area",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "2598",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.google.com/maps/place/5+Star+Movers",
  ],
};

/** LocalBusiness — use on the home page */
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    ...BUSINESS,
    description:
      "5 Star Movers is Minnesota's top-rated moving company, serving the Twin Cities metro with residential, commercial, long-distance, and specialty moving services.",
    priceRange: "$$",
    image: "https://www.5starmoversmn.com/logo.webp",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Service page — use on each /services/[slug] */
export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "MovingCompany",
      name: BUSINESS.name,
      telephone: BUSINESS.telephone,
      address: BUSINESS.address,
    },
    areaServed: BUSINESS.areaServed,
    aggregateRating: BUSINESS.aggregateRating,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Area page — use on each /areas/[slug] */
export function AreaServiceJsonLd({
  city,
  description,
  url,
}: {
  city: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Moving Services in ${city}, MN`,
    description,
    url,
    provider: {
      "@type": "MovingCompany",
      name: BUSINESS.name,
      telephone: BUSINESS.telephone,
      address: BUSINESS.address,
    },
    areaServed: {
      "@type": "City",
      name: city,
      addressRegion: "MN",
      addressCountry: "US",
    },
    aggregateRating: BUSINESS.aggregateRating,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQ page — use on /faqs */
export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Breadcrumb — use on any page with navigation hierarchy */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Blog post article — use on /blog/[slug] */
export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  updatedAt,
  author,
}: {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string | null;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: author
      ? { "@type": "Person", name: author }
      : { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.url },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
      logo: {
        "@type": "ImageObject",
        url: "https://www.5starmoversmn.com/logo.webp",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
