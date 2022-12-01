import Calendar from "../components/Calendar";
import AddEventButton from "../components/FreqCompo/AddEventButton";
import HeaderAlarm from "../components/HeaderAlarm";
// import ChatbotSteps from '../components/chatbot/ChatbotSteps'
import LabelBottomNavigation from "../components/LabelBottomNavigation";
export default () => {
  return (
    <div>
      <HeaderAlarm />
      <Calendar />
      <AddEventButton />
      <LabelBottomNavigation></LabelBottomNavigation>
   
    </div>
  );
};
