<template>
  <div>
    <div class="fuzztitle">web fuzz 工具平台</div>
    <div style="padding-left: 20px">
      <div class="bodycontent">
        <el-input
          v-model="creater"
          class="w-50 m-2"
          size="small"
          style="max-width: 150px; min-width: 100px; margin-right: 10px"
          placeholder="创建人"
          clearable
        />
        <el-input
          v-model="editor"
          class="w-50 m-2"
          size="small"
          style="max-width: 150px; min-width: 100px; margin-right: 10px"
          placeholder="编辑人"
          clearable
        />
        <el-select
          v-model="cookievalue"
          clearable
          class="m-2"
          style="min-width: 50px; margin-right: 10px"
          placeholder="iscookie"
          size="small"
        >
          <el-option
            v-for="item in cookieoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="autovalue"
          clearable
          class="m-2"
          style="min-width: 50px; margin-right: 10px"
          placeholder="自定义"
          size="small"
        >
          <el-option
            v-for="item in autooptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="tooglevalue"
          clearable
          class="m-2"
          style="min-width: 50px; margin-right: 10px"
          placeholder="是否弃用"
          size="small"
        >
          <el-option
            v-for="item in toogleoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          size="mini"
          type="primary"
          plain
          style="font-size: 13px; min-width: 70px"
          @click="dosearch()"
          >搜索</el-button
        >
        <el-button
          size="mini"
          type="primary"
          plain
          style="font-size: 13px; min-width: 70px"
          @click="newinsert()"
          >新增</el-button
        >
      </div>
      <div v-if="webfuzzdata.length > 0">
        <el-table :data="webfuzzdata" style="width: 100%">
          <el-table-column label="序号" prop="id" width="80" sortable />
          <el-table-column label="名称" prop="url" />
          <el-table-column label="cookie" prop="iscookie" width="70"
            ><template #default="scope">
              <SvgIcon
                :name="formatIconVal('isstart')"
                v-if="scope.row.iscookie"
              ></SvgIcon>
              <SvgIcon :name="formatIconVal('closed')" v-else></SvgIcon>
            </template>
          </el-table-column>
          <el-table-column label="自定义" prop="isauto" width="70"
            ><template #default="scope">
              <SvgIcon
                :name="formatIconVal('running')"
                v-if="scope.row.isauto"
              ></SvgIcon>
              <SvgIcon :name="formatIconVal('closed')" v-else></SvgIcon>
            </template>
          </el-table-column>
          <el-table-column label="弃用" prop="creater" width="70">
            <template #default="scope">
              <el-switch
                v-model="scope.row.tooglechange"
                @change="changecurrentstatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="creater" width="110" />
          <el-table-column label="最后编辑人" prop="editor" width="110" />
          <el-table-column label="日期" prop="date" width="150" sortable />
          <el-table-column label="操作" width="250">
            <template #default="scope">
              <el-button
                :disabled="scope.row.tooglechange"
                size="mini"
                type="warning"
                plain
                style="font-size: 13px; min-width: 60px"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                :disabled="scope.row.tooglechange"
                size="mini"
                type="primary"
                plain
                style="font-size: 13px; min-width: 60px"
                @click="handlerun(scope.row)"
                >执行</el-button
              >
              <el-button
                size="mini"
                type="primary"
                plain
                style="font-size: 13px; min-width: 60px; margin-top: 5px"
                @click="lookfordetail(scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
  </div>
  <el-drawer
    v-model="isdrawer"
    :direction="direction"
    :before-close="handleClose"
    :title="nowtitle"
    size="50%"
  >
    <template #default>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="small"
        label-position="left"
      >
        <el-form-item label="页面url" prop="url">
          <el-input
            v-model="ruleForm.url"
            clearable
            placeholder="https://www.example.com"
          />
        </el-form-item>
        <el-form-item label="配置选项" prop="checkedchocie">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            :disabled="ruleForm.isauto"
            >全选（ 推荐默认选项如下，可自行按需选择 ）</el-checkbox
          >
          <el-checkbox-group
            v-model="ruleForm.checkedchocie"
            @change="handleCheckedChooseChange"
            :disabled="ruleForm.isauto"
          >
            <el-checkbox v-for="item in chocie" :key="item" :label="item">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否自定义" prop="isauto">
          <el-switch v-model="ruleForm.isauto" @change="closechoice" />
        </el-form-item>

        <div
          v-show="ruleForm.isauto"
          v-for="(item, index) in ruleForm.getways"
          :key="item.key"
        >
          <el-divider content-position="left" border-style="dashed"
            >接口 {{ index + 1 }}</el-divider
          >
          <el-form-item label="接口名称">
            <el-input v-model="item.name" placeholder="getuserinfo" />
          </el-form-item>
          <el-form-item
            label="请求头"
            v-for="(headeritem, headerindex) in item.header"
            :key="headerindex"
          >
            <div style="display: flex">
              <el-input
                v-model="headeritem.key"
                placeholder="user-agent"
                style="width: 30%; margin-right: 3px"
              />:<el-input
                type="textarea"
                :rows="1"
                placeholder="chrome://xxxxx"
                v-model="headeritem.value"
                style="width: 60%; margin-left: 3px"
              />
              <div style="margin-top: 6px">
                <SvgIcon
                  :name="formatIconVal('add')"
                  v-if="headerindex === 0"
                  @click="addheader(index)"
                ></SvgIcon>
                <SvgIcon
                  :name="formatIconVal('delete')"
                  v-else
                  @click.prevent="removeheader(index, headeritem)"
                ></SvgIcon>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="请求体">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="{id:2,name:title}"
              v-model="item.postData"
            />
          </el-form-item>
          <el-form-item label="返回体">
            <el-input
              type="textarea"
              :placeholder="responsedata"
              :rows="5"
              v-model="item.response"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="mt-2" @click.prevent="removeapi(item)" type="danger" plain
              >删除</el-button
            >
          </el-form-item>
        </div>

        <el-form-item v-show="ruleForm.isauto">
          <el-button @click="addapi" type="primary" plain>追加</el-button>
        </el-form-item>
        <el-form-item label="是否插入cookie" prop="iscookie">
          <el-switch v-model="ruleForm.iscookie" @change="rulechange()" />
        </el-form-item>
        <el-form-item label="cookie值" prop="cookie" v-show="ruleForm.iscookie">
          <el-input
            v-model="ruleForm.cookie"
            type="textarea"
            :rows="5"
            placeholder="buvid3=44B8A821-F26C-F854-93FD-5608F3F5F0D259226infoc;"
            clearable
          />
        </el-form-item>
        <el-form-item label="联系号码" prop="tel">
          <el-input v-model.trim="ruleForm.tel" placeholder="18327863706" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">{{
            nowbuttonname
          }}</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, onBeforeMount, ref } from 'vue'
import { ElMessage, ElMessageBox, ElForm } from 'element-plus'
import Cookie from 'js-cookie'
import { FormatPipelineStageicon } from '@/utils/filters'
import SvgIcon from '@/components/svgIcon.vue'
import axios from '../utils/axios'
import router from '@/router'

type FormInstance = InstanceType<typeof ElForm>

const ruleFormRef = ref<FormInstance>()

interface User {
  id: number
  url: string
  iscookie: boolean
  isauto: boolean
  creater: string
  editor: string
  date: string
  tooglechange: boolean
  cookie: string
  checkedchocie: []
  getways: []
  tel: string
}

export default defineComponent({
  components: { SvgIcon },
  name: 'webfuzz',
  setup() {
    const state = reactive({
      responsedata: `
      {
      status: 200,
      headers: {"Access-Control-Allow-Origin": "*", },
      contentType: "application/json;charset=utf-8",
      body: JSON.stringify({ code: 0, data: "hello i'm fuzz" }),
      }`,
      webfuzzdata: [],
      cookieoptions: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      autooptions: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      toogleoptions: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      creater: '',
      editor: '',
      cookievalue: '',
      autovalue: '',
      tooglevalue: '',
      isdrawer: false,
      direction: 'rtl',
      nowbuttonname: '',
      nowtitle: '',
      ruleForm: {
        id: 0,
        url: '',
        isauto: false,
        iscookie: false,
        cookie: '',
        getways: [
          {
            key: 1,
            name: '',
            header: [
              {
                key: '',
                value: ''
              }
            ],
            postData: '',
            response: ''
          }
        ],
        checkedchocie: [
          'someheader',
          'somequerydata',
          'mainresponse',
          'someresponse',
          'somexhr',
          'someimg',
          'somecss',
          'somejs'
        ],
        tel: ''
      },

      rules: {
        url: [{ required: true, message: '需fuzz的页面不可为空', trigger: 'blur' }],
        tel: [
          {
            required: true,
            message: '联系方式不可为空，方便企业微信通知您～',
            trigger: 'blur'
          }
        ],
        cookie: [{ required: false, message: 'cookie 不可为空哦～', trigger: 'blur' }]
      },
      nowid: 1,
      checkAll: false,
      isIndeterminate: true,
      chocie: [
        'allheader',
        'someheader',
        'allquerydata',
        'somequerydata',
        'mainresponse',
        'allresponse',
        'someresponse',
        'allxhr',
        'somexhr',
        'allimg',
        'someimg',
        'allcss',
        'somecss',
        'alljs',
        'somejs'
      ]
    })

    const getnowname = () => {
      let username
      const cookiename: any = Cookie.get('username')
      if (cookiename && cookiename.length > 0) {
        username = cookiename
      } else {
        username = '游客'
      }
      return username
    }
    const getwebfuzzdata = () => {
      axios
        .post('/api/getwebfuzz', {
          creater: state.creater,
          editor: state.editor,
          cookievalue: state.cookievalue,
          autovalue: state.autovalue,
          tooglevalue: state.tooglevalue,
          searchtype: 2
        })
        .then((response) => {
          state.webfuzzdata = response.data.data
          state.nowid = response.data.nextid
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const handleCheckAllChange = (val: boolean) => {
      state.ruleForm.checkedchocie = val ? state.chocie : []
      state.isIndeterminate = false
    }
    const closechoice = () => {
      if (state.ruleForm.isauto) {
        handleCheckAllChange(!state.ruleForm.isauto)
        state.checkAll = !state.ruleForm.isauto
      } else {
        state.ruleForm.checkedchocie = [
          'someheader',
          'somequerydata',
          'mainresponse',
          'someresponse',
          'somexhr',
          'someimg',
          'somecss',
          'somejs'
        ]
      }
    }
    const handleCheckedChooseChange = (value: string[]) => {
      const checkedCount = value.length
      state.checkAll = checkedCount === state.chocie.length
      state.isIndeterminate = checkedCount > 0 && checkedCount < state.chocie.length
    }
    const changecurrentstatus = (val: any) => {
      console.log(val)
      axios
        .post('/api/insertwebfuzz', {
          id: val.id,
          tooglechange: val.tooglechange,
          url: val.url,
          isauto: val.isauto,
          iscookie: val.iscookie,
          cookie: val.cookie,
          user: getnowname(),
          checkchoose: val.checkedchocie,
          getways: val.getways,
          tel: val.tel
        })
        .then((response) => {
          if (response.data.code === '200') {
            getwebfuzzdata()
          } else {
            ElMessage({
              message: response.data.msg,
              type: 'error'
            })
          }
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const resetForm = () => {
      state.ruleForm = {
        id: 0,
        url: '',
        isauto: false,
        iscookie: false,
        cookie: '',
        getways: [
          {
            key: 1,
            name: '',
            header: [
              {
                key: '',
                value: ''
              }
            ],
            postData: '',
            response: ''
          }
        ],
        checkedchocie: [
          'someheader',
          'somequerydata',
          'mainresponse',
          'someresponse',
          'somexhr',
          'someimg',
          'somecss',
          'somejs'
        ],
        tel: ''
      }
    }
    const formatIconVal = (str: string): string => {
      return FormatPipelineStageicon(str)
    }
    const handleEdit = (row: User) => {
      state.nowtitle = '编辑数据'
      state.nowbuttonname = '更新'
      state.isdrawer = true
      const nowform = {
        id: row.id,
        url: row.url,
        isauto: row.isauto,
        iscookie: row.iscookie,
        cookie: row.cookie,
        checkedchocie: row.checkedchocie,
        getways: row.getways,
        tel: row.tel
      }
      state.ruleForm = nowform
    }
    const handlerun = (row: User) => {
      axios
        .post('/api/webfuzzrun', {
          id: row.id,
          url: row.url,
          isauto: row.isauto,
          iscookie: row.iscookie,
          cookie: row.cookie,
          user: getnowname(),
          checkedchocie: row.checkedchocie,
          getways: row.getways,
          tel: row.tel
        })
        .then((response) => {
          if (response.data.code === '200') {
            getwebfuzzdata()
            ElMessage({
              message: '已经发送服务执行啦，请留意企业微信消息推送',
              type: 'success'
            })
          } else {
            ElMessage({
              message: response.data.msg,
              type: 'error'
            })
          }
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
      // console.log(row)
    }
    const lookfordetail = (row: User) => {
      router.push({ name: 'fuzzinfo', query: { id: row.id } })
    }
    const newinsert = () => {
      resetForm()
      state.nowtitle = '新增数据'
      state.nowbuttonname = '新增'
      state.isdrawer = true
    }
    const dosearch = () => {
      axios
        .post('/api/getwebfuzz', {
          creater: state.creater,
          editor: state.editor,
          cookievalue: state.cookievalue,
          autovalue: state.autovalue,
          tooglevalue: state.tooglevalue,
          searchtype: 1
        })
        .then((response) => {
          state.webfuzzdata = response.data.data
          state.nowid = response.data.nextid
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    }
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('当前页面还未保存，确认关闭吗?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    const rulechange = () => {
      if (state.ruleForm.iscookie) {
        state.rules = {
          url: [{ required: true, message: '需fuzz的页面不可为空', trigger: 'blur' }],
          tel: [
            {
              required: true,
              message: '联系方式不可为空，方便企业微信通知您～',
              trigger: 'blur'
            }
          ],
          cookie: [{ required: true, message: 'cookie 不可为空哦～', trigger: 'blur' }]
        }
      }
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          let getwaysdata
          if (state.ruleForm.isauto) {
            getwaysdata = state.ruleForm.getways
          } else {
            getwaysdata = [
              {
                key: 1,
                name: '',
                header: [
                  {
                    key: '',
                    value: ''
                  }
                ],
                postData: '',
                response: ''
              }
            ]
          }
          const reg =
            /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/
          if (!reg.test(state.ruleForm.url)) {
            ElMessage({
              message: '请填写正确的URL格式',
              type: 'error'
            })
          } else {
            axios
              .post('/api/insertwebfuzz', {
                id: state.ruleForm.id ? state.ruleForm.id : state.nowid,
                url: state.ruleForm.url,
                isauto: state.ruleForm.isauto,
                iscookie: state.ruleForm.iscookie,
                cookie: state.ruleForm.cookie,
                user: getnowname(),
                checkchoose: state.ruleForm.checkedchocie,
                getways: getwaysdata,
                tel: state.ruleForm.tel
              })
              .then((response) => {
                if (response.data.code === '200') {
                  getwebfuzzdata()
                  state.isdrawer = false
                  state.ruleForm = {
                    id: 0,
                    url: '',
                    isauto: false,
                    iscookie: false,
                    cookie: '',
                    getways: [
                      {
                        key: 1,
                        name: '',
                        header: [
                          {
                            key: '',
                            value: ''
                          }
                        ],
                        postData: '',
                        response: ''
                      }
                    ],
                    checkedchocie: [
                      'someheader',
                      'somequerydata',
                      'mainresponse',
                      'someresponse',
                      'somexhr',
                      'someimg',
                      'somecss',
                      'somejs'
                    ],
                    tel: ''
                  }
                } else {
                  ElMessage({
                    message: response.data.msg,
                    type: 'error'
                  })
                }
              })
              .catch((error) => {
                ElMessage({
                  message: error,
                  type: 'error'
                })
              })
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    const removeapi = (item: any) => {
      const index = state.ruleForm.getways.indexOf(item)
      if (index !== -1) {
        state.ruleForm.getways.splice(index, 1)
      }
    }

    const addapi = () => {
      state.ruleForm.getways.push({
        key: state.ruleForm.getways.length + 1,
        name: '',
        header: [
          {
            key: '',
            value: ''
          }
        ],
        postData: '',
        response: ''
      })
    }
    const removeheader = (num: any, item: any) => {
      const index = state.ruleForm.getways[num].header.indexOf(item)
      if (index !== -1) {
        state.ruleForm.getways[num].header.splice(index, 1)
      }
    }

    const addheader = (num: any) => {
      state.ruleForm.getways[num].header.push({
        key: '',
        value: ''
      })
    }
    onMounted(() => {
      getwebfuzzdata() // getwebfuzz
    })
    onBeforeMount(() => {})
    return {
      formatIconVal,
      handleEdit,
      handlerun,
      newinsert,
      dosearch,
      handleClose,
      submitForm,
      resetForm,
      lookfordetail,
      rulechange,
      ruleFormRef,
      handleCheckAllChange,
      handleCheckedChooseChange,
      changecurrentstatus,
      removeapi,
      addapi,
      removeheader,
      addheader,
      closechoice,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="stylus">
.bodycontent {
  margin-bottom: 15px
  display: flex;
  justify-content: flex-start;
}
.fuzztitle {
  font-size: 28px;
  font-weight: bold;
  padding: 20px;
}

/*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
.el-drawer__body {
    overflow: auto;
    /* overflow-x: auto; */
}

/*2.隐藏滚动条，太丑了*/
.el-drawer__container ::-webkit-scrollbar{
    display: none;
}
</style>
