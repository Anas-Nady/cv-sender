module.exports = function sendCvTemplate(
  headerText,
  welcomeMessage,
  content,
  jobTitle,
  yearsOfExperience,
  qualification,
  specific,
  footerText
) {
  return `<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  </head>
  <body
    style="
      margin: 0px;
      background-color: #f2f3f8;
      font-family: 'Rubik', sans-serif !important;
    "
  >
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
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
            dir="ltr"
          >
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 1000px;
                    background: #fff;
                    border-radius: 3px;
                    padding-top: 3px;
                    padding-bottom: 20px;
                    text-align: center;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  "
                >
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <h1
                        style="
                          color: #fff;
                          font-weight: 500;
                          margin: 0;
                          border-radius: 10px;
                          font-size: 32px;
                          background: #6edb72;
                          padding: 2px 0;
                          font-family: 'Rubik', sans-serif;
                        "
                      >
                        ${headerText}
                      </h1>
                      <h2
                        style="
                          font-size: 15px;
                          color: #455056;
                          margin: 20px 0 0;
                          line-height: 24px;
                          text-align: start;
                          font-weight: 600;
                          font-family: 'Public Sans', sans-serif;
                        "
                        dir="ltr"
                      >
                        ${welcomeMessage}
                        <br />
                        <br />
                        <span style="font-weight: 500">${content.replace(
                          /[\r\n]{2,}/g,
                          "<br><br>"
                        )}</span>
                      </h2>
                      <span
                        style="
                          display: inline-block;
                          vertical-align: middle;
                          margin: 29px 0 26px;
                          border-bottom: 1px solid #cecece;
                          width: 100px;
                        "
                      ></span>
                      <table>
                        <tbody>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 55%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Job title
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                color: #455056;
                                min-width: 300px;
                                display: inline-block;
                                font-weight: 600;
                                font-family: 'Public Sans', sans-serif;                              "
                            >
                              ${jobTitle}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Years of experiences
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                color: #455056;
                                min-width: 300px;
                              "
                            >
                              ${yearsOfExperience}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Qualification
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                color: #455056;
                                min-width: 300px;
                              "
                            >
                              ${qualification}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Specific
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border: 1px solid #ededed;
                                color: #455056;
                                min-width: 300px;
                              "
                            >
                              ${specific}
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
                        ${footerText}
                      </p>
                      <div
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          gap: 10px;
                          margin: 0 auto;
                          width: 100%;
                        "
                      >
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
                          <a
                            href="https://github.com/anas-nady"
                            style="color: #455056"
                            target="_blank"
                          >
                            <svg
                              style="
                              width: 32px;
                              height: 32px;
                              color: #1f2937;
                              "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </a>
                        </p>
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
                          <a
                            href="https://www.linkedin.com/in/anas-nady/"
                            style="color: #455056"
                            target="_blank"
                          >
                            <svg
                              style="
                              width: 32px;
                              height: 32px;
                              color: #1f2937;
                              "                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                                clip-rule="evenodd"
                              />
                              <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                            </svg>
                          </a>
                        </p>
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
                          <a
                            href="mailto:anasabdallahnady@gmail.com"
                            style="color: #455056"
                            target="_blank"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              style="
                              width: 32px;
                              height: 32px;
                              color: #1f2937;
                              "
                              width="30"
                              height="30"
                              fill="currentColor"
                              viewBox="0 0 50 50"
                            >
                              <path
                                d="M 5.5 7 C 3.03125 7 1.011719 9.015625 1 11.484375 C 1 11.484375 1 11.488281 1 11.492188 C 1 11.496094 1 11.496094 1 11.5 L 1 38.5 C 1 40.972656 3.027344 43 5.5 43 L 44.5 43 C 46.972656 43 49 40.972656 49 38.5 L 49 11.5 C 49 11.496094 49 11.496094 49 11.492188 C 49 11.488281 49 11.484375 49 11.484375 C 48.988281 9.015625 46.96875 7 44.5 7 Z M 8.101563 9 L 41.902344 9 L 25 20.78125 Z M 4.773438 9.117188 L 25 23.21875 L 45.230469 9.117188 C 46.253906 9.425781 46.992188 10.355469 47 11.488281 C 46.996094 11.699219 46.78125 12.121094 46.46875 12.460938 C 46.152344 12.804688 45.84375 13.019531 45.84375 13.019531 L 45.839844 13.027344 L 25 27.777344 L 4.160156 13.027344 L 4.15625 13.019531 C 4.15625 13.019531 3.847656 12.804688 3.53125 12.460938 C 3.21875 12.121094 3.003906 11.699219 3 11.488281 C 3.007813 10.355469 3.746094 9.425781 4.773438 9.117188 Z M 3 14.652344 C 3 14.652344 3.007813 14.660156 3.007813 14.660156 L 3.015625 14.664063 L 3.015625 14.667969 L 6 16.777344 L 6 41 L 5.5 41 C 4.109375 41 3 39.890625 3 38.5 Z M 47 14.652344 L 47 38.5 C 47 39.890625 45.890625 41 44.5 41 L 44 41 L 44 16.777344 L 46.984375 14.667969 L 46.984375 14.664063 C 46.984375 14.664063 47 14.652344 47 14.652344 Z M 8 18.191406 L 25 30.222656 L 42 18.191406 L 42 41 L 8 41 Z"
                              ></path>
                            </svg>
                          </a>
                        </p>
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
                          <a
                            href="https://wa.me/+201211076875"
                            style="color: #455056"
                            target="_blank"
                          >
                            <svg
                              style="
                              width: 32px;
                              height: 32px;
                              color: #1f2937;
                              "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                                clip-rule="evenodd"
                              />
                              <path
                                fill="currentColor"
                                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                              />
                            </svg>
                          </a>
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center"></td>
            </tr>
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
