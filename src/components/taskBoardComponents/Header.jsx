function Header({ text, count }) {
  return (
    <div
      className={` flex md:gap-2 gap-1 justify-center bg-[rgb(63,81,181)] sm:text-base text-xs  shadow-md rounded-md p-2 text-white uppercase text-center`}
    >
      {text}{" "}
      <span className="flex justify-center items-center bg-white rounded-full md:h-5 h-3 aspect-square sm:text-sm text-[8px] text-black">
        {count}
      </span>
    </div>
  );
}

export default Header;
