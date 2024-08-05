const Loading = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="w-fit m-auto">
        <div className="loader border-t-8 border-purple-500 rounded-full w-14 h-14 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-bold text-xl">
        <p>
          <span className="text-red-500">Error: {error} </span>
          try reloading the page or go to <a href="/"><span className="text-teal-800 underline">Home</span></a>
        </p>
      </div>
    );
  }

  return null;
};

export default Loading;

