import { Button, Card, Col, Image, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import React from "react";
import { BookNameText, DefaultText } from "../Typography/Typography";
import "./styles.scss";

export default function BookCard({ item }) {
  const {
    "name ": bookName,
    image,
    price,
    stock,
    author,
    genre,
    published_date,
  } = item;

  // handling published date
  const fomattedData = moment(published_date).format("DD-MM-YYYY");

  // handling genre
  const regexForGenre = /\|/g;
  const formattedGenre = genre.replace(regexForGenre, ",");

  // handling currency conversion
  const USD_TO_NPR_RATE = 119;

  const formattedPrice = price.split("$");

  const convertedPrice = formattedPrice[1] * USD_TO_NPR_RATE;

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
      bodyStyle={{
        padding: "16px",
      }}
    >
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
          <DefaultText>{formattedGenre}</DefaultText>
        </Col>
        <Col xs={24} className="bookCard-bodyColPadding">
          <DefaultText style={{ fontWeight: 500 }}>
            Rs. {convertedPrice.toFixed(2)}
          </DefaultText>
        </Col>
        <Col xs={24} className="bookCard-bodyCartBtnCol" align="center">
          <Button
            className="bookCard-btnCart"
            disabled={stock && stock > 0 ? false : true}
          >
            Add to cart
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
