/* Loading Spinner (from loading.io) */
const Loading = () => {
  return <div className="loading-wrapper bg-blue-50 h-screen w-full absolute top-0 left-0 ">
    <div className="loading-content flex justify-center items-center h-full">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>;
};

export default Loading;
