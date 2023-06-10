import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalPages, totalCount, pageSize } = metaData;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={2}
    >
      <Typography>
        Şu anda gösterilen öğeler: {(currentPage - 1) * pageSize + 1} -{" "}
        {Math.min(currentPage * pageSize, totalCount)} / Toplam öğe sayısı:{" "}
        {totalCount}
      </Typography>
      <Pagination
        color="primary"
        sx={{ "& .MuiPaginationItem-root": { color: "white" } }}
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
      />
    </Box>
  );
}
