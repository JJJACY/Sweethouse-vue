<template>
  <div class="container">
    <section>
      <div class="header">
        <div class="title">管理员列表</div>
        <el-button type="primary" @click="handleback">返回</el-button>
      </div>
      <div class="body">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          label-position="left"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name" style="width: 400px;">
            <el-input v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone" style="width: 400px;">
            <el-input v-model="ruleForm.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 400px;">
            <el-input
              v-model.number="ruleForm.password"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleinsert('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import manageService from "@/global/service/manage";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        phone: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /\d{6}$/,
            message: "不能少于6位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleback() {
      this.$router.push({ name: "manage" });
    },
    handleinsert() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            phone: this.ruleForm.phone
          };
          manageService.insert(params).then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
            }
            this.$router.push({ name: "manage" });
          });
        } else {
          this.$message.error("提交错误");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
