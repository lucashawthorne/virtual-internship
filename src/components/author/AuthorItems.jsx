import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../NFTCard";
import SkeletonCard from "../UI/SkeletonCard";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        const authorData = response.data;

        // ✅ Map authorImage to each NFT
        const nfts = (authorData.nftCollection || []).map((nft) => ({
          ...nft,
          authorImage: authorData.authorImage,
          authorName: authorData.authorName,
          authorId: authorData.authorId,
        }));

        setItems(nfts);
      } catch (error) {
        console.error("Error fetching author items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) fetchAuthorItems();
  }, [authorId]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, items.length));
  };

  return (
    <>
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
                key={item.nftId || item.id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block" }}
              >
                <NFTCard item={item} loading={loading} />
              </div>
            ))}
      </div>

      {!loading && items.length === 0 && (
        <p className="text-center mt-4">No items found for this author.</p>
      )}

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

export default AuthorItems;
