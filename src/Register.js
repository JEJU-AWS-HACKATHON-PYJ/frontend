import React, { useState } from "react";
import { registerFarm, getFarmDetail } from "./api";
import {useNavigate} from "react-router-dom"; // API 함수 불러오기

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    operatingHours: "",
    description: "",
    latitude: 0,
    longitude: 0,
    keywords: "",
    imageUrl: "",
    homepageLink: "",
    products: [{ productName: "", productPrice: 0 }],
  });

  const [imagePreview, setImagePreview] = useState("");
  const [farmId, setFarmId] = useState(null); // 농장 ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };

  const addProductField = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, { productName: "", productPrice: 0 }],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 농장 등록
  const handleFarmRegister = async () => {
      alert("농장이 등록되었습니다.");
    navigate(`/`);
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 이미지 업로드 */}
      <div className="mb-6 text-center">
        <div className="w-full h-48 border border-dashed border-gray-400 mx-auto relative p-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            + 이미지 업로드
          </label>
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover mt-4 rounded-lg"
          />
        )}
      </div>

      <h2 className="text-2xl font-bold mb-6">농장 정보 입력</h2>

      <form>
        {/* 농장 이름 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">농장 이름</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="농장 이름을 입력하세요"
          />
        </div>

        {/* 주소 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">주소</p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="주소를 입력하세요"
          />
        </div>

        {/* 운영시간 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">운영 시간</p>
          <div className="flex space-x-2 items-center">
            <input
              type="number"
              name="hourStart"
              value={formData.operatingHours.split(' ~ ')[0]}
              onChange={(e) => handleChange({ target: { name: "operatingHours", value: `${e.target.value} ~ ${formData.operatingHours.split(' ~ ')[1]}` } })}
              className="p-2 w-16 border border-gray-300 rounded-md"
              placeholder="시"
            />
            <span className="text-gray-700">~</span>
            <input
              type="number"
              name="hourEnd"
              value={formData.operatingHours.split(' ~ ')[1]}
              onChange={(e) => handleChange({ target: { name: "operatingHours", value: `${formData.operatingHours.split(' ~ ')[0]} ~ ${e.target.value}` } })}
              className="p-2 w-16 border border-gray-300 rounded-md"
              placeholder="시"
            />
          </div>
        </div>

        {/* 전화번호 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">전화번호</p>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="전화번호를 입력하세요"
          />
        </div>

        {/* 귤 금액 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">귤 금액</p>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {formData.products.map((product, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={(e) => handleProductChange(index, e)}
                  className="p-2 w-1/2 border border-gray-300 rounded-md"
                  placeholder="상품명"
                />
                <input
                  type="number"
                  name="productPrice"
                  value={product.productPrice}
                  onChange={(e) => handleProductChange(index, e)}
                  className="p-2 w-1/2 border border-gray-300 rounded-md"
                  placeholder="가격"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addProductField}
            className="ml-2 bg-blue-500 text-white p-2 rounded-md"
          >
            상품 추가
          </button>
        </div>

        {/* 사이트 링크 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">사이트 링크</p>
          <input
            type="text"
            name="homepageLink"
            value={formData.homepageLink}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="사이트 링크를 입력하세요"
          />
        </div>

        {/* 키워드 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">키워드</p>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="검색에 사용할 키워드를 입력하세요"
          />
        </div>

        {/* 상세 설명 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">상세 설명</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="농장에 대한 상세 설명을 입력하세요"
            rows="4"
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleFarmRegister}
            className="bg-blue-500 text-white px-6 py-3 rounded-md"
          >
            농장 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

