import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => {
	const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [items, setItems] = useState(original.slice());
	const ref = useRef(undefined);

	useEffect(() => {
		console.log("Inside useEffect: %d\n%o", items.length, items);
	}, [items]);

	useEffect(() => {
		const callback = ([entry]) => {
			if (!entry.isIntersecting) return;

			console.log("Inside callback: length: %d\n%o", items.length, items);
			setItems([...items.slice(), ...original.slice()]);
		};

		const observer = new IntersectionObserver(callback, {
			root: null,
			rootMargin: "0px",
			threshold: 0,
		});

		if (ref.current) observer.observe(ref.current);

		return () => {
			if (ref.current) observer.disconnect();
		};
	}, [ref, items]);

	return (
		<div className="app">
			<div className="list">
				{items.map((item) => (
					<div className="item">{item}</div>
				))}
				<div ref={ref}></div>
			</div>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
