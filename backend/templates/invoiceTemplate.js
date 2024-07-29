const {
  DATE_OF_INVOICE,
  NUMBER_OF_COMPANIES,
  PACKAGE_TYPE,
  CUSTOMER_EMAIL,
  CUSTOMER_NAME,
  INVOICE_NUMBER,
  SUBJECT_EMAIL,
} = require("../constants/INVOICE_CLIENT");

module.exports = function invoiceTemplate({
  typeOfPackage,
  invoiceNumber,
  customerName,
  customerEmail,
  totalCompanies,
  date,
}) {
  return `
  <!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Appointment Reminder Email Template</title>
      <meta name="description" content="Appointment Reminder Email Template" />
    </head>
    <style>
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  
    <body
      marginheight="0"
      topmargin="0"
      marginwidth="0"
      style="margin: 0px; background-color: #f2f3f8"
      leftmargin="0"
      dir="rtl"
    >
      <table
        cellspacing="0"
        border="0"
        cellpadding="0"
        width="100%"
        bgcolor="#f2f3f8"
        style="
          @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
          font-family: 'Open Sans', sans-serif;
        "
      >
        <tr>
          <td>
            <table
              style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
              <!-- Logo -->
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <!-- Email Content -->
              <tr>
                <td>
                  <table
                    width="95%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      max-width: 670px;
                      background: #fff;
                      border-radius: 3px;
                      -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      padding: 0 40px;
                    "
                  >
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <!-- Title -->
                    <tr>
                      <td style="padding: 0 15px; text-align: center">
                        <h3
                          style="
                            color: #1e1e2d;
                            font-weight: 400;
                            margin: 0;
                      font-size: 20px !important;
                            font-family: 'Rubik', sans-serif;
                          "
                        >
                          ${SUBJECT_EMAIL}: <h3>${typeOfPackage}</h3>
                        </>
                        <span
                          style="
                            display: inline-block;
                            vertical-align: middle;
                            margin: 29px 0 26px;
                    h        border-bottom: 1px solid #cecece;
                            width: 100px;
                          "
                        ></span>
                      </td>
                    </tr>
                    <!-- Details Table -->
                    <tr>
                      <td>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          style="width: 100%; border: 1px solid #ededed"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  border-right: 1px solid #ededed;
                                  width: 35%;
                                  font-weight: 500;
                                  color: rgba(0, 0, 0, 0.64);
                                "
                              >
                                ${INVOICE_NUMBER}:
                              </td>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  color: #455056;
                                "
                              >
                                ${invoiceNumber
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  border-right: 1px solid #ededed;
                                  width: 35%;
                                  font-weight: 500;
                                  color: rgba(0, 0, 0, 0.64);
                                "
                              >
                                ${CUSTOMER_NAME}:
                              </td>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  color: #455056;
                                "
                              >
                                ${customerName}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  border-right: 1px solid #ededed;
                                  width: 35%;
                                  font-weight: 500;
                                  color: rgba(0, 0, 0, 0.64);
                                "
                              >
                                ${CUSTOMER_EMAIL}:
                              </td>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  color: #455056;
                                "
                              >
                                ${customerEmail}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  border-right: 1px solid #ededed;
                                  width: 35%;
                                  font-weight: 500;
                                  color: rgba(0, 0, 0, 0.64);
                                "
                              >
                                ${PACKAGE_TYPE}:
                              </td>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  color: #455056;
                                "
                              >
                                ${typeOfPackage}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  border-right: 1px solid #ededed;
                                  width: 35%;
                                  font-weight: 500;
                                  color: rgba(0, 0, 0, 0.64);
                                "
                              >
                                ${NUMBER_OF_COMPANIES}:
                              </td>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  color: #455056;
                                "
                              >
                                ${totalCompanies}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  border-right: 1px solid #ededed;
                                  width: 35%;
                                  font-weight: 500;
                                  color: rgba(0, 0, 0, 0.64);
                                "
                              >
                                ${DATE_OF_INVOICE}:
                              </td>
                              <td
                                style="
                                  padding: 10px;
                                  border-bottom: 1px solid #ededed;
                                  color: #455056;
                                "
                              >
                                ${date}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p
                          style="
                            font-size: 15px;
                            color: #455056;
                            margin: 20px 0 0;
                            line-height: 24px;
                            text-align: center;
                            font-weight: 600;
                          "
                        >
                          تمنياتنا لك بالتوفيق.
                          <br />
                          ملاحظة: في حال كانت مؤهلاتك مناسبة لمسؤولي التوظيف، سيتم
                          التواصل معك سواء عبر الإيميل أو على جوالك.
                          <br />
                          هذه الرسالة
                          آلية من منصة آفاق ولا يجب الرد عليها..
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <tr>
                    <td style="text-align: center">
                      <p
                        style="
                          font-size: 14px;
                          color: #455056bd;
                          line-height: 18px;
                          margin: 0 0 0;
                          padding-bottom: 25px;
                        "
                      >
                        &copy; <strong>www.afaqjobs.com</strong>
                      </p>
                    </td>
                  </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
