import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiTwotoneHeart } from 'react-icons/ai';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function JobPost({ offer }) {
  const [myFavorite, setMyFavorite] = useState({ isFavorite: false });
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    if (myFavorite !== undefined) {
      setIsLoaded(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      axios
        .get(`/api/user/${session?.user.id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [session?.user.id]);

  useEffect(() => {
    const getFavorite = async () => {
      const res = await axios.get(`/api/favorite`);
      const matchedData = res.data.find(
        (fav) => fav.offerId === offer.id && fav.userId === session?.user.id
      );
      setMyFavorite(matchedData || { isFavorite: false });

      setIsLoaded(true);
    };
    if (session?.user.id) {
      getFavorite();
    }
  }, [session?.user.id]);

  return (
    <Link href={`/offer/${offer.id}`} className="no-underline text-black">
      <div
        className=" border-solid overflow-scroll border-gray-200 border-2  w-[40vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
        key={offer.id}
      >
        <div className="flex justify-between">
          <h3>Poste: {offer.title}</h3>
          {myFavorite != undefined &&
            userData.role === 'APPLICANT' &&
            myFavorite != null &&
            myFavorite.isFavorite && <AiTwotoneHeart size={30} />}
        </div>
        <h3>Lieu: {offer.location}</h3>
        <h3>Contrat: {offer.contractType}</h3>
        <h3>Description:</h3>
        <h3>{offer.description}</h3>
        <h3>{offer.id}</h3>
      </div>
    </Link>
  );
}

export default JobPost;
