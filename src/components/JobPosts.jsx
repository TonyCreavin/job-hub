import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiTwotoneHeart } from 'react-icons/ai';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';

function JobPost({ offer }) {
  const { language } = useContext(LanguageContext);
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
          <h3 className="text-black font-semibold font-serif">
            {' '}
            {offer.title}
          </h3>
          {myFavorite != undefined &&
            userData.role === 'APPLICANT' &&
            myFavorite != null &&
            myFavorite.isFavorite && <AiTwotoneHeart size={30} />}
        </div>
        <h3 className="font-serif text-[25px]">{offer.skills}</h3>
        <h3 className="text-blue-400 font-normal text-md font-serif">
          {offer.company}
        </h3>
        <div className="flex justify-start gap-4 border-slate-500 border-b-2 mb-5">
          <h3 className="text-[1.3rem] text-gray-700 font-serif">
            {offer.contractType}
          </h3>
          <h3 className="text-[1.3rem] text-gray-700 font-serif">
            {' '}
            {offer.location}
          </h3>
        </div>
        <h3 className="font-serif font-semibold text-[24px]">
          Description du poste:
        </h3>
        <h3 className="font-serif text-[1.3rem]">{offer.description}</h3>
      </div>
    </Link>
  );
}

export default JobPost;
