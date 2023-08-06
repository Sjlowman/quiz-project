import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Quiz {
  id: number;
  name: string;
}

const Quiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const effectCalled = useRef<boolean>(false);

  const category_id = 1; // hard coded should be passed from previous page
  const limit_no = 4; // how many quiz options we want to bring back

  useEffect(() => {
    if (effectCalled.current) return;
    fetchQuizzes();
    effectCalled.current = true;
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(BASE_URL + "/quiz", {
        params: { categoryId: category_id, limit: limit_no },
      });

      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>{quiz.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Quiz;
