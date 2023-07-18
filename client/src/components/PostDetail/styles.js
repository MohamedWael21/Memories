const styles = {
  wrapperPaper: { padding: "20px", borderRadius: "15px" },
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  recommendedPosts: (theme) => ({
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }),
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
};

export default styles;
