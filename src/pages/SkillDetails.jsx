import { useParams } from "react-router";
import useFetch from "../useFetch";

export default function SkillDetails() {
  // USEPARAMS
  const { skillID } = useParams();

  // FETCH DATA WITH USE-FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://playground-08-backend.vercel.app/api/get-skill"
  );

  // FINDING THE SKILL
  const foundSkill = data?.find((skill) => skill._id === skillID);

  // LOADING AND ERROR STATES
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;
  if (!foundSkill) return <div className="text-center">Skill not found!</div>;

  return (
    <>
      <main className="container my-4">
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
          </div>
        </div>
      </main>
    </>
  );
}