// npm install react-kakao-maps-sdk 필수!
// 안 되면 yarn add react-kakao-maps-sdk
import React, { useEffect, useState, useRef } from "react";
import { TextField, Button } from '@mui/material'
import { Dialog } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Slide from '@mui/material/Slide';
import happygreenee from '../img/greeneehappy.png'
import "../css/map.css"
import "../css/AddEvent.css"

const { kakao } = window;

const theme = createTheme({
  palette: {
    // primary: {
    //   // Purple and green play nicely together.
    //   main: purple[500],
    // },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignUpMapAPI = ({ hLocation, cLocation, setHLocation, setCLocation }) => {
  const [hLabel, setHLabel] = useState('자택 주소');
  const [cLabel, setCLabel] = useState('회사 주소');

  const inputLabel = () => {
    if (flag === '자택 주소') {
      setHLabel('');
    } else {
      setCLabel('');
    }
    setHLocation(homeAddr);
    setCLocation(comAddr);

    handleCheckClose();
    handleClose();
  }

  // 지도 모달 열고 닫는 상태값
  const [openMap, setOpenMap] = useState(false);

  // 체크 모달 열고 닫는 상태값
  const [openCheck, setOpenCheck] = useState(false);

  // 자택 주소, 회사 주소 상태값(도로명 혹은 지번 주소)
  const [homeAddr, setHomeAddr] = useState('');
  const [comAddr, setComAddr] = useState('');

  // 자택 주소, 회사 주소 상태값(사용자가 보는 주소)
  const [homeUserAddr, setHomeUserAddr] = useState(hLocation);
  const [comUserAddr, setComUserAddr] = useState(cLocation);

  // 지도 검색 버튼 찾기
  const searchButton = useRef();

  // 사용자가 검색하려는게 자택 주소인지 회사 주소인지 확인하기
  const [flag, setFlag] = useState('');

  // map 열고 닫기
  const handleOpenHome = () => {
    setFlag('자택 주소');
    setOpenMap(true);
  }
  const handleOpenCom = () => {
    setFlag('회사 주소')
    setOpenMap(true);
  }
  const handleClose = () => {
    setOpenMap(false);
  }

  // check 열고 닫기
  const handleCheckOpen = () => {
    setOpenCheck(true);
  }
  const handleCheckClose = () => {
    setOpenCheck(false);
  }

  // 지도 변수 미리 생성
  var map;

  // 마커를 담을 배열입니다
  var markers = [];

  var ps = new kakao.maps.services.Places();

  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 모달이 열렸을 때 지도를 띄우기 위해 useEffect 사용.
  useEffect(() => {
    // 모달 열리자마자 안의 내용들 싹다 선언해버리면 지도가 안 띄워짐
    // 따라서 setTimeout 설정
    const st = setTimeout(() => {
      // 지도 모달창이 열렸을 때만 지도 관련 변수 및 함수 선언 
      if (openMap) {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
          };

        // 지도를 생성합니다    
        map = new kakao.maps.Map(mapContainer, mapOption);

        // 키워드 검색을 요청하는 함수입니다
        const searchPlaces = () => {

          var keyword = document.getElementById('keyword').value;

          if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
          }

          // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
          ps.keywordSearch(keyword, placesSearchCB);
        }



        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 페이지 번호를 표출합니다
            displayPagination(pagination);

          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

          } else if (status === kakao.maps.services.Status.ERROR) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

          }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {

          var listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

          // 검색 결과 목록에 추가된 항목들을 제거합니다
          removeAllChildNods(listEl);

          // 지도에 표시되고 있는 마커를 제거합니다
          removeMarker();

          for (var i = 0; i < places.length; i++) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
              marker = addMarker(placePosition, i),
              itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다

            // ** 마커에 이벤트 넣기 -> 클릭하면 마커가 커지기
            (function (marker, title) {
              kakao.maps.event.addListener(marker, 'mouseover', function () {
                displayInfowindow(marker, title);
              });

              kakao.maps.event.addListener(marker, 'click', function () {

                displayInfowindow(marker, title);
              });


              kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
              });

              itemEl.onmouseover = function () {
                displayInfowindow(marker, title);
              };

              itemEl.onclick = function () {
                displayInfowindow(marker, title);
              };

              // itemEl.onmouseout = function () {
              //   infowindow.close();
              // };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
          }

          // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
          listEl.appendChild(fragment);
          menuEl.scrollTop = 0;

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          // console.log(map, bounds)
          map.setBounds(bounds);
        }

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {

          var el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
              '<div class="info">' +
              '   <h3>' + places.place_name + '</h3>';

          if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
              '   <span class="jibun gray">' + places.address_name + '</span>';
          } else {
            itemStr += '    <span>' + places.address_name + '</span>';
          }

          itemStr += ' <span class="tel">' + places.phone + '</span>' +
            '</div>';
          // itemStr += ' <div><span class="tel">' + places.phone + '</span>';


          el.innerHTML = itemStr;
          el.className = 'item';

          // 장소 선택하는 버튼 생성, 함수 집어넣기
      
          const button = document.createElement('button');
          button.innerText = '선택';
          button.className = 'button_choice';
          button.addEventListener('click', () => {
            setOpenCheck(true);
          });

          // 버튼을 각 장소 정보 li마다 넣어주기
          el.appendChild(button);
          


          // 사용자가 리스트 내 주소를 클릭했을 때 실행하는 함수
          el.addEventListener('click', (e) => {

            // 자택 주소인지 회사 주소인지 확인
            if (flag === '자택 주소') {
              // 자택 주소 장소 이름 저장
              setHomeUserAddr(places.place_name);

              // 도로명 주소 있는지 확인
              if (places.road_address_name) {
                // 도로명 주소 저장
                setHomeAddr(places.road_address_name);
              } else {
                // 지번 주소 저장
                setHomeAddr(places.address_name);
              }

            } else {
              setComUserAddr(places.place_name);
              if (places.road_address_name) {
                setComAddr(places.road_address_name);
              } else {
                setComAddr(places.address_name);
              }
            }
          })

          return el;
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
          var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions = {
              spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
              spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
              offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage
            });

          marker.setMap(map); // 지도 위에 마커를 표출합니다
          markers.push(marker);  // 배열에 생성된 마커를 추가합니다

          return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
          var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

          // 기존에 추가된 페이지번호를 삭제합니다
          while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
          }

          for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i === pagination.current) {
              el.className = 'on';
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i);
                }
              })(i);
            }

            fragment.appendChild(el);
          }
          paginationEl.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
          var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
          while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
          }
        }
        searchButton.current.onclick = searchPlaces;

      }
    }, 1000)
  }, [openMap])

  return (
    <>
      <TextField
        size="small" variant="standard" sx={{ mb: "20px" }}
        value={homeUserAddr} label={hLabel} name="hLocation"
        onClick={handleOpenHome}
      />

      <TextField
        size="small" variant="standard" sx={{ mb: "20px" }}
        value={comUserAddr} label={cLabel} name="cLocation"
        onClick={handleOpenCom}
      />

      <Dialog open={openMap} onClose={handleClose} fullScreen TransitionComponent={Transition}>
        <div id="menu_wrap" className="bg_white">
          <div id="map" style={{ width: "100%", height: "55%", overflow: "hidden" }}>
            <HighlightOffIcon className="button_close" onClick={handleClose} fontSize="large"></HighlightOffIcon>
          </div>
          <div className="option">
            <div className="button_wrap">
              <input type="text" id="keyword" size="34"  style={{fontSize:'16px'}}/>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color='secondary' style={{ color: 'white', font: 'bold' }}
                  size="medium" startIcon={<SearchIcon />} ref={searchButton}>
                  검색
                </Button>
              </ThemeProvider>
            </div>
          </div>
          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
      </Dialog>

      <Dialog style={{ borderRadius: '20px' }} open={openCheck} onClose={handleCheckClose} TransitionComponent={Transition}>
        <div className="location_info">
          <div className="location_title">
            <img src={happygreenee} style={{ width: '12vh' }}></img>
            <h3 style={{ display: 'inline' }}> {flag == '자택 주소' ? homeUserAddr : comUserAddr} !</h3>
          </div>
          <hr></hr>
          <div style={{ paddingLeft: '15px' }}>
            <span style={{ display: 'block' }}>주소는</span><h5>{flag == '자택 주소' ? homeAddr : comAddr} 네요</h5>
          </div>
          <br></br>
          <h6>해당 위치를 {flag}로 설정하실래요?</h6>
          <ThemeProvider theme={theme}>
            <div className="button_check">
              
              <Button className="button_deny" variant="contained" color='secondary' size="medium" style={{ color: 'white', font: 'bold' }} onClick={handleCheckClose}>
                아니
              </Button>
              <Button className="button_accept" variant="contained" color='secondary' size="medium" style={{ color: 'white', font: 'bold' }} onClick={inputLabel}>
                좋아!
              </Button>
            </div>
          </ThemeProvider>
        </div>
      </Dialog>

    </>
  );
};

export default SignUpMapAPI;