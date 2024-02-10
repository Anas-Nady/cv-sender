const catchAsync = require("express-async-handler");
const transporter = require("./../utils/email.js");
const AppError = require("../utils/appError.js");
const companyModel = require("../models/companyModel.js");
const {
  SUBJECT_EMAIL,
  NO_COMPANIES_AVAILABLE,
  IS_COMPLETED,
} = require("./../constants/SEND_CV.js");

const sendCvToCompanies = catchAsync(async (req, res, next) => {
  const {
    name,
    phone,
    email,
    title,
    specific,
    yearsOfExperience,
    category,
    content,
    step,
  } = req.body;
  const file = req.file;

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    subject: SUBJECT_EMAIL,
    html: `
    <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
          <style type="text/css">
          a:hover {
            text-decoration: underline !important;
          }
        </style>
      </head>
    <body style="margin: 0px; background-color: #f2f3f8; font-family: 'Rubik', sans-serif !important;">
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
        <tr>
          <td>
            <table style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" dir="rtl">
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width: 1000px; background: #fff; border-radius: 3px; text-align: center; -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);">
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 35px">
                        <h1 style="color: #fff; font-weight: 500; margin: 0; border-radius: 10px; font-size: 32px; background: #6edb72; padding: 2px 0; font-family: 'Rubik', sans-serif;">طلب توظيف</h1>
                        <h2 style="font-size: 15px; color: #455056; margin: 20px 0 0; line-height: 24px; text-align: start; font-weight: 600;" dir="rtl">
                          السلام عليكم ورحمه الله وبركاته وبعد :<br />
                          أتمنى أن تكونوا بخير و عافية !
                          <br /><br />
                          ${content
                            .replace(/\n/g, "<br>")
                            .replace(
                              / /g,
                              "&nbsp;"
                            )}                        </h2>
                        <span style="display: inline-block; vertical-align: middle; margin: 29px 0 26px; border-bottom: 1px solid #cecece; width: 100px;"></span>
                        <table>
                          <tbody>
                            <tr>
                              <td style="padding: 10px; border: 1px solid #ededed; border-right: 1px solid #ededed; width: 55%; font-weight: 500; color: rgba(0, 0, 0, 0.64);">الأسم</td>
                              <td style="padding: 10px; border: 1px solid #ededed; color: #455056; min-width: 300px; display: inline-block;">${name}</td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight: 500; color: rgba(0, 0, 0, 0.64);">رقم الجوال</td>
                              <td style="padding: 10px; border: 1px solid #ededed; color: #455056; min-width: 300px;">${phone}+</td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight: 500; color: rgba(0, 0, 0, 0.64);">الأيميل</td>
                              <td style="padding: 10px; border: 1px solid #ededed; color: #455056; min-width: 300px;">${email}</td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight: 500; color: rgba(0, 0, 0, 0.64);">عدد سنوات الخبرة</td>
                              <td style="padding: 10px; border: 1px solid #ededed; color: #455056; min-width: 300px;">${yearsOfExperience}</td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight: 500; color: rgba(0, 0, 0, 0.64);">المؤهل</td>
                              <td style="padding: 10px; border: 1px solid #ededed; color: #455056; min-width: 300px;">${title}</td>
                            </tr>
                            <tr>
                              <td style="padding: 10px; border: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight: 500; color: rgba(0, 0, 0, 0.64);">التخصص</td>
                              <td style="padding: 10px; border: 1px solid #ededed; color: #455056; min-width: 300px;">${specific}</td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-size: 15px; color: #455056; margin: 20px 0 0; line-height: 24px; text-align: center; font-weight: 600;"><br />أشكركم على وقتكم واهتمامكم، وأتطلع إلى الفرصة للتحدث معكم قريبًا. <br />تقبلوا فائق الاحترام والتقدير،</p>
                        <p style="font-size: 15px; color: #455056; margin: 20px 0 0; line-height: 24px; text-align: center; font-weight: 600;">للتواصل مع الباحث عن عمل عبر <a href="https://wa.me/${phone}">الواتس اب</a></p>
                      </td>
                    </tr>
                    <p style="font-size: 14px; color: rgba(69, 80, 86, 0.7411764705882353); line-height: 18px; margin: 10 0 0; text-align: center;"><strong>https://afaqjobs.com</strong> &copy;</p>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align: center">
                </td>
              </tr>
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
    attachments: [{ filename: "cv.pdf", path: file.path }],
  };

  try {
    let companies = await companyModel.find({ category }).select("-_id email");

    if (companies.length === 0) {
      return next(new AppError(NO_COMPANIES_AVAILABLE, 404));
    }
    const { default: pLimit } = await import("p-limit");
    const limit = pLimit(15);

    const start = step * 500;
    companies = companies.slice(start, start + 500);

    const promises = companies.map(async (company, i) => {
      try {
        await limit(async () => {
          mailOptions.to = company?.email;
          await transporter.sendMail(mailOptions);
          console.log(`${i} --> ${company?.email}`);
        });
      } catch (error) {
        console.error(`Error sending email to ${company?.email}: ${error}`);
      }
    });

    // Wait for all promises to complete
    await Promise.all(promises);

    res.status(200).json({
      message: IS_COMPLETED,
    });
    return;
  } catch (error) {
    console.error("Error sending some emails:", error);
    return next(new AppError(error, 500));
  }
});

module.exports = sendCvToCompanies;
