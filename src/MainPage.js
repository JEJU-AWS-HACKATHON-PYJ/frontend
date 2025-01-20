import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultMarkerImage from "./assets/logo.png"; // 기본 마커 이미지
import selectedMarkerImage from "./assets/selected.png";
import textLogo from "./assets/textlogo.png";
import {FaClock, FaHeart, FaMapMarkerAlt, FaRegHeart} from "react-icons/fa"; // 선택된 마커 이미지
import modal from "./assets/modal.png";
import {LuBookHeart} from "react-icons/lu";

const MainPage = () => {
    const Header = () => {
        return (
            <header className="w-full max-w-[428px] h-16 pl-7 bg-transparent text-white flex items-center justify-between px-4 fixed top-0 z-10">
                {/* 로고 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                    <img src={textLogo} alt="로고" className="h-8" />
                </div>

                {/* 오른쪽: 하트 아이콘 */}
                <div className="ml-auto pr-3">
                    <LuBookHeart className="h-7 w-7 text-black"/>
                </div>
            </header>
        );
    };

    const [currentLocation, setCurrentLocation] = useState({
        lat: 37.3595704,
        lng: 127.105399,
    });

    const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보
    const [mapInstance, setMapInstance] = useState(null); // 지도 인스턴스 저장
    const navigate = useNavigate();

    const dummyData = [
        {
            id: 1,
            name: "제주약선감귤농장",
            address: "제주 제주시 무진굴길 26",
            operatingHours: "08:00 - 21:00",
            latitude: 33.3785614,
            longitude: 126.5661908,
        },
        {
            id: 2,
            name: "제주농장 2",
            address: "제주 서귀포시 효돈로 234",
            operatingHours: "09:00 - 20:00",
            latitude: 33.3795614,
            longitude: 126.5651908,
        },
    ];

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    alert("위치 정보를 가져올 수 없어 기본 위치로 설정됩니다.");
                }
            );
        } else {
            alert("GPS를 사용할 수 없는 브라우저입니다.");
        }
    }, []);

    useEffect(() => {
        const { naver } = window;
        if (naver) {
            const mapOptions = {
                center: new naver.maps.LatLng(
                    currentLocation.lat,
                    currentLocation.lng
                ),
                zoom: 12,
            };

            // 지도 초기화
            const map = new naver.maps.Map("map", mapOptions);
            setMapInstance(map); // 지도 인스턴스 저장
            // 현재 위치 마커 추가
            const currentLocationMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(
                    currentLocation.lat,
                    currentLocation.lng
                ),
                map: map,
                icon: {
                    content: `
                    <div style="
                        width: 20px;
                        height: 20px;
                        background-color: blue;
                        border-radius: 50%;
                        box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
                        border: 2px solid white;
                    "></div>
                `,
                    anchor: new naver.maps.Point(10, 10), // 마커 중심 설정
                },
            });
        }
    }, [currentLocation]); // currentLocation 변경 시에만 실행

    useEffect(() => {
        if (mapInstance) {
            const { naver } = window;

            // 기존 마커를 저장하는 배열
            let markers = [];

            // 더미 데이터 마커 추가
            dummyData.forEach((place) => {
                // 선택된 상태에 따라 아이콘 결정
                const isSelected = selectedPlace?.id === place.id;

                // 기존 마커를 제거
                if (markers[place.id]) {
                    markers[place.id].setMap(null);
                }

                // 새로운 마커 생성
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(place.latitude, place.longitude),
                    map: mapInstance,
                    icon: {
                        content: `
                    <div style="
                        width: ${isSelected ? 40 : 35}px;
                        height: ${isSelected ? 40 : 35}px;
                        background: url(${
                            isSelected ? selectedMarkerImage : defaultMarkerImage
                        }) no-repeat center;
                        background-size: contain;
                    "></div>
                `,
                        anchor: new naver.maps.Point(15, 15), // 마커 기준점
                    },
                });

                // 마커 클릭 이벤트
                naver.maps.Event.addListener(marker, "click", () => {
                    setSelectedPlace(isSelected ? null : place); // 선택 상태를 토글
                    mapInstance.setCenter(
                        new naver.maps.LatLng(place.latitude, place.longitude)
                    ); // 선택된 마커를 중심으로 지도 이동
                });

                // 새로운 마커를 배열에 저장
                markers[place.id] = marker;
            });

            // 선택 상태가 변경되면 이전 상태를 초기화
            return () => {
                markers.forEach((marker) => marker.setMap(null)); // 모든 마커 제거
                markers = [];
            };
        }

    }, [mapInstance, selectedPlace]); // mapInstance와 selectedPlace 변경 시 실행


    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (selectedPlace) {
            setIsModalVisible(true); // 모달 표시
        } else {
            setIsModalVisible(false); // 모달 숨기기
        }
    }, [selectedPlace]);


    return (
        <div className="w-full h-screen relative">
            <Header />
            {/* 지도 영역 */}
            <div id="map" className="w-full h-full"></div>

            {/* 모달 */}
            {selectedPlace && (
                <div
                    className={`max-w-[428px] fixed bottom-0 w-full bg-customOrange shadow-lg px-7 pt-10 pb-14 z-50 transition-transform transform ${
                        isModalVisible ? "translate-y-0" : "translate-y-full"
                    } rounded-t-3xl`}

                >
                    <div
                        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModalVisible(false); // 애니메이션으로 모달 닫기
                            setSelectedPlace(null);
                        }}
                    >
                        <img src ={modal} />
                    {/*    <div className="object-right"><img src={aab} /></div>*/}
                    </div>


                    <div onClick={() => navigate(`/farm/${selectedPlace.id}`)}>
                    <h2 className="text-3xl font-bold mt-6 mb-2">{selectedPlace.name}</h2>
                        <div className="mt-4 space-y-2">
                            {/* 주소 */}
                            <p className="text-md font-medium flex items-center">
                                <FaMapMarkerAlt className=" mr-2" />
                                {selectedPlace.address}
                            </p>
                            {/* 영업시간 */}
                            <p className="text-md font-medium flex items-center">
                                <FaClock className="mr-2" />
                                영업시간: {selectedPlace.operatingHours}
                            </p>
                        </div></div>
                </div>
            )}

        </div>
    );
};

export default MainPage;
