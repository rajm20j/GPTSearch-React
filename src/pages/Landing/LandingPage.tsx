import './LandingPage.scss';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFakeData } from '../../common/apis';
import SearchIcon from '../../assets/icons/search.svg';

const LandingPage: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['Fake'],
        queryFn: getFakeData
    });

    const onFormSubmit = () => {
        alert("Form Submitted");
    }

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            <div>
                <form onSubmit={onFormSubmit}>
                    <input type="text"></input>
                    <button type="submit" value="Submit">
                        <img className='icon' src={SearchIcon}></img>
                    </button>
                </form>
            </div>
        </>
    );
};

export default LandingPage;
