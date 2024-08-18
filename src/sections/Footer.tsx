import Logo from '@/assets/logo.svg';

export const Footer = () => {
  return ( 
    <footer className="backdrop-blur">
    <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
        <a
          className="inline-block rounded-full bg-violet-950 p-2 text-white shadow transition hover:bg-violet-500 sm:p-3 lg:p-4"
          href="#"
        >
          <span className="sr-only">Back to top</span>
  
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
  
      <div className="lg:flex lg:items-end lg:justify-between">
        <div className="font-semibold tracking-tighter text-gray-900 dark:text-white text-3xl"><span className="tracking-tighter text-transparent bg-clip-text bg-gradient-to-r to-violet-950 from-violet-500 text-3xl ">Stash</span>Pal </div>
      <p className=" tracking-tighter text-gray-800 font-mono">
        @5-07 on GitHub
      </p>
      </div>
  
     
    </div>
  </footer>
  );
};

