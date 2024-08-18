import Link from "next/link";
export const Button =(props: React.PropsWithChildren) => {
    return(
    
        <button className="relative py-2 px-3 rounded-lg font-medium text-sm  shadow-[0px_0px_12px_#8c45ff">
            <div className="flex flex-wrap justify-center gap-6">
                <Link href="/pantry">
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-violet-400 hover:text-gray-900">Get Started</span>
                </Link>
            </div>

            

            <span>{props.children}</span>
        </button>

    );
};