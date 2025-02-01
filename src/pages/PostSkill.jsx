import { useState } from "react";

export default function PostSkill() {
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

  //HANDLE POST CALL
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://playground-08-backend.vercel.app/api/post-skill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMessage({
          show: true,
          message: "Skill posted successfully",
          type: "success",
        });
        setFormData({
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
        setTimeout(() => {
          setMessage({ ...message, show: false });
        }, 3000);
      }
    } catch (error) {
      console.log("UNABLE TO POST THE DATA", error);
      setMessage({
        show: true,
        message: "Unable to add the skill.",
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
        <h1>Post Your Skill</h1>

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

        {/* SKILL POSTING FORM */}
        <form onSubmit={handlePost}>
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
                setFormData({ ...formData, materialsNeeded: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary px-4" type="submit">
            Post Skill
          </button>
        </form>
      </main>
    </>
  );
}
