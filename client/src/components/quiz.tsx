import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";

interface Start {
  id: number;
  message: string;
}

const Quiz: React.FC = () => {
  const [starts, setStarts] = useState<Start[]>([]);
  const effectCalled = useRef<boolean>(false);

  // const { quizId } = useParams();
  // const quiz_number = parseInt(quizId, 10);

  const quizId = 77;

  useEffect(() => {
    if (effectCalled.current) return;
    postStarts();
    effectCalled.current = true;
  }, []);

  const postStarts = async () => {
    try {
      const response = await axios.post(BASE_URL + "/start", {
        params: { quizId: quizId },
      });
      setStarts(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-12;">
      <h1> Are you ready to start </h1>

      <Link to={`/question/${quizId}`}>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;">
          Start
        </button>
      </Link>
    </div>
  );
};

export default Quiz;
