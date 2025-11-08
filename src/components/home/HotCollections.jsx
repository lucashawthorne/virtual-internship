import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import SkeletonCard from "../UI/SkeletonCard";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up" data-aos-duration="800" data-aos-offset="-80">Hot Collections</h2>
              <div data-aos="fade-up" data-aos-duration="800" data-aos-offset="-80" className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            key={loading ? "loading" : "loaded"}
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
              : collections.map((item, index) => (
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="-40" className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
