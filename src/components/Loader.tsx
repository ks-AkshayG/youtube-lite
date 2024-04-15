import { FC } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";

// --------------------------------------------------------------------------------------------------------------

export type LoaderProps = {};

const Loader: FC<LoaderProps> = (props) => {
  const { ...other } = props;

  return (
    <Box minHeight="95vh" {...other}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Stack>
    </Box>
  );
};
export default Loader;
