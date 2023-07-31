import { useEffect, useState } from "react";
import "./App.css";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
//@ts-ignore
const { kakao } = window;

const data = [
  {
    latlng: { lat: 33.5563, lng: 126.79581 },
    iwContent: (
      <div className="wrapper">
        <img className="images" src="/test.jpg" />
        <div className="bottom">
          <div className="titleWrap">
            <div className="title"> 피맥과 함께</div>
            <div className="day">+546</div>
          </div>
          <div className="place">맥파이</div>
          <div className="date"> 23.07.31</div>
        </div>
      </div>
    ),
  },
  {
    latlng: { lat: 33.5563, lng: 126.79881 },
    iwContent: [
      '<div class="wrapper" >',
      '<img  class="images" src="/test.jpg"/>',
      '<div class="bottom">',
      '<div class="titleWrap">',
      '<div class="title"> 피맥과 함께</div>',
      '<div class="day">+546</div>',
      "</div>",
      '<div class="place">맥파이</div>',
      '<div class="dateWrap">',
      '<div class="date"> 23.07.31</div>',
      '<div class="more">더보기</div>',
      "</div>",
      "</div>",
      "</div>",
    ].join(""),
  },
];
function App() {
  // const [clickedOverlay, setClickedOverlay] = useState<any>();
  // const [openModal, setOpenModal] = useState(false);
  // useEffect(() => {
  //   var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  //     mapOption = {
  //       center: new kakao.maps.LatLng(37.4862618, 127.1222903), // 지도의 중심좌표
  //       level: 3, // 지도의 확대 레벨
  //     };

  //   var imageSrc = "/heart.svg", // 마커이미지의 주소입니다
  //     imageSize = new kakao.maps.Size(25, 25), // 마커이미지의 크기입니다
  //     imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  //   // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  //   var markerImage = new kakao.maps.MarkerImage(
  //     imageSrc,
  //     imageSize,
  //     imageOption
  //   );

  //   // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  //   var map = new kakao.maps.Map(mapContainer, mapOption);

  //   data.map((item) => {
  //     const markerPosition = new kakao.maps.LatLng(
  //       item.latitude,
  //       item.longitude
  //     );
  //     const marker = new kakao.maps.Marker({
  //       position: markerPosition,
  //       image: markerImage,
  //     });

  //     var content = document.createElement("div");
  //     content.onclick = function () {
  //       customOverlay.setMap(null);
  //     };
  //     content.classList.add("close");
  //     var more = document.createElement("div");
  //     more.classList.add("more");
  //     more.innerHTML = "더보기";
  //     more.onclick = function () {
  //       setOpenModal(true);
  //     };
  //     var stringToHTML = function (str: any) {
  //       var dom = document.createElement("div");
  //       dom.innerHTML = str;
  //       return dom;
  //     };
  //     const tags = stringToHTML(item.iwContent);
  //     tags.appendChild(content);
  //     tags.appendChild(more);
  //     var customOverlay = new kakao.maps.CustomOverlay({
  //       position: marker.getPosition(),
  //       content: item.iwContent + content,
  //       yAnchor: 1.1,
  //       xAnchor: 0.4,
  //       removable: true,
  //     });
  //     customOverlay.setContent(tags);
  //     marker.setMap(map);
  //     handleClickOverlay(marker, customOverlay, map);
  //   });
  // }, []);

  const handleClickOverlay = (marker: any, customOverlay: any, map: any) => {
    kakao.maps.event.addListener(marker, "click", function () {
      customOverlay.setMap(map);
    });
  };

  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100vh" }}
      >
        {data.map((position) => (
          <MapMarker
            key={`${position.latlng.lat}-${position.latlng.lng}`}
            position={position.latlng}
            image={{ src: "/heart.svg", size: { width: 25, height: 25 } }}
          ></MapMarker>
        ))}
        {data.map((item) => (
          <CustomOverlayMap position={item.latlng}>
            {item.iwContent}
          </CustomOverlayMap>
        ))}
      </Map>
    </>
  );
}

export default App;
