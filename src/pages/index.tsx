import logoSrc from "@assets/react.svg";
import { ReactComponent as ReactLogo } from "@assets/react.svg";

function Index() {
	return (
		<div>
			<h1 className="text-3xl font-bold underline bg-blue-400 text-red-500">
				首页
			</h1>
			<img src={logoSrc} alt="" />
			<ReactLogo></ReactLogo>
		</div>
	);
}

export default Index;
