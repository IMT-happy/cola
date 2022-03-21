<template>
  <div style="padding-left: 20px">
    <el-button type="text" @click="returnback">返回上一页</el-button>
  </div>
  <div class="casetitle">{{ nowcasename }} 测试鉴赏case共计 {{ nowlen }} 条</div>
  <div class="search">
    <el-input
      v-model="searchinput"
      placeholder="输入需要查看的内容 eg：为什么安卓icon图片加载不出来"
      clearable
      size="small"
      style="width: 40%; margin-right: 20px"
    /><el-button @click="casesearch" type="primary" size="mini">查询一下</el-button>
    <el-button @click="dialogenewinsertVisible = true" type="primary" size="mini"
      >我要新增</el-button
    >
  </div>
  <div class="content">
    <div class="demo-collapse" v-if="casedata.length > 0">
      <el-descriptions
        v-for="(item, index) in casedata"
        :key="index"
        :title="item.name.length > 6 ? item.name.slice(0, 7) + extraname : item.name"
        size="mini"
        :column="3"
        ><template #extra>
          <el-tag size="small" @click="editcase(item)">编辑</el-tag>
        </template>
        <el-descriptions-item span="3" label="鉴赏标题 ">{{
          item.name
        }}</el-descriptions-item>
        <el-descriptions-item span="3" label="详细描述 ">{{
          item.desc
        }}</el-descriptions-item>
        <el-descriptions-item span="3" label="注意事项 ">{{
          item.content
        }}</el-descriptions-item>
        <el-descriptions-item span="1"
          ><el-divider border-style="dashed"></el-divider
        ></el-descriptions-item>
      </el-descriptions>
    </div>
    <div
      v-else
      style="
        text-align: center;
        color: #696b6f;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      暂无数据
    </div>
  </div>

  <el-dialog v-model="dialogenewinsertVisible" title="新增一条case" width="80%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="case名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="case描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="注意事项" prop="contation">
        <el-input v-model="ruleForm.contation" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="所属Tag" prop="tag">
        <el-input v-model="ruleForm.tag" placeholder="eg: 安卓"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="pic"> </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">开始新建</el-button>
        <el-button @click="resetForm(ruleFormRef)">我要重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog v-model="dialogeeditVisible" title="编辑当前case" width="80%">
    <el-form
      ref="ruleFormRef"
      :model="ruleeditForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleeditForm"
      :size="formSize"
    >
      <el-form-item label="case名称" prop="name">
        <el-input v-model="ruleeditForm.name"></el-input>
      </el-form-item>
      <el-form-item label="case描述" prop="desc">
        <el-input v-model="ruleeditForm.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="注意事项" prop="contation">
        <el-input v-model="ruleeditForm.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="所属Tag" prop="tag">
        <el-input v-model="ruleeditForm.tag" placeholder="eg: 安卓"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submiteditForm(ruleFormRef)"
          >确认更新</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, onMounted, onBeforeMount } from 'vue'
import { ElForm, ElMessage } from 'element-plus' // ElMessage,
// import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'
import router from '@/router'
import axios from '../utils/axios'
import { cases } from '../common/types'

type FormInstance = InstanceType<typeof ElForm>

const ruleFormRef = ref<FormInstance>()

export default defineComponent({
  // components: { Plus, ZoomIn, Download, Delete },
  name: 'caseinfo',
  setup() {
    const newruleFormRef = ruleFormRef
    const state = reactive({
      formSize: 'samll',
      extraname: '...',
      nowcasename: '全部',
      nowlen: 0,
      searchinput: '',
      dialogenewinsertVisible: false,
      dialogeeditVisible: false,
      ruleForm: {
        name: '',
        desc: '',
        contation: '',
        tag: ''
      },
      ruleeditForm: {} as any,
      rules: {
        name: [
          {
            required: true,
            message: '不可为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: 'Length should be 1 to 100',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '不可为空',
            trigger: 'blur'
          }
        ]
      },
      casedata: [] as any
    })
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    const getallcasesearch = (searchinput: any, currentname: any) => {
      axios
        .post('/api/getallcasedata', {
          name: searchinput,
          tag: currentname
        })
        .then((response) => {
          state.casedata = response.data.data
          state.nowlen = response.data.data.length
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const submitForm = (formEl: FormInstance | undefined) => {
      console.log('formEl!', formEl)
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          axios
            .post('/api/insertcasedata', {
              id: state.casedata.length + 1,
              name: state.ruleForm.name,
              desc: state.ruleForm.desc,
              contation: state.ruleForm.contation,
              tag: state.ruleForm.tag
            })
            .then(() => {
              getallcasesearch(state.searchinput, state.nowcasename)
            })
            .catch((error) => {
              console.error(error)
              ElMessage({
                message: error,
                type: 'error'
              })
            })
          resetForm(newruleFormRef.value)
          state.dialogenewinsertVisible = false
        }
        console.log('error submit!')
      })
    }

    const submiteditForm = (formEl: FormInstance | undefined) => {
      console.log('formEl!', formEl)
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('state.ruleeditForm: ', state.ruleeditForm)
          axios
            .post('/api/editcase', {
              id: state.ruleeditForm.id,
              name: state.ruleeditForm.name,
              desc: state.ruleeditForm.desc,
              content: state.ruleeditForm.content,
              tag: state.ruleeditForm.tag
            })
            .then(() => {
              getallcasesearch(state.searchinput, state.nowcasename)
              ElMessage({
                message: '数据加载成功',
                type: 'success'
              })
            })
            .catch((error) => {
              console.error(error)
            })
          state.dialogeeditVisible = false
        }
        console.log('error submit!')
      })
    }

    const editcase = (item: cases) => {
      state.ruleeditForm = item
      state.dialogeeditVisible = true
    }
    const casesearch = () => {
      try {
        getallcasesearch(state.searchinput, state.nowcasename)
      } catch (error) {
        ElMessage({
          message: error as any,
          type: 'error'
        })
      }
    }
    const returnback = () => {
      router.push({ name: 'weballcase' })
    }

    onMounted(() => {
      // console.log('pramas: ', router.currentRoute.value.query.name)

      const currentname = router.currentRoute.value.query.name?.toString()
      state.nowcasename = currentname as any
      if (state.nowcasename === '查看全部') {
        getallcasesearch(state.searchinput, '')
        state.nowcasename = '全部'
      } else {
        getallcasesearch(state.searchinput, currentname)
      }
    })
    onBeforeMount(() => {})

    return {
      submitForm,
      submiteditForm,
      ruleFormRef,
      getallcasesearch,
      editcase,
      returnback,
      casesearch,
      resetForm,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="stylus">
.cardflex {
  display: flex;
  justify-content: space-between;
}
.search {
  padding-left: 20px;
  display: flex;
  justify-content: space;
}
.content {
  margin:20px
}
.casetitle {
  font-size: 28px;
  font-weight: bold;
  padding: 20px;
}
</style>
