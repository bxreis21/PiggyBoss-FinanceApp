export default function FormContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full w-full flex flex-col justify-around items-center">
            {children}
        </div>
    )
}
