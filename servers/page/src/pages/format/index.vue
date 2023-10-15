<template>
	<div class="page-foramt">


		<el-tree class="tree"  />
		<div>
				<el-form :inline="true" :model="state.formApi">
						<el-form-item label="接口名称">
							<el-input v-model="state.formApi.apiName" placeholder="请输入接口名称" clearable />
						</el-form-item>
						<el-form-item label="接口路由">
							<el-input v-model="state.formApi.apiUrl" placeholder="请输入接口路由" clearable />
						</el-form-item>
				</el-form>
				<el-button @click="handleClick">转TS类型</el-button>
				<el-button @click="handleMockClick">MOCK数据</el-button>
				<el-button @click="saveMockSubmit">保存mock数据</el-button>
				<el-tabs v-model="state.activeName">
					<el-tab-pane label="数据源" name="01">
						<JsonEditorVue
								v-model="state.testData"
								:="state.config"
							/>
						</el-tab-pane>
					<el-tab-pane label="TS类型" name="02">
							<vue-monaco-editor
								v-model:value="state.tsData"
								class="monaco-wrap"
								theme="vs-dark"
							/>
						</el-tab-pane>
					<el-tab-pane label="MOCK数据" name="03">
						<JsonEditorVue
								v-model="state.mockData"
								:="state.config"
							/>
						</el-tab-pane>
				</el-tabs>
			</div>



	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import {useRoute} from 'vue-router'
import JsonToTS from 'json-to-ts';
import {saveMockApi,getProjectUrls} from '../../api/mock'

const route = useRoute();

const { id } = route.query;

const state = reactive({
	activeName:'03',
	testData: {},
	tsData: '',
	mockData:{},
	config: {
		mode: 'text',
		mainMenuBar: false,
	},
	tree:[],
	formApi:{apiUrl:'',apiName:''}
})

const handleClick = () => {
	let temp:any = state.testData;
	if (typeof (state.testData) === 'string') {
		temp = JSON.parse(temp);
	}
	state.tsData = JsonToTS(temp).reduce((a, b) => `${a}\n\n${b}`);
}

const handleMockClick = () => {
	let temp:any = state.testData;
	if (typeof (state.testData) === 'string') {
		temp = JSON.parse(temp);
	}
	state.mockData = useJsonToMock(temp);
}

const saveMockSubmit = async () => {
	await saveMockApi({
		projectId: id,
		isGroup: false,
		apiName:state.formApi.apiName,
		apiUrl: state.formApi.apiUrl,
		data:state.mockData
	});
}

const initData = async () => {
	const {data} = await getProjectUrls({projectId:id});
	console.log(data, 'sllsls');
	// state.tree = data||[];
}

initData();


</script>

<style lang="scss" scoped>
.page-foramt {
	width: 100%;
	height: 100%;
	display: flex;

	.tree {
		width: 260px;
		// height: 100%;
	}
}

.monaco-wrap {
   width: 1200px !important;
	 height: 900px !important;
}

</style>
