const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-800 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
          © 2023{" "}
          <a href="/" className="hover:underline">
            Recipes™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
