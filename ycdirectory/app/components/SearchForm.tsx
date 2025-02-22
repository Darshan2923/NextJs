import React from 'react';
import Form from 'next/form';

const SearchForm = () => {

    const query = "";

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if (form) {
            form.reset();
        }
    }

    return (
        <Form action='/' scroll={false} className='search-form'>
            <input type="text" name='query' defaultValue="" className='search-input' placeholder='Search Startups' />
            <div className="flex gap-2">
                {
                    query && (
                        <button type='reset' onClick={reset}></button>
                    )
                }
            </div>
        </Form>
    )
}

export default SearchForm