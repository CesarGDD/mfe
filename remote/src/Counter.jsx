import { createSignal } from "solid-js";

export default () => {
    const [count, setCount] = createSignal(0);

    return (
        <div>
            <div>Count = {count()}</div>
            <button onClick={() => setCount(count() +2 )}>
                Add Two
            </button>
        </div>
    )
}