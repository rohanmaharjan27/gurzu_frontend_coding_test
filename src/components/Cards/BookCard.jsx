import { Button, Card, Col, Image, Row, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import React from "react";
import Notification from "../Notification/Notification";
import { BookNameText, DefaultText, TagText } from "../Typography/Typography";
import "./styles.scss";

export default function BookCard(props) {
  const { item, index, books, setBooks, currentCart, setCurrentCart } = props;

  const {
    id,
    "name ": bookName,
    image,
    price,
    stock,
    author,
    genre,
    published_date,
  } = item !== undefined && item;

  // handling published date
  const fomattedData = moment(published_date).format("DD-MM-YYYY");

  // handling genre
  //   const regexForGenre = /\|/g;
  //   const formattedGenre = genre.replace(regexForGenre, ",");

  const genreArr = genre.split("|");

  // handling currency conversion
  const USD_TO_NPR_RATE = 119;
  const formattedPrice = price.split("$");
  const convertedPrice = (formattedPrice[1] * USD_TO_NPR_RATE).toFixed(2);

  const handleAddToCart = () => {
    let cartArr = [];
    // let cartFromStorage = JSON.parse(localStorage.getItem("book_market_cart"));

    // if (cartFromStorage) {
    //   currentCart = cartFromStorage;
    // } else {
    //   cartFromStorage = [];
    // }

    let foundBookObj;
    if (currentCart.length > 0) {
      foundBookObj = currentCart.find((element) => element.id === item.id);
    }

    let bookObjIfNew = {
      id,
      name: bookName,
      image,
      quantity: 1,
      price: convertedPrice,
      net_total: convertedPrice,
      bookIndex: index,
    };

    // let bookObjIfExists;
    // if (currentCart.length > 0 && foundBookObj) {
    //   bookObjIfExists = {
    //     id: foundBookObj.id,
    //     name: foundBookObj.name,
    //     image: foundBookObj.image,
    //     quantity: foundBookObj.quantity,
    //     price: foundBookObj.price,
    //     net_total: foundBookObj.quantity * foundBookObj.price,
    //   };
    // }

    if (currentCart.length === 5) {
      Notification("warn", "Maximum cart quantity reached!");
    } else {
      if (foundBookObj && foundBookObj.quantity > 0 && stock > 0) {
        // foundBookObj.quantity += 1;
        // foundBookObj.net_total = foundBookObj.quantity * foundBookObj.price;

        let newBooks = [...books];
        newBooks[index]["stock"]--;
        setBooks(newBooks);

        let newCart = [...currentCart];
        newCart[index]["quantity"] += 1;
        newCart[index]["net_total"] =
          newCart[index]["quantity"] * parseFloat(newCart[index]["price"]);
        cartArr.push(foundBookObj);

        setCurrentCart(newCart);
        Notification("success", "Book quantity has been updated!");
      } else {
        let newBooks = [...books];
        newBooks[index]["stock"]--;
        setBooks(newBooks);
        cartArr.push(bookObjIfNew);
        setCurrentCart([...currentCart, ...cartArr]);
        Notification("success", "Book added to cart!");
      }
    }

    // localStorage.setItem("book_market_cart", JSON.stringify(currentCart));
    // setCurrentCart(currentCart);
  };

  return (
    <Card
      hoverable
      cover={
        <Image
          src={image}
          width="100%"
          height="250px"
          alt="book-image"
          preview={false}
          className="bookCard-image"
        />
      }
      style={{
        height: "525px",
      }}
      bodyStyle={{
        padding: "16px",
      }}
    >
      <Row style={{ width: "100%" }} align="bottom">
        <Col xs={24} style={{ height: "175px" }}>
          <Row style={{ width: "100%" }}>
            <Col xs={24}>
              <Meta title={<BookNameText>{bookName}</BookNameText>} />
            </Col>
            <Col xs={24} className="bookCard-bodyColPadding">
              <Row style={{ width: "100%" }} justify="space-between">
                <Col>
                  <DefaultText>by {author}</DefaultText>
                </Col>
                <Col>
                  <DefaultText>{fomattedData}</DefaultText>
                </Col>
              </Row>
            </Col>
            <Col xs={24} className="bookCard-bodyColPadding">
              {genreArr.length > 0 &&
                genreArr.map((item, idx) => (
                  <Tag color="#2db7f5" className="bookCard-tag" key={idx}>
                    <TagText>{item}</TagText>
                  </Tag>
                ))}
            </Col>
            <Col xs={24} className="bookCard-bodyColPadding">
              {stock <= 5 ? (
                <Tag color="#ff7a45">
                  <TagText>{stock} pieces left</TagText>
                </Tag>
              ) : (
                <Tag color="#52c41a">
                  <TagText>{stock} pieces left</TagText>
                </Tag>
              )}
            </Col>
            <Col xs={24} className="bookCard-bodyColPadding">
              <DefaultText style={{ fontWeight: 500 }}>
                Rs. {convertedPrice}
              </DefaultText>
            </Col>
          </Row>
        </Col>

        <Col xs={24} className="bookCard-bodyCartBtnCol" align="center">
          <Button
            className="bookCard-btnCart"
            disabled={stock && stock > 0 ? false : true}
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
