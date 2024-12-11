import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const findQuestion = async (questionId: string) => {
    const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const deleteQuestion = async (questionId: string) => {
    const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const updateQuestion = async (question: any) => {
    const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};

export const createQuestion = async (question: any) => {
    const response = await axios.post(`${QUESTIONS_API}`, question);
    return response.data;
};
