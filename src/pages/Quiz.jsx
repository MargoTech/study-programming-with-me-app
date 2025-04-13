import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Quiz = () => {
    const { id } = useParams();
    console.log(id);
  };  

const [questions, setQuestions] = useState([]);
const [loading, setLoading] = useState(true);

return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Тест по теме: {id}</h1>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <pre>{JSON.stringify(questions, null, 2)}</pre>
      )}
    </div>
  );
};

export default Quiz;
