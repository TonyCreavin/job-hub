import React, { useEffect, useState, useContext } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LanguageContext from '../../LanguageContext';
import TipTap from '../../components/Tiptap';

function Create_offer(props) {
  const { language } = useContext(LanguageContext);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('');
  const [content2, setContent2] = useState('');
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
    salary: '',
  });

  const getOffers = async () => {
    const response = await axios.get('/api/offers');
    const data = await response.data;
    setOffers(data);
    router.push('/');
  };

  const getCategory = async () => {
    const response = await axios.get('/api/category');
    const data = await response.data;
    setCategories(data);
  };
  useEffect(() => {
    getCategory();
  }, []);

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
    router.push('/');
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormState({
      ...formState,

      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="recruiter">
        <div style={{ width: '80vw', margin: 'auto' }}>
          <h2 className="text-center my-5 ">
            {!language ? 'Créer un offre ' : 'Create an offer'}
          </h2>

          <div className="row d-flex justify-content-around">
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
                  {!language ? category.name : category.name_en}
                </option>
              ))}
            </select>

            <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
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

              <input
                value={formState.salary}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder={!language ? 'salaire' : 'salary'}
                style={{ marginBottom: '5vh' }}
                name="salary"
                id="salary"
              />
            </div>

            <div className="col-12">
              <h5>
                {!language
                  ? `Description du l'entreprise`
                  : 'Company Description'}
              </h5>
              <TipTap
                value={formState.companyDescription}
                onChange={handleInputChange}
                id="companyDescription"
                name="companyDescription"
                placeholder={
                  !language
                    ? `description de l'entreprise`
                    : 'company description'
                }
                setContent={(content) =>
                  setFormState({ ...formState, companyDescription: content })
                }
              />

              <h5>{!language ? 'Description du poste' : 'Job description'}</h5>
              <TipTap
                value={formState.description}
                onChange={handleInputChange}
                id="description"
                name="description"
                placeholder={!language ? 'description' : 'description'}
                setContent={(content) =>
                  setFormState({ ...formState, description: content })
                }
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-block"
                style={{ width: '100%', marginBottom: '5vh' }}
              >
                {!language ? 'Envoyer' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Create_offer;

export async function getServerSideProps(context) {
  const session = await getSession(context);

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
