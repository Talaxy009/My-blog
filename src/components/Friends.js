import React from "react";
import Image from "gatsby-image";

const Friends = ({ avatars = [], props = [], data = [] }) => {
  return (
    <div className="friend-card-list">
      {data.site.siteMetadata.friendship.map(friend => {
        const image = avatars.find(v =>
          new RegExp(friend.image).test(v.relativePath)
        );
        return (
          <div
            key={friend.name}
            className="friend-card"
            onClick={() => window.open(friend.url)}
            onKeyDown={() => window.open(friend.url)}
            role="button"
            tabIndex="0"
          >
            <Image
              alt={props.alt}
              fluid={image.childImageSharp.fluid}
              style={{
                flex: 1,
                maxWidth: 50,
                borderRadius: "100%"
              }}
              imgStyle={{
                borderRadius: "50%"
              }}
            />
            <div className="friend-card-content">
              <span>{friend.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Friends;
