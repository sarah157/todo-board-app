import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <>
      <div className="text-center mt-10">
        <p>Sorry, this page does not exist :(</p>
        <p className="underline"><Link to="/">Home</Link></p>
      </div>
    </>
  );
};

export default Error404;
