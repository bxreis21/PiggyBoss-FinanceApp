import type { JSX } from "@emotion/react/jsx-runtime";

export default function Header (
    { headerCenter, body, headerLeft=null, headerRight=null} : {
        headerCenter: JSX.Element,
        body: JSX.Element,
        headerLeft?: JSX.Element|null,
        headerRight?: JSX.Element|null
    }
) {
    return (
        <div className="h-full w-full flex flex-col">
            <header className="h-[8%] mt-[2%] grid grid-cols-[auto_1fr_auto] items-center">
                <div className="justify-self-start">{headerLeft}</div>
                <div className="justify-self-center">{headerCenter}</div>
                <div className="justify-self-end">{headerRight ? headerRight : <></>}</div>
            </header>

            <div className="h-[90%]">
                {body}
            </div>
        </div>
    );
}