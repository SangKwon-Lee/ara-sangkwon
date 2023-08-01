import { useState } from "react";
import "./App.css";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Slider from "react-slick";
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
function App() {
  const [center, setCenter] = useState({
    lat: 33.5563,
    lng: 126.79881,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ lat: 0, lng: 0 });
  const [heartPosition, setHeartPosition] = useState({ lat: 0, lng: 0 });
  const [open, setOpen] = useState(false);
  const data = [
    {
      lat: 33.5563,
      lng: 126.79581,
    },
    {
      lat: 33.5563,
      lng: 126.79881,
    },
  ];

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
      </header>
      <Map
        center={center}
        isPanto={true}
        style={{ width: "100%", height: "100vh" }}
        level={3}
      >
        <MarkerClusterer minLevel={3} averageCenter={true}>
          {data.map((position, index) => (
            <MapMarker
              title={String(index)}
              onClick={() => {
                setCenter({ lat: position.lat, lng: position.lng });
                setOverlayPosition({
                  lat: position.lat,
                  lng: position.lng,
                });
              }}
              key={`${position.lat}-${position.lng}`}
              position={{ lat: position.lat, lng: position.lng }}
              image={{
                src:
                  (position.lat === heartPosition.lat &&
                    position.lng === heartPosition.lng) ||
                  (overlayPosition.lat === position.lat &&
                    overlayPosition.lng === position.lng)
                    ? `/heart_pink.svg`
                    : `/heart_black.svg`,
                size: { width: 25, height: 25 },
              }}
              onMouseOver={() =>
                setHeartPosition({
                  lat: position.lat,
                  lng: position.lng,
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
        {data.map(
          (item, index) =>
            overlayPosition.lat === item.lat &&
            overlayPosition.lng === item.lng && (
              <CustomOverlayMap
                position={{ lat: item.lat, lng: item.lng }}
                yAnchor={1.15}
                key={index}
              >
                <div className="wrapper">
                  <img
                    className="images"
                    alt="img"
                    src="/test.jpg"
                    onClick={() => setIsOpen(true)}
                  />
                  <div className="bottom">
                    <div className="titleWrap">
                      <div className="title"> 피맥과 함께</div>
                      <div className="day">+546</div>
                    </div>
                    <div className="place">맥파이</div>
                    <div className="date"> 23.07.31</div>
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
            <Slider {...settings}>
              <div>
                <img className="modal-img" alt="img" src="/test.jpg" />
              </div>
              <div>
                <img className="modal-img" alt="img" src="/test.jpg" />
              </div>
            </Slider>
            <div className="modal-bottom">
              <div className="modal-title">피맥과 함께</div>
              <div className="modal-place">맥파이</div>
              <div className="modal-desc">
                피맥과 함께피맥과 함께피맥과 함께피맥과 함께피맥과 함께 피맥과
                함께피맥과 함께피맥과 함께피맥과 함께피맥과 함께
              </div>
              <div className="modal-tittle-wrap">
                <div className="modal-date">23.07.23</div>
                <div className="modal-day">+546</div>
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
          <div
            className="drawer-item"
            onClick={() => {
              setCenter({ lat: 33.5563, lng: 126.79581 });
              setOpen(false);
              setOverlayPosition({
                lat: 33.5563,
                lng: 126.79581,
              });
              setHeartPosition({
                lat: 33.5563,
                lng: 126.79581,
              });
            }}
          >
            <div className="drawer-left-wrap">
              546일
              <div className="drawer-left">
                <div className="drawer-title">피맥과 함께</div>
                <div className="drawer-place">맥파이</div>
                <div className="drawer-date">23.07.23</div>
              </div>
            </div>
            <img className="drawer-img" src="/test.jpg" alt="img" />
          </div>
          <div
            className="drawer-item"
            onClick={() => {
              setCenter({ lat: 33.5563, lng: 126.79881 });
              setOpen(false);
            }}
          >
            <div className="drawer-left-wrap">
              546일
              <div className="drawer-left">
                <div className="drawer-title">피맥과 함께</div>
                <div className="drawer-place">맥파이</div>
                <div className="drawer-date">23.07.23</div>
              </div>
            </div>
            <img className="drawer-img" src="/test.jpg" alt="img" />
          </div>{" "}
          <div className="drawer-item">
            <div className="drawer-left-wrap">
              546일
              <div className="drawer-left">
                <div className="drawer-title">피맥과 함께</div>
                <div className="drawer-place">맥파이</div>
                <div className="drawer-date">23.07.23</div>
              </div>
            </div>
            <img className="drawer-img" src="/test.jpg" alt="img" />
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default App;
