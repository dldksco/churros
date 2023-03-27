import {useState, useEffect} from "react"
import test from "../../axios-instance/test"

const ArticleBlock = ({articleId}) => {
    const [loading, setLoading] = useState(true);
    console.log(loading);
    const [article, setArticle] = useState({});

    const fetchData = async ( articleId ) => {
        try{
            setLoading(true);
            const response = await test.get(`/news/${articleId}`);
            console.log(response.data["article"]);
            setArticle(response.data["article"]);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(articleId);
    });

    return <div className="mb-4">
        <p>idx: {article["idx"]}</p>
        <p>title: {article["title"]}</p>
        <p>desc: {article["description"]}</p>
        <a href={article["url"]}>원문 링크</a>
        <img src={article["imgUrl"]} alt={"thumbnail"}/>
        <p>date: {article["date"]}</p>
        <p>like: {article["like"] ? "yes" : "no"}</p>
    </div>
}

export default ArticleBlock;