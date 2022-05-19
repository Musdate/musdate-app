import React from 'react';
import { GridContainer } from '../Globals/Grid';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

const ChapterContainer = styled.div`
    width: 100%;
    padding: 30px;
`
const ChapterRow = styled(GridContainer)`
    height: 50px;
    background: white;
    border: 1px solid #cdcfd6;
    border-bottom: none;
    font-size: 24px;
    padding: 0px 15px;
    color: #1d4b5e;
    ${props => props.$end &&
        `background: #1d4b5e;
        color: white;
        font-size: 17px;
        height: 40px;
        cursor: pointer;
        margin-bottom: 25px`
    }
`
const TextInfo = styled.div`
    margin-bottom: 15px;
    ${props => props.title &&
        `font-weight: 600;
        font-size: 30px;`
    }
    ${props => props.genres &&
        `margin-right: 15px;
        font-weight: 600;
        font-size: 17px;`
    }
    ${props => props.alt &&
        `margin-right: 15px;
        font-size: 17px;`
    }
`

function Chapters(props) {
    const {
        sliceChapters,
        category
    } = props

    // const [ showAll, setShowAll ] = useState(false);

    // function handleShowAll(validator) {
    //     validator ?
    //         setSliceChapters(chapters)
    //     :
    //         setSliceChapters(chapters.slice(0, 10))
    //         setShowAll(validator)
    // };

    return (
        <GridContainer
            id="SectionContainer"
            alignItems="center"
            direction="column"
        >
            <ChapterContainer>
                <TextInfo title='true'>SECCION DE CAPITULOS:</TextInfo>
                {sliceChapters.map((chap, index) => (
                    <Link style={{textDecoration: 'none'}} to={`/${category}/${chap.id}/page=${chap.index}`}>
                        <ChapterRow
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            {chap.name}
                            <ExpandMoreIcon />
                        </ChapterRow>
                    </Link>
                ))}
                <ChapterRow
                    justifyContent="center"
                    alignItems="center"
                    $end
                    // onClick={() => handleShowAll(!showAll)}
                >
                    Ver Todo
                </ChapterRow>
            </ChapterContainer>
        </GridContainer>
    );
}

export default Chapters;