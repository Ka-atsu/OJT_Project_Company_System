// projects.data.js
import { ImgAggregates, ImgBackfill } from "../../../assets/images";

export const PROJECTS = {
  hero: {
    eyebrow: "Projects",
    title: "Selected projects",
    lede: "A snapshot of recent and ongoing projects delivered across CALABARZON.",
  },
  intro: {
    title: "Our Projects",
    body: "A selection of completed and ongoing construction works delivered by Cliberduche, covering civil works, drainage systems, road networks, and related infrastructure services.",
  },
  items: [
    {
      title: "MBL PROJECT 2018",
      scope: "GOVERNMENT, STORM DRAINAGE, ROAD NETWORK & FENCING",
      images: [
        ImgAggregates,
        ImgBackfill,
        ImgAggregates,
        ImgBackfill,
        ImgAggregates,
      ],
    },
    {
      title: "MBL PROJECT 2019",
      scope: "GOVERNMENT, STORM DRAINAGE, ROAD NETWORK & FENCING",
      images: [ImgBackfill, ImgAggregates, ImgBackfill, ImgAggregates],
    },
  ],
};
