<template>
	<div>
		<el-button @click="handleClick">转TS类型</el-button>
		<el-button @click="handleMockClick">MOCK数据</el-button>
		<el-tabs v-model="state.activeName">
    <el-tab-pane label="数据源" name="01">
			<JsonEditorVue
					v-model="state.jsonData"
					:="state.config"
				/>
			</el-tab-pane>
    <el-tab-pane label="TS类型" name="02">
			<!-- <JsonEditorVue
					v-model="state.tsData"
					:="state.config"
				/> -->
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
</template>
<script setup lang="ts">
// import {jsonToTs} from '~/utils'
import JsonToTS from 'json-to-ts';
const state = reactive({
	activeName:'01',
	jsonData: {
        total: 25,
        limit: 10,
        skip: 0,
        links: {
          previous: undefined,
          next: function () {},
        },
        data: [
          {
            id: '5968fcad629fa84ab65a5247',
            firstname: 'Ada',
            lastname: 'Lovelace',
            awards: null,
            known: [
              'mathematics',
              'computing'
            ],
            position: {
              lat: 44.563836,
              lng: 6.495139
            },
            description: `Augusta Ada King, Countess of Lovelace (née Byron; 10 December 1815 – 27 November 1852) was an English mathematician and writer,
            chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer,
            the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation,
            and published the first algorithm intended to be carried out by such a machine.
            As a result, she is sometimes regarded as the first to recognise the full potential of a "computing machine" and the first computer programmer.`,
            bornAt: '1815-12-10T00:00:00.000Z',
            diedAt: '1852-11-27T00:00:00.000Z'
          }, {
            id: '5968fcad629fa84ab65a5246',
            firstname: 'Grace',
            lastname: 'Hopper',
            awards: [
              'Defense Distinguished Service Medal',
              'Legion of Merit',
              'Meritorious Service Medal',
              'American Campaign Medal',
              'World War II Victory Medal',
              'National Defense Service Medal',
              'Armed Forces Reserve Medal',
              'Naval Reserve Medal',
              'Presidential Medal of Freedom'
            ],
            known: null,
            position: {
              lat: 43.614624,
              lng: 3.879995
            },
            description: `Grace Brewster Murray Hopper (née Murray; December 9, 1906 – January 1, 1992)
            was an American computer scientist and United States Navy rear admiral.
            One of the first programmers of the Harvard Mark I computer,
            she was a pioneer of computer programming who invented one of the first compiler related tools.
            She popularized the idea of machine-independent programming languages, which led to the development of COBOL,
            an early high-level programming language still in use today.`,
            bornAt: '1815-12-10T00:00:00.000Z',
            diedAt: '1852-11-27T00:00:00.000Z'
          }
        ]
	},
	tsData: '',
	mockData:{},
	config: {
		mode: 'text',
		mainMenuBar: false,
	}
})

const handleClick = () => {
	let temp = state.jsonData;
	if (typeof (state.jsonData) === 'string') {
		temp = JSON.parse(temp);
	}
	state.tsData = JsonToTS(temp).reduce((a, b) => `${a}\n\n${b}`);
	console.log('handleClick==-tsData',state.tsData)
}

const handleMockClick = () => {
	console.log('handleClick==--mockData',state.tsData)
}
</script>

<style>


.monaco-wrap {
   width: 1200px !important;
	 height: 900px !important;
}

</style>
