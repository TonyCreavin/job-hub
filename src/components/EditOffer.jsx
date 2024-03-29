import { useState, useContext } from 'react';
import LanguageContext from '../LanguageContext';
import { DescriptionEditor } from './Tiptap';
import { useRouter } from 'next/router';

export default function EditOffer({ offer, setShowEditOfferWindow }) {
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const [content, setContent] = useState('');

  const [formState, setFormState] = useState(offer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/offers/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: offer.id,
          title: formState.title,
          location: formState.location,
          contractType: formState.contractType,
          description: formState.description,
          company: formState.company,
          website: formState.website,
          skills: formState.skills,
          companyDescription: formState.companyDescription,
          salary: formState.salary,
        }),
      });
      router.push('/offers/consultantOffers');
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setFormState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="w-full mb-10 ">
          <h3 className="text-center my-5 text-2xl font-serif">
            {!language ? `Modifier l'Offre` : 'Edit Offer'}
          </h3>
          <form onSubmit={handleSubmit} className="w-[80vw] mx-auto">
            <div className="flex flex-col md:flex-row  justify-between  gap-[2vw]">
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="title">{!language ? 'Poste' : 'Post'}</label>
                <input
                  value={formState.title || ' '}
                  name="title"
                  onChange={handleInputChange}
                  id="title"
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                />
              </div>
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="location">
                  {!language ? 'Lieu' : 'Location'}{' '}
                </label>

                <input
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                  value={formState.location || ' '}
                  onChange={handleInputChange}
                  name="location"
                  type="text"
                  id="location"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="website">
                  {!language ? 'Site Web' : 'Website'}
                </label>

                <input
                  value={formState.website || ''}
                  onChange={handleInputChange}
                  name="website"
                  type="text"
                  id="website"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                />
              </div>
              <div className="flex flex-col  mb-2">
                <label htmlFor="skills">
                  {!language ? 'Compétences' : 'Skills'}
                </label>

                <input
                  value={formState.skills || ''}
                  onChange={handleInputChange}
                  name="skills"
                  type="text"
                  id="skills"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
              <div className="flex flex-col  mb-2">
                <label htmlFor="contractType">
                  {!language ? 'Type de Contrat' : 'Type of Contract'}
                </label>
                <input
                  value={formState.contractType || ' '}
                  onChange={handleInputChange}
                  name="contractType"
                  id="contractType"
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white"
                />
              </div>
              <div className="flex flex-col  mb-2">
                <label htmlFor="company">
                  {!language ? 'Entreprise' : 'Company'}
                </label>
                <input
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white"
                  value={formState.company || ' '}
                  onChange={handleInputChange}
                  name="company"
                  id="company"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="salary">{!language ? 'Salaire' : 'Salary'}</label>
              <input
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white"
                value={formState.salary || ' '}
                onChange={handleInputChange}
                name="salary"
                type="text"
                id="salary"
              />
            </div>
          </form>
          <div className="flex flex-col  mb-2">
            <p className="mt-5 ml-10">
              {!language
                ? `Description de l'entreprise`
                : 'Company Description'}
            </p>
            <div>
              <DescriptionEditor
                value={formState.companyDescription || ''}
                name="companyDescription"
                onChange={handleInputChange}
                type="text"
                id="companyDescription"
                setContent={(content) =>
                  setFormState({ ...formState, companyDescription: content })
                }
              />
            </div>
          </div>
          <div className="flex flex-col  mb-2">
            <p className="mt-5 ml-10">
              {!language ? `Description du Poste` : 'Job Description'}
            </p>

            <div>
              <DescriptionEditor
                value={formState.description || ''}
                name="description"
                onChange={handleInputChange}
                type="text"
                id="description"
                setContent={(content) =>
                  setFormState({ ...formState, description: content })
                }
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-[80vw] mx-auto">
            <div className=" flex flex-row justify-center my-4">
              <button
                onClick={() => setShowEditOfferWindow((state) => !state)}
                className="bg-red-500 ml-4 text-white rounded-md py-1 px-2"
              >
                {!language ? 'Retour' : 'Back'}
              </button>
              <button
                className="bg-blue-500 ml-4 text-white rounded-md py-1 px-2"
                onClick={() => {
                  handleSubmit;
                }}
              >
                {!language ? 'Sauvegarder' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
