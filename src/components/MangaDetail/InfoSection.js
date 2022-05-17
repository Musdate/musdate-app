import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import DefaultImage from '../../.images/DefaultImage.png'

const Image = styled.img`
    width: 255px;
    height: 380px;
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
const DetailSection = styled(Grid)`
    max-width: calc(100% - 315px);
    padding: 0px 30px;
`
const LabelInfo = styled.div`
    color: grey;
    font-weight: 600;
    font-size: 22px;
`
const GridContainer = styled(Grid)`
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
        <GridContainer container direction="row">
            <Image src={imageUrl} alt={"Book Portrait"} />
            <DetailSection>
                <TextInfo title='true'>{manga.attributes.title.en}</TextInfo>
                <TextInfo>{manga.attributes.description.en}</TextInfo>
                <LabelInfo>Géneros</LabelInfo>
                <Grid container direction="row">
                    {manga.attributes.tags.map((gen, index) => (
                        <TextInfo
                            key={index}
                            genres='true'
                        >
                            {gen.attributes.name.en}
                        </TextInfo>
                    ))}
                </Grid>
                <LabelInfo>Estado</LabelInfo>
                <TextInfo>{manga.attributes.status}</TextInfo>
                <LabelInfo>Títulos Alternativos</LabelInfo>
                <Grid container direction="row">
                    {manga.attributes.altTitles.map((alt, index) => (
                        <TextInfo
                            key={index}
                            alt='true'
                        >
                            {Object.values(alt)}
                        </TextInfo>
                    ))}
                </Grid>
            </DetailSection>
        </GridContainer>
    );
}

export default InfoSection;