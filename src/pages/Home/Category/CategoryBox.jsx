import React from 'react';
import qs from 'query-string'
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ icon: Icon, label,selected }) => {
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()


    const handleClick = () => {
        let currentQuery = {}
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery = { ...currentQuery, category: label }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })
        navigate(url)

    }



    return (
        <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-2 border-b-2  hover:text-neutral-800 ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'} `}>
            <Icon size={26} />
            <p>{label}</p>
        </div>
    );
};

export default CategoryBox;