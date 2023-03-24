import PageIndicator from "./PageIndicator"
import ArticleSearchButton from "./ArticleSearchButton";

const Topbar = () => {
    return <header className="flex flex-row justify-between items-center h-14 m-1 p-2">
        <PageIndicator/>
        <ArticleSearchButton/>
    </header>
}

export default Topbar;