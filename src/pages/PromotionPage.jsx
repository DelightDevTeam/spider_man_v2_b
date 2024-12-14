import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { Spinner } from "react-bootstrap";
import useLanguage from "../hooks/useLanguage";
import en_data from "../lang/en";
import mm_data from "../lang/mm";

const PromotionPage = () => {
  const { lang }  = useLanguage();
    const content = lang === 'en' ? en_data.promotion : mm_data.promotion;
  const {data:promotions, loading} = useFetch(BASE_URL + "/promotion");

  return (
    <div className="py-4 px-2 px-4 px-lg-5 pb-5 mb-5">
      <h3 className="fw-semibold mb-4 text-center">{content}</h3>
      {loading ? <div className="text-center">
        <Spinner size="lg" />
      </div> : promotions.map((promo, index) => {
        return (
          <div key={index} className="mb-4">
            <img
              src={promo.img_url}
              className="img-fluid bannerImg rounded-3 rounded-sm-5 w-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default PromotionPage;
