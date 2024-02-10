import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoiceDetails } from "../redux/actions/invoiceAction";
import { useParams, useNavigate } from "react-router-dom";
import {
  PAGE_TITLE,
  INVOICE_NUMBER,
  CUSTOMER_NAME,
  CUSTOMER_EMAIL,
  PACKAGE_TYPE,
  NUMBER_OF_COMPANIES,
  DATE_OF_INVOICE,
  EDUCATION_PACKAGE,
  SAUDI_PACKAGE,
  KHALIJ_PACKAGE,
  TEST_PACKAGE,
} from "../constants/SHOW_INVOICE";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const ShowInvoice = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { loading, invoice, totalCompanies, error } = useSelector(
    (state) => state.getInvoice
  );
  const { id } = useParams();

  const handleDate = () => {
    const date = day(invoice.createdAt).format("hh:mmA, DD/MM/YYYY");
    return date;
  };

  // Memoize the navigateTo function
  const memoizedNavigateTo = useCallback(navigateTo, []);

  const formatNumber = (number) => {
    if (typeof number === "number" && !isNaN(number)) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "Invalid Number"; // or handle the case where number is not a valid number
    }
  };

  const typeOfPackage =
    invoice?.packageType === "education"
      ? EDUCATION_PACKAGE
      : invoice?.packageType === "saudi"
      ? SAUDI_PACKAGE
      : invoice?.packageType == "khalij"
      ? KHALIJ_PACKAGE
      : invoice?.packageType == "test"
      ? TEST_PACKAGE
      : "";

  useEffect(() => {
    dispatch(getInvoiceDetails(id));
  }, [id, memoizedNavigateTo, dispatch]);

  return (
    <>
      <div>
        <main dir="rtl">
          <table
            cellSpacing="0"
            cellPadding="0"
            width="100%"
            bgcolor="#f2f3f8"
            style={{
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            <tr>
              <td>
                <table
                  style={{
                    backgroundColor: "#f2f3f8",
                    maxWidth: "670px",
                    margin: "0 auto",
                  }}
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  align="center"
                >
                  <tr>
                    <td style={{ height: "80px" }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td style={{ height: "20px" }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        width="95%"
                        cellPadding="0"
                        cellSpacing="0"
                        style={{
                          maxWidth: "670px",
                          background: "#fff",
                          borderRadius: "3px",
                          WebkitBoxShadow: "0 6px 18px 0 rgba(0, 0, 0, 0.06)",
                          MozBoxShadow: "0 6px 18px 0 rgba(0, 0, 0, 0.06)",
                          boxShadow: "0 6px 18px 0 rgba(0, 0, 0, 0.06)",
                          padding: "0 40px",
                        }}
                      >
                        <tr>
                          <td style={{ height: "40px" }}>&nbsp;</td>
                        </tr>
                        <tr>
                          <td
                            style={{ padding: "0 15px", textAlign: "center" }}
                          >
                            <h1
                              style={{
                                color: "#fff",
                                fontWeight: "500",
                                marginBottom: "30px",
                                borderRadius: "10px",
                                fontSize: "32px",
                                background: "#6edb72",
                                padding: "10px 0",
                              }}
                            >
                              {PAGE_TITLE}
                            </h1>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              style={{
                                width: "100%",
                                border: "1px solid #ededed",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      padding: "15px",
                                      borderBottom: "1px solid #ededed",
                                      borderRight: "1px solid #ededed",
                                      width: "35%",
                                      fontWeight: 500,
                                      color: "rgba(0, 0, 0, 0.64)",
                                    }}
                                  >
                                    {INVOICE_NUMBER}:
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      color: "#455056",
                                    }}
                                  >
                                    {formatNumber(invoice?.invoiceNumber)}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      borderRight: "1px solid #ededed",
                                      width: "35%",
                                      fontWeight: 500,
                                      color: "rgba(0, 0, 0, 0.64)",
                                    }}
                                  >
                                    {CUSTOMER_NAME}:
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      color: "#455056",
                                    }}
                                  >
                                    {invoice?.customerName}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      borderRight: "1px solid #ededed",
                                      width: "35%",
                                      fontWeight: 500,
                                      color: "rgba(0, 0, 0, 0.64)",
                                    }}
                                  >
                                    {CUSTOMER_EMAIL}:
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      color: "#455056",
                                    }}
                                  >
                                    {invoice?.customerEmail}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      borderRight: "1px solid #ededed",
                                      width: "35%",
                                      fontWeight: 500,
                                      color: "rgba(0, 0, 0, 0.64)",
                                    }}
                                  >
                                    {PACKAGE_TYPE}:
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      color: "#455056",
                                    }}
                                  >
                                    {typeOfPackage}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      borderRight: "1px solid #ededed",
                                      width: "35%",
                                      fontWeight: 500,
                                      lineHeight: "25px",
                                      color: "rgba(0, 0, 0, 0.64)",
                                    }}
                                  >
                                    {NUMBER_OF_COMPANIES}:
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      color: "#455056",
                                    }}
                                  >
                                    {totalCompanies}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      borderRight: "1px solid #ededed",
                                      width: "35%",
                                      fontWeight: 500,
                                      color: "rgba(0, 0, 0, 0.64)",
                                    }}
                                  >
                                    {DATE_OF_INVOICE}:
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px",
                                      borderBottom: "1px solid #ededed",
                                      color: "#455056",
                                    }}
                                  >
                                    {handleDate()}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style={{
                                fontSize: "15px",
                                color: "#455056",
                                margin: "15px auto",
                                lineHeight: "25px",
                                textAlign: "center",
                                fontWeight: 600,
                                width: "90%",
                              }}
                            >
                              تمنياتنا لك بالتوفيق.
                              <br />
                              ملاحظة: في حال كانت مؤهلاتك مناسبة لمسؤولي
                              التوظيف، سيتم التواصل معك سواء عبر الإيميل أو على
                              جوالك.
                              <br />
                              هذه الرسالة آلية من منصة آفاق ولا يجب الرد عليها..
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ height: "40px" }}>&nbsp;</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#455056bd",
                                paddingBottom: "20px",
                              }}
                            >
                              &copy; <strong>https://afaqjobs.com</strong>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "20px" }}>&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </main>
      </div>
    </>
  );
};

export default ShowInvoice;
