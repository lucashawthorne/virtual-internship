import React from "react";
import "./SkeletonItemDetails.css";

const SkeletonItemDetails = () => {
  return (
    <div className="skeleton-item-details container">
      <div className="row">
        {/* Left side - NFT image */}
        <div className="col-md-6 text-center">
          <div className="skeleton-box skeleton-nft-image"></div>
        </div>

        {/* Right side - info section */}
        <div className="col-md-6">
          <div className="skeleton-box skeleton-title"></div>

          <div className="skeleton-info-counts d-flex gap-2 my-3">
            <div className="skeleton-box skeleton-icon"></div>
            <div className="skeleton-box skeleton-icon"></div>
          </div>

          <div className="skeleton-box skeleton-description"></div>
          <div className="skeleton-box skeleton-description short"></div>

          <div className="skeleton-owner mt-4">
            <div className="skeleton-box skeleton-subtitle"></div>
            <div className="d-flex align-items-center mt-2 gap-3">
              <div className="skeleton-box skeleton-avatar"></div>
              <div className="skeleton-box skeleton-name"></div>
            </div>
          </div>

          <div className="skeleton-creator mt-4">
            <div className="skeleton-box skeleton-subtitle"></div>
            <div className="d-flex align-items-center mt-2 gap-3">
              <div className="skeleton-box skeleton-avatar"></div>
              <div className="skeleton-box skeleton-name"></div>
            </div>
          </div>

          <div className="skeleton-price mt-5">
            <div className="skeleton-box skeleton-subtitle"></div>
            <div className="skeleton-box skeleton-price-bar mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonItemDetails;
