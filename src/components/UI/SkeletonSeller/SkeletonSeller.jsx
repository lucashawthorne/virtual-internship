import React from "react";
import "./SkeletonSeller.css";

const SkeletonSeller = () => {
  return (
    <li className="skeleton-seller">
      <div className="author_list_pp">
        <div className="skeleton-circle shimmer"></div>
      </div>
      <div className="author_list_info">
        <div className="skeleton-rect shimmer" style={{ width: "80px", height: "16px", marginBottom: "6px" }}></div>
        <div className="skeleton-rect shimmer" style={{ width: "40px", height: "14px" }}></div>
      </div>
    </li>
  );
};

export default SkeletonSeller;