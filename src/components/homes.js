import React, { useState, useEffect } from "react";
import "./homes.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StorefrontIcon from "@material-ui/icons/Storefront";
import MoodIcon from "@material-ui/icons/Mood";
import ListEarring from "../queries/ListEarring";
import { graphql, compose } from "react-apollo";

// import earrings from "../../db";
let earrings = [
  {
    shopName: "wing bling",
    shopUrl:
      "https://wingbling.co.kr/product/detail.html?product_no=1746&cate_no=180&display_group=2",
    earringThumbnailUrl: "https://ekwjd3928.diskn.com/shop/190111/09/360.jpg",
    earringName: "꽃이피는날 귀걸이",
    earringStyle: ["순수", "우아"],
    earringElement: "백금도금",
    earringPrice: 15000,
    color: ["실버", "핑크"]
  },
  {
    shopName: "windygirl",
    shopUrl:
      "http://www.windygirl.co.kr/m/product.html?branduid=29492&xcode=051&mcode=008&scode=001&type=X&sort=order&cur_code=051&GfDT=bm5%2BW1w%3D&smslay=catebest&smsps=prd&sms_td_cate=catebest#guideApp",
    earringThumbnailUrl:
      "http://www.windygirl.co.kr/shopimages/windygirl78/0510080001603.jpg?1542764036",
    earringName: "14k 원터치 귀걸이",
    earringStyle: ["데일리", "우아"],
    earringElement: "14k gold",
    earringPrice: 12000,
    color: ["옐로골드", "핑크골드", "화이트골드"]
  },
  {
    shopName: "windygirl",
    shopUrl:
      "http://www.windygirl.co.kr/m/product.html?branduid=29492&xcode=051&mcode=008&scode=001&type=X&sort=order&cur_code=051&GfDT=bm5%2BW1w%3D&smslay=catebest&smsps=prd&sms_td_cate=catebest#guideApp",
    earringThumbnailUrl:
      "http://www.windygirl.co.kr/shopimages/windygirl78/0510080001603.jpg?1542764036",
    earringName: "14k 원터치 귀걸이",
    earringStyle: ["데일리", "우아"],
    earringElement: "14k gold",
    earringPrice: 12000,
    color: ["옐로골드", "핑크골드", "화이트골드"]
  },
  {
    shopName: "windygirl",
    shopUrl:
      "http://www.windygirl.co.kr/m/product.html?branduid=29492&xcode=051&mcode=008&scode=001&type=X&sort=order&cur_code=051&GfDT=bm5%2BW1w%3D&smslay=catebest&smsps=prd&sms_td_cate=catebest#guideApp",
    earringThumbnailUrl:
      "http://www.windygirl.co.kr/shopimages/windygirl78/0510080001603.jpg?1542764036",
    earringName: "14k 원터치 귀걸이",
    earringStyle: ["데일리", "우아"],
    earringElement: "14k gold",
    earringPrice: 12000,
    color: ["옐로골드", "핑크골드", "화이트골드"]
  },
  {
    shopName: "windygirl",
    shopUrl:
      "http://www.windygirl.co.kr/m/product.html?branduid=29492&xcode=051&mcode=008&scode=001&type=X&sort=order&cur_code=051&GfDT=bm5%2BW1w%3D&smslay=catebest&smsps=prd&sms_td_cate=catebest#guideApp",
    earringThumbnailUrl:
      "http://www.windygirl.co.kr/shopimages/windygirl78/0510080001603.jpg?1542764036",
    earringName: "14k 원터치 귀걸이",
    earringStyle: ["데일리", "우아"],
    earringElement: "14k gold",
    earringPrice: 12000,
    color: ["옐로골드", "핑크골드", "화이트골드"]
  }
];
const useStyles = makeStyles({
  goToShop: {
    color: "#ffffffdb",
    background: "#edb6b6"
  },
  fitIt: {
    background: "#EDB6C1"
  }
});

function Homes(props) {
  let classes = useStyles();
  const [earringProducts, setEarringProduct] = useState([]);
  useEffect(() => {
    setEarringProduct(props.earringProducts);
  }, [props.earringProducts]);

  return (
    <div className="Home">
      {earringProducts.length > 0
        ? earringProducts.map(cur => {
            return (
              <div className="earringItem">
                <div className="earringInfo">
                  <img src={cur.earringThumbnailUrl} />
                  <div className="text">
                    <div className="name">{cur.earringName}</div>
                    <div>
                      {cur.earringStyle.map(cur => (
                        <span>{cur}</span>
                      ))}
                    </div>
                    <div>{cur.earringElement}</div>
                    <div>{cur.earringPrice}원</div>
                    <div>
                      {cur.color.map(cur => (
                        <span>{cur}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="btnBox">
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.goToShop}
                    href={cur.shopUrl}
                    startIcon={<StorefrontIcon />}
                  >
                    보러가기
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.fitIt}
                    startIcon={<MoodIcon />}
                    onClick={() => {
                      props.fitIt();
                      props.history.push("/fitAR");
                    }}
                  >
                    착용하기
                  </Button>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
export default graphql(ListEarring, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: props => ({
    earringProducts: props.data.listEarringProducts
      ? props.data.listEarringProducts.items
      : earrings
  })
})(Homes);
