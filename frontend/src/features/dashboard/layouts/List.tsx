export default function List ( { children } : { children: React.ReactNode } ) {

    return (
        <div className="h-[95%] w-full p-3 gap-2 flex flex-col justify-start items-center overflow-auto">
            {children}
        </div>
    )
}