import { Pagination } from "@mui/material";
interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent = ({ count, page, onChange }: PaginationProps) => {
  return (
    <Pagination size="large" count={count} page={page} onChange={onChange} />
  );
};

export default PaginationComponent;
