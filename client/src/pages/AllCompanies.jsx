import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { SearchContainer, PageBtnContainer, Company } from "../components";
import { listCompanies } from "../redux/actions/companyAction";
import CompaniesWrapper from "../assets/wrappers/CompaniesContainer";

import {
  deleteReset,
  getCompanyReset,
  updateCompanyReset,
} from "./../redux/slices/companySlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NUMBER_OF_COMPANIES,
  LOADING_COMPANIES,
  PAGE_TITLE,
  DOWNLOAD_DATA,
} from "../constants/ALL_COMPANY";
import axios from "axios";

const AllCompanies = () => {
  const dispatch = useDispatch();
  const currentForm = useRef();
  const location = useLocation();
  const navigateTo = useNavigate();

  const { loading, companies, totalCompanies, pages, page } = useSelector(
    (state) => state.listCompanies
  );
  const { success: deleteSuccess } = useSelector(
    (state) => state.deleteCompany
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const search = searchParams.get("search") || "";
    let category = searchParams.get("category") || "";
    let pageNumber = searchParams.get("pageNumber") || 1;

    dispatch(listCompanies(search, pageNumber, category));
    dispatch(deleteReset());
    dispatch(getCompanyReset());
    dispatch(updateCompanyReset());
  }, [deleteSuccess, currentForm, location, pages, page, navigateTo]);
  const [isDownloading, setDownloading] = useState(false);

  const handleDownloadData = async () => {
    try {
      setDownloading(true);

      const { data } = await axios.get("/api/companies/download");

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading data:", error);
    } finally {
      setDownloading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <SearchContainer />
      {loading ? (
        <h3 dir="rtl" className="my-10 text-center">
          {LOADING_COMPANIES}
        </h3>
      ) : (
        <CompaniesWrapper>
          <div className="flex justify-between my-3">
            <div
              className={`flex bg-gray-600 py-2 px-3 rounded font-bold text-white justify-between items-center min-w-[140px] ${
                isDownloading ? "bg-opacity-70" : ""
              }`}
            >
              {isDownloading ? (
                <svg
                  aria-hidden="true"
                  className="w-[22px] h-[22px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              )}

              <button
                onClick={() => handleDownloadData()}
                disabled={isDownloading}
              >
                {DOWNLOAD_DATA}
              </button>
            </div>
            <h5 dir="rtl">
              {NUMBER_OF_COMPANIES}
              {totalCompanies}
            </h5>
          </div>
          <div className="jobs">
            {companies.map((company) => (
              <Company
                key={company._id}
                _id={company._id}
                name={company.name}
                email={company.email}
                category={company.category}
                createdAt={company.createdAt}
              />
            ))}
          </div>
          {pages > 1 && <PageBtnContainer pages={pages} page={page} />}
        </CompaniesWrapper>
      )}
    </>
  );
};

export default AllCompanies;
