export default () => ({
	// fix this fro postgres:
	// database: {
	// 	uri: process.env.MONGO_URI,
	// 	local: process.env.LOCAL_MONGO_URI,
	// 	test: process.env.TEST_MONGO_URI,
	// },
	jwtKey: process.env.JWT_SECRET,
	// test: 'Test configuration',
});
