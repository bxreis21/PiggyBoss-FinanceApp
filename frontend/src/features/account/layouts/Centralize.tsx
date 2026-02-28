export default function Centralize({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center h-[95%]" >
            {children} 
        </div>
    )
}
