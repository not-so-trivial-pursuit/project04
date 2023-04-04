// Form.js
import {useState} from 'react';

const Form = (props) => {

    const [ numValue, setNumValue ] = useState(null);
    const [ catValue, setCatValue] = useState(null);
    const [ titleValue, setTitleValue ] = useState('');

    const handleNumSelection = (e) => {
        setNumValue(e.target.value)
    }

    const handleCatSelection = (e) => {
        setCatValue(e.target.value);
    }

    const handleTitleSelection = (e) => {
        setTitleValue(e.target.value);
    }

    return(
        <form action="" onSubmit={(e) => {
            props.handleSubmit(e, numValue, catValue, titleValue)
        }}>
            <label htmlFor="category"></label>
            <select name="" id="category" onChange={handleCatSelection}>
                <option value='Placeholder' disabled>Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Books</option>
                <option value="11">Film</option>
                <option value="12">Music</option>
                <option value="13">Musical & Theatre</option>
                <option value="14">Television</option>
                <option value="15">Video Games</option>
                <option value="16">Board games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Computers</option>
                <option value="19">Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Comics</option>
                <option value="30">Gadgets</option>
                <option value="31">Japanese Anime & Manga</option>
                <option value="32">Cartoon & Animation</option>
            </select>

            <label htmlFor="numbers"></label>
            <select name="" id="numbers" onChange={handleNumSelection}>
                <option value='Placeholder' disabled></option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
            </select>

            <label htmlFor="gameTitle"></label>
            <input type="text" id='gameTitle' required onChange={handleTitleSelection} placeholder='Name the game' />

            <button>Game On</button>

        </form>
    )
}

export default Form;