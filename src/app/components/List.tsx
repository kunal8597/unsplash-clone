import {useState, useRef, useEffect} from 'react'
import usePhotos from "../hooks/usePhotos";

const List = () => {
    const [query, setQuery] = useState<string>('random')
    const [pageNumber, setPageNumber] = useState<number>(1)
    const dataApiPhotos = usePhotos({query, pageNumber})
    const lastPicRef = useRef<any>(null)
    const searchRef = useRef<any>("")

    useEffect(() => {
        if(lastPicRef.current){
            const observer = new IntersectionObserver(([entry]) => {
                if(entry.isIntersecting && dataApiPhotos.maxPages !== pageNumber){
                    setPageNumber(pageNumber + 1)
                    lastPicRef.current = null 
                    observer.disconnect()
                }
            })
            observer.observe(lastPicRef.current)
        }
    },[dataApiPhotos])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (searchRef.current.value !== query) {
          setQuery(searchRef.current.value)
          setPageNumber(1)
        }
      }

    return(
        <>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Zenith the Unsplash Clone</span></h1>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className='block mb-4'> </label>
                    <input ref={searchRef} type="search" className='block w-full mb-14 text-slate-800 py-3 px-2 text-md outline-gray-500 rounded border border-slate-400' placeholder='Search' />
                </form>
                {dataApiPhotos.error.state && <p>{dataApiPhotos.error.msg}</p>}
                
                {dataApiPhotos.photos.length === 0 &&
                !dataApiPhotos.error.state &&
                <p>No image available for this query reload the page</p>}
            <ul className='grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center'>
                {dataApiPhotos.photos.length !== 0 && dataApiPhotos.photos.map((p,index) => {
                    if(dataApiPhotos.photos.length === index + 1){
                        return(
                            <li key={p.id}>
                                <img ref={lastPicRef} className='w-full h-full object-cover' src={p.urls.regular} alt={p.alt_description} />
                            </li>
                        )
                    } else {
                        return(
                            <li key={p.id}>
                                <img src={p.urls.regular} className='w-full h-full object-cover' alt={p.alt_description} />
                            </li>
                        )
                    }
                })}
            </ul>
           
        </>
    )

}

export default List