import { useEffect, useState } from "react";
import "./App.css";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import dayjs from "dayjs";
import axios from "axios";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import { MemoryType } from "./type";
import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxWidth: 500,
  boxShadow: 24,
  borderRadius: 3,
  outline: "none",
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// * 첫 만난 날 D-day 계산 때문에 -1함
const firstDay = "2022.04.30";

function App() {
  //* 지도 중심 좌표
  const [center, setCenter] = useState({
    lat: 33.5563,
    lng: 126.79881,
  });

  // * 모달 오픈
  const [isOpen, setIsOpen] = useState(false);
  // * 커스텀 오버레이
  const [overlayPosition, setOverlayPosition] = useState({ lat: 0, lng: 0 });
  // * 마커 중복일 때
  const [duplPosition, setDuplPosition] = useState({ lat: 0, lng: 0 });
  // * 마커 중복 데이터 리스트
  const [dupl, setDupl] = useState<MemoryType[]>([]);
  // * 하트 이미지 변경
  const [heartPosition, setHeartPosition] = useState({ lat: 0, lng: 0 });
  // * 메뉴 오픈
  const [open, setOpen] = useState(false);
  // * 리스트
  const [memory, setmemory] = useState<MemoryType[]>([]);
  // * 모달 상세 데이터
  const [modalMemory, setModalMemory] = useState<MemoryType | null>();
  // * 로딩
  const [loading, setLoading] = useState(false);
  // * 페이지네이션
  // const [page, setPage] = useState(1);
  // const [total, setTotal] = useState(0);

  // * 데이터 받아오기
  const handleGetMemory = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        `${"https://ara-sangkwon-kogong.koyeb.app"}/api/memories?populate=*&pagination[pageSize]=100&pagination[page]=${1}`
      );
      if (status === 200 && Array.isArray(data.data)) {
        setmemory(data.data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // * 데이터 받아오기
  useEffect(() => {
    if (memory.length === 0) {
      handleGetMemory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // * D-day 계산
  const handleDay = (day: any) => {
    return Math.abs(Math.floor(dayjs(firstDay).diff(day, "day", true)));
  };

  // * 범위 계산해서 마커 중복 리스트 뽑기
  const handleGetDuplication = (position: any) => {
    const minLat = position.attributes.lat - 0.0001;
    const minLng = position.attributes.lng - 0.0001;
    const maxLat = position.attributes.lat + 0.0001;
    const maxLng = position.attributes.lng + 0.0001;
    if (Array.isArray(memory) && memory.length > 0) {
      const Dupl = memory.filter(
        (data) =>
          minLat <= data.attributes.lat &&
          data.attributes.lat <= maxLat &&
          minLng <= data.attributes.lng &&
          data.attributes.lng <= maxLng
      );
      if (Dupl.length > 1) {
        setDupl(Dupl);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  console.log(overlayPosition);

  return (
    <>
      <header className="header">
        <img
          className="menu"
          src="/menu.svg"
          alt="menu"
          onClick={() => {
            setOverlayPosition({
              lat: 0,
              lng: 0,
            });
            setHeartPosition({
              lat: 0,
              lng: 0,
            });
            setOpen(true);
          }}
        />
        <h1 className="header-title">ara-sangkwon</h1>
        {loading && (
          <img src="/loading.gif" alt="loading" style={{ height: "40px" }} />
        )}
      </header>
      <Map
        center={center}
        isPanto={true}
        style={{ width: "100%", height: "100vh" }}
        level={3}
        onClick={(_t, mouseEvent) => {
          setOverlayPosition({
            lat: 0,
            lng: 0,
          });
          setDupl([]);
          console.log({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
        }}
      >
        <MarkerClusterer minLevel={3} averageCenter={true}>
          {Array.isArray(memory) &&
            memory.length > 0 &&
            memory.map((position, index) => (
              <MapMarker
                title={String(index)}
                onClick={() => {
                  if (handleGetDuplication(position)) {
                    handleGetDuplication(position);
                    setDuplPosition({
                      lat: position.attributes.lat,
                      lng: position.attributes.lng,
                    });
                  } else {
                    setModalMemory(position);
                    setCenter({
                      lat: position.attributes.lat,
                      lng: position.attributes.lng,
                    });
                    setOverlayPosition({
                      lat: position.attributes.lat,
                      lng: position.attributes.lng,
                    });
                    setHeartPosition({
                      lat: position.attributes.lat,
                      lng: position.attributes.lng,
                    });
                  }
                }}
                key={`${position.attributes.lat}-${position.attributes.lng}`}
                position={{
                  lat: position.attributes.lat,
                  lng: position.attributes.lng,
                }}
                image={{
                  src:
                    (position.attributes.lat === heartPosition.lat &&
                      position.attributes.lng === heartPosition.lng) ||
                    (overlayPosition.lat === position.attributes.lat &&
                      overlayPosition.lng === position.attributes.lng)
                      ? `/heart_pink.svg`
                      : `/heart_black.svg`,
                  size: { width: 25, height: 25 },
                }}
                onMouseOver={() =>
                  setHeartPosition({
                    lat: position.attributes.lat,
                    lng: position.attributes.lng,
                  })
                }
                onMouseOut={() =>
                  setHeartPosition({
                    lat: 0,
                    lng: 0,
                  })
                }
              ></MapMarker>
            ))}
        </MarkerClusterer>
        {Array.isArray(dupl) && dupl.length > 0 && (
          <CustomOverlayMap
            position={{
              lat: duplPosition.lat,
              lng: duplPosition.lng,
            }}
            yAnchor={1.5}
            xAnchor={0.5}
            clickable
          >
            <div className="dupl-list">
              {dupl.map((du, index) => (
                <div
                  className="dupl-wrap"
                  key={index}
                  onClick={() => {
                    setOverlayPosition({
                      lat: du.attributes.lat,
                      lng: du.attributes.lng,
                    });
                    setHeartPosition({
                      lat: du.attributes.lat,
                      lng: du.attributes.lng,
                    });
                    setDuplPosition({
                      lat: 0,
                      lng: 0,
                    });
                    setModalMemory(du);
                  }}
                >
                  <div className="dupl-day">
                    +{handleDay(du?.attributes?.date)}
                  </div>
                  <div className="dupl-title">{du?.attributes?.title}</div>
                  <div className="dupl-date">
                    {dayjs(du?.attributes?.date).format("YY.MM.DD")}
                  </div>
                </div>
              ))}
            </div>
          </CustomOverlayMap>
        )}
        {Array.isArray(memory) &&
          memory.length > 0 &&
          memory.map(
            (item, index) =>
              overlayPosition.lat === item.attributes.lat &&
              overlayPosition.lng === item.attributes.lng && (
                <CustomOverlayMap
                  clickable
                  position={{
                    lat: item.attributes.lat,
                    lng: item.attributes.lng,
                  }}
                  yAnchor={1.15}
                  key={index}
                  xAnchor={0.5}
                >
                  <div className="wrapper">
                    <img
                      className="images"
                      alt="thumbnail"
                      src={`${"https://ara-sangkwon-kogong.koyeb.app"}${
                        item.attributes.thumbnail.data?.attributes?.url
                      }`}
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    />
                    <div className="bottom">
                      <div className="titleWrap">
                        <div className="title"> {item.attributes.title}</div>
                        <div className="day">
                          +{handleDay(item.attributes.date)}
                        </div>
                      </div>
                      <div className="place">{item.attributes.place}</div>
                      <div className="date">
                        {dayjs(item.attributes.date).format("YY.MM.DD")}
                      </div>
                    </div>
                  </div>
                </CustomOverlayMap>
              )
          )}
      </Map>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-wrap">
            {Array.isArray(modalMemory?.attributes?.slide?.data) && (
              <Slider {...settings}>
                {modalMemory?.attributes?.slide?.data.map((slide, index) => (
                  <div key={index}>
                    <img
                      className="modal-img"
                      alt="img"
                      src={`${"https://ara-sangkwon-kogong.koyeb.app"}${
                        slide.attributes.url
                      }`}
                    />
                  </div>
                ))}
              </Slider>
            )}
            <div className="modal-bottom">
              <div className="modal-title">
                {modalMemory?.attributes?.title}
              </div>
              <div className="modal-place">
                {modalMemory?.attributes?.place}
              </div>
              <div className="modal-desc">{modalMemory?.attributes?.desc}</div>
              <div className="modal-tittle-wrap">
                <div className="modal-date">
                  {modalMemory?.attributes?.date}
                </div>
                <div className="modal-day">
                  +{handleDay(modalMemory?.attributes?.date)}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Drawer
        sx={{ width: "100%" }}
        anchor={"left"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="drawer-wrap">
          {Array.isArray(memory) &&
            memory.length > 0 &&
            memory.map((data, index) => (
              <div
                key={index}
                className="drawer-item"
                onClick={() => {
                  setCenter({
                    lat: data.attributes.lat,
                    lng: data.attributes.lng,
                  });
                  setHeartPosition({
                    lat: data.attributes.lat,
                    lng: data.attributes.lng,
                  });
                  setOverlayPosition({
                    lat: data.attributes.lat,
                    lng: data.attributes.lng,
                  });
                  setOpen(false);
                }}
              >
                <div className="drawer-left-wrap">
                  {handleDay(data?.attributes.date)}일
                  <div className="drawer-left">
                    <div className="drawer-title">{data.attributes.title}</div>
                    <div className="drawer-place">{data.attributes.place}</div>
                    <div className="drawer-date">
                      {dayjs(data.attributes.date).format("YY.MM.DD")}
                    </div>
                  </div>
                </div>
                <img
                  className="drawer-img"
                  src={`${"https://ara-sangkwon-kogong.koyeb.app"}${
                    data?.attributes.thumbnail.data?.attributes?.url
                  }`}
                  alt="img"
                />
              </div>
            ))}
        </div>
      </Drawer>
    </>
  );
}

export default App;
