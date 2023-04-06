import Form from "./Form";
import CurrentGame from "./CurrentGame";
import { useMain } from "./Main";

const NavigateTo = () => {
    const { showCurrentGame} = useMain();
    return (
      <>
        {showCurrentGame
            ? < CurrentGame />
            : <Form />
        }
      </>
    );
}

export default NavigateTo;