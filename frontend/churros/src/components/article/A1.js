const A1 = ({articleId, url, src, alt}) => {
    console.log(articleId);

    return <a className="flex flex-col w-full h-full justify-start" href={url}>
        <div className="block w-full h-1/2 justify-center items-center overflow-hidden">
            <img src={src} alt={alt} className="w-full max-w-md h-auto"/>
        </div>
        <div className="flex-1 flex-col justify-start items-center">
            <p>기사 요약..</p>
            <p>기사 요약..</p>
            <p>기사 요약..</p>
            <p>기사 요약..</p>
        </div>
    </a>
}

export default A1;