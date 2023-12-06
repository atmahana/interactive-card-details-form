import BackCard from "./components/cards/BackCard";
import FrontCard from "./components/cards/FrontCard";
import InputFormGroup from "./components/Form";
import Success from "./components/Success";
import { useFormContext } from "./hooks/FormContext";

let renderCount = 0;

function App() {
  renderCount++;
  const { state } = useFormContext();

  return (
    <main className="h-screen flex flex-col md:flex-row gap-[4.7rem]">
      <div className="bg-main-mobile md:bg-main-desktop grid bg-cover bg-no-repeat relative min-h-[240px] md:min-w-[300px] xl:min-w-[483px]">
        <BackCard />
        <FrontCard />
      </div>
      <div className="flex flex-col w-fit mx-auto md:pt-64">
        {state.isSucceed === true ? <Success /> : <InputFormGroup />}
      </div>
    </main>
  );
}

export default App;
