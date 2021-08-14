import { Badge, Col, Drawer, Input, Pagination, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "src/components/Cards/BookCard";
import { DefaultTitle } from "src/components/Typography/Typography";
import { getBooksAction } from "src/store/actions/bookActions";
import { bookData } from "./data";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./styles.scss";
import CartCard from "src/components/Cards/CartCard";
import LoadingCard from "src/components/Cards/LoadingCard";

export default function Index() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();

  const { bookList, loading } = useSelector((state) => state.bookList);

  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCart, setCurrentCart] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [visible, setVisible] = useState(false);

  //   const cartFromStorage = JSON.parse(localStorage.getItem("book_market_cart"));

  useEffect(() => {
    dispatch(getBooksAction());

    return () => {
      // cleanup
    };
  }, [dispatch]);

  console.log("bookList", loading, bookList);

  console.log(books);

  //   useEffect(() => {
  //     if (cartFromStorage) {
  //       setCurrentCart(cartFromStorage);
  //     }
  //     return () => {
  //       // cleanup
  //     };
  //     // eslint-disable-next-line
  //   }, []);

  useEffect(() => {
    let newArr = [];

    bookData.map((item) => {
      let newObj = {
        ...item,
        originalStock: item.stock,
      };
      newArr.push(newObj);

      return null;
    });
    setBooks(newArr);
    return () => {
      // cleanup
    };
  }, []);

  // handling filter by genre
  const handleInputChange = (e) => {
    let { value } = e.target;
    setFilter(value);
  };

  const getFilteredData = (books) => {
    return (
      books &&
      books.length > 0 &&
      books.filter(({ genre }) =>
        genre.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  // handling cart
  const handleRemoveFromCart = (bookID, index, item) => {
    let newBooks = [...books];
    newBooks.map((book) => {
      if (book.id === bookID) {
        book.stock = item.originalStock;
      }
      return null;
    });
    setBooks(newBooks);

    let newCart = currentCart.filter((item, idx) => idx !== index);
    // localStorage.setItem("book_market_cart", JSON.stringify(newCart));
    setCurrentCart(newCart);
  };

  const calculateCartTotal = () => {
    let total = 0;
    currentCart &&
      currentCart.map((item) => (total += parseFloat(item.net_total)));

    return total.toLocaleString("en-IN");
  };

  // handling pagination

  const pageSize = 12;

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    let newArray;
    let maxCountIndex = 11;

    if (books.length > 0) {
      // (1-1*12=0, 11*1+1=12)=(0,12)
      newArray = books.slice(
        (currentPage - 1) * pageSize,
        maxCountIndex * currentPage + currentPage
      );
    }

    setPaginatedData(newArray);

    return () => {
      // cleanup
    };
  }, [books, currentPage]);

  //   console.log("cart", currentCart);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const CartLogo = () => (
    <Badge count={currentCart.length}>
      <ShoppingCartOutlined
        style={{ fontSize: "32px" }}
        onClick={() => showDrawer()}
      />
    </Badge>
  );

  const CartRow = () => (
    <Row style={{ width: "100%" }}>
      <Col xs={24} className="book-col">
        <Row style={{ width: "100%" }} gutter={[0, 8]}>
          {currentCart &&
            currentCart.length > 0 &&
            currentCart.map((item, idx) => (
              <Col xs={24} key={idx}>
                <CartCard
                  item={item}
                  books={books}
                  setBooks={setBooks}
                  currentCart={currentCart}
                  setCurrentCart={setCurrentCart}
                  index={idx}
                  handleRemove={handleRemoveFromCart}
                />
              </Col>
            ))}
        </Row>
      </Col>

      <Col xs={24} className="book-col" align="middle">
        <DefaultTitle style={{ fontSize: screens.md ? "18px" : "14px" }}>
          {currentCart.length === 0
            ? `Cart is empty, please add items.`
            : `Total Amout: Rs. ${calculateCartTotal()}`}
        </DefaultTitle>
      </Col>
    </Row>
  );

  return (
    <React.Fragment>
      {books.length === 0 ? (
        <LoadingCard />
      ) : (
        <Row
          style={{ width: "100%", padding: screens.md ? "32px" : "16px" }}
          gutter={[16, 0]}
        >
          <Col xs={24} md={16}>
            <Row style={{ width: "100%" }} align="middle">
              <Col xs={screens.md ? 24 : 18}>
                <DefaultTitle
                  style={{ fontSize: screens.md ? "32px" : "24px" }}
                >
                  Book Market
                </DefaultTitle>
              </Col>
              <Col xs={screens.md ? 0 : 6} align="end">
                <CartLogo />
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
                <Row
                  style={{ width: "100%" }}
                  gutter={[
                    { xs: 8, md: 8, lg: 16 },
                    { xs: 8, md: 8, lg: 16 },
                  ]}
                >
                  {getFilteredData(paginatedData) &&
                    getFilteredData(paginatedData).length > 0 &&
                    getFilteredData(paginatedData).map((item, idx) => (
                      <Col xs={24} sm={12} lg={8} xl={6} key={idx}>
                        <BookCard
                          item={item}
                          books={books}
                          setBooks={setBooks}
                          currentCart={currentCart}
                          setCurrentCart={setCurrentCart}
                        />
                      </Col>
                    ))}
                </Row>
                <Row className="book-row" justify="center">
                  <Pagination
                    current={currentPage}
                    onChange={handlePaginationChange}
                    total={bookData.length}
                    pageSize={pageSize}
                    showSizeChanger={false}
                  />
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xs={0} md={8}>
            <Row style={{ width: "100%" }}>
              <Col xs={24}>
                <DefaultTitle>
                  Your Cart <CartLogo />
                </DefaultTitle>
              </Col>
              <CartRow />
            </Row>
          </Col>
          <Drawer
            title="Cart"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{
              padding: "4px",
            }}
          >
            <CartRow />
          </Drawer>
        </Row>
      )}
    </React.Fragment>
  );
}
