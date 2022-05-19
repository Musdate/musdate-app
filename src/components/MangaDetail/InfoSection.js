import React from 'react';
import styled from 'styled-components';
import DefaultImage from '../../.images/DefaultImage.png'
import { GridContainer } from '../Globals/Grid';

const Image = styled.img`
    width: 255px;
    height: 380px;
`
const TextInfo = styled.div`
    margin-bottom: 15px;
    ${props => props.$genres &&
        `margin-right: 15px;
        font-weight: 600;
        font-size: 17px;`
    }
    ${props => props.$altTitles &&
        `margin-right: 15px;
        font-size: 17px;`
    }
`
const TitleInfo = styled.div`
    font-weight: 600;
    font-size: 30px;
`
const LabelInfo = styled.div`
    color: grey;
    font-weight: 600;
    font-size: 22px;
`
const DetailSection = styled(GridContainer)`
    max-width: calc(100% - 315px);
    padding: 0px 30px;
`
const InfoContainer = styled(GridContainer)`
    padding: 30px;
`

function InfoSection(props) {
    const {
        manga,
        productId
    } = props

    let imageUrl = DefaultImage

    // Search Manga Image
    if(manga){
        const imageData = manga.relationships.find((relation) => relation.type === "cover_art")
        if(imageData){
            imageUrl = `https://uploads.mangadex.org/covers/${productId}/${imageData.attributes.fileName}.512.jpg`
        }
    }

    return (
        <InfoContainer>
            <Image src={imageUrl} alt={"Book Portrait"} />
            <DetailSection direction='column'>
                <TitleInfo>{manga.attributes.title.en}</TitleInfo>
                <TextInfo>{manga.attributes.description.en}</TextInfo>
                <LabelInfo>Géneros</LabelInfo>
                <GridContainer direction="row">
                    {manga.attributes.tags.map((gen, index) => (
                        <TextInfo
                            key={index}
                            $genres
                        >
                            {gen.attributes.name.en}
                        </TextInfo>
                    ))}
                </GridContainer>
                <LabelInfo>Estado</LabelInfo>
                <TextInfo>{manga.attributes.status}</TextInfo>
                <LabelInfo>Títulos Alternativos</LabelInfo>
                <GridContainer direction="row">
                    {manga.attributes.altTitles.map((alt, index) => (
                        <TextInfo
                            key={index}
                            $altTitles
                        >
                            {Object.values(alt)}
                        </TextInfo>
                    ))}
                </GridContainer>
            </DetailSection>
        </InfoContainer>
    );
}

export default InfoSection;