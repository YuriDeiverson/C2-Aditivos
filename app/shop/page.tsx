"use client";

import { useState } from "react";

/* ── STAR RATING ────────────────────────────────────────────────────────── */
function Stars({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="star-row" aria-label={`${filled} out of ${total} stars`}>
      {Array.from({ length: total }, (_, i) => {
        const pct = Math.min(Math.max(filled - i, 0), 1) * 100;
        return (
          <svg key={i} className="star-icon" viewBox="0 0 18 17" fill="none">
            <defs>
              <linearGradient id={`sg-${i}-${filled}`}>
                <stop offset={`${pct}%`} stopColor="#FFC633" />
                <stop offset={`${pct}%`} stopColor="#D1D1D1" />
              </linearGradient>
            </defs>
            <path
              d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
              fill={`url(#sg-${i}-${filled})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

/* ── DISCOUNT BADGE ─────────────────────────────────────────────────────── */
function DiscountBadge({ pct }: { pct: number }) {
  return <span className="discount-badge">-{pct}%</span>;
}

/* ── PRODUCT CARD ───────────────────────────────────────────────────────── */
type ProductCardProps = {
  img: string;
  name: string;
  rating: number;
  ratingCount: number;
};

function ProductCard({
  img,
  name,
  rating,
  ratingCount,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={img} alt={name} className="product-img" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-rating">
          <Stars filled={rating} />
          <span className="rating-count">
            {rating.toFixed(1)}/<span className="rating-total">5</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── REVIEW CARD ────────────────────────────────────────────────────────── */
type ReviewCardProps = {
  name: string;
  rating: number;
  text: string;
  blurred?: boolean;
};

function ReviewCard({ name, rating, text, blurred }: ReviewCardProps) {
  return (
    <div className={`review-card${blurred ? " review-card--blurred" : ""}`}>
      <Stars filled={rating} />
      <div className="review-author-row">
        <span className="review-name">{name}</span>
        <svg className="verified-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8486 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806Z"
            fill="#01AB31"
          />
        </svg>
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
}

/* ── DATA ───────────────────────────────────────────────────────────────── */
const NEW_ARRIVALS = [
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/25fdf0e956377a88c5639e8f53b87350fcebb363?width=592",
    name: "T-shirt with Tape Details",
    rating: 4.5,
    ratingCount: 1,
    price: 120,
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/b9f990cb718a22badecd9e63799131191f1ba62e?width=536",
    name: "Skinny Fit Jeans",
    rating: 3.5,
    ratingCount: 1,
    price: 240,
    originalPrice: 260,
    discount: 20,
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/08c65050d66d0c71ee4a60a81a6d99050458cd97?width=592",
    name: "Checkered Shirt",
    rating: 4.5,
    ratingCount: 1,
    price: 180,
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/d89213540c744d03f8e4651cac261b19e64c6296?width=592",
    name: "Sleeve Striped T-shirt",
    rating: 4.5,
    ratingCount: 1,
    price: 130,
    originalPrice: 160,
    discount: 30,
  },
];

const TOP_SELLING = [
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/c32688a2d5ff6fb54d7c28e4b018a2d9210786f9?width=592",
    name: "Vertical Striped Shirt",
    rating: 5.0,
    ratingCount: 1,
    price: 212,
    originalPrice: 232,
    discount: 20,
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/1235dfb5a1e47e9755a0d0d2a954912c98335efb?width=588",
    name: "Courage Graphic T-shirt",
    rating: 4.0,
    ratingCount: 1,
    price: 145,
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/2170888bcbae6ed3cbdd5024e026a39574acdad6?width=592",
    name: "Loose Fit Bermuda Shorts",
    rating: 3.0,
    ratingCount: 1,
    price: 80,
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/874e1e0361efca89d14f713d20050897c51d4aab?width=504",
    name: "Faded Skinny Jeans",
    rating: 4.5,
    ratingCount: 1,
    price: 210,
  },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations."',
  },
  {
    name: "Alex K.",
    rating: 5,
    text: '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
  },
  {
    name: "James L.",
    rating: 5,
    text: '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."',
  },
];

/* ── PAGE ───────────────────────────────────────────────────────────────── */
export default function ShopPage() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [email, setEmail] = useState("");

  return (
    <div className="shop-root">
      {/* ANNOUNCEMENT BAR */}
      {announcementVisible && (
        <div className="announcement-bar">
          <span>
            Sign up and get 20% off to your first order.{" "}
            <a href="#" className="announcement-link">
              Sign Up Now
            </a>
          </span>
          <button
            className="announcement-close"
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Close announcement"
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M16.2882 14.9617C16.4644 15.1378 16.5633 15.3767 16.5633 15.6258C16.5633 15.8749 16.4644 16.1137 16.2882 16.2898C16.1121 16.466 15.8733 16.5649 15.6242 16.5649C15.3751 16.5649 15.1362 16.466 14.9601 16.2898L9.99997 11.3281L5.03825 16.2883C4.86213 16.4644 4.62326 16.5633 4.37418 16.5633C4.12511 16.5633 3.88624 16.4644 3.71012 16.2883C3.534 16.1122 3.43506 15.8733 3.43506 15.6242C3.43506 15.3751 3.534 15.1363 3.71012 14.9602L8.67184 10L3.71168 5.03828C3.53556 4.86216 3.43662 4.62329 3.43662 4.37422C3.43662 4.12515 3.53556 3.88628 3.71168 3.71016C3.8878 3.53404 4.12668 3.43509 4.37575 3.43509C4.62482 3.43509 4.86369 3.53404 5.03981 3.71016L9.99997 8.67188L14.9617 3.70938C15.1378 3.53326 15.3767 3.43431 15.6257 3.43431C15.8748 3.43431 16.1137 3.53326 16.2898 3.70938C16.4659 3.8855 16.5649 4.12437 16.5649 4.37344C16.5649 4.62251 16.4659 4.86138 16.2898 5.0375L11.3281 10L16.2882 14.9617Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}

      {/* NAV */}
      <nav className="shop-nav">
        <div className="nav-inner">
          <a href="/shop" className="nav-logo">
            SHOP.CO
          </a>
          <div className="nav-links">
            <div className="nav-dropdown">
              <span>Shop</span>
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5306 6.53063L8.53063 11.5306C8.46095 11.6005 8.37816 11.656 8.28699 11.6939C8.19583 11.7317 8.09809 11.7512 7.99938 11.7512C7.90067 11.7512 7.80293 11.7317 7.71176 11.6939C7.6206 11.656 7.53781 11.6005 7.46813 11.5306L2.46813 6.53063C2.32723 6.38973 2.24808 6.19864 2.24808 5.99938C2.24808 5.80012 2.32723 5.60902 2.46813 5.46813C2.60902 5.32723 2.80012 5.24808 2.99938 5.24808C3.19864 5.24808 3.38973 5.32723 3.53063 5.46813L8 9.9375L12.4694 5.4675C12.6103 5.32661 12.8014 5.24745 13.0006 5.24745C13.1999 5.24745 13.391 5.32661 13.5319 5.4675C13.6728 5.6084 13.7519 5.7995 13.7519 5.99875C13.7519 6.19801 13.6728 6.38911 13.5319 6.53L13.5306 6.53063Z"
                  fill="black"
                />
              </svg>
            </div>
            <a href="#" className="nav-link">
              On Sale
            </a>
            <a href="#" className="nav-link">
              New Arrivals
            </a>
            <a href="#" className="nav-link">
              Brands
            </a>
          </div>
          <div className="nav-search">
            <svg viewBox="0 0 24 24" fill="none" className="search-icon">
              <path
                d="M21.7959 20.2041L17.3437 15.75C18.6787 14.0104 19.3019 11.8282 19.087 9.64607C18.8722 7.4639 17.8353 5.44516 16.1867 3.99937C14.5382 2.55357 12.4014 1.78899 10.2098 1.86071C8.01829 1.93244 5.93607 2.8351 4.38558 4.38559C2.83509 5.93608 1.93243 8.0183 1.8607 10.2098C1.78898 12.4014 2.55356 14.5382 3.99936 16.1867C5.44515 17.8353 7.46389 18.8722 9.64606 19.087C11.8282 19.3019 14.0104 18.6787 15.75 17.3438L20.2059 21.8006C20.3106 21.9053 20.4348 21.9883 20.5715 22.0449C20.7083 22.1016 20.8548 22.1307 21.0028 22.1307C21.1508 22.1307 21.2973 22.1016 21.4341 22.0449C21.5708 21.9883 21.695 21.9053 21.7997 21.8006C21.9043 21.696 21.9873 21.5717 22.044 21.435C22.1006 21.2983 22.1298 21.1517 22.1298 21.0037C22.1298 20.8558 22.1006 20.7092 22.044 20.5725C21.9873 20.4358 21.9043 20.3115 21.7997 20.2069L21.7959 20.2041ZM4.12499 10.5C4.12499 9.23915 4.49888 8.0066 5.19938 6.95824C5.89987 5.90988 6.89551 5.09278 8.06039 4.61027C9.22527 4.12776 10.5071 4.00151 11.7437 4.2475C12.9803 4.49348 14.1162 5.10064 15.0078 5.9922C15.8994 6.88376 16.5065 8.01967 16.7525 9.2563C16.9985 10.4929 16.8722 11.7747 16.3897 12.9396C15.9072 14.1045 15.0901 15.1001 14.0418 15.8006C12.9934 16.5011 11.7608 16.875 10.5 16.875C8.80977 16.8733 7.18927 16.2011 5.99411 15.0059C4.79894 13.8107 4.12673 12.1902 4.12499 10.5Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
            <input
              type="search"
              placeholder="Search for products..."
              className="search-input"
            />
          </div>
          <div className="nav-actions">
            <button className="icon-btn" aria-label="Cart">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.375 20.25C9.375 20.6208 9.26503 20.9834 9.059 21.2917C8.85298 21.6 8.56014 21.8404 8.21753 21.9823C7.87492 22.1242 7.49792 22.1613 7.1342 22.089C6.77049 22.0166 6.4364 21.838 6.17417 21.5758C5.91195 21.3136 5.73337 20.9795 5.66103 20.6158C5.58868 20.2521 5.62581 19.8751 5.76773 19.5325C5.90964 19.1899 6.14996 18.897 6.45831 18.691C6.76665 18.485 7.12916 18.375 7.5 18.375C7.99728 18.375 8.47419 18.5725 8.82582 18.9242C9.17745 19.2758 9.375 19.7527 9.375 20.25ZM17.25 18.375C16.8792 18.375 16.5166 18.485 16.2083 18.691C15.9 18.897 15.6596 19.1899 15.5177 19.5325C15.3758 19.8751 15.3387 20.2521 15.411 20.6158C15.4834 20.9795 15.662 21.3136 15.9242 21.5758C16.1864 21.838 16.5205 22.0166 16.8842 22.089C17.2479 22.1613 17.6249 22.1242 17.9675 21.9823C18.3101 21.8404 18.603 21.6 18.809 21.2917C19.015 20.9834 19.125 20.6208 19.125 20.25C19.125 19.7527 18.9275 19.2758 18.5758 18.9242C18.2242 18.5725 17.7473 18.375 17.25 18.375ZM22.0753 7.08094L19.5169 15.3966C19.3535 15.9343 19.0211 16.4051 18.569 16.739C18.1169 17.0729 17.5692 17.2521 17.0072 17.25H7.77469C7.2046 17.2482 6.65046 17.0616 6.1953 16.7183C5.74015 16.3751 5.40848 15.8936 5.25 15.3459L2.04469 4.125H1.125C0.826631 4.125 0.540483 4.00647 0.329505 3.7955C0.118526 3.58452 0 3.29837 0 3C0 2.70163 0.118526 2.41548 0.329505 2.2045C0.540483 1.99353 0.826631 1.875 1.125 1.875H2.32687C2.73407 1.87626 3.12988 2.00951 3.45493 2.25478C3.77998 2.50004 4.01674 2.84409 4.12969 3.23531L4.81312 5.625H21C21.1761 5.62499 21.3497 5.6663 21.5069 5.74561C21.664 5.82492 21.8004 5.94001 21.905 6.08164C22.0096 6.22326 22.0795 6.38746 22.1091 6.56102C22.1387 6.73458 22.1271 6.91266 22.0753 7.08094Z"
                  fill="black"
                />
              </svg>
            </button>
            <button className="icon-btn" aria-label="Account">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 1.875C9.99747 1.875 8.0399 2.46882 6.38486 3.58137C4.72982 4.69392 3.48013 6.27523 2.71379 8.12533C1.94745 9.97543 1.74694 12.0112 2.13761 13.9753C2.52829 15.9393 3.49259 17.7435 4.9086 19.1595C6.32461 20.5755 8.12871 21.5398 10.0928 21.9305C12.0569 22.3211 14.0927 22.1206 15.9428 21.3543C17.7929 20.5879 19.3742 19.2902 20.4867 17.6251C21.5993 15.9601 22.193 14.0025 22.193 12C22.19 9.3156 21.1223 6.74199 19.2242 4.84383C17.326 2.94567 14.7524 1.87798 12.068 1.875H12ZM7.52719 18.4284C8.04945 17.7143 8.73278 17.1335 9.52168 16.7331C10.3106 16.3327 11.1828 16.124 12.0675 16.124C12.9522 16.124 13.8244 16.3327 14.6133 16.7331C15.4022 17.1335 16.0856 17.7143 16.6078 18.4284C15.2809 19.3695 13.6943 19.875 12.0675 19.875C10.4407 19.875 8.85415 19.3695 7.52719 18.4284ZM9.375 11.25C9.375 10.7308 9.52896 10.2233 9.8174 9.79163C10.1058 9.35995 10.5158 9.0235 10.9955 8.82482C11.4751 8.62614 12.0029 8.57415 12.5121 8.67544C13.0213 8.77672 13.489 9.02673 13.8562 9.39384C14.2233 9.76096 14.4733 10.2287 14.5746 10.7379C14.6759 11.2471 14.6239 11.7749 14.4252 12.2545C14.2265 12.7342 13.8901 13.1442 13.4584 13.4326C13.0267 13.721 12.5192 13.875 12 13.875C11.3038 13.875 10.6361 13.5984 10.1438 13.1062C9.65157 12.6139 9.375 11.9462 9.375 11.25Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f884a9e2521f6be06c5f32de38e34b18daf4097a?width=2880"
          alt="Fashion models"
          className="hero-bg-img"
        />
        <div className="hero-sparkle hero-sparkle--large">
          <svg viewBox="0 0 104 104" fill="none">
            <path d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z" fill="black" />
          </svg>
        </div>
        <div className="hero-sparkle hero-sparkle--small">
          <svg viewBox="0 0 56 56" fill="none">
            <path d="M28 0C28.9506 15.0527 40.9472 27.0495 56 28C40.9472 28.9506 28.9506 40.9472 28 56C27.0495 40.9472 15.0527 28.9506 0 28C15.0527 27.0495 27.0495 15.0527 28 0Z" fill="black" />
          </svg>
        </div>
        <div className="hero-content">
          <h1 className="hero-headline">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="hero-desc">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <a href="#new-arrivals" className="hero-cta">
            Shop Now
          </a>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">International Brands</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">2,000+</span>
              <span className="stat-label">High-Quality Products</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">30,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND LOGOS */}
      <div className="brands-bar">
        <div className="brands-inner">
          {/* VERSACE */}
          <svg className="brand-logo" viewBox="0 0 167 34" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M150.179 0.655656H166.482V3.25336C166.008 3.09436 165.512 3.0124 165.013 3.01061H155.642V15.1491H164.758C165.413 15.1491 165.996 15.0772 166.481 14.9548V17.5411C166.068 17.4443 165.499 17.3952 164.794 17.3952H155.642V29.9466H164.733C165.232 29.9466 165.826 29.874 166.481 29.7159V32.508H150.203C150.333 32.017 150.399 31.511 150.398 31.003V2.19691C150.398 1.56617 150.325 1.04435 150.179 0.655656ZM72.9408 28.8901L76.0611 26.2803C77.687 28.9635 79.0225 30.1886 82.2517 30.1886C85.5286 30.1886 88.285 28.1982 88.285 24.6786C88.285 22.9423 87.5802 21.522 86.1849 20.4542C85.5528 19.9559 83.951 19.0945 81.4259 17.8928C77.6507 16.0846 73.9731 13.7289 73.9731 8.99551C73.9731 3.02271 79.0467 0.388695 84.3995 0.193636C87.5681 0.0726133 91.5014 1.82174 93.091 3.78728L89.9231 6.22695C89.3581 5.17255 88.5181 4.29083 87.4923 3.6754C86.4665 3.05998 85.2932 2.73381 84.0969 2.73154C80.0541 2.73154 76.8498 7.41724 80.2 10.6464C81.0493 11.4715 82.7863 12.4909 85.4324 13.7047C89.6561 15.6838 93.2612 18.0501 93.2612 23.2825C93.2612 25.0908 92.7878 26.7779 91.853 28.3199C89.9722 31.4273 86.8278 32.9814 82.4339 32.9814C77.3838 32.9814 76.3892 31.8281 72.9408 28.8901ZM28.4893 0.655656H44.7782V3.25336C44.3051 3.09442 43.8094 3.01246 43.3103 3.01061H33.9396V15.1491H43.0554C43.7111 15.1491 44.2941 15.0772 44.7789 14.9548V17.5411C44.366 17.4443 43.7958 17.3952 43.1046 17.3952H33.9396V29.9466H43.0312C43.5289 29.9466 44.124 29.874 44.7789 29.7159V32.508H28.5143C28.6332 32.0151 28.6941 31.5101 28.6958 31.003V2.19691C28.6958 1.56617 28.6225 1.04435 28.4893 0.655656ZM0 0.655656H5.92368V0.947533C5.92368 1.21449 6.0084 1.56617 6.15434 2.01538L14.5049 27.1545L23.0754 1.90574C23.2085 1.48145 23.2818 1.06856 23.2818 0.655656H26.1586C25.8674 1.16537 25.6489 1.61529 25.515 2.01538L15.7308 31.2095C15.6339 31.4886 15.5492 31.9257 15.4766 32.5087H10.6208C10.5474 32.0674 10.4379 31.6329 10.2933 31.2095L0.704065 2.24603C0.482555 1.71187 0.251627 1.18166 0.0113903 0.655656H0ZM62.9145 17.262C66.7986 16.4968 69.7729 13.5232 69.7729 9.27457C69.7729 3.70186 65.1114 0.654944 59.8918 0.654944H50.3509C50.4841 1.14117 50.5574 1.65089 50.5574 2.18481V30.9774C50.5574 31.5968 50.4841 32.1186 50.3509 32.5073H56.0319C55.8929 32.0093 55.8235 31.4944 55.8254 30.9774V17.7476L57.6457 17.9419L67.1631 32.5073H72.8803L62.9145 17.262Z"
              fill="white"
            />
          </svg>
          {/* ZARA */}
          <svg className="brand-logo brand-logo--zara" viewBox="0 0 91 38" fill="none">
            <g clipPath="url(#zara-clip)">
              <path d="M86.3324 36.8682L72.8501 0.0322557L72.841 0.00787354H72.5749L69.7985 7.57753L64.7441 21.3583L64.7323 21.3474C62.9806 19.8135 60.5091 18.8546 57.3965 18.4976L56.4472 18.4003L57.389 18.2805C62.5219 17.3652 65.9723 14.1482 65.9723 10.2723C65.9723 4.95736 60.9348 1.24757 53.7189 1.24757H38.7052V1.51668H43.0678V28.98L32.4727 0.0321654L32.4632 0.00787354H32.1971L29.4207 7.57753L18.7123 36.7734L18.6464 36.781C18.4634 36.8034 18.2824 36.8212 18.1034 36.8346C17.834 36.8556 17.5662 36.8681 17.2976 36.8681H6.47765L27.0448 1.51659L27.1977 1.25091H2.04322V12.1867H2.31013C2.35745 6.86007 5.48348 1.51659 12.3902 1.51659H20.7226L0 37.133H27.9173V26.6557H27.6504C27.614 31.2985 24.9619 35.7082 19.1947 36.7039L19.0114 36.7349L23.4036 24.7547H35.7075L40.141 36.8682H35.7675V37.1331H52.9333V36.8682H48.5411V18.5956H53.6091C58.7665 18.5956 61.7245 20.8821 61.7245 24.8669V28.1082C61.7245 28.4653 61.749 28.9875 61.776 29.4242V29.4401L59.052 36.8665H55.4934V37.1314H62.8596V36.8665H59.3393L61.8199 30.104C61.9619 31.2212 62.3758 33.7149 64.8177 36.6695C66.1555 37.5991 67.5535 37.9922 69.1879 37.9922C71.3527 37.9922 72.7962 37.4566 73.988 36.196L73.8318 36.0501C72.7337 37.0559 71.8122 37.4633 70.6576 37.4633C68.6903 37.4633 67.6608 35.0954 67.6608 32.7602V28.2188C67.6712 27.092 67.4934 25.9712 67.1345 24.9021L67.0856 24.7563H76.0851L80.5186 36.8699H76.1452V37.1347H91V36.8699L86.3324 36.8682ZM23.5015 24.4898L29.5627 7.96485L35.6104 24.4898H23.5015ZM48.5438 18.3299V1.51659H52.4122C57.5798 1.51659 60.308 4.56507 60.308 10.3294C60.308 16.4599 58.742 18.3299 53.6091 18.3299H48.5438ZM66.9807 24.4898L69.937 7.96485L75.9846 24.4898H66.9807Z" fill="white" />
            </g>
            <defs>
              <clipPath id="zara-clip"><rect width="91" height="38" fill="white" /></clipPath>
            </defs>
          </svg>
          {/* GUCCI text */}
          <span className="brand-text">GUCCI</span>
          {/* PRADA text */}
          <span className="brand-text brand-text--prada">PRADA</span>
          {/* Calvin Klein text */}
          <span className="brand-text brand-text--calvin">Calvin Klein</span>
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <section className="products-section" id="new-arrivals">
        <h2 className="section-heading">NEW ARRIVALS</h2>
        <div className="products-grid">
          {NEW_ARRIVALS.map((p) => (
            <ProductCard
              key={p.name}
              img={p.img}
              name={p.name}
              rating={p.rating}
              ratingCount={p.ratingCount}
            />
          ))}
        </div>
        <div className="view-all-wrap">
          <a href="#" className="view-all-btn">
            View All
          </a>
        </div>
      </section>

      <div className="section-divider" />

      {/* TOP SELLING */}
      <section className="products-section" id="top-selling">
        <h2 className="section-heading">TOP SELLING</h2>
        <div className="products-grid">
          {TOP_SELLING.map((p) => (
            <ProductCard
              key={p.name}
              img={p.img}
              name={p.name}
              rating={p.rating}
              ratingCount={p.ratingCount}
            />
          ))}
        </div>
        <div className="view-all-wrap">
          <a href="#" className="view-all-btn">
            View All
          </a>
        </div>
      </section>

      {/* BROWSE BY DRESS STYLE */}
      <section className="dress-style-section">
        <div className="dress-style-inner">
          <h2 className="section-heading">BROWSE BY DRESS STYLE</h2>
          <div className="dress-style-grid">
            <a href="#" className="dress-style-card dress-style-card--casual">
              <span className="dress-style-label">Casual</span>
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80"
                alt="Casual style"
                className="dress-style-img"
              />
            </a>
            <a href="#" className="dress-style-card dress-style-card--formal">
              <span className="dress-style-label">Formal</span>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                alt="Formal style"
                className="dress-style-img"
              />
            </a>
            <a href="#" className="dress-style-card dress-style-card--party">
              <span className="dress-style-label">Party</span>
              <img
                src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&q=80"
                alt="Party style"
                className="dress-style-img"
              />
            </a>
            <a href="#" className="dress-style-card dress-style-card--gym">
              <span className="dress-style-label">Gym</span>
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80"
                alt="Gym style"
                className="dress-style-img"
              />
            </a>
          </div>
        </div>
      </section>

      {/* HAPPY CUSTOMERS */}
      <section className="reviews-section">
        <div className="reviews-header">
          <h2 className="section-heading reviews-heading">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="reviews-nav">
            <button className="reviews-nav-btn" aria-label="Previous reviews">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.70406 4.4541L2.95406 11.2041C2.84918 11.3086 2.76597 11.4328 2.70919 11.5696C2.6524 11.7063 2.62317 11.8529 2.62317 12.001C2.62317 12.149 2.6524 12.2957 2.70919 12.4324C2.76597 12.5691 2.84918 12.6933 2.95406 12.7979L9.70406 19.5479C9.91541 19.7592 10.2021 19.8779 10.5009 19.8779C10.7998 19.8779 11.0865 19.7592 11.2978 19.5479C11.5092 19.3365 11.6279 19.0499 11.6279 18.751C11.6279 18.4521 11.5092 18.1654 11.2978 17.9541L6.46875 13.125L20.25 13.125C20.5484 13.125 20.8345 13.0065 21.0455 12.7955C21.2565 12.5846 21.375 12.2984 21.375 12C21.375 11.7017 21.2565 11.4155 21.0455 11.2045C20.8345 10.9936 20.5484 10.875 20.25 10.875L6.46875 10.875L11.2988 6.04598C11.5101 5.83463 11.6288 5.54799 11.6288 5.2491C11.6288 4.95022 11.5101 4.66357 11.2988 4.45223C11.0874 4.24088 10.8008 4.12215 10.5019 4.12215C10.203 4.12215 9.91634 4.24088 9.705 4.45223L9.70406 4.4541Z"
                  fill="black"
                />
              </svg>
            </button>
            <button className="reviews-nav-btn" aria-label="Next reviews">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.2959 4.4541L21.0459 11.2041C21.1508 11.3086 21.234 11.4328 21.2908 11.5696C21.3476 11.7063 21.3768 11.8529 21.3768 12.001C21.3768 12.149 21.3476 12.2957 21.2908 12.4324C21.234 12.5691 21.1508 12.6933 21.0459 12.7979L14.2959 19.5479C14.0846 19.7592 13.7979 19.8779 13.4991 19.8779C13.2002 19.8779 12.9135 19.7592 12.7022 19.5479C12.4908 19.3365 12.3721 19.0499 12.3721 18.751C12.3721 18.4521 12.4908 18.1654 12.7022 17.9541L17.5313 13.125L3.75 13.125C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5846 2.625 12.2984 2.625 12C2.625 11.7017 2.74353 11.4155 2.95451 11.2045C3.16548 10.9936 3.45163 10.875 3.75 10.875L17.5313 10.875L12.7013 6.04598C12.4899 5.83463 12.3712 5.54799 12.3712 5.2491C12.3712 4.95022 12.4899 4.66357 12.7013 4.45223C12.9126 4.24088 13.1992 4.12215 13.4981 4.12215C13.797 4.12215 14.0837 4.24088 14.295 4.45223L14.2959 4.4541Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="newsletter-box">
          <h2 className="newsletter-heading">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="newsletter-form">
            <div className="newsletter-input-wrap">
              <svg className="email-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 4.125H3C2.70163 4.125 2.41548 4.24353 2.2045 4.4545C1.99353 4.66548 1.875 4.95163 1.875 5.25V18C1.875 18.4973 2.07254 18.9742 2.42417 19.3258C2.77581 19.6775 3.25272 19.875 3.75 19.875H20.25C20.7473 19.875 21.2242 19.6775 21.5758 19.3258C21.9275 18.9742 22.125 18.4973 22.125 18V5.25C22.125 4.95163 22.0065 4.66548 21.7955 4.4545C21.5845 4.24353 21.2984 4.125 21 4.125ZM12 11.9738L5.89219 6.375H18.1078L12 11.9738ZM8.69906 12L4.125 16.1925V7.8075L8.69906 12ZM10.3641 13.5262L11.2397 14.3297C11.4472 14.52 11.7185 14.6255 12 14.6255C12.2815 14.6255 12.5528 14.52 12.7603 14.3297L13.6359 13.5262L18.1078 17.625H5.89219L10.3641 13.5262ZM15.3009 12L19.875 7.8075V16.1925L15.3009 12Z"
                  fill="black"
                  fillOpacity="0.4"
                />
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="newsletter-btn">Subscribe to Newsletter</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="shop-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <span className="footer-logo">SHOP.CO</span>
            <p className="footer-brand-desc">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-links-col">
            <h4 className="footer-col-title">COMPANY</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4 className="footer-col-title">HELP</h4>
            <ul className="footer-links">
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4 className="footer-col-title">FAQ</h4>
            <ul className="footer-links">
              <li><a href="#">Account</a></li>
              <li><a href="#">Manage Deliveries</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Payments</a></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4 className="footer-col-title">RESOURCES</h4>
            <ul className="footer-links">
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Development Tutorial</a></li>
              <li><a href="#">How to - Blog</a></li>
              <li><a href="#">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            Shop.co &copy; 2000–2023, All Rights Reserved
          </p>
          <div className="payment-badges">
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">Mastercard</span>
            <span className="payment-badge">PayPal</span>
            <span className="payment-badge">Apple Pay</span>
            <span className="payment-badge">G Pay</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
