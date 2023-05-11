import React, { useState, useContext } from 'react';
import UploadCv from '../components/UploadCv';
import { sendNotification } from '../../lib/notification';
import LanguageContext from '../LanguageContext';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

export default function ProfileForm({ userData, session }) {
  const { language } = useContext(LanguageContext);
  const [formState, setFormState] = useState(userData);
  const router = useRouter();

  const values = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
  };

  const handleInputChange = (event) => {
    setFormState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const registrationmessage = !language
    ? 'Vos renseignements ont été enregistrés'
    : 'Your information has been saved';
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/user/editUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          id: session?.user.id,
          firstName: formState.firstName,
          lastName: formState.lastName,
          phone: formState.phone,
          github: formState.github,
          linkedin: formState.linkedin,
          skills: formState.skills,
          address: formState.address,
          city: formState.city,
          postcode: formState.postcode,
          country: formState.country,
        }),
      });
      toast(registrationmessage, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
      await sendNotification(values);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="jobseeker">
          <div style={{ width: '80vw', margin: 'auto' }}>
            <h2 className="text-center my-5 font-serif">
              {!language ? 'Mon Profil' : 'My Profile'}
            </h2>

            <div className="flex flex-col md:flex-row  justify-between  gap-[2vw]">
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="firstName"></label>
                {!language ? 'Prénom' : 'First Name'}
                <input
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px]"
                  placeholder="firstname"
                  value={formState.firstName || ''}
                  onChange={handleInputChange}
                  name="firstName"
                  id="firstName"
                  required
                />
              </div>
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="lastName"></label>
                {!language ? 'Nom' : 'Last Name'}
                <input
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px]"
                  placeholder="lastname"
                  value={formState.lastName || ''}
                  onChange={handleInputChange}
                  name="lastName"
                  id="lastName"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="phone"> </label>
                {!language ? 'Téléphone' : 'Phone'}
                <input
                  type="tel"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px]"
                  placeholder="phone"
                  value={formState.phone || ''}
                  onChange={handleInputChange}
                  name="phone"
                  id="phone"
                />
              </div>
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="github"> </label>
                Github
                <input
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px]"
                  placeholder="github"
                  value={formState.github || ''}
                  onChange={handleInputChange}
                  name="github"
                  id="github"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="linkedin"> </label>
                Linkedin
                <input
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px]"
                  placeholder="linkedin"
                  value={formState.linkedin || ''}
                  onChange={handleInputChange}
                  name="linkedin"
                  id="linkedin"
                />
              </div>
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="skills"> </label>
                {!language ? 'Compétences' : 'Skills'}
                <input
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px]"
                  placeholder="skills"
                  value={formState.skills || ''}
                  onChange={handleInputChange}
                  name="skills"
                  id="skills"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="address"> </label>
                {!language ? 'Adresse' : 'Address'}
                <input
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px]"
                  placeholder="address"
                  value={formState.address || ''}
                  onChange={handleInputChange}
                  name="address"
                  id="address"
                />
              </div>
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="city"> </label>
                {!language ? 'Ville' : 'City'}
                <input
                  type="text"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px] "
                  placeholder="city"
                  value={formState.city || ''}
                  onChange={handleInputChange}
                  name="city"
                  id="city"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="postcode"> </label>
                {!language ? 'Code postal' : 'Postcode'}
                <input
                  type="text"
                  placeholder="postcode"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[20px] "
                  value={formState.postcode || ''}
                  onChange={handleInputChange}
                  name="postcode"
                  id="postcode"
                />
              </div>
              <div className="flex flex-col  mb-2  ">
                <label htmlFor="country"> </label>
                {!language ? 'Pays' : 'Country'}
                <input
                  type="text"
                  placeholder="country"
                  className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white mb-[30px]"
                  value={formState.country || ''}
                  onChange={handleInputChange}
                  name="country"
                  id="country"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-[80vw] md:w-[40vw] bg-blue-500 h-[7vh] text-white rounded-lg mb-4"
            >
              {!language ? 'Envoyer' : 'Send'}
            </button>
          </div>
          {session && userData?.role === 'APPLICANT' && <UploadCv />}
        </div>
      </div>
    </>
  );
}
