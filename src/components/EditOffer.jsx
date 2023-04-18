import { useState, useRef } from 'react';
import axios from 'axios';

export default function EditOffer({ closeModal, offer }) {
  const formRef = useRef();
  const [disable, setDisable] = useState(false);

  async function editOffer() {
    setDisable(true);
    const {
      editTitle,
      editLocation,
      editSkills,
      editWebsite,
      editDescription,
      editContractType,
      editCompany,
    } = formRef.current;
    const title = editTitle.value;
    const location = editLocation.value;
    const skills = editSkills.value;
    const website = editWebsite.value;
    const description = editDescription.value;
    const contractType = editContractType.value;
    const company = editCompany.value;

    await axios.put('/api/offers/edit', {
      id: offer.id,
      title,
      location,
      skills,
      website,
      description,
      contractType,
      company,
    });
    setDisable(false);
    window.location.reload();
  }

  return (
    <div className="w-full mb-10">
      <h3 className="text-center my-5 text-2xl">Edit Offer</h3>

      <form ref={formRef} className="w-[80vw] mx-auto">
        <div className="flex flex-col md:flex-row  justify-between  gap-[2vw]">
          <div className="flex flex-col  mb-2  ">
            <label htmlFor="editTitle"></label>
            Title
            <input
              defaultValue={offer?.title}
              name="editTitle"
              id="editTitle"
              type="text"
              className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
            />
          </div>
          <div className="flex flex-col  mb-2  ">
            <label htmlFor="location"> </label>
            Location
            <input
              className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
              defaultValue={offer?.location}
              name="editLocation"
              type="text"
              id="location"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
          <div className="flex flex-col  mb-2  ">
            <label htmlFor="website"></label>
            Website
            <input
              defaultValue={offer?.website}
              name="editWebsite"
              type="text"
              className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
            />
          </div>
          <div className="flex flex-col  mb-2  ">
            <label htmlFor="skills"></label>
            Skills
            <input
              defaultValue={offer?.skills}
              name="editSkills"
              type="text"
              id="skills"
              className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
          <div className="flex flex-col  mb-2  ">
            <label htmlFor="contractType">ContractType </label>
            <input
              defaultValue={offer?.contractType}
              name="editContractType"
              id="contractType"
              type="text"
              className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
            />
          </div>
          <div className="flex flex-col  mb-2  ">
            <label htmlFor="company">Company </label>
            <input
              className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
              defaultValue={offer?.company}
              name="editCompany"
              id="company"
              type="text"
            />
          </div>
        </div>

        <div className="inputField">
          <div className="label">
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <textarea
              defaultValue={offer?.description}
              name="editDescription"
              type="text"
              id="description"
              cols="30"
              rows="10"
              className="form form-control"
            ></textarea>
            <label>Company Description</label>
            <textarea
              defaultValue={offer?.companyDescription}
              name="editCompanyDescription"
              type="text"
              id="description"
              cols="30"
              rows="10"
              className="form form-control"
            ></textarea>
          </div>
        </div>
      </form>

      <div className=" flex flex-row justify-center my-4">
        <button
          className="bg-red-500 ml-4 text-white rounded-md py-1 px-2"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 ml-4 text-white rounded-md py-1 px-2"
          disabled={disable}
          onClick={() => editOffer()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
