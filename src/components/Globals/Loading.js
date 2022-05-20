import { FadeLoader } from 'react-spinners';
import { GridContainer } from './Grid';

export default function Loading(props) {
    return (
        <GridContainer>
            <FadeLoader height={15} width={5} radius={2} color={"#527c8d"} css={'margin: auto;'} />
        </GridContainer>
    );
}