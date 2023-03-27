const A1 = ({articleId, title, description, url, src}) => {
    console.log(articleId);

    return <a className="flex flex-col w-full h-full justify-start" href={url}>
        <div className="relative w-full h-2/3 overflow-hidden">
            <img className="absolute w-full h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={src} alt="alt"/>
        </div>
        <div className="flex-1 flex-col justify-start items-center">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </a>
}

export default A1;