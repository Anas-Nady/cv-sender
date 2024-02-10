import axios from "axios";
import { sendCvSuccess, sendCvFail } from "../slices/sendCvSlice";

export const sendCvToCompanies = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/send-cv", formData);

    dispatch(sendCvSuccess(data));
  } catch (error) {
    dispatch(
      sendCvFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
