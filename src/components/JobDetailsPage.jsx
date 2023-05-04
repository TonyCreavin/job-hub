import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiTwotoneHeart } from 'react-icons/ai';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';

import parser from 'html-react-parser';

function JobDetailsPage({
  title,
  location,
  contractType,
  description,
  company,
  website,
  companyDescription,
  id,
  salary,
  createdAt,
  updatedAt,
}) {
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [myFavorite, setMyFavorite] = useState({ isFavorite: false });
  const [isLoaded, setIsLoaded] = useState(true);
  const [button, setButton] = useState(false);

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
        (fav) => fav.offerId === id && fav.userId === session?.user.id
      );
      setMyFavorite(matchedData || { isFavorite: false });

      setIsLoaded(true);
    };
    if (session?.user.id) {
      getFavorite();
    }
  }, [session?.user.id]);

  const handleClick = async () => {
    const updatedFavorite = {
      ...myFavorite,
      isFavorite: !myFavorite.isFavorite,
    };
    setMyFavorite(updatedFavorite);

    try {
      const res = await axios.post(`/api/favorite/create`, {
        offerId: id,
        userId: session?.user.id,
        isFavorite: updatedFavorite.isFavorite,
      });
      setMyFavorite(res.data);
      localStorage.setItem(
        `myFavorite_${session?.user.id}`,
        JSON.stringify(res.data)
      );
      setButton(updatedFavorite.isFavorite);
    } catch (err) {
      console.log(err);
      setMyFavorite(myFavorite);
    }
  };

  const handleClick2 = async () => {
    const result = await axios.post(`/api/favorite/_delete`, {
      id: myFavorite.id,
    });
    setMyFavorite({ isFavorite: false });
    localStorage.removeItem(`myFavorite_${session?.user.id}`);
    setButton(false);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="w-[80vw] h-screen   border-gray-200 border-2  mx-auto border-solid rounded-lg mt-10 p-2 overflow-scroll"
      key={id}
    >
      <div className="flex flex-row justify-between">
        <h4 className=" font-semibold font-serif">{title}</h4>
        {session &&
          userData?.role === 'APPLICANT' &&
          myFavorite != null &&
          myFavorite != undefined &&
          !myFavorite.isFavorite && (
            <button onClick={handleClick}>
              <AiOutlineHeart size={30} />
            </button>
          )}
        {session &&
          userData?.role === 'APPLICANT' &&
          myFavorite != null &&
          myFavorite != undefined &&
          myFavorite.isFavorite === true && (
            <button onClick={handleClick2}>
              <AiTwotoneHeart size={30} />
            </button>
          )}
      </div>

      <div className="flex flex-row justify-between">
        <h4 className="text-blue-400 font-normal font-serif">{company}</h4>
        <a href={`http://${website}/`}>{website}</a>
      </div>

      <div className=" flex flex-row justify-between">
        <h5 className=" text-gray-700 font-serif ">{location}</h5>

        <h5 className=" font-serif ml-1 ">
          💰
          {language && !salary && ' to be negotiated'}
          {!language && !salary && ' à négocier'}
          {salary && salary}
        </h5>
      </div>
      <div className="border-b-2 border-slate-500 mb-5 ">
        <h5 className="font-serif">{contractType}</h5>
      </div>

      <h5 className="font-serif font-semibold ">
        {!language ? `Description de l'entreprise` : 'Company description'}
      </h5>
      <div className="border-b-2 border-slate-500 mb-5">
        {companyDescription && parser(companyDescription)}
      </div>

      <h5 className="font-serif font-semibold">
        {!language ? 'Description du poste' : 'Job description'}
      </h5>
      <div>{description && parser(description)}</div>
      <p className=" text-gray-700 font-serif ">
        {!language ? 'Date de publication' : 'Publication date '}:
        {createdAt.substring(8, 10)}/{createdAt.substring(5, 7)}/
        {createdAt.substring(0, 4)}
      </p>
      {updatedAt > createdAt && (
        <p className=" text-gray-700 font-serif ">
          {!language ? 'Mise à jour' : 'Update '}:{createdAt.substring(8, 10)}/
          {createdAt.substring(5, 7)}/{createdAt.substring(0, 4)}
        </p>
      )}
    </div>
  );
}

export default JobDetailsPage;
