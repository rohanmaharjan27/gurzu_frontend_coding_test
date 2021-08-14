import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Card, Col, Image, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";
import Notification from "../Notification/Notification";
import { BookNameText, DefaultText } from "../Typography/Typography";
import "./styles.scss";

export default function CartCard(props) {
  const {
    item,
    books,
    setBooks,
    currentCart,
    setCurrentCart,
    index,
    handleRemove,
  } = props;

  const { id, name, image, quantity, price, net_total } =
    item !== undefined && item;

  const screens = useBreakpoint();

  const handleQuantitySubtract = () => {
    const cartProducts = [...currentCart];

    if (cartProducts[index]["quantity"] <= 1) {
      Notification("warn", "Minimum quantity reached");
    } else {
      // increasing stock of particular book when book quantity is decreased from cart
      let newBooks = [...books];
      newBooks.map((book) => {
        book.id === id && book.stock++;
        return null;
      });
      setBooks(newBooks);

      // updating book quantity and net total when book quantity is decreased from cart
      cartProducts[index]["quantity"]--;
      cartProducts[index]["net_total"] =
        cartProducts[index]["quantity"] * price;

      setCurrentCart(cartProducts);

      // localStorage.setItem("book_market_cart", JSON.stringify(currentCart));
    }
  };

  const handleQuantityAdd = () => {
    const cartProducts = [...currentCart];

    // decreasing stock of particular book when book quantity is increased from cart
    let newBooks = [...books];

    // get stock according to id of object from an array
    let currentBookObj = newBooks.find((element) => element.id === id);

    if (currentBookObj.stock > 0) {
      newBooks.map((book) => {
        book.id === id && book.stock--;
        return null;
      });
      setBooks(newBooks);

      // updating book quantity and net total when book quantity is increased from cart
      cartProducts[index]["quantity"]++;
      cartProducts[index]["net_total"] =
        cartProducts[index]["quantity"] * price;
      setCurrentCart(cartProducts);
    } else {
      Notification("error", "Out of stock!");
    }

    // localStorage.setItem("book_market_cart", JSON.stringify(currentCart));
  };

  return (
    <Card
      hoverable
      cover={null}
      bodyStyle={{
        padding: "8px",
      }}
    >
      <Row style={{ width: "100%" }} justify="center" align="middle">
        <Col xs={4}>
          <Image
            src={image}
            width="95%"
            height="100%"
            alt="cart-book-image"
            className="bookCard-image"
          />
        </Col>
        <Col xs={8}>
          <Row style={{ width: "100%" }}>
            <Col xs={24}>
              <Meta
                title={
                  <BookNameText
                    style={{
                      fontSize: screens.md ? "14px" : "12px",
                    }}
                  >
                    {name}
                  </BookNameText>
                }
              />
            </Col>
            <Col xs={24} className="bookCard-bodyColPadding">
              <DefaultText
                style={{
                  fontWeight: 500,
                  fontSize: screens.md ? "14px" : "12px",
                }}
              >
                Rs. {price}
              </DefaultText>
            </Col>
          </Row>
        </Col>
        <Col xs={10}>
          <Row style={{ width: "100%" }}>
            <Col xs={24} align="middle">
              <MinusCircleOutlined
                style={{ fontSize: "14px" }}
                onClick={() => handleQuantitySubtract()}
              />
              <DefaultText style={{ margin: "0px 10px" }}>
                {quantity}
              </DefaultText>
              <PlusCircleOutlined
                style={{ fontSize: "14px" }}
                onClick={() => handleQuantityAdd()}
              />
            </Col>
            <Col xs={24} className="bookCard-bodyColPadding" align="middle">
              <DefaultText
                style={{
                  fontWeight: 500,
                  fontSize: screens.md ? "14px" : "12px",
                }}
              >
                Total: Rs. {Number(net_total).toFixed(2)}
              </DefaultText>
            </Col>
          </Row>
        </Col>
        <Col xs={2} align="end">
          <CloseOutlined
            style={{ fontSize: "16px" }}
            onClick={() => handleRemove(id, index, item)}
          />
        </Col>
      </Row>
    </Card>
  );
}
