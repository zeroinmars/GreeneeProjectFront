import AddEventButton from "../components/FreqCompo/AddEventButton";
import Timeline from "../components/Timeline";
import HeaderAlarm from "../components/HeaderAlarm";
import LabelBottomNavigation from "../components/LabelBottomNavigation";
import Snackbar from "../components/FreqCompo/Snackbar";
export default () => {
  return (
    <>
      <HeaderAlarm />
      <Timeline></Timeline>
      <AddEventButton />
      <LabelBottomNavigation></LabelBottomNavigation>
      <Snackbar />
    </>
  );
};

