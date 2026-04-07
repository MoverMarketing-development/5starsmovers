export type MetroMapRegion = {
  name: string;
  county: string;
  slug?: string;
  available: boolean;
  points: string;
};

export const metroMapRegions: MetroMapRegion[] = [
  { name: "Maple Grove", county: "Hennepin County", slug: "maple-grove", available: true, points: "118,56 236,52 250,118 218,170 138,174 102,126" },
  { name: "Plymouth", county: "Hennepin County", slug: "plymouth", available: true, points: "138,174 260,164 272,248 242,314 154,308 120,236" },
  { name: "Brooklyn Park", county: "Hennepin County", slug: "brooklyn-park", available: true, points: "248,74 374,72 394,150 356,218 274,212 248,120" },
  { name: "Coon Rapids", county: "Anoka County", slug: "coon-rapids", available: true, points: "384,70 506,74 528,150 490,220 402,214 374,146" },
  { name: "Blaine", county: "Anoka County", slug: "blaine", available: true, points: "516,64 650,78 674,170 628,248 534,236 502,146" },
  { name: "Fridley", county: "Anoka County", available: false, points: "382,216 490,220 500,292 430,336 372,298" },
  { name: "Brooklyn Center", county: "Hennepin County", available: false, points: "272,214 374,216 386,290 326,336 262,292" },
  { name: "Golden Valley", county: "Hennepin County", available: false, points: "204,300 322,294 334,374 272,420 198,382" },
  { name: "Roseville", county: "Ramsey County", available: false, points: "500,236 626,250 638,326 562,356 492,302" },
  { name: "St. Louis Park", county: "Hennepin County", available: false, points: "198,386 274,420 282,486 222,526 164,476" },
  { name: "Minnetonka", county: "Hennepin County", slug: "minnetonka", available: true, points: "106,318 198,302 206,390 164,474 92,462 72,382" },
  { name: "Minneapolis", county: "Hennepin County", slug: "minneapolis", available: true, points: "332,286 430,250 494,302 512,394 460,486 382,534 316,486 286,404" },
  { name: "St. Paul", county: "Ramsey County", slug: "st-paul", available: true, points: "500,304 620,320 680,390 656,486 582,540 510,482 512,394" },
  { name: "Woodbury", county: "Washington County", slug: "woodbury", available: true, points: "680,390 780,410 786,502 738,564 654,486" },
  { name: "Hopkins", county: "Hennepin County", available: false, points: "220,482 282,488 286,550 242,586 194,546" },
  { name: "Edina", county: "Hennepin County", slug: "edina", available: true, points: "286,486 384,534 388,620 330,662 250,614 242,586 286,548" },
  { name: "Richfield", county: "Hennepin County", available: false, points: "388,534 460,486 466,572 424,620 390,620" },
  { name: "Bloomington", county: "Hennepin County", slug: "bloomington", available: true, points: "332,662 424,620 468,572 502,654 470,718 382,728 322,700" },
  { name: "Inver Grove Heights", county: "Dakota County", available: false, points: "510,482 582,540 600,620 546,662 486,650 468,574" },
  { name: "Eagan", county: "Dakota County", slug: "eagan", available: true, points: "468,572 548,662 538,734 474,774 412,752 426,620" },
  { name: "Eden Prairie", county: "Hennepin County", slug: "eden-prairie", available: true, points: "82,462 164,476 194,546 182,640 110,662 62,594" },
  { name: "Chanhassen", county: "Carver County", slug: "chanhassen", available: true, points: "62,594 110,662 108,750 54,772 28,690" },
  { name: "Chaska", county: "Carver County", slug: "chaska", available: true, points: "110,662 182,640 214,724 188,796 108,750" },
  { name: "Shakopee", county: "Scott County", slug: "shakopee", available: true, points: "182,640 322,700 302,786 214,804 214,724" },
  { name: "Savage", county: "Scott County", slug: "savage", available: true, points: "302,700 384,728 396,804 304,814" },
  { name: "Burnsville", county: "Dakota County", slug: "burnsville", available: true, points: "384,728 474,718 474,794 396,804" },
  { name: "Prior Lake", county: "Scott County", available: false, points: "216,804 304,814 304,886 234,906 180,854" },
  { name: "Apple Valley", county: "Dakota County", slug: "apple-valley", available: true, points: "474,718 538,734 552,824 488,868 474,792" },
  { name: "Cottage Grove", county: "Washington County", available: false, points: "600,620 674,666 686,768 612,804 552,824 538,734 548,662" },
  { name: "Lakeville", county: "Dakota County", slug: "lakeville", available: true, points: "304,814 488,868 474,956 344,974 252,930 234,906" },
];
