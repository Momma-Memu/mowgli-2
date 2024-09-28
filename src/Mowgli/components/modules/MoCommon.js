import MoIcon from "../buttons/MoIcon";
import MoButton from "../buttons/MoButton";
import MoNav from "../strapped/MoNav";
import MoNavLink from "../navigation/MoNavLink/index";

import MoSwitch from "../forms-fields/MoSwitch";
import MoModal from "../modal/MoModal";
import MoDropdown from "../modal/MoDropdown";
import MoAccordian from "../navigation/accordian/index";

import MoForm from "../forms-fields/MoForm";

import MoField from "../forms-fields/MoField";
import MoMultiSelect from "../forms-fields/MoMultiSelect/index";
import MoSelectItem from "../forms-fields/MoMultiSelect/MoSelectItem/index";
import MoSelectedItem from "../forms-fields/MoMultiSelect/MoSelectedItem/index";


import MoChart from "../dashboard/chart/index";

import MoTable from "../tables/MoTable/index";

export default class MoComponentManager {
  MoNavLink = MoNavLink;
  MoChart = MoChart;
  MoIcon = MoIcon;
  MoButton = MoButton;
  MoNav = MoNav;

  MoMultiSelect = MoMultiSelect;
  MoSelectItem = MoSelectItem;
  MoSelectedItem = MoSelectedItem;

  MoSwitch = MoSwitch;
  MoModal = MoModal;
  MoDropdown = MoDropdown;
  MoAccordian = MoAccordian;
  MoField = MoField;
  MoForm = MoForm;
  MoTable = MoTable;
  useMowgli() {}
}
