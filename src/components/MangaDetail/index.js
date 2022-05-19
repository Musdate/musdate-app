import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Globals/Loading';
import InfoSection from './InfoSection';
import Chapters from './Chapters';
import Error from '../Globals/Error';

async function getManga(props){
    const {
        productId,
        setManga,
        setIsLoading,
        setError
    } = props

    const pageReq = await fetch(`https://us-central1-musdate-react-app.cloudfunctions.net/api/detail/${productId}`)
    .catch(error => {
        setError(error.message);
        setIsLoading(false);
    });
    await pageReq.json()
    .then(mangasData => {
        setManga(mangasData.data.data);
        setIsLoading(false);
    })
    .catch(error => {
        setError(error.message);
        setIsLoading(false);
    });
}

function ProductView(props) {
    const { productId, category } = useParams();
    const [ manga, setManga ] = useState();
    const [ chapters, setChapters] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ sliceChapters, setSliceChapters ] = useState([]);
    const [ error, setError ] = useState('')

    useEffect(() => {
        setIsLoading(true)
        getManga({productId, setManga, setIsLoading, setError, setChapters});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ?
                <Loading />
            :
                <>
                    {error &&
                        <Error error={error} />
                    }
                    <InfoSection
                        manga={manga}
                        productId={productId}
                    />
                    <Chapters
                        sliceChapters={sliceChapters}
                        setSliceChapters={setSliceChapters}
                        category={category}
                        chapters={chapters}
                    />
                </>
            }
        </>
    );
}

export default ProductView;