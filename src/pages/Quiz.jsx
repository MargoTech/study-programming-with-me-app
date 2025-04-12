import { useParams } from "react-router-dom";

const Quiz = () => {
  const { id } = useParams();
  console.log(id);
};
