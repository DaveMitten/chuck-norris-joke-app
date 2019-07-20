import { override, fixBabelImports } from 'customize-cra';

export default override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
	}),
);