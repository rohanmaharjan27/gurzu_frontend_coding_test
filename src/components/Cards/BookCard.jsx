import { Button, Card, Col, Image, Row, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import React from "react";
import Notification from "../Notification/Notification";
import { BookNameText, DefaultText, TagText } from "../Typography/Typography";
import "./styles.scss";

export default function BookCard(props) {
  const { item, books, setBooks, currentCart, setCurrentCart } = props;

  const {
    id,
    "name ": bookName,
    image,
    price,
    stock,
    author,
    genre,
    originalStock,
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
      foundBookObj = currentCart.find((element) => element.id === id);
    }

    let bookObjIfNew = {
      id,
      name: bookName,
      image,
      quantity: 1,
      price: convertedPrice,
      net_total: convertedPrice,
      originalStock,
    };

    if (!foundBookObj && currentCart.length === 5) {
      Notification("warn", "Maximum cart quantity reached!");
    } else {
      if (foundBookObj && foundBookObj.quantity > 0 && stock > 0) {
        let newBooks = [...books];

        newBooks.map((book) => {
          book.id === id && book.stock--;
          return null;
        });

        setBooks(newBooks);

        let newCart = [...currentCart];

        newCart.map((book) => {
          if (book.id === id) {
            book.quantity++;
            book.net_total = book.quantity * parseFloat(book.price);
          }

          return null;
        });

        setCurrentCart(newCart);
        Notification("success", "Book quantity has been updated!");
      } else {
        let newBooks = [...books];
        newBooks.map((book) => {
          book.id === id && book.stock--;
          return null;
        });
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
                  <TagText>
                    {stock} {stock === 1 ? "piece" : "pieces"} left
                  </TagText>
                </Tag>
              ) : (
                <Tag color="#52c41a">
                  <TagText>
                    {stock} {stock === 1 ? "piece" : "pieces"} left
                  </TagText>
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
