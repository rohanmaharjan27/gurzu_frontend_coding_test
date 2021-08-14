import { Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

const DefaultText = styled(Text)`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #595959;
`;

const DefaultTitle = styled(Text)`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 16px;
  color: #000;
`;

const BookNameText = styled(Text)`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #000;
`;

export { DefaultText, DefaultTitle, BookNameText };
