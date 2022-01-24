import React from "react";
import { Pagination } from "react-bootstrap";



interface Props {
  active: number;
  total: number;
  goToPage: (page: number) => void;
}

const PageIndex = (props: Props) => {

  const items = [];
  const displayNumbers = 5;
  const startIndex = props.active > 3 ? props.active - 2 : 1;
  const endIndex = (startIndex + displayNumbers - 1 < props.total) ? startIndex + displayNumbers - 1 : props.total - 1;
  for (let number = startIndex; number <= endIndex; number++) {
    items.push(
      <Pagination.Item onClick={() => props.goToPage(number)} key={number} active={number === props.active}>
        {number}
      </Pagination.Item>,
    );
  }
  (endIndex < props.total - 1) && items.push(<Pagination.Ellipsis key={'pagination_more_end'} disabled />);
  items.push(<Pagination.Item onClick={() => props.goToPage(props.total)} key={props.total} active={props.total === props.active}>{props.total}</Pagination.Item>);

  const previousPage = props.active > 1 ? props.active - 1 : 1;
  const nextPage = props.active < props.total ? props.active + 1 : props.total;

  return (
    <div className="d-flex justify-content-center">
      <Pagination size="sm">
        <Pagination.First onClick={() => props.goToPage(1)} key={'pagination_first'} disabled={(props.active > 1) ? false : true}>First Page</Pagination.First>
        <Pagination.Prev onClick={() => props.goToPage(previousPage)} key={'pagination_prev'} disabled={(props.active > 1) ? false : true}>Previous</Pagination.Prev>
        {(startIndex > 1) && <Pagination.Ellipsis key={'pagination_more_front'} disabled />}
        {items}
        <Pagination.Next onClick={() => props.goToPage(nextPage)}  key={'pagination_next'} disabled={(props.active < props.total) ? false : true}>Next</Pagination.Next>
        <Pagination.Last onClick={() => props.goToPage(props.total)}  key={'pagination_last'} disabled={(props.active < props.total) ? false : true}>Last Page</Pagination.Last>
      </Pagination>
    </div>
  );
};

export default PageIndex;