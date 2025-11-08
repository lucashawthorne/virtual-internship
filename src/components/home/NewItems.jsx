import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import SkeletonCard from "../UI/SkeletonCard";
import NFTCard from "../NFTCard";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setItems(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up" data-aos-duration="800" data-aos-offset="-80">New Items</h2>
              <div data-aos="fade-up" data-aos-duration="800" data-aos-offset="-80" className="small-border bg-color-2"></div>
            </div>
          </div>

          <OwlCarousel
            key={loading ? "loading" : "loaded"} // <- forces remount to fix perpetual loading
            className="owl-theme"
            loop
            margin={10}
            nav
            dots={false}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 4 },
            }}
          >
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <div className="item" key={i}>
                      <SkeletonCard />
                    </div>
                  ))
              : items.map((item, index) => (
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="-40" className="item" key={index}>
                    <NFTCard item={item} loading={loading} />
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
