export type AreaPageData = {
  slug: string;
  city: string;
  state: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  heroPoints: string[];
  citySectionTitle: string;
  citySectionBody: string;
  cityImageUrl: string;
  cityImageSource: string;
  cityImageAlt: string;
  sectionTwoTitle: string;
  sectionTwoBody: string;
  sectionTwoImage: string;
  sectionThreeTitle: string;
  sectionThreeBody: string;
  sectionThreeImage: string;
};

type AreaSeed = {
  city: string;
  slug: string;
  heroDescription: string;
  citySectionBody: string;
  cityImageUrl: string;
  cityImageSource: string;
};

const sectionImages = [
  ["/service-images/residential-1.jpeg", "/service-images/loading-local-2.jpeg"],
  ["/service-images/residential-2.jpeg", "/service-images/packing-2.jpeg"],
  ["/service-images/residential-3.jpeg", "/service-images/truck-1.jpg"],
  ["/service-images/apartment-1.jpeg", "/service-images/commercial-1.jpeg"],
  ["/service-images/apartment-2.jpeg", "/service-images/loading-local-1.jpeg"],
  ["/service-images/commercial-2.jpeg", "/service-images/moving-supplies-1.jpeg"],
];

const areaSeeds: AreaSeed[] = [
  {
    city: "Minneapolis",
    slug: "minneapolis",
    heroDescription: "Moving in Minneapolis? Trust our expert Minneapolis movers for a seamless and stress-free experience backed by careful planning and premium service.",
    citySectionBody: "Planning a move in Minneapolis means navigating busy neighborhoods, downtown access, historic homes, and modern apartment buildings all in one market. Our Minneapolis movers know how to build a move around the pace of the city, whether you are relocating near Uptown, North Loop, Northeast, or surrounding neighborhoods. We help homeowners, renters, and businesses move with smart coordination, careful handling, and the kind of local experience that keeps the day feeling organized.",
    cityImageUrl: "/area-images/minneapolis.jpg",
    cityImageSource: "/area-images/minneapolis.jpg",
  },
  {
    city: "St. Paul",
    slug: "st-paul",
    heroDescription: "Moving in St. Paul? Our dependable St. Paul movers deliver a clean, low-stress move with strong communication and careful handling from start to finish.",
    citySectionBody: "St. Paul moves often involve older homes, tighter streets, hillside neighborhoods, and a wide mix of residential and commercial properties. Our crew understands how to plan around those details so your move feels smooth instead of rushed. Whether you are moving into a house in Highland Park, an apartment near downtown, or an office nearby, we bring local coordination and proven moving experience to every job.",
    cityImageUrl: "/area-images/st-paul.webp",
    cityImageSource: "/area-images/st-paul.webp",
  },
  {
    city: "Bloomington",
    slug: "bloomington",
    heroDescription: "Bloomington moves run better with a crew that understands family neighborhoods, apartment communities, and busy commercial corridors across the city.",
    citySectionBody: "Bloomington is one of the Twin Cities' most active relocation hubs, with a strong mix of homes, condos, offices, and retail-heavy areas. Our Bloomington movers plan carefully around access, timing, and property type so your move stays on schedule. Whether you are relocating near Mall of America, West Bloomington, or a quieter residential pocket, we make the process simpler and more controlled.",
    cityImageUrl: "/area-images/bloomington.jpg",
    cityImageSource: "/area-images/bloomington.jpg",
  },
  {
    city: "Eden Prairie",
    slug: "eden-prairie",
    heroDescription: "Our Eden Prairie movers help families and businesses relocate with polished service, efficient crews, and planning built around a smoother moving day.",
    citySectionBody: "Eden Prairie combines established neighborhoods, growing residential developments, and business campuses that all call for slightly different moving strategies. Our team knows how to adjust the plan based on access, home size, and timeline so your move feels straightforward. From residential relocations to commercial moves, we bring reliable local support across Eden Prairie.",
    cityImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Eden%20Prairie%20Library,%20November%202011.JPG",
    cityImageSource: "https://commons.wikimedia.org/wiki/Category:Eden_Prairie,_Minnesota",
  },
  {
    city: "Minnetonka",
    slug: "minnetonka",
    heroDescription: "Minnetonka movers should know the area well, and our crew brings the local experience needed for efficient, worry-free relocations.",
    citySectionBody: "Minnetonka features lake-area neighborhoods, family homes, and professional spaces that benefit from a move plan built around access and timing. Our Minnetonka movers help clients move confidently with organized crews, thoughtful handling, and dependable communication. We make it easier to move into, out of, or within Minnetonka without turning the day into a headache.",
    cityImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Minnetonka%20Minnesota%20Wikivoyage%20banner.jpg",
    cityImageSource: "https://commons.wikimedia.org/wiki/Category:Minnetonka,_Minnesota",
  },
  {
    city: "Edina",
    slug: "edina",
    heroDescription: "Our Edina movers combine premium handling, efficient execution, and the kind of professionalism clients expect for higher-care relocations.",
    citySectionBody: "Edina moves often involve upscale homes, busy residential streets, and detailed expectations around care and presentation. Our team is built for that level of service. Whether you are moving from a single-family home, townhome, or nearby condo, we tailor the move to protect your belongings, your property, and your timeline from beginning to end.",
    cityImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Edina%20Library.jpg",
    cityImageSource: "https://commons.wikimedia.org/wiki/Category:Edina,_Minnesota",
  },
  {
    city: "Plymouth",
    slug: "plymouth",
    heroDescription: "Plymouth homeowners and businesses count on our team for well-paced moves that stay organized, efficient, and easy to manage.",
    citySectionBody: "Plymouth offers a wide range of residential communities and commercial spaces, and our movers know how to adapt across both. We help clients coordinate everything from neighborhood home moves to apartment transitions and office relocations. With strong local familiarity and careful service, we keep Plymouth moves clear and manageable.",
    cityImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Plymouth%20Library%202021.jpg",
    cityImageSource: "https://commons.wikimedia.org/wiki/Category:Plymouth,_Minnesota",
  },
  {
    city: "Maple Grove",
    slug: "maple-grove",
    heroDescription: "Maple Grove movers need to balance speed, care, and planning, and that is exactly how our crew approaches every relocation.",
    citySectionBody: "With fast-growing neighborhoods, apartment communities, and busy retail zones, Maple Grove moves work best when the crew plans ahead. Our team helps families and businesses move with better coordination and fewer surprises. From larger homes to tighter apartment layouts, we bring the support needed to move smoothly in Maple Grove.",
    cityImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Maple%20Grove%20Library%202021.jpg",
    cityImageSource: "https://commons.wikimedia.org/wiki/Category:Maple_Grove,_Minnesota",
  },
  {
    city: "Brooklyn Park",
    slug: "brooklyn-park",
    heroDescription: "Brooklyn Park moves feel easier with an experienced crew that knows how to handle homes, apartments, and business spaces across the city.",
    citySectionBody: "Brooklyn Park is large, varied, and constantly moving, which makes local familiarity especially valuable. Our Brooklyn Park movers coordinate around neighborhood layouts, apartment access, and business needs so your move stays efficient. Whether you are relocating a household or an office, we bring a practical and reliable approach.",
    cityImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Brooklyn%20Park%20Library%202018.jpg",
    cityImageSource: "https://commons.wikimedia.org/wiki/Category:Brooklyn_Park,_Minnesota",
  },
  {
    city: "Eagan",
    slug: "eagan",
    heroDescription: "Our Eagan movers make local relocations feel more predictable with responsive communication, smart planning, and careful execution.",
    citySectionBody: "Eagan combines suburban neighborhoods, apartment communities, and commercial spaces that all benefit from a move plan matched to the property. Our crew understands how to keep timing, loading, and delivery organized so the move stays calm and efficient. That local control matters whether you are moving a home, apartment, or business in Eagan.",
    cityImageUrl: "/area-images/eagan.jpeg",
    cityImageSource: "/area-images/eagan.jpeg",
  },
  {
    city: "Burnsville",
    slug: "burnsville",
    heroDescription: "Burnsville clients trust our movers for clean logistics, efficient loading, and the kind of dependable service that keeps moves on track.",
    citySectionBody: "Burnsville moves often involve a mix of established neighborhoods, multifamily housing, and commercial properties. Our Burnsville movers know how to work through those different move types without losing efficiency or control. We help clients relocate with better planning, better communication, and a crew that knows how to execute.",
    cityImageUrl: "/area-images/burnsville.jpg",
    cityImageSource: "/area-images/burnsville.jpg",
  },
  {
    city: "Apple Valley",
    slug: "apple-valley",
    heroDescription: "Apple Valley movers should feel easy to work with, and our team is built around a smoother customer experience from quote to unload.",
    citySectionBody: "Apple Valley is a strong family-moving market with homes, townhomes, apartments, and nearby business spaces that all need thoughtful coordination. Our movers help keep the process straightforward with reliable timing, careful packing support, and a professional crew on site. We make relocations in Apple Valley easier to plan and easier to finish well.",
    cityImageUrl: "/area-images/apple-valley.jpg",
    cityImageSource: "/area-images/apple-valley.jpg",
  },
  {
    city: "Lakeville",
    slug: "lakeville",
    heroDescription: "Lakeville families and businesses rely on our crew for organized moves that protect the schedule, the property, and the experience.",
    citySectionBody: "Lakeville continues to grow, and that means more moves across new developments, family neighborhoods, and expanding commercial pockets. Our Lakeville movers know how to shape the job around the property and the route so the day moves steadily. From residential relocations to office support, we help Lakeville clients move with confidence.",
    cityImageUrl: "/area-images/lakeville.webp",
    cityImageSource: "/area-images/lakeville.webp",
  },
  {
    city: "Woodbury",
    slug: "woodbury",
    heroDescription: "Our Woodbury movers bring the right mix of speed, care, and planning for polished residential and commercial relocations.",
    citySectionBody: "Woodbury moves often involve well-kept homes, newer developments, and commercial properties where timing and presentation matter. We build the move around those expectations with organized crews and careful handling throughout the process. That makes it easier to relocate within Woodbury or into the area without extra friction.",
    cityImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/City%20of%20Woodbury,%20Minnesota%20-%20Water%20Tower%20(29955442728).jpg",
    cityImageSource: "https://commons.wikimedia.org/wiki/File:City_of_Woodbury,_Minnesota_-_Water_Tower_(29955442728).jpg",
  },
  {
    city: "Coon Rapids",
    slug: "coon-rapids",
    heroDescription: "Coon Rapids movers should be efficient and easy to coordinate with, and our team is built to deliver exactly that.",
    citySectionBody: "Coon Rapids combines neighborhood moves, apartment transitions, and commercial relocations that all benefit from a clear and practical plan. Our Coon Rapids movers help clients stay ahead of move-day stress with stronger communication and better execution. We handle the heavy lifting while keeping the process organized and predictable.",
    cityImageUrl: "/area-images/coon-rapids.png",
    cityImageSource: "/area-images/coon-rapids.png",
  },
  {
    city: "Blaine",
    slug: "blaine",
    heroDescription: "Blaine residents choose our movers for dependable local service, careful crews, and a move plan built around less stress.",
    citySectionBody: "Blaine is a growing area with a broad mix of homes, townhomes, and community-centered neighborhoods. Our Blaine movers help clients relocate with a process that feels well managed from the first call through final placement. We focus on clean logistics, property care, and a smoother moving-day rhythm.",
    cityImageUrl: "/area-images/blaine.jpg",
    cityImageSource: "/area-images/blaine.jpg",
  },
  {
    city: "Shakopee",
    slug: "shakopee",
    heroDescription: "Shakopee moves run more smoothly with an experienced crew that knows how to keep residential and business relocations organized.",
    citySectionBody: "From family homes and apartments to local business spaces, Shakopee relocations work best when the details are handled early. Our Shakopee movers shape the move around access, property type, and scheduling so the day keeps momentum. That approach helps clients move confidently without the usual chaos.",
    cityImageUrl: "/area-images/shakopee.jpg",
    cityImageSource: "/area-images/shakopee.jpg",
  },
  {
    city: "Chaska",
    slug: "chaska",
    heroDescription: "Our Chaska movers deliver thoughtful local support for moves that need steady coordination, careful handling, and dependable timing.",
    citySectionBody: "Chaska offers a blend of established homes, growing neighborhoods, and nearby commercial activity, which means no two moves look exactly the same. Our crew adapts the plan to fit the property and schedule so your move stays efficient. We help Chaska clients relocate with less confusion and more confidence throughout the process.",
    cityImageUrl: "/area-images/chaska.jpg",
    cityImageSource: "/area-images/chaska.jpg",
  },
  {
    city: "Chanhassen",
    slug: "chanhassen",
    heroDescription: "Chanhassen movers should keep the process calm and polished, and our team is built around exactly that kind of customer experience.",
    citySectionBody: "Chanhassen moves often involve family homes, lake-area properties, and a need for clear communication around timing and access. Our Chanhassen movers focus on keeping every stage more orderly, from planning and loading to delivery and final placement. The goal is a move that feels smooth, not overwhelming.",
    cityImageUrl: "/area-images/chanhassen.jpg",
    cityImageSource: "/area-images/chanhassen.jpg",
  },
  {
    city: "Savage",
    slug: "savage",
    heroDescription: "Savage clients trust our movers for efficient local service, careful crews, and better coordination from start to finish.",
    citySectionBody: "Savage relocations benefit from a moving team that understands suburban homes, local apartment layouts, and the logistics that keep a move running on time. Our Savage movers help simplify the process with responsive planning and professional handling on-site. We make it easier to move within Savage or into the area with less friction.",
    cityImageUrl: "/area-images/savage.jpg",
    cityImageSource: "/area-images/savage.jpg",
  },
];

export const areaPages: AreaPageData[] = areaSeeds.map((area, index) => {
  const [sectionTwoImage, sectionThreeImage] = sectionImages[index % sectionImages.length];

  return {
    ...area,
    state: "Minnesota",
    heroEyebrow: "Twin Cities Service Area",
    heroTitle: `${area.city} Movers`,
    heroAccent: "Built For A Smoother Move",
    heroPoints: ["Local route expertise", "Careful handling", "Fast quote support"],
    citySectionTitle: `Moving Made Easy in ${area.city}`,
    cityImageAlt: `${area.city}, Minnesota`,
    sectionTwoTitle: `Your Trusted ${area.city} Moving Company`,
    sectionTwoBody: `When searching for a trusted ${area.city.toLowerCase()} moving company, you need professionals who handle every detail with precision. Our team offers specialized residential and commercial relocations, ensuring your belongings are transported safely and securely. As a customer-focused ${area.city.toLowerCase()} moving company, we tailor each move to your timeline and property so the experience feels smoother from packing through final unload.`,
    sectionTwoImage,
    sectionThreeTitle: `Why Choose Our ${area.city} Movers?`,
    sectionThreeBody: `Our ${area.city.toLowerCase()} movers are dedicated to delivering premium customer service and efficient relocations. From careful packing to safe transportation, we make sure your move is handled with expertise and attention to detail. Choose us for a hassle-free move backed by strong communication, respectful crews, and local experience that helps every transition feel more manageable.`,
    sectionThreeImage,
  };
});

export const areaPageMap = Object.fromEntries(areaPages.map((area) => [area.slug, area])) as Record<string, AreaPageData>;

export const areaGroups = [
  {
    title: "Core Cities",
    description: "Downtown and central Twin Cities coverage.",
    items: areaPages.slice(0, 5),
  },
  {
    title: "West Metro",
    description: "High-demand western suburbs and neighborhoods.",
    items: areaPages.slice(5, 10),
  },
  {
    title: "South Metro",
    description: "Family-focused communities and growing corridors.",
    items: areaPages.slice(10, 15),
  },
  {
    title: "North & East Metro",
    description: "Additional local routes across the metro footprint.",
    items: areaPages.slice(15),
  },
];
