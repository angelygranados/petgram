import React from "react";
import { PhotoCard } from "../PhotoCard";
import { Ul } from "./styles";

export const ListOfPhotoCardsComponent = ({ data: { photos = [] } } = {}) => {
  return (
    <Ul>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} {...photo} />
      ))}
    </Ul>
  );
};
