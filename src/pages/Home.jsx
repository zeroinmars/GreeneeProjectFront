import AddEventButton from "../components/FreqCompo/AddEventButton";
import Timeline from "../components/Timeline";
import HeaderAlarm from "../components/HeaderAlarm";
import ChatbotSteps from '../components/chatbot/ChatbotSteps'

export default () => {
  return (
    <>
      <HeaderAlarm />
      <Timeline></Timeline>
      <AddEventButton />
      <ChatbotSteps></ChatbotSteps>
    </>
  );
};

