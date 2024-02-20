import React from 'react';
import { categories } from './CategoryData';
import CategoryBox from './CategoryBox';
import Container from '../../../components/sharred/Container';
import { useSearchParams } from 'react-router-dom';

const Category = () => {
    const [params, setParams] = useSearchParams()
    const category = params.get('category')
    return (
        <Container>
            <div className='flex justify-evenly items-center gap-6 pt-16 mt-16 overflow-x-auto'>
                {categories.map((item, index) => <CategoryBox key={index} icon={item.icon} label={item.label} selected={category === item.label}></CategoryBox>)}
            </div>
        </Container>
    );
};

export default Category;