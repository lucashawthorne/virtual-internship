import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../NFTCard";
import SkeletonCard from "../UI/SkeletonCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true); // show loading while fetching
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
            filter ? `?filter=${filter}` : ""
          }`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching Explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]); // dependency on filter so it refetches whenever filter changes

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, items.length));
  };

  return (
    <>
      <div className="mb-4">
        <select
          id="filter-items"
          value={filter}
          onChange={handleFilterChange}
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      <div className="row">
        {loading
          ? Array(8)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block" }}
                >
                  <SkeletonCard />
                </div>
              ))
          : items.slice(0, visibleCount).map((item) => (
              <div
                key={item.nftId}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block" }}
              >
                <NFTCard item={item} loading={loading} />
              </div>
            ))}
      </div>

      {/* Load More Button */}
      {visibleCount < items.length && !loading && (
        <div className="col-md-12 text-center mt-4">
          <button onClick={handleLoadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
