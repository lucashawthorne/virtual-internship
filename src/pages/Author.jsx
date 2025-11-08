import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      followers: prevAuthor.followers + (isFollowing ? -1 : 1),
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAuthorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="text-light">
            <div className="container">
              <div className="skeleton-banner shimmer"></div>
              <div className="skeleton-profile shimmer"></div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section">
            <div className="container">
              <p>Author not found.</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${author.banner || AuthorBanner}) top`}
          style={{ background: `url(${author.banner || AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {/* AUTHOR PROFILE */}
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage || AuthorImage}
                        alt={author.authorName}
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={() =>
                              navigator.clipboard.writeText(author.address)
                            }
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUTHOR’S NFT COLLECTION */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
