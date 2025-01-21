import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaMapMarkerAlt, FaClock, FaPhone, FaGlobe } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

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
        imageUrl: null,
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

const FarmDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const farm = dummyData.find((place) => place.id === parseInt(id));

    const [isFavorite, setIsFavorite] = useState(farm?.isFavorite || false); // 초기값 설정

    if (!farm) {
        return <p>농장 정보를 찾을 수 없습니다.</p>;
    }

    const toggleFavorite = async () => {
        try {
            const newFavoriteStatus = !isFavorite;
            setIsFavorite(newFavoriteStatus); // 상태 업데이트

        } catch (error) {
            console.error("Error updating favorite status:", error);
            alert("즐겨찾기 상태를 업데이트할 수 없습니다.");
        }
    };

    return (
        <div className="w-full max-w-[428px] p-4">
            <header className="flex items-center justify-between mb-4">
                {/* 뒤로가기 버튼 */}
                <IoIosArrowBack
                    size={30}
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                {/* 즐겨찾기 아이콘 */}
                <FaHeart
                    size={30}
                    className={`cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-400"}`}
                    onClick={toggleFavorite} // 클릭 시 즐겨찾기 상태 토글
                />
            </header>
            <div className="p-3">
                <img src={farm.imageUrl} className="rounded-bl"/>
                <h1 className="text-3xl font-bold mt-4">{farm.name}</h1>
                <div className="flex gap-2 mt-2">
                    {farm.keywords
                        ? farm.keywords.split(",").map((keyword, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 rounded px-2 py-1 text-sm"
                            >
                                  #{keyword}
                              </span>
                        ))
                        : "No keywords available"}
                </div>
                <p className="flex items-center mt-4">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                    {farm.address}
                </p>
                <p className="flex items-center mt-2">
                    <FaClock className="w-5 h-5 mr-2" />
                    {farm.operatingHours}
                </p>
                <p className="flex items-center mt-2">
                    <FaPhone className="w-5 h-5 mr-2" />
                    {farm.phone}
                </p>
                <p className="flex items-center mt-2">
                    <FaGlobe className="w-5 h-5 mr-2" />
                    <a href={farm.homepageLink} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                        {farm.homepageLink}
                    </a>
                </p>
                <div className="flex items-start mt-4">
                    <RiMoneyDollarCircleFill className="w-7 h-7 mr-2" />
                    <ul>
                        {farm.products?.map((product, index) => (
                            <li key={index} className="text-sm">
                                {product.name} - {product.price.toLocaleString()}원
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mt-4">{farm.description}</p>
            </div>
        </div>
    );
};

export default FarmDetailPage;
