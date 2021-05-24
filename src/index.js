import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => {
	const ref = useRef(undefined);
	const [amount, setAmount] = useState(10);

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;

			console.log("Amount is %d before setAmount call", amount);
			setAmount(amount + 10);
			console.log("Amount is %d after setAmount call", amount);
		},
		{
			root: null,
			rootMargin: "0px",
			threshold: 0,
		}
	);

	useEffect(() => {
		console.log("Amount got updated to %d", amount);
	}, [amount]);

	useEffect(() => {
		const { current } = ref;
		if (current) observer.observe(current);

		return () => {
			if (current) observer.disconnect();
		};
	}, [ref]);

	return (
		<div className="app">
			<div className="list">
				{new Array(amount).fill(1).map((_, i) => (
					<div className="item" key={i}></div>
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
