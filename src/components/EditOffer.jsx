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
    } = formRef.current;
    const title = editTitle.value;
    const location = editLocation.value;
    const skills = editSkills.value;
    const website = editWebsite.value;
    const description = editDescription.value;
    const contractType = editContractType.value;

    await axios.put('/api/edit', {
      id: offer.id,
      title,
      location,
      skills,
      website,
      description,
      contractType,
    });
    setDisable(false);
    window.location.reload();
  }

  return (
    <div>
      <div onClick={() => closeModal()}></div>
      <div className="w-full">
        <h3 className="text-center my-5 text-2xl">Edit Offer</h3>
        <span
          style={{ padding: '10px', cursor: 'pointer' }}
          onClick={() => closeModal()}
        >
          X
        </span>

        <div>
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

              <label classNAme="flex flex-col">
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

            <div className="inputField">
              <div className="label">
                <label className="flex flex-col">
                  ContractType
                  <input
                    defaultValue={offer?.contractType}
                    name="editContractType"
                    type="text"
                    className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                  />
                </label>
              </div>
              <div></div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  defaultValue={offer?.description}
                  style={{ width: '100%', height: '100px' }}
                  name="editDescription"
                  type="text"
                  className="border-gray-200 border-2 shadow-lg  rounded-md"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={() => closeModal()}>Cancel</button>
          <button
            disabled={disable}
            className="btn"
            onClick={() => editOffer()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
