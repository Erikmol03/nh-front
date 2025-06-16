import { useEffect, useState } from "react";
import { getAllCollaborators } from "../../services/collaboratorService";

const Collaborators = () => {
  const [Collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const dataCollaborator = async () => {
      const getData = await getAllCollaborators();
      if (getData) setCollaborators(getData);
    };
    dataCollaborator();
  }, []);

  return (
    <div>
      <h2>Colaboradores</h2>
      <ul>
        {Collaborators.map((collab: any) => (
          <li key={collab.id}>{collab.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Collaborators;
