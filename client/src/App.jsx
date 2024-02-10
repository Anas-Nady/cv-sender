import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Error,
  AddCompany,
  DashboardLayout,
  AllCompanies,
  EditCompany,
  SendCv,
  AddInvoice,
  AllInvoice,
  ShowInvoice,
} from "./pages";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AddCompany />,
      },
      {
        path: "add-company",
        element: <AddCompany />,
      },
      {
        path: "all-companies",
        element: <AllCompanies />,
      },
      {
        path: "edit-company/:id",
        element: <EditCompany />,
      },
      {
        path: "send-cv",
        element: <SendCv />,
      },
      {
        path: "add-invoice",
        element: <AddInvoice />,
      },
      {
        path: "all-invoices",
        element: <AllInvoice />,
      },
      {
        path: "show-invoice/:id",
        element: <ShowInvoice />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
