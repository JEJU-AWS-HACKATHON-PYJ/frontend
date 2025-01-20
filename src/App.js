import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"; // React-Icons 사용
import "./App.css";
import textLogo from "./assets/textlogo.png"; // Default import

const App = () => {
    const [currentLocation, setCurrentLocation] = useState({
        lat: 37.3595704, // 기본 위도
        lng: 127.105399, // 기본 경도
    });

    useEffect(() => {
        // 사용자의 현재 위치를 가져옴
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
        const { naver } = window; // 네이버 지도 객체 확인
        if (naver) {
            const mapOptions = {
                center: new naver.maps.LatLng(
                    currentLocation.lat,
                    currentLocation.lng
                ), // 지도 중심 좌표를 현재 위치로 설정
                zoom: 12, // 초기 줌 레벨 (확대)
            };

            // 지도 생성
            const map = new naver.maps.Map("map", mapOptions);

            // 현재 위치에 마커 추가
            new naver.maps.Marker({
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
                            border: 2px solid white;
                            box-shadow: 0 0 15px rgba(0, 0, 255, 0.5);
                        ">
                        </div>`,
                },
            });
        } else {
            console.error("Naver Maps API is not loaded.");
        }
    }, [currentLocation]); // 현재 위치가 업데이트되면 지도 중심도 업데이트

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
            {/* 아이폰 크기에 맞춘 컨테이너 */}
            <div className="w-full max-w-[428px] flex flex-col bg-white shadow-md">
                {/* 상단바 */}
                <div className="w-full h-12 bg-gray-800 text-white flex items-center justify-between px-4">
                    {/* 가운데: 감귤지도 텍스트 */}
                    <div className="flex justify-center flex-grow">
                        <img
                            src={textLogo} // 로고 이미지 경로 설정
                            alt="로고"
                            className="h-8"
                        />
                    </div>

                    {/* 오른쪽: 하트 아이콘 */}
                    <div>
                        <FaHeart className="text-red-500 h-6 w-6" />
                    </div>
                </div>

                {/* 지도 영역 */}
                <div
                    id="map"
                    className="flex-grow w-full h-[calc(100vh-3rem)]" // 남은 화면 높이 사용
                ></div>
            </div>
        </div>
    );
};

export default App;
