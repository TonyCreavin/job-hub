import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiTwotoneHeart } from 'react-icons/ai';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';
import parser from 'html-react-parser';

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
        className=" border-solid overflow-scroll border-gray-200 border-2  w-[80vw] h-[40vh] md:w-[40vw] m-4 rounded-lg p-3 bg-white"
        key={offer.id}
      >
        <div className="flex justify-between">
          <h5 className=" font-semibold font-serif">{offer.title}</h5>
          {myFavorite != undefined &&
            userData.role === 'APPLICANT' &&
            myFavorite != null &&
            myFavorite.isFavorite && <AiTwotoneHeart size={30} />}
        </div>

        <h5 className="text-blue-400 font-normal text-md font-serif">
          {offer.company}
        </h5>
        <h6 className="font-sans">
          💰 {language && !offer.salary && 'to be negotiated'}
          {!language && !offer.salary && 'à négocier'}
          {offer.salary && offer.salary}
        </h6>
        <div className="flex justify-start gap-4 border-slate-500 border-b-2 mb-5">
          <h6 className=" text-gray-700 font-serif">{offer.contractType}</h6>
          <h6 className=" text-gray-700 font-serif"> {offer.location}</h6>
        </div>
        <h5 className="font-serif font-medium ">
          {!language ? 'Description du poste:' : 'Job description:'}
        </h5>
        <div>{parser(offer.description)}</div>
      </div>
    </Link>
  );
}

export default JobPost;
