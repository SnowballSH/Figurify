import {useState} from "react";

export default function BubblePage() {
    const [items, setItems] = useState([3, 4, 2, 1] as number[]);
    const [itemsAwait, setItemsAwait] = useState([] as number[]);

    return <div>
        <button onClick={async () => {
            let res = await fetch(
                '/api/bubble', {
                    body: JSON.stringify({
                        Array: items
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                }
            );

            let result = await res.json();
            setItemsAwait(result as number[]);
        }}>
            Bubble Sort
        </button>

        {itemsAwait.map((e, i) => <p key={String(i)}>{e}</p>)}
    </div>;
}