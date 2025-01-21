import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultMarkerImage from "./assets/logo.png"; // 기본 마커 이미지
import selectedMarkerImage from "./assets/selected.png";
import textLogo from "./assets/textlogo.png";
import {FaClock, FaHeart, FaMapMarkerAlt, FaPlusCircle, FaRegHeart} from "react-icons/fa"; // 선택된 마커 이미지
import modal from "./assets/modal.png";
import {LuBookHeart} from "react-icons/lu";

const MainPage = () => {
    const Header = () => {
        return (
            <header className="w-full max-w-[428px] h-16 bg-transparent  flex items-center justify-between px-4 fixed top-0 z-10">
                {/* 왼쪽 로고 */}
                <div className="flex items-center" onClick={() => navigate(`/register`)}>
                    <FaPlusCircle className="h-7 w-7 text-green-600" />
                </div>

                {/* 가운데 로고 */}
                <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
                    <img src={textLogo} alt="로고" className="h-8" />
                </div>

                {/* 오른쪽 로고 */}
                <div className="flex items-center ml-auto" onClick={() => {setSelectedHeart(true);
                setIsModal2Visible(true);}}>
                    <LuBookHeart className="h-7 w-7 text-green-600" />
                </div>
            </header>
        );

    };

    const [currentLocation, setCurrentLocation] = useState({
        lat: 37.3595704,
        lng: 127.105399,
    });

    const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보
    const [selectedHeart, setSelectedHeart] = useState(false);
    const [mapInstance, setMapInstance] = useState(null); // 지도 인스턴스 저장
    const navigate = useNavigate();

    const dummyData = [
        {
            id: 1,
            name: "제주약선감귤농장",
            address: "제주 제주시 무진굴길 26",
            phone: "0507-1321-8634",
            operatingHours: "08:00 - 21:00",
            description: "무농약 재배로 안전하고 신선한 감귤을 제공합니다.",
            latitude: 33.3785614,
            longitude: 126.5661908,
            keywords: "무농약, GAP, 저탄소",
            isFavorite: true,
            imageUrl: null,
            homepageLink: "https://blog.naver.com/farmerjeju",
            products: [
                { name: "무농약귤 3kg", price: 15000 },
                { name: "무농약귤 5kg", price: 20000 },
            ],
        },
        {
            id: 2,
            name: "체험농장 귤향기",
            address: "제주특별자치도 제주시 노형동 160",
            phone: "064-748-0606",
            operatingHours: "08:00 - 21:00",
            description: "오렌지와 귤 등 다양한 감귤류 과일을 판매하는 아담한 현지 식료품 가게입니다.",
            latitude: 33.4650541,
            longitude: 126.4857614,
            keywords: "",
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: "무농약귤 2kg",
            productPrice1: 20000,
            productName2: null,
            productPrice2: null
        },
        {
            id: 3,
            name: "감귤체험농장",
            address: "제주특별자치도 제주시 특별자치도, 봉개동 1411",
            phone: "010-6656-2317",
            operatingHours: "09:00 - 19:00",
            description: null,
            latitude: 33.4873824,
            longitude: 126.6004496,
            keywords: "",
            isFavorite: true,
            imageUrl: null,
            homepageLink: "https://www.brdmall.net/",
            productName1: "제주 레드향 특대과 4.5 kg (17과 내외)",
            productPrice1: 60000,
            productName2: null,
            productPrice2: null
        },
        {
            id: 4,
            name: "구들민박감귤체험농장",
            address: "제주특별자치도 서귀포시 토평동 정방연로 34",
            phone: "010-9245-6528",
            operatingHours: "09:00 - 18:30",
            description: "",
            latitude: 33.2509844,
            longitude: 126.5778287,
            keywords: "",
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: "",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 5,
            name: "제주송정농원",
            address: "제주특별자치도 제주시 영평동 2470-5",
            phone: "010-6358-2381",
            operatingHours: "08:00 - 18:00",
            description: "",
            latitude: 33.4802838441754,
            longitude: 126.564223633911,
            keywords:"",
            isFavorite: false,
            imageUrl: null,
            homepageLink: "https://orangeboy.modoo.at/",
            productName1: "",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },

        {
            id: 6,
            name: "오등감귤관광농원",
            address: "제주특별자치도 제주시 오등동 623",
            phone: "064-747-4738",
            operatingHours: null,
            description: null,
            latitude: 33.4741555,
            longitude: 126.5299214,
            keywords: "",
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: "",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 7,
            name: "제주 감귤낭체험농장",
            address: "제주특별자치도 제주시 화북동 3250-1 제주특별자치도",
            phone: "050-4457-6637",
            operatingHours: "00:00 - 00:00",
            description: "",
            latitude: 33.5559618,
            longitude: 126.7527247,
            keywords: "",
            isFavorite: false,
            imageUrl: null,
            homepageLink: "https://jejumat.modoo.at/",
            productName1: "",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 8,
            name: "낭만농장 귤밭76",
            address: "제주특별자치도 서귀포시 안덕면 병악로 76",
            phone: null,
            operatingHours: "09:00 - 18:00",
            description: "",
            latitude: 33.2830621788721,
            longitude: 126.365148038424,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },

        {
            id: 9,
            name: "텐저린267감귤체험농장",
            address: "제주특별자치도 제주시 삼양일동 267",
            phone: null,
            operatingHours: null,
            description: null,
            latitude: 33.513412982636,
            longitude: 126.604321244248,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },

        {
            id: 10,
            name: "은하감귤체험농장",
            address: "제주특별자치도 서귀포시 안덕면 사계리",
            phone: "064-792-0008",
            operatingHours: "09:00 - 17:30",
            description: "",
            latitude: 33.2316941376585,
            longitude: 126.306514122101,
            keywords: null,
            isFavorite: false,
            imageUrl: '/assets/g3.png',
            homepageLink: "https://www.instagram.com/jeju_eunha/?igshid=8uhei5dsad55",
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 11,
            name: "최남단체험감귤농장",
            address: "제주특별자치도 서귀포시 남원읍 남원리 2019",
            phone: "064-764-7759",
            operatingHours: "09:00 - 18:00",
            description: null,
            latitude: 33.290567481478,
            longitude: 126.693714801419,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 12,
            name: "도련감귤나무숲",
            address: "대한민국 제주시",
            phone: null,
            operatingHours: null,
            description: null,
            latitude: 33.5002651,
            longitude: 126.5873859,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 13,
            name: "보메와산체험농장",
            address: "제주특별자치도 제주시 조천읍 와산리 1194",
            phone: "010-4743-5127",
            operatingHours: null,
            description: null,
            latitude: 33.4842621,
            longitude: 126.680544,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 14,
            name: "아꼼이네 감귤농장",
            address: "제주특별자치도 제주시 특별자치도 연삼로 1066-31",
            phone: "064-805-9181",
            operatingHours: "10:00 - 17:00",
            description: null,
            latitude: 33.5191286,
            longitude: 126.599379,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: "https://akkome.com/",
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 15,
            name: "하례감귤체험농장",
            address: "제주특별자치도 서귀포시 특별자치도, 남원읍 하례리 1158번지",
            phone: "010-3699-4755",
            operatingHours: "09:00 - 17:00",
            description: null,
            latitude: 33.3252261,
            longitude: 126.5961931,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: "타이벡감귤체험",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        }
    ];

    const heartList =[
        {
        id: 1,
            name: "제주약선감귤농장",
            address: "제주 제주시 무진굴길 26",
            phone: "0507-1321-8634",
            operatingHours: "08:00 - 21:00",
            description: "무농약 재배로 안전하고 신선한 감귤을 제공합니다.",
            latitude: 33.3785614,
            longitude: 126.5661908,
            keywords: "무농약, GAP, 저탄소",
            isFavorite: true,
            imageUrl: null,
            homepageLink: "https://blog.naver.com/farmerjeju",
            products: [
            { name: "무농약귤 3kg", price: 15000 },
            { name: "무농약귤 5kg", price: 20000 },
        ],
    },
        {
            id: 5,
            name: "제주송정농원",
            address: "제주특별자치도 제주시 영평동 2470-5",
            phone: "010-6358-2381",
            operatingHours: "08:00 - 18:00",
            description: "",
            latitude: 33.4802838441754,
            longitude: 126.564223633911,
            keywords:"",
            isFavorite: false,
            imageUrl: null,
            homepageLink: "https://orangeboy.modoo.at/",
            productName1: "",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },

        {
            id: 6,
            name: "오등감귤관광농원",
            address: "제주특별자치도 제주시 오등동 623",
            phone: "064-747-4738",
            operatingHours: null,
            description: null,
            latitude: 33.4741555,
            longitude: 126.5299214,
            keywords: "",
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: "",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 7,
            name: "제주 감귤낭체험농장",
            address: "제주특별자치도 제주시 화북동 3250-1 제주특별자치도",
            phone: "050-4457-6637",
            operatingHours: "00:00 - 00:00",
            description: "",
            latitude: 33.5559618,
            longitude: 126.7527247,
            keywords: "",
            isFavorite: false,
            imageUrl: null,
            homepageLink: "https://jejumat.modoo.at/",
            productName1: "",
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
        {
            id: 8,
            name: "낭만농장 귤밭76",
            address: "제주특별자치도 서귀포시 안덕면 병악로 76",
            phone: null,
            operatingHours: "09:00 - 18:00",
            description: "",
            latitude: 33.2830621788721,
            longitude: 126.365148038424,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },

        {
            id: 9,
            name: "텐저린267감귤체험농장",
            address: "제주특별자치도 제주시 삼양일동 267",
            phone: null,
            operatingHours: null,
            description: null,
            latitude: 33.513412982636,
            longitude: 126.604321244248,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: null,
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },

        {
            id: 10,
            name: "은하감귤체험농장",
            address: "제주특별자치도 서귀포시 안덕면 사계리",
            phone: "064-792-0008",
            operatingHours: "09:00 - 17:30",
            description: "",
            latitude: 33.2316941376585,
            longitude: 126.306514122101,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: "https://www.instagram.com/jeju_eunha/?igshid=8uhei5dsad55",
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null},
        {
            id: 14,
            name: "아꼼이네 감귤농장",
            address: "제주특별자치도 제주시 특별자치도 연삼로 1066-31",
            phone: "064-805-9181",
            operatingHours: "10:00 - 17:00",
            description: null,
            latitude: 33.5191286,
            longitude: 126.599379,
            keywords: null,
            isFavorite: false,
            imageUrl: null,
            homepageLink: "https://akkome.com/",
            productName1: null,
            productPrice1: null,
            productName2: null,
            productPrice2: null
        },
    ]

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


    const [isModal1Visible, setIsModal1Visible] = useState(false);
    const [isModal2Visible, setIsModal2Visible] = useState(false);

    useEffect(() => {
        if (selectedPlace) {
            setIsModal1Visible(true); // 모달 표시
        } else {
            setIsModal1Visible(false); // 모달 숨기기
        }
    }, [selectedPlace]);

    useEffect(() => {
        if (selectedHeart) {
            setIsModal2Visible(true); // 모달 표시
        } else {
            setIsModal2Visible(false); // 모달 숨기기
        }
    }, [selectedHeart]);


    return (
        <div className="w-full h-screen relative">
            <Header />
            {/* 지도 영역 */}
            <div id="map" className="w-full h-full"></div>

            {/* 모달 */}
            {selectedPlace && (
                <div
                    className={`max-w-[428px] fixed bottom-0 w-full bg-customOrange shadow-lg px-7 pt-10 pb-14 z-50 transition-transform transform ${
                        isModal1Visible ? "translate-y-0" : "translate-y-full"
                    } rounded-t-3xl`}

                >
                    <div
                        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModal1Visible(false); // 애니메이션으로 모달 닫기
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

            {selectedHeart && (
                <div
                    className={`max-w-[428px] fixed bottom-0 w-full bg-customOrange shadow-lg px-7 pt-16 pb-6 z-50 transition-transform transform ${
                        isModal2Visible ? "translate-y-0" : "translate-y-full"
                    } rounded-t-3xl`}
                >
                    <div
                        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModal2Visible(false); // 애니메이션으로 모달 닫기
                            setSelectedHeart(null);
                        }}
                    >
                        <img src={modal} alt="닫기 버튼" />
                    </div>

                    {/* 스크롤 가능한 영역 */}
                    <div className="overflow-y-auto max-h-[60vh] divide-y divide-black">
                        {heartList.map((farm, index) => (
                            <div
                                key={farm.id}
                                className="rounded-lg p-4"
                            >
                                <h2 className="text-2xl font-bold mb-2">{farm.name}</h2>
                                <div className="space-y-2">
                                    {/* 주소 */}
                                    <p className="text-md font-medium flex items-center">
                                        <FaMapMarkerAlt className="mr-2" />
                                        {farm.address}
                                    </p>
                                    {/* 영업시간 */}
                                    <p className="text-md font-medium flex items-center">
                                        <FaClock className="mr-2" />
                                        {farm.operatingHours
                                            ? `영업시간: ${farm.operatingHours}`
                                            : "영업시간 정보 없음"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
};

export default MainPage;
