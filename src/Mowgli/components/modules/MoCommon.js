import MoIcon from "../buttons/MoIcon";
import MoButton from "../buttons/MoButton";
import MoNav from "../strapped/MoNav";
import MoNavLink from "../navigation/MoNavLink/index";

import MoSwitch from "../forms-fields/MoSwitch";
import MoModal from "../modal/MoModal";
import MoDropdown from "../modal/MoDropdown";
import MoAccordian from "../navigation/accordian/index";

import MoField from "../forms-fields/MoField";
import MoForm from "../forms-fields/MoForm";

import MoChart from "../dashboard/chart/index";

export default class MoComponentManager {
  MoNavLink = MoNavLink;
  MoChart = MoChart;
  MoIcon = MoIcon;
  MoButton = MoButton;
  MoNav = MoNav;
  MoSwitch = MoSwitch;
  MoModal = MoModal;
  MoDropdown = MoDropdown;
  MoAccordian = MoAccordian;
  MoField = MoField;
  MoForm = MoForm;
  useMowgli() {}
}
