import { useAlert } from "../context/alert-context";

const Alert = () => {
  const { alert, setAlert } = useAlert();

  if (alert) {
    return (
      <div className="alert-container top-3 px-2 fixed z-10 w-full">
        <div
          className={`alert-content md:w-1/2 rounded-md p-2 mx-auto flex justify-between ${
            alert.isError ? "bg-red-200" : "bg-green-200"
          } `}
        >
          <p>{alert.msg}</p>
          <span
            className="cursor-pointer font-semibold"
            onClick={() => setAlert(null)}
          >
            Close
          </span>
        </div>
      </div>
    );
  } else return null;
};

export default Alert;
