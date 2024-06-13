import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import leoteo from "../../media/leoteo.png";
import dkarlos from "../../media/dkarlos.png";
import vs from "../../media/vs.png";
import micro from "../../media/micro.png";
import uderap from "../../media/uderap.png";
import { storagePictures, ref, getDownloadURL } from "./FirebaseConfig";
import { getMemberByIdApi } from "../../Services/APIS/getMemberById";
import { getUserByIdApi } from "../../Services/APIS/GetUserById";
import xRaper from "../../media/x.png"



function Batalla(props) {
  const { mc1, mc2, pts1, pts2, winner, clicked } = props;
  const [imageUrls, setImageUrls] = useState([]);

  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);

  const [user1, setUser1] = useState(
    {
      id: 0,
      aka: "Cargando...",
      profilePicture: "",
    }
  );
  const [user2, setUser2] = useState({
    id: 0,
    aka: "Cargando...",
    profilePicture: "",
  });

  useEffect(() => {
    if (mc1 && mc2) {
      getMembers();
    }
  }
    , [mc1, mc2]);

  useEffect(() => {
    if (user1 && user2) {
      fetchImageUrls();
    }
  }, [user1, user2]);

  const getMembers = async () => {

    await getMemberByIdApi(mc1).then(async (data) => {
      setMember1(data);
      await getUserByIdApi(data[0].idUserMember).then((data) => {
        setUser1(data);
      });
    });
    await getMemberByIdApi(mc2).then(async (data) => {
      setMember2(data);
      await getUserByIdApi(data[0].idUserMember).then((data) => {
        setUser2(data);
      });
    });
  }

  
  const fetchImageUrls = async () => {
    const urls = []; 
    if (user1 && user1.profilePicture) {
      const imageRef = ref(storagePictures, `${user1.profilePicture}`);
      const url = await getDownloadURL(imageRef);
      urls.push(url);
    }
    if (user2 && user2.profilePicture) {
      const imageRef = ref(storagePictures, `${user2.profilePicture}`);
      const url = await getDownloadURL(imageRef);
      urls.push(url);
    }
    setImageUrls(urls);
  }


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
                  className="w-full h-full"
                  src={imageUrls[0] || xRaper}
                  alt={mc1}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <p>Cargando imagen...</p>
              )}
            </div>
            <span className="text-[20px]">{user1.aka || ''}</span>
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
                  className="w-full h-full"
                  src={imageUrls[1]  || xRaper}
                  alt={mc2}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <p>Cargando imagen...</p>
              )}
            </div>
            <span className="text-[20px] ">{user2.aka || ''}</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex">
        <div
          className={`flex w-1/2 justify-center gap-5 my-auto py-3 border-2 rounded-3xl ${winner === mc1 ? "border-verde" : "border-red-500"
            }`}
        >
          <span>{pts1}</span>
        </div>
        <div
          className={`flex w-1/2 justify-center gap-5 my-auto py-3 border-2 rounded-3xl ${winner === mc2 ? "border-verde" : "border-red-500"
            }`}
        >
          <span>{pts2}</span>
        </div>
      </div>
    </div>
  );
}

export { Batalla };
