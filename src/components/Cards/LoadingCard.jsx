import { Row, Spin } from "antd";
import React from "react";

export default function LoadingCard({ loading }) {
  return (
    <Row
      style={{ width: "100%", height: "150px" }}
      justify="center"
      align="middle"
    >
      <Spin spinning={loading} />
    </Row>
  );
}
