import { Skeleton, Stack } from "@mui/material";

const JobDetailSkeleton = () => {
  return (
    <Stack spacing={3} p={5}>
      <Skeleton variant="rectangular" height={100} />
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={250} />
    </Stack>
  );
};

export default JobDetailSkeleton;
