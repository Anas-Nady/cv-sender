import { BsFillSendPlusFill } from "react-icons/bs";
import { MdQueryStats } from "react-icons/md";
import { BsBuildingAdd } from "react-icons/bs";
import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import {
  ADD_COMPANY,
  ALL_COMPANIES,
  SEND_CV,
  ADD_INVOICE,
  ALL_INVOICES,
} from "./../constants/LINKS";

const links = [
  {
    text: ADD_COMPANY,
    path: ".",
    icon: <BsBuildingAdd />,
  },
  {
    text: ALL_COMPANIES,
    path: "all-companies",
    icon: <MdQueryStats />,
  },
  {
    text: SEND_CV,
    path: "send-cv",
    icon: <BsFillSendPlusFill />,
  },
  {
    text: ADD_INVOICE,
    path: "add-invoice",
    icon: <MdAssignmentAdd />,
  },
  {
    text: ALL_INVOICES,
    path: "all-invoices",
    icon: <AiOutlineFileSearch />,
  },
];

export default links;
