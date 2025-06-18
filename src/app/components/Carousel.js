// components/Carousel.jsx
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "./Carousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// react-slick uses window, so disable SSR
const SlickSlider = dynamic(() => import("react-slick"), {
  ssr: false,
});

export const slides = [
  {
    href: "https://creatr.com/courses/the-aligned-leader",
    desktop:
      "https://creatr.com/wp-content/uploads/WebBanner_Conversations_TheAlignedLeader_KSTABYOU_Desktop_v1.jpg",
    mobile:
      "https://creatr.com/wp-content/uploads/WebBanner_Conversations_TheAlignedLeader_KSTABYOU_iPhone_v1.jpg",
    ipad: "https://creatr.com/wp-content/uploads/WebBanner_Conversations_TheAlignedLeader_KSTABYOU_iPad_v1.jpg",
  },
  {
    href: "https://creatr.com/courses/creatr-lab",
    desktop:
      "https://creatr.com/wp-content/uploads/2560x990-mmah-lab-desktop-watchnow-v2-1.jpg",
    mobile:
      "https://creatr.com/wp-content/uploads/1420x2410-mmah-lab-iphone-watchnow-v2.jpg",
    ipad: "https://creatr.com/wp-content/uploads/2110x1140-mmah-lab-ipad-watchnow-v2.jpg",
  },
  {
    href: "/courses/kingdomculture/",
    desktop:
      "https://creatr.com/wp-content/uploads/kb-ameen-2560x990-Desktop-Banner-1.jpg",
    mobile:
      "https://creatr.com/wp-content/uploads/creatr-kingdomculture-websitebanner-iphone-1.jpg",
    ipad: "https://creatr.com/wp-content/uploads/kingdom-culture-banner-ipad.jpg",
  },
  {
    href: "/courses/to-be-of-service/",
    desktop:
      "https://creatr.com/wp-content/uploads/mmah-2560x990-Desktop-Banner-1.jpg",
    mobile:
      "https://creatr.com/wp-content/uploads/mmah-1120x1900-iphone-banner.jpg",
    ipad: "https://creatr.com/wp-content/uploads/mmah-2110x1140-iPad-banner.jpg",
  },
  {
    href: "https://creatr.com/courses/marriage-and-ministry/",
    desktop:
      "https://creatr.com/wp-content/uploads/mm-bjj-2560x990-Desktop-Banner-1.jpg",
    mobile:
      "https://creatr.com/wp-content/uploads/marriage-ministry-banner-iphone-1.jpg",
    ipad: "https://creatr.com/wp-content/uploads/marriage-ministry-banner-ipad.jpg",
  },
  {
    href: "https://creatr.com/pathway",
    desktop:
      "https://creatr.com/wp-content/uploads/creatr-pathway-2560x990-Desktop-Banner-1.jpg",
    mobile:
      "https://creatr.com/wp-content/uploads/creatr-pathway-websitebanner-iphone-1.jpg",
    ipad: "https://creatr.com/wp-content/uploads/creatr-pathway-banner-ipad-1.jpg",
  },
];

function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      className={`${styles["slick-arrow-btn"]} ${styles["slick-prev-btn"]}`}
      onClick={onClick}
    >
      <img src="/pink-prev.webp" alt="Previous slide" />
    </button>
  );
}
function NextArrow({ onClick }) {
  return (
    <button
      type="button"
      className={`${styles["slick-arrow-btn"]} ${styles["slick-next-btn"]}`}
      onClick={onClick}
    >
      <img src="/pink-next.webp" alt="Next slide" />
    </button>
  );
}

export default function Carousel() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getBg = (slide) => {
    if (width <= 768) return slide.mobile;
    if (width <= 1024) return slide.ipad || slide.desktop;
    return slide.desktop;
  };

  const settings = {
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
  };

  return (
    <div className={styles.slider}>
      <SlickSlider {...settings}>
        {slides.map((slide, i) => (
          <a href={slide.href} key={i} draggable="false">
            <div
              className={styles.slide}
              style={{ backgroundImage: `url('${getBg(slide)}')` }}
              draggable="false"
            />
          </a>
        ))}
      </SlickSlider>
    </div>
  );
}
