// Form.js

const Form = (props) => {

    return(
        <form action="" onSubmit={props.handleSubmit}>
            <label htmlFor=""></label>
            <select name="" id="">
                <option value="">
                {/* map through props.category */}
                category
                </option>
                <option value="">
                    {/* map through props.questions */}
                    amount
                </option>
            </select>

            <label htmlFor=""></label>
            <input type="text" onChange={props.handleChange} />

        </form>
    )
}

export default Form;