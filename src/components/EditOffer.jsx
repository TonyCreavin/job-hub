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

      <form ref={formRef} className="w-[80vw] ml-4">
        <div className="flex flex-row justify-between">
          <label className="flex flex-col">
            Title
            <input
              defaultValue={offer?.title}
              name="editTitle"
              type="text"
              className="border-gray-200 border-2 shadow-lg w-full rounded-md"
            />
          </label>

          <label className="flex flex-col">
            Location
            <input
              className="border-gray-200 border-2 shadow-lg w-full rounded-md"
              defaultValue={offer?.location}
              name="editLocation"
              type="text"
            />
          </label>
        </div>

        <div className="flex flex-row justify-between">
          <label className="flex flex-col">
            Website
            <input
              defaultValue={offer?.website}
              name="editWebsite"
              type="text"
              className="border-gray-200 border-2 shadow-lg w-full rounded-md"
            />
          </label>

          <label className="flex flex-col">
            Skills
            <input
              defaultValue={offer?.skills}
              name="editSkills"
              type="text"
              className="border-gray-200 border-2 shadow-lg w-full rounded-md"
            />
          </label>
        </div>

        <div className="flex flex-row justify-between">
          <label className="flex flex-col">
            ContractType
            <input
              defaultValue={offer?.contractType}
              name="editContractType"
              type="text"
              className="border-gray-200 border-2 shadow-lg w-full rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Company
            <input
              className="border-gray-200 border-2 shadow-lg w-full rounded-md"
              defaultValue={offer?.company}
              name="editCompany"
              type="text"
            />
          </label>
        </div>

        <div className="inputField">
          <div className="label">
            <label>Description</label>
          </div>
          <div>
            <textarea
              defaultValue={offer?.description}
              name="editDescription"
              type="text"
              className="border-gray-200 border-2 shadow-lg  rounded-md w-full h-[100px]"
            ></textarea>
            <label>Company Description</label>
            <textarea
              defaultValue={offer?.companyDescription}
              name="editCompanyDescription"
              type="text"
              className="border-gray-200 border-2 shadow-lg  rounded-md w-full h-[100px]"
            ></textarea>
          </div>
        </div>
      </form>

      <div className="modal-footer">
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
