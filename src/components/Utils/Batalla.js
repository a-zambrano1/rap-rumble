import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import leoteo from "../../media/leoteo.png";
import dkarlos from "../../media/dkarlos.png";
import vs from "../../media/vs.png";
import micro from "../../media/micro.png";
import uderap from "../../media/uderap.png";
import { storage, ref, getDownloadURL } from "./FirebaseConfig";

// Create an object that maps names to images
const images = {
  leoteo,
  dkarlos,
  micro,
  uderap,
};

function Batalla(props) {
  const [imageUrls, setImageUrls] = useState(null)
  const { mc1, mc2, pts1, pts2, winner, clicked } = props
  const imagesUrls = ["ospina.jpeg", "file.jpg"]

  useEffect(() => {
    const fetchImage = async () => {
      const urls = await Promise.all(
        imagesUrls.map(async (image) => {
          const imageRef = ref(storage, `gs://rap-rumble.appspot.com/${image}`)
          const urlImage = await getDownloadURL(imageRef)
          return urlImage;
        })
      );
      setImageUrls(urls);
    };
    fetchImage();
  }, []);

  return (
    <div
      className="h-auto w-auto flex hover:scale-105 cursor-pointer flex-col"
      onClick={clicked}
    >
      <div className="flex flex-col gap-5 my-auto items-center border-2 rounded-3xl relative md-2">
        <div className="flex flex-row ">
          <div className="text-center p-2">
            <div className="w-72 h-72 overflow-hidden rounded-3xl">
              {imageUrls ? (
                <img
                  className="w-full "
                  src={imageUrls[0]}
                  alt={mc1}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <p>Cargando imagen...</p>
              )}
            </div>
            <span className="text-[20px]">{mc1}</span>
          </div>
          <img
            src={vs}
            alt="vs"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="text-center p-2">
            <div className="w-72 h-72 overflow-hidden rounded-3xl">
              {imageUrls ? (
                <img
                  className="w-full "
                  src={imageUrls[1]}
                  alt={mc2}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <p>Cargando imagen...</p>
              )}
            </div>
            <span className="text-[20px] ">{mc2}</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex">
        <div
          className={`flex w-1/2 justify-center gap-5 my-auto py-3 border-2 rounded-3xl ${
            winner === mc1 ? "border-verde" : "border-red-500"
          }`}
        >
          <span>{pts1}</span>
        </div>
        <div
          className={`flex w-1/2 justify-center gap-5 my-auto py-3 border-2 rounded-3xl ${
            winner === mc2 ? "border-verde" : "border-red-500"
          }`}
        >
          <span>{pts2}</span>
        </div>
      </div>
    </div>
  );
}

export { Batalla };
