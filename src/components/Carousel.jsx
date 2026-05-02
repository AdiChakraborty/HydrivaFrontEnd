import React, { useEffect } from "react";
import { getData } from "../Context/DataContext";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { noImg } from "../constants";
import Image from "./Image";

/* ── Skeleton shimmer keyframes (injected once) ── */
const skeletonStyle = `
  @keyframes shimmer {
    0%   { background-position: -700px 0; }
    100% { background-position:  700px 0; }
  }
  .skel {
    background: linear-gradient(90deg, #1a1a2e 25%, #2a2a4a 50%, #1a1a2e 75%);
    background-size: 700px 100%;
    animation: shimmer 3s infinite linear;
    border-radius: 8px;
  }
`;

const CarouselSkeleton = () => (
  <>
    <style>{skeletonStyle}</style>

    {/* ── Mobile skeleton ── */}
    <div className="flex md:hidden relative h-[100svh] w-full overflow-hidden bg-[#0f0c29]">
      {/* fake image shimmer */}
      <div className="skel absolute inset-0 rounded-none" />
      {/* overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* content placeholders */}
      <div className="relative z-10 flex flex-col justify-start px-5 pt-12 space-y-4">
        <div className="skel h-3 w-36 rounded" />
        <div className="space-y-2">
          <div className="skel h-7 w-64 rounded" />
          <div className="skel h-7 w-48 rounded" />
        </div>
        <div className="space-y-2">
          <div className="skel h-4 w-72 rounded" />
          <div className="skel h-4 w-60 rounded" />
          <div className="skel h-4 w-52 rounded" />
        </div>
        <div className="skel h-9 w-28 rounded-md mt-2" />
      </div>
    </div>

    {/* ── Desktop skeleton ── */}
    <div className="hidden md:flex bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] h-[600px] items-center justify-center gap-16 px-8">
      {/* text block */}
      <div className="flex flex-col space-y-5 w-[500px]">
        <div className="skel h-4 w-48 rounded" />
        <div className="space-y-3">
          <div className="skel h-9 w-full rounded" />
          <div className="skel h-9 w-4/5 rounded" />
        </div>
        <div className="space-y-2">
          <div className="skel h-4 w-full rounded" />
          <div className="skel h-4 w-5/6 rounded" />
          <div className="skel h-4 w-4/6 rounded" />
        </div>
        <div className="skel h-10 w-32 rounded-md" />
      </div>
      {/* circular image placeholder */}
      <div
        className="skel rounded-full flex-shrink-0"
        style={{ width: 372, height: 372 }}
      />
    </div>
  </>
);

const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  /* Show skeleton while data hasn't arrived yet */
  if (!data || data.length === 0) {
    return <CarouselSkeleton />;
  }

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "none",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "none",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
        />
      </div>
    );
  };

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => {
          const imgSrc = item?.images[0]?.url || noImg;

          return (
            <div key={index}>
              {/* ── MOBILE ── */}
              <div
                className="relative flex md:hidden h-[100svh] w-full overflow-hidden"
                style={{
                  backgroundImage: `url(${imgSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)",
                  }}
                />
                <div className="relative z-10 flex flex-col justify-start px-5 pt-12 space-y-3">
                  <h3 className="text-red-400 font-semibold text-xs tracking-widest uppercase">
                    Fuel your day. One sip at a time.
                  </h3>
                  <h1 className="text-2xl font-bold uppercase line-clamp-3 text-white leading-tight">
                    {item.title}
                  </h1>
                  <p className="line-clamp-3 text-gray-300 text-sm pr-4">
                    {item.description}
                  </p>
                  <button
                    className="self-start bg-gradient-to-r from-red-500 to-purple-500
                      text-white px-4 py-2 rounded-md cursor-pointer mt-2 text-sm font-medium"
                    onClick={() => navigate(`/products/${item.slug}`)}
                  >
                    Shop Now
                  </button>
                </div>
              </div>

              {/* ── DESKTOP ── */}
              <div className="hidden md:flex bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <div className="flex flex-row my-0 gap-10 justify-center h-[600px] items-center px-4 w-full">
                  <div className="space-y-6">
                    <h3 className="text-red-500 font-semibold font-sans text-sm">
                      Fuel your day. One sip at a time.
                    </h3>
                    <h1 className="text-4xl font-bold uppercase line-clamp-3 md:w-[500px] text-white">
                      {item.title}
                    </h1>
                    <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                      {item.description}
                    </p>
                    <button
                      className="bg-gradient-to-r from-red-500 to-purple-500
                        text-white px-3 py-2 rounded-md cursor-pointer"
                      onClick={() => navigate(`/products/${item.slug}`)}
                    >
                      Shop Now
                    </button>
                  </div>
                  <div>
                    <Image
                      src={imgSrc}
                      alt={item.title}
                      className="rounded-full w-[372px] hover:scale-105
                        transition-all shadow-2xl shadow-red-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
