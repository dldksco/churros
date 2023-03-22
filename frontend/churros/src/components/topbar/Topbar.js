const Topbar = ({children}) => {
    return <header className="flex flex-row justify-between items-center h-14 m-1 p-2">
        {children}
    </header>
}

export default Topbar;