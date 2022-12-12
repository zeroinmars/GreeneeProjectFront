# 그리니.AI
## `라이프 컨시어지 서비스` 

    바쁜 현대인을 위한 인공지능 비서!
    사용자의 성향, 일정 정보를 파악한 AI가 적절한 서비스 추천, 알림을 제공한다.

    사용 기술: React, Node.js, MySQL, GPT-3 등




### 1. 화면 구성

<div align = "center">

![image](https://user-images.githubusercontent.com/103303021/207062840-726d439a-82ca-4b94-9e36-885b8d99af52.png)
</div>

    상단바 : 챗봇으로 이동하는 캐릭터 이미지를 삽입한다.

    하단바 : 페이지로 이동할 버튼을 나열한다.


<br>



### 2. 태스크 플로우

<div align = "center">

![image](https://user-images.githubusercontent.com/103303021/206640631-9ce13761-67b2-44fc-b231-57bf4862fb33.png)

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



### 3. 서비스 흐름 (아키텍쳐)

<div align = "center">

![image](https://user-images.githubusercontent.com/103303021/207067604-056869d4-6bce-4156-8b55-518247a2d215.png)

</div>
    
<hr>

### 1. 회원가입 및 성향 등록

<figure class="third">

![1  회원가입](https://user-images.githubusercontent.com/103303021/207070277-70bd31e5-1c65-4b42-96c4-28160d430481.gif)

![2  성향등록](https://user-images.githubusercontent.com/103303021/207070542-3f1b645a-713b-4f27-82c7-20e84f916225.gif)

</figure>

### 2. 성향 등록


<p align="center">
<img src="https://user-images.githubusercontent.com/103303021/207070277-70bd31e5-1c65-4b42-96c4-28160d430481.gif">
<img src="https://user-images.githubusercontent.com/103303021/207070542-3f1b645a-713b-4f27-82c7-20e84f916225.gif">

</p>