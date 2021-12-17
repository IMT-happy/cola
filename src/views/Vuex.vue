<template>
  <div class="pagecontainer">
    <div class="titledesc">覆盖率收集集合</div>
    <div class="search">
      <el-input
        size="mini"
        placeholder="请输入查找对象"
        v-model="input"
        clearable
        class="inputbutton"
      ></el-input>
      <div class="newinbut">
        <el-button type="primary" size="mini" @click="searchrate()">查找</el-button>
        <el-button type="primary" size="mini" @click="insertnewrate()"
          >项目新增</el-button
        >
        <el-button type="primary" size="mini" @click="getAllrate()">全量拉取</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="正在执行，请稍候..."
    >
      <el-table-column fixed prop="id" label="序号" width="50" />
      <el-table-column prop="name" label="项目">
        <template #default="scope">
          <el-link type="primary" :href="scope.row.url" target="_blank">
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="servername" label="发布服务" width="160">
        <template #default="scope">
          <el-link
            type="primary"
            :href="riderhref + scope.row.servername"
            target="_blank"
          >
            {{ scope.row.servername }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="applicationname" label="Gitlab" width="300">
        <template #default="scope">
          <el-link type="primary" :href="scope.row.applicationname" target="_blank">
            {{ scope.row.applicationname }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="pc/h5" width="60" />
      <el-table-column prop="cangkuname" label="仓库名" width="130" />
      <el-table-column prop="branch" label="分支" width="100"></el-table-column>
      <el-table-column prop="environment" label="环境" width="50"></el-table-column>
      <el-table-column prop="date" label="更新时间" width="160"></el-table-column>
      <el-table-column label="开/关" width="70">
        <template #default="scope">
          <el-switch v-model="scope.row.isSelected" @change="changeselect(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="handlerateClick(scope.row)"
            >查看详情</el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagelist">
      <el-pagination
        :currentPage="currentPage3"
        background
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper"
        :total="totalnums"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="新增覆盖率项目" v-model="dialognewFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="项目名称">
          <el-input
            placeholder="《青春有你3》9要舞起来（主题曲二创征稿活动）"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input
            placeholder="https://www.bilibili.com/blackboard/activity-UXWxZNfS4.html"
            v-model="form.url"
          ></el-input>
        </el-form-item>
        <el-form-item label="Gitlab">
          <el-input
            placeholder="https://git.bilibili.co/crayon/jinkela"
            v-model="form.applicationname"
          ></el-input>
        </el-form-item>
        <el-form-item label="pc/h5">
          <el-input v-model="form.platform" placeholder="h5" />
        </el-form-item>
        <el-form-item label="仓库名">
          <el-input v-model="form.cangkuname" placeholder="xxxx" />
        </el-form-item>
        <el-form-item label="分支">
          <el-input placeholder="coverage" v-model="form.branch"></el-input>
        </el-form-item>
        <el-form-item label="服务">
          <el-input
            placeholder="jinkela-watchlater-static"
            v-model="form.servername"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="formcancel()">取 消</el-button>
          <el-button type="primary" @click="formcheck()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="编辑更改项目详情" v-model="dialogFormVisible">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="项目名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="formLabelAlign.url"></el-input>
        </el-form-item>
        <el-form-item label="Gitlab">
          <el-input v-model="formLabelAlign.applicationname"></el-input>
        </el-form-item>
        <el-form-item label="pc/h5">
          <el-input v-model="formLabelAlign.platform" />
        </el-form-item>
        <el-form-item label="仓库名">
          <el-input v-model="formLabelAlign.cangkuname" />
        </el-form-item>
        <el-form-item label="分支">
          <el-input v-model="formLabelAlign.branch"></el-input>
        </el-form-item>
        <el-form-item label="服务">
          <el-input v-model="formLabelAlign.servername"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="coverageEdit()">取 消</el-button>
          <el-button type="primary" @click="coveragecheck()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import anaxios from '../utils/anaxios'

export default defineComponent({
  name: 'Vuex',

  setup() {
    const reactiveData = reactive({
      loading: false,
      riderhref: 'http://ops-rider.bilibili.co/App/Releases?cmdb_app_name=',
      currentPage3: 1,
      totalnums: 0,
      input: '',
      dialognewFormVisible: false, // jianrong
      dialogFormVisible: false,
      labelPosition: 'left',
      formLabelAlign: {
        id: '',
        name: '',
        url: '',
        applicationname: '',
        platform: '',
        cangkuname: '',
        servername: '',
        branch: ''
      },
      form: {
        id: '',
        name: '',
        url: '',
        applicationname: '',
        platform: '',
        cangkuname: '',
        servername: '',
        branch: ''
      },
      tableData: []
    })
    const getAllrate = () => {
      // 一键拉取
      try {
        reactiveData.loading = true
        let limnum
        if (reactiveData.currentPage3 === 1) {
          limnum = 1
        } else {
          limnum = reactiveData.currentPage3
        }
        anaxios
          .post('/api/getAllcoverage', {
            limitnum: limnum
          })
          .then((res: any) => {
            if (res.data.msg === 'success') {
              reactiveData.loading = false
              reactiveData.tableData = res.data.data
              reactiveData.totalnums = res.data.length
              reactiveData.input = ''
            } else {
              reactiveData.loading = false
              reactiveData.tableData = []
              ElMessage({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
          .catch((error) => {
            console.error(error)
            reactiveData.loading = false
            ElMessage({
              message: '服务好像出问题了，请联系管理员',
              type: 'error'
            })
          })
      } catch (e) {
        console.log(e)
        reactiveData.loading = false
        ElMessage({
          message: '服务好像出问题了，请联系管理员',
          type: 'error'
        })
      }
    }
    const changeselect = (row: any) => {
      try {
        anaxios
          .post('/api/tooglecoverage', {
            updatenum: row.id,
            platform: row.platform,
            branch: row.branch,
            applicationname: row.applicationname,
            cangkuname: row.cangkuname,
            isSelected: row.isSelected
          })
          .then((res: any) => {
            if (res.data.msg === 'success') {
              getAllrate()
              if (JSON.parse(row.isSelected)) {
                ElMessage({
                  message: '覆盖率开始收集',
                  type: 'success'
                })
              } else {
                ElMessage({
                  message: '覆盖率已经关闭',
                  type: 'success'
                })
              }
            } else {
              ElMessage({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
          .catch((error) => {
            console.error(error)
            ElMessage({
              message: '服务好像出问题了，请联系管理员',
              type: 'error'
            })
          })
      } catch (e) {
        console.log(e)
        ElMessage({
          message: '服务好像出问题了，请联系管理员',
          type: 'error'
        })
      }
    }
    const handlerateClick = (row: any) => {
      try {
        if (JSON.parse(row.isSelected)) {
          const obj = {
            platform: row.platform,
            applicationname: row.cangkuname,
            isSelected: row.isSelected
          }
          anaxios
            .post('/api/getnewfile', obj)
            .then((res: any) => {
              console.log(res)
              if (res.data.msg === 'success') {
                window.open(
                  `https://172.16.39.188:8988/frontend/webcoverage?name=${row.servername}`,
                  '_blank'
                )
              } else {
                ElMessage({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
            .catch((error) => {
              console.error(error)
              ElMessage({
                message: '服务好像出问题了，请联系管理员',
                type: 'error'
              })
            })
        } else {
          ElMessage({
            message: '覆盖率收集已关闭，查看详情打开失败！',
            type: 'error'
          })
        }
      } catch (e) {
        console.log(e)
        ElMessage({
          message: '服务好像出问题了，请联系管理员',
          type: 'error'
        })
      }
    }
    const insertnewrate = () => {
      reactiveData.dialognewFormVisible = true
    }
    const searchrate = () => {
      try {
        if (reactiveData.input) {
          anaxios
            .post('/api/searchcoverage', {
              casename: reactiveData.input,
              limitnum: 1
            })
            .then((res: any) => {
              if (res.data.msg === 'success') {
                reactiveData.tableData = res.data.data
                reactiveData.currentPage3 = 1
                ElMessage({
                  message: '搜索成功',
                  type: 'success'
                })
              } else {
                ElMessage({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
            .catch((error) => {
              console.error(error)
              ElMessage({
                message: '服务好像出问题了，请联系管理员',
                type: 'error'
              })
            })
        } else {
          ElMessage({
            message: '请输入您想查询的信息~',
            type: 'error'
          })
        }
      } catch (e) {
        console.log(e)
        ElMessage({
          message: '服务好像出问题了，请联系管理员',
          type: 'error'
        })
      }
    }
    const formcheck = () => {
      try {
        if (
          reactiveData.form &&
          reactiveData.form.name &&
          reactiveData.form.url &&
          reactiveData.form.applicationname &&
          reactiveData.form.platform &&
          reactiveData.form.cangkuname &&
          reactiveData.form.servername &&
          reactiveData.form.branch
        ) {
          anaxios
            .post('/api/insertcoverage', {
              name: reactiveData.form.name,
              url: reactiveData.form.url,
              applicationname: reactiveData.form.applicationname,
              platform: reactiveData.form.platform,
              cangkuname: reactiveData.form.cangkuname,
              servername: reactiveData.form.servername,
              branch: reactiveData.form.branch
            })
            .then((res: any) => {
              if (res.data.msg === 'success') {
                getAllrate()
                ElMessage({
                  message: '新增成功',
                  type: 'success'
                })
              } else {
                ElMessage({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
            .catch((error) => {
              console.error(error)
              ElMessage({
                message: '服务好像出问题了，请联系管理员',
                type: 'error'
              })
            })
          reactiveData.dialognewFormVisible = false
          reactiveData.form = {
            id: '',
            name: '',
            url: '',
            applicationname: '',
            platform: '',
            cangkuname: '',
            servername: '',
            branch: ''
          }
        } else {
          ElMessage({
            message: '请填写完整信息',
            type: 'error'
          })
        }
      } catch (e) {
        console.log(e)
        ElMessage({
          message: '服务好像出问题了，请联系管理员',
          type: 'error'
        })
      }
    }
    const formcancel = () => {
      reactiveData.dialognewFormVisible = false
      reactiveData.form = {
        id: '',
        name: '',
        url: '',
        applicationname: '',
        platform: '',
        cangkuname: '',
        servername: '',
        branch: ''
      }
    }
    const handleCurrentChange = (val: any) => {
      try {
        let limnum
        if (val === 1) {
          limnum = 1
        } else {
          limnum = val
        }
        anaxios
          .post('/api/searchcoverage', {
            casename: reactiveData.input,
            limitnum: limnum
          })
          .then((res: any) => {
            if (res.data.msg === 'success') {
              reactiveData.tableData = res.data.data
            } else {
              reactiveData.loading = false
              reactiveData.tableData = []
              ElMessage({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
          .catch((error) => {
            console.error(error)
            reactiveData.loading = false
            ElMessage({
              message: '服务好像出问题了，请联系管理员',
              type: 'error'
            })
          })
      } catch (e) {
        console.log(e)
        ElMessage({
          message: '服务好像出问题了，请联系管理员',
          type: 'error'
        })
      }
    }
    const handleEdit = (row: any) => {
      reactiveData.dialogFormVisible = true
      reactiveData.formLabelAlign.id = row.id
      reactiveData.formLabelAlign.name = row.name
      reactiveData.formLabelAlign.url = row.url
      reactiveData.formLabelAlign.applicationname = row.applicationname
      reactiveData.formLabelAlign.platform = row.platform
      reactiveData.formLabelAlign.cangkuname = row.cangkuname
      reactiveData.formLabelAlign.servername = row.servername
      reactiveData.formLabelAlign.branch = row.branch
    }
    const coverageEdit = () => {
      reactiveData.dialogFormVisible = false
    }
    const coveragecheck = () => {
      try {
        if (
          reactiveData.formLabelAlign &&
          reactiveData.formLabelAlign.name &&
          reactiveData.formLabelAlign.url &&
          reactiveData.formLabelAlign.applicationname &&
          reactiveData.formLabelAlign.platform &&
          reactiveData.formLabelAlign.cangkuname &&
          reactiveData.formLabelAlign.servername &&
          reactiveData.formLabelAlign.branch
        ) {
          anaxios
            .post('/api/editcoverage', {
              updatenum: reactiveData.formLabelAlign.id,
              name: reactiveData.formLabelAlign.name,
              url: reactiveData.formLabelAlign.url,
              applicationname: reactiveData.formLabelAlign.applicationname,
              platform: reactiveData.formLabelAlign.platform,
              cangkuname: reactiveData.formLabelAlign.cangkuname,
              servername: reactiveData.formLabelAlign.servername,
              branch: reactiveData.formLabelAlign.branch
            })
            .then((res: any) => {
              if (res.data.msg === 'success') {
                getAllrate()
              } else {
                reactiveData.loading = false
                reactiveData.tableData = []
                ElMessage({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
            .catch((error) => {
              console.error(error)
              reactiveData.loading = false
              ElMessage({
                message: '服务好像出问题了，请联系管理员',
                type: 'error'
              })
            })
          reactiveData.dialogFormVisible = false
        } else {
          ElMessage({
            message: '备注信息不可为空~',
            type: 'error'
          })
        }
      } catch (e) {
        console.log(e)
        ElMessage({
          message: '服务好像出问题了，请联系管理员',
          type: 'error'
        })
      }
    }
    onMounted(() => {
      getAllrate()
    })
    return {
      searchrate,
      insertnewrate,
      getAllrate,
      handlerateClick,
      handleEdit,
      changeselect,
      coveragecheck,
      coverageEdit,
      handleCurrentChange,
      formcheck,
      formcancel,
      ...toRefs(reactiveData)
    }
  }
})
</script>

<style scoped lang="stylus">
.pagecontainer{
 margin-left 10px
}
.titledesc{
  margin-top:20px
  margin-bottom: 20px
}
.search {
  display: flex;
  justify-content: center;
  margin-bottom 15px
}
.inputbutton {
  margin-right: 10px;
  width 50%
}
.newinbut {
  width: 50%;
}
.pagelist {
  margin-top: 10px;
  text-align: center;
}
</style>
