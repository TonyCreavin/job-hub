import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LanguageContext from '../../LanguageContext';
import { useContext } from 'react';

function Create_offer(props) {
  const { language } = useContext(LanguageContext);
  const [categories, setCategories] = useState([]);

  const [offer, setOffer] = useState(null);
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [formState, setFormState] = useState({
    title: '',
    location: '',
    website: '',
    contractType: '',
    description: '',
    skills: '',
    company: '',
    companyDescription: '',
    categoryId: '',
  });

  const [formCategory, setFormCategory] = useState({
    name: '',
  });

  const getOffers = async () => {
    const response = await axios.get('/api/offers');
    const data = await response.data;
    console.log('res.data =>', response.data);
    setOffers(data);
    console.log('data =>', data);
  };

  const getCategory = async () => {
    const response = await axios.get('/api/category');
    const data = await response.data;
    setCategories(data);
  };
  useEffect(() => {
    getCategory();
  }, []);

  // useEffect(() => {
  //   const findOffer = () => {
  //     const offer = offers.find(
  //       (off) =>
  //         off.title === formState.title &&
  //         off.contractType === formState.contractType &&
  //         off.location === formState.location &&
  //         off.company === formState.company &&
  //         off.companyDescription === formState.companyDescription &&
  //         off.description === formState.description &&
  //         off.skills === formState.skills &&
  //         off.website === formState.website &&
  //         off.categoryId === formState.categoryId
  //     );
  //     if (offer) {
  //       setOffer(offer);
  //     }
  //   };

  //   findOffer();
  // }, [offers, formState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = props.data.user.id;

    const response = await axios.post(
      '/api/offers/create',
      {
        ...formState,
        userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    await getOffers();
    // console.log('there are the offers =>', offers);
    // const offer = offers.find(
    //   (off) =>
    //     off.title === formState.title &&
    //     off.contractType === formState.contractType &&
    //     off.location === formState.location &&
    //     off.company === formState.company &&
    //     off.companyDescription === formState.companyDescription &&
    //     off.description === formState.description &&
    //     off.skills === formState.skills &&
    //     off.website === formState.website &&
    //     off.categoryId === formState.categoryId
    // );
    // setOffer(offer);

    // const offerIdentifier = offer.id;
    // console.log('this is my offer identifier =>', offerIdentifier);
    // const res = await axios.post('/api/favorite/create', {
    //   offerId: offerIdentifier,
    //   isFavorite: true,
    // });

    router.push('/');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  console.log('this is my session =>', props.data.user.id);
  return (
    <div className="container">
      <div className="recruiter">
        <div style={{ width: '80vw', margin: 'auto' }}>
          <h2 className="text-center my-5">
            {!language ? 'Créer un offre ' : 'Create an offer'}
          </h2>

          <form className="row d-flex justify-content-around">
            <div className="col-md-6">
              <input
                type="text"
                value={formState.title}
                onChange={handleInputChange}
                className="form form-control"
                placeholder={!language ? `titre de l'offre` : 'offer title'}
                style={{ marginBottom: '5vh' }}
                name="title"
                id="title"
              />
              <input
                value={formState.contractType}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder={!language ? 'type de contrat' : 'contract type'}
                style={{ marginBottom: '5vh' }}
                name="contractType"
                id="contractType"
              />
            </div>

            <div className="col-md-6">
              <input
                value={formState.company}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder={!language ? 'entreprise' : 'company'}
                style={{ marginBottom: '5vh' }}
                name="company"
                id="company"
              />
              <input
                value={formState.location}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder={!language ? 'lieu' : 'location'}
                style={{ marginBottom: '5vh' }}
                name="location"
                id="location"
              />
            </div>

            <select
              onChange={handleInputChange}
              name="categoryId"
              id="categoryId"
              className="border-solid border-gray-300 border-[1px] h-[5vh] w-[65vw] rounded-md mb-5"
            >
              <option className="text-center">
                {!language ? 'Sélectionnez une catégorie' : 'Select a category'}
              </option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="col-12">
              <input
                value={formState.website}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder={!language ? 'site web' : 'website'}
                style={{ marginBottom: '5vh' }}
                name="website"
                id="website"
              />
            </div>

            <div className="col-12">
              <textarea
                className="form form-control"
                value={formState.description}
                onChange={handleInputChange}
                id="description"
                cols="30"
                rows="10"
                name="description"
                placeholder={!language ? 'description' : 'description'}
                style={{ marginBottom: '5vh' }}
              ></textarea>

              <textarea
                className="form form-control"
                id="companyDescription"
                name="companyDescription"
                cols="30"
                rows="10"
                placeholder={
                  !language
                    ? `description de l'entreprise`
                    : 'company description'
                }
                style={{ marginBottom: '5vh' }}
                value={formState.companyDescription}
                onChange={handleInputChange}
              ></textarea>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-block"
                style={{ width: '100%', marginBottom: '5vh' }}
              >
                {!language ? 'Envoyer' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Create_offer;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('this is my session', session);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/',
        permanent: false,
      },
    };
  }

  return {
    props: { session, data: session },
  };
}
