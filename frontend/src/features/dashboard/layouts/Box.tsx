type BoxProps = {
    headerCenter: React.ReactNode;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
    body: React.ReactNode;
};

export default function Box({ headerCenter, headerLeft, headerRight, body }: BoxProps) {
    return (
        <div className="h-full w-full pt-4 pl-8 pr-8 flex flex-col">
            <header className="h-[10%] grid grid-cols-[auto_1fr_auto] items-center gap-4">
                <h4 className="justify-self-start">{headerLeft}</h4>
                <h2 className="justify-self-center">{headerCenter}</h2>
                <h4 className="justify-self-end">{headerRight}</h4>
            </header>

            <div className="h-[90%] overflow-auto">
                {body}
            </div>
        </div>
    );
}