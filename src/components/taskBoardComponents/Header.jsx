function Header({ text, count }) {
  return (
    <div
      className={` flex md:gap-2 gap-1 justify-center bg-primary dark:bg-black/90  sm:text-base text-xs  shadow-md rounded-md p-2 text-white uppercase text-center`}
    >
      {text}{" "}
      <span className="flex justify-center items-center bg-white  dark:bg-littleBlack dark:text-white rounded-full md:h-5 h-3 aspect-square sm:text-sm text-[8px] text-black">
        {count}
      </span>
    </div>
  );
}

export default Header;
