const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-violet-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l7 6v10a1 1 0 01-1 1H6a1 1 0 01-1-1V9l7-6z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 22V12h6v10"
        />
      </svg>

      {/* Brand name */}
      <span className="text-xl font-extrabold tracking-wide text-violet-500 drop-shadow-sm">
        NomadNest
      </span>
    </div>
  );
};

export default Logo;
