import img from "./386.gif";

const ErrorMessage = () => {
  return (
    <img
      src={img}
      style={{
        display: "block",
        width: "125px",
        height: "125px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      alt="Error"
    />
  );
};

export default ErrorMessage;
