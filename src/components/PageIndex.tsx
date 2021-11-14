import React from "react";
import { Pagination } from "react-bootstrap";


interface Props {
  active: number;
  total: number;
}

const PageIndex = (props: Props) => {

  let active = props.active;
  let items = [];
  const displayNumbers = 3;
  const startIndex = props.active;
  const endIndex = (startIndex + displayNumbers < props.total) ? startIndex + displayNumbers : props.total - 1;
  if (startIndex > 1) {
      items.push(<Pagination.Ellipsis />,);
  };    
  for (let number = startIndex; number <= endIndex; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  if (endIndex < props.total - 1) {
    items.push(<Pagination.Ellipsis />,);
  };  
  items.push(<Pagination.Item key={props.total} active={props.total === active}>{props.total}</Pagination.Item>);


  return (
    <div className="d-flex justify-content-center">
      <Pagination size="sm">
        <Pagination.First />
        <Pagination.Prev />
        {items}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default PageIndex;