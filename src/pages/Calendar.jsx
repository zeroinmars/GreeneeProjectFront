import Calendar from "../components/Calendar";
import AddEventButton from "../components/FreqCompo/AddEventButton";
import HeaderAlarm from "../components/HeaderAlarm";
/* import ChatbotSteps from '../components/chatbot/ChatbotSteps' */

export default () => {
  return (
    <div>
      <HeaderAlarm />
      <Calendar />
      <AddEventButton />
      {/* <ChatbotSteps></ChatbotSteps> */}
    </div>
  );
};
