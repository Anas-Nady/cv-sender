import axios from "axios";
import {
  listCompaniesRequest,
  listCompaniesSuccess,
  listCompaniesFail,
  getCompanyRequest,
  getCompanySuccess,
  getCompanyFail,
  createCompanyRequest,
  createCompanySuccess,
  createCompanyFail,
  updateCompanyRequest,
  updateCompanySuccess,
  updateCompanyFail,
  deleteCompanyRequest,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "./../slices/companySlice";

export const listCompanies =
  (keyword = "", pageNumber = "", category = "", pageSize = 50) =>
  async (dispatch) => {
    try {
      dispatch(listCompaniesRequest());

      const { data } = await axios.get(
        `/api/companies?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}&pageSize=${pageSize}`
      );

      dispatch(listCompaniesSuccess(data));
    } catch (error) {
      dispatch(
        listCompaniesFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const getCompanyDetails = (id) => async (dispatch) => {
  try {
    dispatch(getCompanyRequest());

    const { data } = await axios.get(`/api/companies/${id}`);

    dispatch(getCompanySuccess(data));
  } catch (error) {
    dispatch(
      getCompanyFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const addCompany = (name, email, category) => async (dispatch) => {
  try {
    dispatch(createCompanyRequest());

    const { data } = await axios.post("/api/companies", {
      name,
      email,
      category,
    });

    dispatch(createCompanySuccess(data));
  } catch (error) {
    dispatch(
      createCompanyFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateCompany = (company) => async (dispatch) => {
  try {
    dispatch(updateCompanyRequest());

    const { data } = await axios.put(`/api/companies/${company._id}`, company);

    dispatch(updateCompanySuccess(data));
  } catch (error) {
    dispatch(
      updateCompanyFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch(deleteCompanyRequest());

    await axios.delete(`/api/companies/${id}`);

    dispatch(deleteCompanySuccess());
  } catch (error) {
    dispatch(
      deleteCompanyFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
