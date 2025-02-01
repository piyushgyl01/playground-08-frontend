import { Link } from "react-router";
import useFetch from "../useFetch.jsx";
import { useState } from "react";

export default function SkillListing() {
  //STATES
  const [searchFilter, setSearchFilter] = useState("");
  const [message, setMessage] = useState({
    show: false,
    message: "",
    type: "warning",
  });

  //FETCH DATA WITH USE-FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://playground-08-backend.vercel.app/api/get-skill"
  );

  //SEARCH FUCNTION
  const filteredData =
    searchFilter === ""
      ? data
      : data.filter((skill) =>
          skill.title.toLowerCase().includes(searchFilter.toLowerCase())
        );

  //HANDLE DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://playground-08-backend.vercel.app/api/delete-skill/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await refetch();
        setMessage({
          show: true,
          message: "Skill Deleted.",
          type: "success",
        });
        setTimeout(() => {
          setMessage({ ...message, show: false });
        }, 3000);
      }
    } catch (error) {
      console.log("ERROR OCCURRED WHILE DELETING THE SKILL", error);
      setMessage({
        show: true,
        message: "Unable to delete the skill.",
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
        {/* SEARCH FILTER */}
        <div className="row">
          <div className="col-md-4 my-4">
            <h1>Skill Listing</h1>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              id="searchInput"
              placeholder="Search by job title..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="form-control my-4"
            />
          </div>
        </div>

        {/* LOADING STATES */}
        {loading && (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <p>Error occured while fetching the data...</p>}
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

        {/* DISPLAYING JOBS */}
        <div className="row">
          {filteredData?.length > 0 ? (
            <>
              {filteredData?.map((skill) => (
                <div className="col-md-4" key={skill._id}>
                  <div class="card mb-4 p-2">
                    <div class="card-body">
                      <h4 class="card-title">{skill.title}</h4>
                      <p class="card-text">
                        <strong>Category: </strong>
                        {skill.category}
                      </p>
                      <p class="card-text">
                        <strong>Exchange Type: </strong>
                        {skill.exchangeType}
                      </p>
                      <div className="row mb-2">
                        <Link
                          to={`/${skill.jobTitle}/${skill._id}`}
                          class="card-link btn btn-primary px-4"
                        >
                          See Details
                        </Link>
                      </div>
                      <div className="row">
                        <button
                          class="card-link btn btn-danger px-4"
                          onClick={() => handleDelete(skill._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h4>No Skills Found</h4>
          )}
        </div>
      </main>
    </>
  );
}
