import React from "react";

const ProductCard = ({ productData: { _id, picture, name } }) => {
  return (
    <>
      <div key={_id}>
        <div className="img-wrapper">
          <img src={`${picture}`} alt="picture" />
        </div>
        <p className="item-text">{name}</p>
      </div>
    </>
  );
};

export default ProductCard;
