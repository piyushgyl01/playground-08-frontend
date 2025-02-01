import { useParams } from "react-router";
import useFetch from "../useFetch";
import { useState } from "react";

export default function SkillDetails() {
  //STATES
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    exchangeType: "",
    sessionDetails: {
      duration: "",
      frequency: "",
      platform: "",
    },
    prerequisites: "",
    materialsNeeded: "",
  });
  const [message, setMessage] = useState({
    show: false,
    message: "",
    type: "warning",
  });

  // USEPARAMS
  const { skillID } = useParams();
  const [showEdit, setShowEdit] = useState(false);

  // FETCH DATA WITH USE-FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://playground-08-backend.vercel.app/api/get-skill"
  );

  // FINDING THE SKILL
  const foundSkill = data?.find((skill) => skill._id === skillID);

  // LOADING AND ERROR STATES
  if (loading)
    return (
      <div className="container mt-4">
        <div class=" spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return <div className="text-center text-danger">Error: {error}</div>;
  if (!foundSkill) return <div className="text-center">Skill not found!</div>;

  //HANDLE EDIT CLICK FUNCTION
  const handleEditClick = () => {
    setFormData({
      title: foundSkill.title,
      category: foundSkill.category,
      description: foundSkill.description,
      exchangeType: foundSkill.exchangeType,
      sessionDetails: {
        duration: foundSkill.sessionDetails.duration,
        frequency: foundSkill.sessionDetails.frequency,
        platform: foundSkill.sessionDetails.platform,
      },
      prerequisites: foundSkill.prerequisites,
      materialsNeeded: foundSkill.materialsNeeded,
    });
    setShowEdit(!showEdit);
  };

  //HANDLE EDIT FUNCTION
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://playground-08-backend.vercel.app/api/put-skill/${skillID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        refetch();
        setMessage({
          show: true,
          message: "Skill edited successfully",
          type: "success",
        });
        setShowEdit(false);
        setTimeout(() => {
          setMessage({ ...message, show: false });
        }, 3000);
      }
    } catch (error) {
      console.log("UNABLE TO edit THE DATA", error);
      setMessage({
        show: true,
        message: "Unable to edit the skill.",
        type: "warning",
      });
      setTimeout(() => {
        setMessage({ ...message, show: false });
      }, 3000);
    }
  };

  return (
    <>
      <main className="container my-4">
        {/* LOADING STATES */}
        {message.show && (
          <div className="row">
            <div className="col-md-12">
              <p
                className={
                  message.type === "warning"
                    ? "bg-danger-subtle p-3 rounded"
                    : "bg-success-subtle p-3 rounded"
                }
              >
                {message.message}
              </p>
            </div>
          </div>
        )}

        {/* SKILL DETAILS DISPLAY */}
        <h1 className="mb-4">Skill Details</h1>
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">{foundSkill.title}</h4>
            <p className="card-text">
              <strong>Category: </strong>
              {foundSkill.category}
            </p>
            <p className="card-text">
              <strong>Exchange Type: </strong>
              {foundSkill.exchangeType}
            </p>
            <p className="card-text">
              <strong>Description: </strong>
              {foundSkill.description}
            </p>
            <p className="card-text">
              <strong>Prerequisites: </strong>
              {foundSkill.prerequisites}
            </p>
            <p className="card-text">
              <strong>Materials Needed: </strong>
              {foundSkill.materialsNeeded}
            </p>

            {/* Session Details */}
            <div className="mt-4">
              <h5>Session Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Duration: </strong>
                  {foundSkill.sessionDetails.duration}
                </li>
                <li className="list-group-item">
                  <strong>Frequency: </strong>
                  {foundSkill.sessionDetails.frequency}
                </li>
                <li className="list-group-item">
                  <strong>Platform: </strong>
                  {foundSkill.sessionDetails.platform}
                </li>
              </ul>
            </div>

            <button className="btn btn-primary mt-3" onClick={handleEditClick}>
              {showEdit ? "Dismiss Edit" : "Edit Details"}
            </button>
          </div>
        </div>
        {showEdit && (
          <>
            <h1>Edit Details of {foundSkill.title}</h1>
            <form onSubmit={handleEdit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
                <select
                  id="category"
                  className="form-select"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Art">Art</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  type="text"
                  id="description"
                  className="form-control"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="exchangeType" className="form-label">
                  Exchange Type:
                </label>
                <select
                  id="exchangeType"
                  className="form-select"
                  required
                  value={formData.exchangeType}
                  onChange={(e) =>
                    setFormData({ ...formData, exchangeType: e.target.value })
                  }
                >
                  <option value="">Select a exchange type</option>
                  <option value="Free">Free</option>
                  <option value="Barter">Barter</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  Duration:
                </label>
                <input
                  type="text"
                  id="duration"
                  className="form-control"
                  required
                  value={formData.sessionDetails.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sessionDetails: {
                        ...formData.sessionDetails,
                        duration: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="frequency" className="form-label">
                  Frequency:
                </label>
                <input
                  type="text"
                  id="frequency"
                  className="form-control"
                  required
                  value={formData.sessionDetails.frequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sessionDetails: {
                        ...formData.sessionDetails,
                        frequency: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="platform" className="form-label">
                  Platform:
                </label>
                <select
                  id="platform"
                  className="form-select"
                  required
                  value={formData.sessionDetails.platform}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sessionDetails: {
                        ...formData.sessionDetails,
                        platform: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select a platform</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="prerequisites" className="form-label">
                  Prerequisites:
                </label>
                <input
                  type="text"
                  id="prerequisites"
                  className="form-control"
                  required
                  value={formData.prerequisites}
                  onChange={(e) =>
                    setFormData({ ...formData, prerequisites: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="materialsNeeded" className="form-label">
                  Materials Needed:
                </label>
                <input
                  type="text"
                  id="materialsNeeded"
                  className="form-control"
                  required
                  value={formData.materialsNeeded}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      materialsNeeded: e.target.value,
                    })
                  }
                />
              </div>
              <button className="btn btn-primary px-4" type="submit">
                Save Changes
              </button>
            </form>
          </>
        )}
      </main>
    </>
  );
}
