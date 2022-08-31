import logoSrc from "@assets/react.svg";
import { ReactComponent as ReactLogo } from "@assets/react.svg";
import { Button } from "@douyinfe/semi-ui";

function Index() {
	return (
		<div className="page-header">
			<h1 className="text-3xl font-bold underline bg-blue-400 text-red-500">
				首页
			</h1>
			<img src={logoSrc} alt="" />
			<ReactLogo></ReactLogo>
			<Button theme="solid" type="primary">
				Semi Design
			</Button>
		</div>
	);
}

export default Index;
