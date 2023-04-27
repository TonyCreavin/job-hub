import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiTwotoneHeart } from 'react-icons/ai';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';
import Link from 'next/link';

function JobDetailsPage({
  title,
  location,
  contractType,
  description,
  company,
  website,
  skills,
  companyDescription,
  id,
  userId,
}) {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  // console.log('id', id);

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
      <div className="flex flex-col md:flex-row justify-between">
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

        <h3 className="text-black font-semibold font-serif">{title}</h3>

        <h3>{contractType}</h3>
      </div>
      <h3 className="font-serif text-[25px]">{skills}</h3>
      <div className="flex flex-row justify-between">
        <h3 className="text-blue-400 font-normal text-md font-serif">
          {company}
        </h3>
        <a href={`http://${website}/`}>{website}</a>
      </div>
      <h3 className="text-md text-gray-700 font-serif border-b-2 border-slate-500 mb-5 pb-3">
        {location}
      </h3>
      <h3>
        {!language ? `Description de l'entreprise` : 'Company description'}
      </h3>
      <h3 className="font-serif text-[1.5rem] border-b-2 border-slate-500 mb-5 pb-3">
        {companyDescription}
      </h3>
      <h3>Description:</h3>
      <h3 className="font-serif text-[1.5rem]">{description}</h3>
    </div>
  );
}

export default JobDetailsPage;
