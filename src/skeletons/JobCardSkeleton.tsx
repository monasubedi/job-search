import { Skeleton, Stack } from "@mui/material";

const JobCardSkeleton = () => {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rectangular" height={150} />
      <Skeleton variant="rectangular" height={150} />
      <Skeleton variant="rectangular" height={150} />
      <Skeleton variant="rectangular" height={150} />
      <Skeleton variant="rectangular" height={150} />
    </Stack>
  );
};

export default JobCardSkeleton;
