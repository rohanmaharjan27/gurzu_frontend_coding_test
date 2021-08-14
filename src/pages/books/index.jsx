import { Col, Input, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "src/components/Cards/BookCard";
import { DefaultTitle } from "src/components/Typography/Typography";
import { getBooksAction } from "src/store/actions/bookActions";
import { bookData } from "./data";
import "./styles.scss";

export default function Index() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();

  const { bookList, loading } = useSelector((state) => state.bookList);

  const [filter, setFilter] = useState("");

  console.log("bookList", loading, bookList);

  useEffect(() => {
    dispatch(getBooksAction());
    return () => {
      // cleanup
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    let { value } = e.target;
    setFilter(value);
  };

  const getFilteredData = (books) => {
    return (
      books.length > 0 &&
      books.filter(({ genre }) =>
        genre.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  return (
    <Row style={{ width: "100%", padding: screens.md ? "32px" : "16px" }}>
      <Col xs={24} md={16}>
        <Row style={{ width: "100%" }}>
          <Col xs={24}>
            <DefaultTitle>Book Market</DefaultTitle>
          </Col>
          <Col xs={24} className="book-col">
            <Input
              value={filter}
              onChange={handleInputChange}
              placeholder="Filter by genre"
              size="large"
              className="filterInput"
            />
          </Col>
          <Col xs={24} className="book-col">
            <Row style={{ width: "100%" }} gutter={[16, 16]}>
              {getFilteredData(bookData).length > 0 &&
                getFilteredData(bookData).map((item, idx) => (
                  <Col xs={24} md={8} lg={8} xl={6} key={idx}>
                    <BookCard item={item} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Col>

      <Col xs={24} md={8}>
        cart area
      </Col>
    </Row>
  );
}
