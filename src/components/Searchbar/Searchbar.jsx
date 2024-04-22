
import { useState } from 'react'
import searchbarStyle from './style.module.css'


export const Searchbar = ({onSubmit}) => {
    
    const [searchQuery, setSearchQuery] = useState('');
    

    const changeHandler = (event) => {
        setSearchQuery(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        onSubmit(searchQuery.trim());
        event.target.reset();
  };

        return (
            <header className={searchbarStyle.searchbar}>
                <form className={searchbarStyle.form} onSubmit={submitHandler}>
                    <button type="submit" className={searchbarStyle.button}>
                        <span className={searchbarStyle.buttonLabel}>Search</span>
                    </button>

                    <input
                        className={searchbarStyle.input}
                        name='search'
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={searchQuery}
                        placeholder="Search images and photos"
                        onChange={changeHandler}
                    />
                </form>
            </header>
        )
    }
    


export default Searchbar