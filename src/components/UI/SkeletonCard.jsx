// components/UI/SkeletonCard.jsx
import React from "react";
import Skeleton from "./Skeleton";

const SkeletonCard = () => {
  return (
    <div className="item">
      <div className="nft_coll">
        {/* Top image placeholder */}
        <div className="nft_wrap">
          <Skeleton width="100%" height="200px" borderRadius="10px 10px 0 0" />
        </div>

        {/* Profile image placeholder */}
        <div className="nft_coll_pp" style={{ marginTop: "-50px" }}>
          <Skeleton width="60px" height="60px" borderRadius="50%" />
        </div>

        {/* Text placeholders */}
        <div className="nft_coll_info text-center">
          <Skeleton width="80%" height="18px" borderRadius="4px" />
          <div style={{ marginTop: "8px" }}>
            <Skeleton width="50%" height="14px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
