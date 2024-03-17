function Footer() {
  return (
    <footer className="border-t-[1px] border-slate-200 w-full flex items-center relative justify-center">
      <p className="flex flex-col p-8 items-center gap-1 text-slate-500 font-normal relative z-50 bg-white w-full h-full">
        <span>
          Quizzy &copy; {new Date().getFullYear()}. All rights reserved.
        </span>
        <span>Made with ♥ by Shahzeb in Karachi.</span>
      </p>
      <div className="absolute inset-0 -top-1 opacity-20 bg-gradient-to-r from-indigo-500 via-yellow-500 to-pink-500 "></div>
    </footer>
  );
}

export default Footer;
