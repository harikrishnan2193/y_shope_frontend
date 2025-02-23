import React from "react";

function Page404() {
  return (
    <div style={styles.container}>
      <img
        src="https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-3959260-3299959.gif"
        alt="no image"
        style={styles.image}
      />
      <h2 style={styles.textDanger}>YOU LOST THE WAY....</h2>
      <h2 style={styles.textInfo}>Page Is Not Found !</h2>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    background: "url('https://www.toptal.com/designers/subtlepatterns/uploads/topography.png')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  image: {
    borderRadius: "25px",
  },
  textDanger: {
    color: "red",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  textInfo: {
    color: "rgb(19, 175, 192)",
    fontWeight: "bold",
    marginTop: "0.5rem",
    marginBottom: "3rem",
  },
};

export default Page404;
