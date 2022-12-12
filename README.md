# 그리니.AI
## `라이프 컨시어지 서비스` 

#### 바쁜 현대인을 위한 인공지능 비서!
#### 사용자의 성향, 일정 정보를 파악한 AI가 적절한 서비스 추천, 알림을 제공한다.

##### `사용 기술: React, Node.js, MySQL, GPT-3 등`




### 💻 **화면 구성**

<div align = "center">

![image](https://user-images.githubusercontent.com/103303021/207062840-726d439a-82ca-4b94-9e36-885b8d99af52.png)
</div>

    상단바 : 챗봇으로 이동하는 캐릭터 이미지를 삽입한다.

    하단바 : 페이지로 이동할 버튼을 나열한다.


<br>



### 🌊 **태스크 플로우**

<div align = "center">

![image](https://user-images.githubusercontent.com/103303021/207081281-5ba02a32-d618-4ff3-8ab1-f09e09ef4171.png)


</div>

    1. 회원가입을 완료한 사용자가 성향을 등록한다.
    2. 성향 등록을 마친 사용자가 일정을 등록한다.
    3. 일정이 매일 반복되는 데일리 루틴인지 아닌지의 여부를 따진다.
    
    - 데일리 루틴일 때 
      반복되는 요일을 등록한다.
      일정의 시작 시간, 종료 시간을 등록한다.
      일정의 출발 장소, 도착 장소를 등록한다.
      AI가 일정 관련 정보를 제공한다.
      (출발지, 도착지 사이 이동 소요 시간 알림 등)

    - 특별 일정일 때 (데일리 루틴이 아닐 때)
      일정의 날짜를 등록한다.
      일정의 시작 시간, 종료 시간을 등록한다.
      일정의 출발 장소, 도착 장소를 등록한다.
      AI가 일정 관련 정보 및 서비스를 제공한다.

<br>



###  🛠️ **아키텍쳐**

<div align = "center">

![image](https://user-images.githubusercontent.com/103303021/207067604-056869d4-6bce-4156-8b55-518247a2d215.png)

</div>
    
<hr>

## 🔎 **UI / UX**

### 1. 회원가입 및 성향 등록

<p align="center">

<img src="https://user-images.githubusercontent.com/103303021/207070277-70bd31e5-1c65-4b42-96c4-28160d430481.gif" width="32%">
<img src="https://user-images.githubusercontent.com/103303021/207070542-3f1b645a-713b-4f27-82c7-20e84f916225.gif" width="32%">
<img src="https://user-images.githubusercontent.com/103303021/207072407-0fc68332-aa57-47d2-be89-e32efe8d7fb7.gif" width="32%">

</p>

##### - 회원가입 시 기본 정보를 입력한 사용자는 곧바로 챗봇을 이용한 성향 정보 등록 페이지로 이동한다.

##### - 성향 정보는 기상, 출근, 점심, 퇴근 시간, 이동 수단 등이 있다.

<br>

### 2. 일정 등록 후 타임라인, 달력 페이지

<p align="center">

<img src="https://user-images.githubusercontent.com/103303021/207075863-1a18dcbf-bd45-4c3d-967d-3dc7590361a5.png" width="32%">
<img src="https://user-images.githubusercontent.com/103303021/207073018-cd9d8b71-57d7-4ff7-88df-fb0235458c2d.gif" width="32%">
<img src="https://user-images.githubusercontent.com/103303021/207073055-6495c9db-a718-4b01-82b3-f104345edc21.gif" width="32%">

</p>

##### - 사용자는 태그, 카테고리, 일정의 출발지 도착지 등을 입력해 일정을 등록한다.
##### - 출발지와 도착지를 기준으로 이동 소요 시간이 계산돼 입력된다. (자동차 기준, Kakao maps API 사용)


<br>

### 3. 메모, 프로필 페이지, 챗봇

<p align="center">

<img src="https://user-images.githubusercontent.com/103303021/207073516-bc7ca540-4abc-45c8-841f-f16c3b262fe4.gif" width="32%">
<img src="https://user-images.githubusercontent.com/103303021/207073559-d9ed15d9-0a41-4edd-85c7-8858303d6204.gif" width="32%">
<img src="https://user-images.githubusercontent.com/103303021/207073609-e0b7b934-739e-4b37-973c-7b76a1ddf92c.gif" width="32%">
</p>

##### - 간단한 메모 기능이 구현돼 있다.
##### - 성향 정보를 수정할 수 있다.
##### - 챗봇과 일상대화, 심리상담, qna가 가능하다.

<br>

### 4. 서비스 추천, 알림

<p align="center">

<img src="https://user-images.githubusercontent.com/103303021/207078282-27d276aa-964e-460a-97da-473b2fabb801.gif" width="40%">
<img src="https://user-images.githubusercontent.com/103303021/207078309-5e19215d-9828-4bef-905f-58885de8a9fd.gif" width="40%">

</p>

##### - 등록된 일정과 관련한 서비스를 추천해준다.
##### - 일정을 등록할 때 설정했던 미리 알림의 시간만큼 일정 시작 시각 이전에 알림을 준다. (미리 알림 설정 X -> 제 시간에 알림)

<br>

### 5. 챗봇 상세 정보

![image](https://user-images.githubusercontent.com/103303021/207079295-8d911957-c7d4-4aa1-8259-ae0b3ca4e546.png)


![image](https://user-images.githubusercontent.com/103303021/207079638-a54e56f8-f158-4ff2-b4f2-38488e78fa43.png)
