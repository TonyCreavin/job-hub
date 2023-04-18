import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiTwotoneHeart } from 'react-icons/ai';

function JobDetailsPage({
  title,
  location,
  contractType,
  description,
  company,
  website,
  companyDescription,
  id,
  userId,
}) {
  const router = useRouter();
  console.log('id', id);

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [myFavorite, setMyFavorite] = useState({ isFavorite: false });
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    console.log('xxmyfavorite', myFavorite);
    if (myFavorite !== undefined) {
      setIsLoaded(false);
    }
  }, [myFavorite]);

  useEffect(() => {
    if (session?.user.id) {
      axios
        .get(`/api/user/${session?.user.id}`)
        .then((res) => {
          console.log('res.data => ', res.data);
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [session?.user.id]);

  const getFavorite = async () => {
    const res = await axios.get(`/api/favorite`).then((res) => {
      const matchedData = res.data.find((fav) => fav.offerId === id);
      console.log('matchedData', matchedData);
      setMyFavorite(matchedData);
    });
  };
  useEffect(() => {
    getFavorite();
  }, []);

  const handleClick = async () => {
    setMyFavorite((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    console.log('myFavorite', myFavorite);

    console.log(
      'favorite',
      myFavorite.isFavorite,
      myFavorite.id,
      myFavorite.userId,
      myFavorite.offerId,
      userId,
      id
    );
    console.log('iddddd', id);
    console.log('userIdddddd', userId);

    const res = await axios.put(`/api/favorite/edit`, {
      id: myFavorite.id,
      offerId: id,
      userId: session?.user.id,
      isFavorite: myFavorite.isFavorite,
    });
    console.log('res.data', res.data);
  };
  console.log('myFavorite XXX', myFavorite);
  if (isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="w-[80vw] h-screen   border-gray-200 border-2  mx-auto border-solid rounded-lg mt-3 p-2 overflow-scroll"
      key={id}
    >
      <div className="flex flex-col md:flex-row justify-between">
        {session &&
          userData?.role === 'APPLICANT' &&
          myFavorite != null &&
          myFavorite != undefined &&
          myFavorite.isFavorite === true && (
            <button onClick={handleClick}>
              <AiOutlineHeart size={30} />
            </button>
          )}
        {session &&
          userData?.role === 'APPLICANT' &&
          myFavorite != null &&
          myFavorite != undefined &&
          myFavorite.isFavorite === false && (
            <button onClick={handleClick}>
              <AiTwotoneHeart size={30} />
            </button>
          )}

        <h3>Post: {title}</h3>
        <h3>Location: {location}</h3>

        <h3>Contract: {contractType}</h3>
      </div>
      <div className="flex flex-row justify-between">
        <h3>company :{company}</h3>
        <h3>website :{website}</h3>
      </div>
      <h3>company description :</h3>
      <h3>{companyDescription}</h3>
      <h3>Description:</h3>
      <h3>{description}</h3>
      <h3>id: {id}</h3>
      <h3>userId : {userId}</h3>
    </div>
  );
}

export default JobDetailsPage;
