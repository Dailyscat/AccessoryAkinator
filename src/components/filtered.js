import React, { useState } from "react";
import "./filtered.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import StorefrontIcon from "@material-ui/icons/Storefront";
import MoodIcon from "@material-ui/icons/Mood";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

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
  root: {
    width: "100%",
    marginTop: 70
  },
  goToShop: {
    color: "#ffffffdb",
    background: "#ff5fab"
  },
  fitIt: {
    background: "#ef70b1b3"
  }
});

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export default function Filtered(props) {
  let classes = useStyles();
  const [showModal, toggleModal] = useState(false);
  const [value, setValue] = useState([1000, 15000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="Home">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.grow} />
            <div className="searchBox">
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className="filterNav">
        <div className="filterStandardBox">
          <div onClick={() => toggleModal(!showModal)}>가격</div>
          <div onClick={() => toggleModal(!showModal)}>스타일</div>
          <div onClick={() => toggleModal(!showModal)}>소재</div>
        </div>
        <div className="orderBox">
          <IconButton
            onClick={() => toggleModal(!showModal)}
            className={classes.button}
          >
            <FilterListIcon />
          </IconButton>
        </div>
      </div>
      {earrings.map(cur => {
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
                <div>{cur.earringPrice}</div>
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
                  window.location.href = "/fitAR";
                }}
              >
                착용하기
              </Button>
            </div>
          </div>
        );
      })}
      {showModal ? (
        <div className="filterModal">
          <div
            className="modalBackground"
            onClick={() => toggleModal(!showModal)}
          ></div>
          <div className="filterItemBox">
            <div className="nav">
              <div>가격</div>
              <div>스타일</div>
              <div>소재</div>
            </div>
            <div className="valueSliderBox">
              <div className="displayValue">
                {value[0]} ~ {value[1]}
              </div>
              <Slider
                value={value}
                min={1000}
                step={1000}
                max={80000}
                className="slider"
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </div>
            <div className="footer">
              <Button variant="contained" color="primary">
                Primary
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
