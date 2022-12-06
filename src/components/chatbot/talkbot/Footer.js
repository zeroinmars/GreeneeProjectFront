import { Form, Button } from "react-bootstrap";
import sendImage from "../../../img/send-icon.png";
import React, { useState } from "react";

/* 퓨샷 */
const fewShot = "The following is a conversation with Greenee. Greenee has a lot of sympathy and very comforting. \n\nHuman : 갈수록 지쳐요… \nGreenee : 그 마음 이해해요. 마음처럼 되지 않을 때가 있죠. \nHuman : 어떻게 뭔 치료가 없을까 해서 그거 알아보다가 왔어요. \nGreenee : 완치할 수 있을 거예요. 힘들겠지만 버텨보자구요. \nHuman : 옥상에 올라가서 찬바람을 맞으니까 정신이 확 들었어요. \nGreenee : 아, 그래요? \nHuman : 학교 다니면서 힘들 때도 많았지만 제가 꿈 꿨던 일이라 정말 열심히 공부했어요. \nGreenee : 그 좋은 결과만큼 앞으로 당신의 미래도 기쁘고 즐겁길 바랍니다. \nHuman : 마침 되게 잘 봐주는 곳이 옆 동네에 있었어. \nGreenee : 와, 정말요? 그래서 그 후에는 어떻게 됐나요? \nHuman : 여전한데 그냥 안 가고 있어. \nGreenee : 그렇군요. 고민이 많으시겠어요. 다른 방법으로 노력을 해보는 건 어떠세요? \nHuman : 학교에서 누가 괴롭히거나… 그런 건 없는데요. \nGreenee : 특별한 일이 없었다면 이 문제도 괜찮은 방향으로 지나갈 거예요! \nHuman : 힘들면 잠시 앉아서 쉬면 낫더라고.. \nGreenee : 조금 쉬면 분명 나아질 거예요. \nHuman : 한 발자국도 못 움직일 것 같고 온몸에 힘이 빠지고… \nGreenee : 많이 힘드셨겠군요. 휴식을 충분히 취하셔야 할 것 같아요. \nHuman : 파편이 튀어서 그 때 저도 응급실 가서 치료 받기도 했고… \nGreenee : 응급실에 가셨다니 정말 놀랐어요. 아무 문제 없으신가요? 걱정 되네요. \nHuman : 그런데 증상이 나빠진 거 같아.  \nGreenee : 너무 심하시면 병원을 다시 가보는 건 어떨까요?"
//const fewShot = "The following is a conversation with Greenee. Greenee has a lot of sympathy and very comforting.  \n\n 갈수록 지쳐요… -> 그 마음 이해해요. 마음처럼 되지 않을 때가 있죠. \n 어떻게 뭔 치료가 없을까 해서 그거 알아보다가 왔어요.-> 완치할 수 있을 거예요. 힘들겠지만 버텨보자구요. \n 그런데 증상이 나빠진 거 같아. -> 너무 심하시면 병원을 다시 가보는 건 어떨까요? \n 학교 다니면서 힘들 때도 많았지만 제가 꿈 꿨던 일이라 정말 열심히 공부했어요. -> 그 좋은 결과만큼 앞으로 당신의 미래도 기쁘고 즐겁길 바랍니다. \n 마침 되게 잘 봐주는 곳이 옆 동네에 있었어. -> 와, 정말요? 그래서 그 후에는 어떻게 됐나요? \n 여전한데 그냥 안 가고 있어. -> 그렇군요. 고민이 많으시겠어요. 다른 방법으로 노력을 해보는 건 어떠세요? \n 학교에서 누가 괴롭히거나… 그런 건 없는데요. -> 특별한 일이 없었다면 이 문제도 괜찮은 방향으로 지나갈 거예요! \n 힘들면 잠시 앉아서 쉬면 낫더라고.. -> 조금 쉬면 분명 나아질 거예요. \n 한 발자국도 못 움직일 것 같고 온몸에 힘이 빠지고… -> 많이 힘드셨겠군요. 휴식을 충분히 취하셔야 할 것 같아요. \n 파편이 튀어서 그 때 저도 응급실 가서 치료 받기도 했고… -> 응급실에 가셨다니 정말 놀랐어요. 아무 문제 없으신가요? 걱정 되네요 \n"
var history = fewShot

/* api */
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

/* export */
function Footer(props) {

  const [inputform, setinputform] = useState("");
  const handleChange = ({ target: { value } }) => setinputform(value);

  /* 서밋하면 인풋란에 입력한 값 사라지게 하기 (딜레이걸어서해결함 딜레이안걸면 서밋하자마자 사라져서 값 전달 안됨)*/
  function inputClear() {
    setTimeout(function() {
      setinputform("");
    }, 10); //밀리sec delay
  }

  /* 아웃풋 생성 */
  function outputCreate() {
    /* 인풋의 형태를 잡고 퓨샷을 더하기 */
    var prompt_initial = "Human : " + document.querySelector(".input-form").value + " \nGreenee : " 
    //var prompt_initial = document.querySelector(".input-form").value + "->"
    //var prompt = history + prompt_initial
    var prompt = history + ' \n' + prompt_initial
    //var prompt = document.querySelector(".input-form").value + "->"
    /* output */
    openai
      .createCompletion({
        //model:"text-ada-001",
        model: "text-davinci-003",
        //model: "davinci:ft-personal-2022-12-04-12-58-21", 
        prompt: prompt,
        //prompt: document.querySelector("#input").value, //유저인풋
        temperature: 0.5, // 낮을수록 결정적, 반복적
        stop: ["Human : ", "Greenee : "], // [ ] 안 문자를 모델이 말하지 않는다. 금지어 최대4개, 말을하나도못할수도있음
        //stop: ["\n"],
        max_tokens: 256, // 생성할 최대 토큰 수
        top_p: 1,  // 높을수록 확률이 높은 것을 택한다, 높을수록 랜덤성down
        frequency_penalty: 0, // 높을수록 모델이 동일한 줄을 반복할 가능성을 줄인다
        presence_penalty: 0, // 높을수록 모델이 새로운 주제에 대해 이야기할 가능성을 높인다
      })
      .then((result) => {
        /* 히스토리에 아웃풋을 누적 */
        history = prompt + result.data.choices[0].text
        console.log(history)
        /* 모델의 대답을 아웃풋버블에 넣기 */
        props.setMessage(result.data.choices[0].text, false);
      });
  }

  /* 유저의 인풋을 인풋버블에넣기 */
  const handleSubmit = (event) => {
    /* 라우트이동방지 */
    event.preventDefault();
     /* 유저의 인풋을 인풋버블에넣기 */
    props.setMessage(inputform, true);
    /* 아웃풋 생성 펑션 구동 */
    outputCreate();
    //alert(`변경된 패스워드: ${inputform}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <footer>
        <Form.Control
          onChange={handleChange}
          type="inputform"
          name="inputform"
          value={inputform}
          placeholder=" 그리니에게 심리상담을 받아보세요."
          className="input-form"
        />
        <Button
          variant="#fff"
          type="submit"
          className="input-button"
          onClick={inputClear}
        >
          <img className="send-icon" src={sendImage} />
        </Button>
      </footer>
    </Form>
  );
}
export default Footer;