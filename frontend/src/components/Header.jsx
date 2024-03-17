function Header() {
  return (
    <header className="border-b-[1px] border-slate-200 relative z-[1000] bg-white w-full">
      <div className="flex p-4 px-8  items-center justify-between bg-white relative z-[1000]">
        <div className="mr-auto text-xl md:text-2xl font-semibold md:font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Quizzy
        </div>
        <p>Menu</p>
      </div>
      <div className="absolute inset-0 -bottom-1 opacity-20 bg-gradient-to-r from-indigo-500 via-yellow-500 to-pink-500 "></div>
    </header>
  );
}

export default Header;
