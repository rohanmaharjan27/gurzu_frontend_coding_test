import { CloseOutlined } from "@ant-design/icons";
import { Card, Col, Image, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { BookNameText, DefaultText } from "../Typography/Typography";
import "./styles.scss";

export default function CartCard({ item, index, handleRemove }) {
  const { name, image, price } = item;

  const cart = JSON.parse(localStorage.getItem("book_market_cart"));

  console.log("cart", cart);

  return (
    <Card
      hoverable
      cover={null}
      bodyStyle={{
        padding: "8px",
      }}
    >
      <Row style={{ width: "100%" }}>
        <Col xs={6}>
          <Image
            src={image}
            width="100%"
            height="70px"
            alt="cart-book-image"
            className="bookCard-image"
          />
        </Col>
        <Col xs={16}>
          <Row style={{ width: "100%" }}>
            <Col xs={24}>
              <Meta title={<BookNameText>{name}</BookNameText>} />
            </Col>
            <Col xs={24} className="bookCard-bodyColPadding">
              <DefaultText style={{ fontWeight: 500 }}>Rs. {price}</DefaultText>
            </Col>
          </Row>
        </Col>
        <Col xs={2} align="end">
          <CloseOutlined
            style={{ fontSize: "16px" }}
            onClick={() => handleRemove(index)}
          />
        </Col>
      </Row>
    </Card>
  );
}
