import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Globals/Loading';
import InfoSection from './InfoSection';
import Error from '../Globals/Error';
import Chapters from './Chapters';

async function getManga(props){
    const {
        productId,
        setManga,
        setIsLoading,
        setError
    } = props

    // const primero = await fetch(`https://api.mangadex.org/at-home/server/314bca59-114a-41cd-9b77-c5e56a59f0e9`);
    // const atHome = await primero.json()
    // const { baseUrl } = atHome;
    // setChapterImages(atHome.chapter.data.map(
    //     (fileName) => `${baseUrl}/data/${atHome.chapter.hash}/${fileName}`
    // ))

    const pageReq = await fetch(`https://us-central1-musdate-react-app.cloudfunctions.net/api/detail/${productId}`)
    .catch(error => {
        setError(error.message);
        setIsLoading(false);
    });
    await pageReq.json()
    .then(mangasData => {
        setManga(mangasData.data);
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
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState('');

    useEffect(() => {
        setIsLoading(true)
        getManga({productId, setManga, setIsLoading, setError});
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
                        category={category}
                    />
                </>
            }
        </>
    );
}

export default ProductView;