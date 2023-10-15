<template>
	<div class="w-3xl flex flex-row project-container">
   <div v-for="(item,i) in state.list" @click="()=>handleClick(item)" class="node-item w-62 bg-white  rounded-lg m-4 shadow-lg h-52 border-solid border-transparent border-current" :key="i">
			<div class="title">{{ item.name }}</div>
			<div class="path">项目路径：</div>
			<div class="path">{{ item.path }}</div>
		</div>
	</div>
	<el-dialog
    v-model="state.dialogVisible"
    title="Tips"
    width="40%"
  >
	<el-form :model="state.form" label-width="120px">
    <el-form-item label="项目名称">
      <el-input v-model="state.form.name" />
    </el-form-item>
    <el-form-item label="项目绝对路径">
			<el-input v-model="state.form.path" />
    </el-form-item>
		<el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
		</el-form>

  </el-dialog>
	<div @click="addProduct" class="fixed bottom-8 right-8 justify-center content-center flex bg-lime-500 rounded-full w-8 h-8">+</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import {useRouter} from 'vue-router'
import { queryProductList, saveMock } from '../api/mock'
const router = useRouter();
const state = reactive<{
	list: any,
	form: {
		name: string;
		path: string;
	},
	dialogVisible: boolean
}>({
	list: [],
	form: {
		name: '',
		path: ''
	},
	dialogVisible: false
})
const initData = async () => {
	const {data} = await queryProductList();
	console.log(data, 'sllsls');
	state.list = data||[];
}

const addProduct = () => {
	state.dialogVisible = true;
	state.form = {
		name: '',
		path: ''
	}
}

const handleClick = (item:any) => {
	console.log(item, 'sslsl=====')
  router.push(`/format?id=${item.id}&timer=${+new Date()}`)
}

const onSubmit = async () => {
	const { data } = await saveMock(state.form);
	console.log('data====',data)
	initData();
	state.dialogVisible = false;
}

initData();
</script>

<style lang="scss" scoped>
.project-container {

	.node-item {
		padding: 20px;
		.title {
			font-size: 16px;
			color: #666;
			font-weight: 700;
			margin-bottom: 20px;
		}

		.path {
			width: 100%;
      word-break: break-all;
		}
	}


}
</style>
